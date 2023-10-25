import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getDatabase, ref, onValue  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
import { getDaysDifference } from './utils.js'
import firebaseConfig from './firebaseConfig.js';
initializeApp(firebaseConfig)

// components
import { MainTableIMG } from "./Components/MainTableIMG.js";
import { MainTableTables } from "./Components/MainTableTables.js";

// check if user is valid
const auth = getAuth()
onAuthStateChanged(auth, (user) => {
    if(!user) {
        window.location.href = '/';
        process.exit()
    }
});

// global variables
let URGENCY_FIILTER = 'All'
let STATUS_FILTER = 'All'
let users = null
let newEmergencyCase = false
const audio = new Audio('assets/dashboard/warning_sound.mp3');
audio.loop = true;

// configuration options for the chart
const options = {
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(255, 255, 255)',
    responsive: false,
    maintainAspectRatio: false,
    scales: {
        x: {   
            grid: {
                color: 'rgb(255, 255, 255)'
            },
            ticks: {
                color: 'rgb(255, 255, 255)'
            }
        },
        y: {   
            grid: {
                color: 'rgb(255, 255, 255)'
            },
            ticks: {
                color: 'rgb(255, 255, 255)'
            }
        },
    },
};
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: null,
    options: options
});

// when data changes in database under path 'users', re-render the webpage
const database = getDatabase()
const starCountRef = ref(database, 'users')
onValue(starCountRef, (snapshot) => {
    const element = document.getElementById("footer-emergency-container")       
    element.classList.remove("footer-emergency-container")
    element.classList.add("footer-emergency-container-off")

    // reset chart
    myChart.destroy();

    // get all users
    users = snapshot.val()

    // process all cases and display accordingly
    let emergencyCaseExists = displayCases()
    // emergency mode is activated when an emergency case exists
    if (emergencyCaseExists) {
        const element = document.getElementById("footer-emergency-container")
        
        // show webpage emergency notification
        element.classList.remove("footer-emergency-container-off")
        element.classList.add("footer-emergency-container")

        // prompt Windows notification
        if ("Notification" in window) {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    // Create a new notification
                    new Notification("There is an active emergency case!")
                }
            });
        }
    }
});

// notify user about emergency mode notification
// this modal is required by browsers before being able to activate emergency mode
document.getElementById('notification-modal-message-button')
.addEventListener("click", function viewCaseDetails() {
    document.getElementById('notification-modal')
    .style.display = 'none' 

    if (newEmergencyCase) {
        playEmergencySound()
    }
})

// display the table values
function displayCases() {
    document.getElementById('main-table-tables-container')
    .innerHTML = '' 

    // get data for analytics and extract all cases from all users
    let [analytics, cases] = getAnalyticsDataAndExtractAllCases(users)

    // data for the chart
    const data = {
        labels: ['This Week', '1 Week Ago', '2 Weeks Ago', '3 Weeks Ago'],
        datasets: [{    
            label: 'No. of Cases',
            data: analytics,
            borderColor: 'rgb(248, 167, 86)',
            backgroundColor: 'rgb(248, 167, 86)',
        }]
    };
    // create the chart
    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    // sort and filter the cases based on user constraints
    let [filteredAndSortedCases, emergencyCaseExists, total, active, finished] = filterAndSortCases(cases)

    // set analytics data
    document.getElementById('main-introduction-analytics-total-count')
    .innerHTML = total
        document.getElementById('main-introduction-analytics-active-count')
    .innerHTML = active
        document.getElementById('main-introduction-analytics-finished-count')
    .innerHTML = finished
    
    // table elements
    for (const eachCase of filteredAndSortedCases) {
        let status = new MainTableIMG().render(eachCase['status'])

        document.getElementById('main-table-tables-container')
        .innerHTML += new MainTableTables().render(eachCase, status)
    }

    // view case details function
    const elements = document.querySelectorAll("#view-details")
    elements.forEach((element) => {
        element.addEventListener("click", function viewCaseDetails() {
            const userID = element.dataset.value1
            const caseID = element.dataset.value2
    
            window.location.href = `details.html?userID=${userID}&caseID=${caseID}`;
        })
    });

    return emergencyCaseExists
}

// play emergency sound
function playEmergencySound() {
    if (audio.paused) {
        audio.play();
    }
}

