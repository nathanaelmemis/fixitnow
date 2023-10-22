import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getDatabase, ref, onValue  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyCqZAvRslBmLDZfmNPptcmfjSVqLoml2kw",
    authDomain: "pupkeep-7753c.firebaseapp.com",
    projectId: "pupkeep-7753c",
    storageBucket: "pupkeep-7753c.appspot.com",
    messagingSenderId: "629389224588",
    appId: "1:629389224588:web:8eedc3169313292f06e9a9",
    measurementId: "G-DPYLH962F0"
};
initializeApp(firebaseConfig)

// check if user is valid
const auth = JSON.parse(localStorage.getItem('auth'))
if(!auth) {
    window.location.href = 'login.html';
    process.exit()
}

let URGENCY_FIILTER = 'All'
let STATUS_FILTER = 'All'
let USERS = null
let newEmergencyCase = false
let analytics = [0, 0, 0, 0]
const audio = new Audio('../assets/dashboard/warning_sound.mp3');
audio.loop = true;
let myChart = new Chart()

// real-time database listener
const database = getDatabase()
// new sortedCases
const starCountRef = ref(database, 'users')
onValue(starCountRef, (snapshot) => {
    const element = document.getElementById("footer-emergency-container")       
    element.classList.remove("footer-emergency-container")
    element.classList.add("footer-emergency-container-off")

    myChart.destroy();

    USERS = snapshot.val()
    console.log(USERS)
    let emergencyCase = displayCases()

    if (emergencyCase) {
        const element = document.getElementById("footer-emergency-container")
                
        element.classList.remove("footer-emergency-container-off")
        element.classList.add("footer-emergency-container")

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

    let emergencyCase = false
    let total = 0
    let active = 0
    let finished = 0
    analytics = [0, 0, 0, 0]

    let cases = []
    for (const userID in USERS) {
        let userCases = USERS[userID]['cases']

        for (const caseID in userCases) {
            userCases[caseID]['caseID'] = caseID
            userCases[caseID]['userID'] = userID
            cases.push(userCases[caseID])
            let daysDifference = getDaysDifference(userCases[caseID]['submitted_on'], Date.now())
            console.log(userID, daysDifference)
            if (daysDifference <= 28) {
                console.log('meow')
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

    console.log(cases)
    console.log(analytics)

    // analytics = [26, 14, 20, 5] // test analytics

    // Data for the chart (sample data)
    const data = {
        labels: ['This Week', '1 Week Ago', '2 Weeks Ago', '3 Weeks Ago'],
        datasets: [{    
            label: 'No. of Cases',
            data: analytics,
            borderColor: 'rgb(255, 165, 0)',
            backgroundColor: 'rgb(255, 165, 0)',
        }]
    };

    // Configuration options for the chart
    const options = {
        color: 'rgb(255, 165, 0)',
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Create the chart
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    // filter by urgency
    let urgencyfilteredCases = []
    for (const caseID in cases) {
        if (cases[caseID]['urgency'] === 'Emergency'
        && cases[caseID]['status'] !== 'Finished') {
            emergencyCase = true
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
    // sort by urgency: emergency, urgent, standard
    let sortedCases = []
    for (const caseID in newSortedCases) {
        if (newSortedCases[caseID]['urgency'] === 'Emergency') {
            sortedCases.push(newSortedCases[caseID])
        }
    }
    for (const caseID in newSortedCases) {
        if (newSortedCases[caseID]['urgency'] === 'Urgent') {
            sortedCases.push(newSortedCases[caseID])
        }
    }
    for (const caseID in newSortedCases) {
        if (newSortedCases[caseID]['urgency'] === 'Standard') {
            sortedCases.push(newSortedCases[caseID])
        }
    }
    // sort by status: ongoing
    let ongoingSortedCases = []
    for (const caseID in filteredCases) {
        if (filteredCases[caseID]['status'] === 'Ongoing') {
            ongoingSortedCases.push(filteredCases[caseID])
        }
    }
    // sort by urgency: emergency, urgent, standard
    for (const caseID in ongoingSortedCases) {
        if (ongoingSortedCases[caseID]['urgency'] === 'Emergency') {
            sortedCases.push(ongoingSortedCases[caseID])
        }
    }
    for (const caseID in ongoingSortedCases) {
        if (ongoingSortedCases[caseID]['urgency'] === 'Urgent') {
            sortedCases.push(ongoingSortedCases[caseID])
        }
    }
    for (const caseID in ongoingSortedCases) {
        if (ongoingSortedCases[caseID]['urgency'] === 'Standard') {
            sortedCases.push(ongoingSortedCases[caseID])
        }
    }
    // sort by status: finished
    let finishedSortedCases = []
    for (const caseID in filteredCases) {
        if (filteredCases[caseID]['status'] === 'Finished') {
            finishedSortedCases.push(filteredCases[caseID])
        }
    }
    // sort by urgency: emergency, urgent, standard
    for (const caseID in finishedSortedCases) {
        if (finishedSortedCases[caseID]['urgency'] === 'Emergency') {
            sortedCases.push(finishedSortedCases[caseID])
        }
    }
    for (const caseID in finishedSortedCases) {
        if (finishedSortedCases[caseID]['urgency'] === 'Urgent') {
            sortedCases.push(finishedSortedCases[caseID])
        }
    }
    for (const caseID in finishedSortedCases) {
        if (finishedSortedCases[caseID]['urgency'] === 'Standard') {
            sortedCases.push(finishedSortedCases[caseID])
        }
    }

    // analytics
    document.getElementById('main-introduction-analytics-total-count')
    .innerHTML = total
        document.getElementById('main-introduction-analytics-active-count')
    .innerHTML = active
        document.getElementById('main-introduction-analytics-finished-count')
    .innerHTML = finished

    console.log (sortedCases)
    
    // table elements
    for (const caseID in sortedCases) {
        const eachCase = sortedCases[caseID]

        let status = ''
        
        switch (eachCase['status']) {
            case 'New':
                status = '<img class="main-table-img" src="../assets/dashboard/new.png">'
                break;
            case 'Ongoing':
                status =  '<img class="main-table-img" src="../assets/dashboard/processing.png">'
                break;
            case 'Finished':
                status =  '<img class="main-table-img" src="../assets/dashboard/completed.png">'
                break;
        }

        document.getElementById('main-table-tables-container')
        .innerHTML += 
            '<div class="main-table-tables-element-container" id="view-details" data-value1="' + eachCase['userID'] + '" data-value2="'+ eachCase['caseID'] +'">' +
                '<div class="main-table-column-name-category">' +
                        '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['category'] + '</p>' + 
                '</div>' +
                '<div class="main-table-column-name-case-id">' +
                    '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['caseID'] + '</p>' + 
                '</div>' +
                '<div class="main-table-column-name-submitted-on">' + 
                    '<p class="main-table-column-name" id="main-table-column-name">' + formatDate(eachCase['submitted_on']) + '</p>' + 
                '</div>' + 
                '<div class="main-table-column-name-submitted-by">' + 
                    '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['submitted_by'] + '</p>' + 
                '</div>' +
                '<div class="main-table-column-name-location">' + 
                    '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['location'] + '</p>' + 
                '</div>' +
                '<div class="main-table-column-name-urgency">' + 
                    '<div class="main-' + eachCase['urgency'] + '-container">' +
                        '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['urgency'] + '</p>' + 
                    '</div>' +
                '</div>' +
                '<div class="main-table-column-name-status">' +
                    status +
                '</div>' +
            '</div>'
    }

    // view case details function
    const elements = document.querySelectorAll("#view-details")
    elements.forEach((element) => {
        element.addEventListener("click", function viewCaseDetails() {
            const userID = element.dataset.value1
            const caseID = element.dataset.value2
    
            localStorage.setItem('userID', JSON.stringify(userID));
            localStorage.setItem('caseID', JSON.stringify(caseID));
            window.location.href = 'details.html';
        })
    });

    return emergencyCase
}

function playEmergencySound() {
    if (audio.paused) {
        audio.play();
    }
}

function formatDate(unixTimestamp) {
    let date = new Date(unixTimestamp);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // zero-based month
    let day = ('0' + date.getDate()).slice(-2);
    return day + '/' + month + '/' + year;
}

function getDaysDifference(timestamp1, timestamp2) {
    // Convert timestamps to Date objects
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
  
    // Calculate the time difference in milliseconds
    const timeDifferenceInMs = date2 - date1;
  
    // Convert milliseconds to days
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(timeDifferenceInMs / millisecondsInOneDay);
  
    return daysDifference;
  }

// sort by urgency
document.getElementById("urgency-menu").addEventListener("change", (event) => {
    URGENCY_FIILTER = event.target.value;
    console.log('Urgency was set to ' + URGENCY_FIILTER)
    myChart.destroy();
    displayCases()
});

// sort by status
document.getElementById("status-menu").addEventListener("change", (event) => {
    STATUS_FILTER = event.target.value;
    console.log('Status was set to ' + STATUS_FILTER)
    myChart.destroy();
    displayCases()
});

// logout function
document.getElementById("logout-button").onclick = function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        localStorage.clear()
        window.location.href = 'login.html';
    }).catch(function() {
        alert('Unexpected Error Occured!');
    });
}