// get data for analytics and extract all cases from all users
function getAnalyticsDataAndExtractAllCases(users) {
    let analytics = [0, 0, 0, 0]
    let cases = []

    for (const userID in users) {
        let userCases = users[userID]['cases']

        for (const caseID in userCases) {
            userCases[caseID]['caseID'] = caseID
            userCases[caseID]['userID'] = userID
            cases.push(userCases[caseID])
            let daysDifference = getDaysDifference(userCases[caseID]['submitted_on'], Date.now())
            if (daysDifference <= 28) {
                if (daysDifference < 7) {
                    analytics[0] += 1;
                } else if (daysDifference > 6 && daysDifference < 14) {
                    analytics[1] += 1;
                } else if (daysDifference > 13 && daysDifference < 21) {
                    analytics[2] += 1;
                } else if (daysDifference > 20) {
                    analytics[3] += 1;
                }
            }
        }
    }

    return [analytics, cases]
}

// filters then sort all cases
function filterAndSortCases(cases) {
    let total = 0
    let active = 0
    let finished = 0
    let emergencyCaseExists = false

    // filter by urgency
    let urgencyfilteredCases = []
    for (const caseID in cases) {
        if (cases[caseID]['urgency'] === 'Emergency'
        && cases[caseID]['status'] !== 'Finished') {
            emergencyCaseExists = true
        }
        if (URGENCY_FIILTER === 'All') {
            urgencyfilteredCases.push(cases[caseID])
        } else if (cases[caseID]['urgency'] === URGENCY_FIILTER) {
            urgencyfilteredCases.push(cases[caseID])
        }

        total +=1
        if (cases[caseID]['status'] == 'Ongoing'
            || cases[caseID]['status'] == 'New') {
            active += 1
        } else if (cases[caseID]['status'] == 'Finished') {
            finished += 1
        }

        if (cases[caseID]['status'] == 'New'
            && cases[caseID]['urgency'] == 'Emergency') {
            newEmergencyCase = true
            playEmergencySound()
        }
    }

    // filter by status
    let filteredCases = []
    for (const caseID in urgencyfilteredCases) {
        if (STATUS_FILTER === 'All') {
            filteredCases.push(urgencyfilteredCases[caseID])
        } else if (urgencyfilteredCases[caseID]['status'] === STATUS_FILTER) {
            filteredCases.push(urgencyfilteredCases[caseID])
        }
    }

    // sort by status: new
    let newSortedCases = []
    for (const caseID in filteredCases) {
        if (filteredCases[caseID]['status'] === 'New') {
            newSortedCases.push(filteredCases[caseID])
        }
    }

    let sortedCases = []

    // sort by urgency: emergency, urgent, standard
    sortedCases = sortedCases.concat(sortByUrgencyCases(newSortedCases))

    // sort by status: ongoing
    let ongoingSortedCases = []
    for (const caseID in filteredCases) {
        if (filteredCases[caseID]['status'] === 'Ongoing') {
            ongoingSortedCases.push(filteredCases[caseID])
        }
    }

    // sort by urgency: emergency, urgent, standard
    sortedCases = sortedCases.concat(sortByUrgencyCases(ongoingSortedCases))

    // sort by status: finished
    let finishedSortedCases = []
    for (const caseID in filteredCases) {
        if (filteredCases[caseID]['status'] === 'Finished') {
            finishedSortedCases.push(filteredCases[caseID])
        }
    }

    // sort by urgency: emergency, urgent, standard
    sortedCases = sortedCases.concat(sortByUrgencyCases(finishedSortedCases))

    return [sortedCases, emergencyCaseExists, total, active, finished]
}

// sort by urgency: emergency, urgent, standard
function sortByUrgencyCases(cases) {
    let sortedCases = []

    for (const caseID in cases) {
        if (cases[caseID]['urgency'] === 'Emergency') {
            sortedCases.push(cases[caseID])
        }
    }
    for (const caseID in cases) {
        if (cases[caseID]['urgency'] === 'Urgent') {
            sortedCases.push(cases[caseID])
        }
    }
    for (const caseID in cases) {
        if (cases[caseID]['urgency'] === 'Standard') {
            sortedCases.push(cases[caseID])
        }
    }

    return sortedCases
}

// get sort by urgency constraint
document.getElementById("urgency-menu").addEventListener("change", (event) => {
    URGENCY_FIILTER = event.target.value;
    myChart.destroy();
    displayCases()
});

// get sort by status constraint
document.getElementById("status-menu").addEventListener("change", (event) => {
    STATUS_FILTER = event.target.value;
    myChart.destroy();
    displayCases()
});

// logout function
document.getElementById("logout-button").onclick = function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.href = '/';
    }).catch(function() {
        alert('Unexpected Error Occured!');
    });
}