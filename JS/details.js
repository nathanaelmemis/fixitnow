import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getDatabase, ref, onValue, push, update, child, set, remove  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

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

// get CASEID variable from local storage
const USERID = JSON.parse(localStorage.getItem('userID'))
const CASEID = JSON.parse(localStorage.getItem('caseID'))
if(!USERID && !CASEID) {
    window.location.href = 'dashboard.html';
    process.exit()
}

// real-time database listener
const database = getDatabase()
const starCountRef = ref(database, 'users/' + USERID + '/cases/' + CASEID)
onValue(starCountRef, (snapshot) => {
    displayUpdates(snapshot.val())
})

function displayUpdates(specificCase) {
    console.log(specificCase)

    document.getElementById('main-case-container')
    .innerHTML = '' 

    var status = ''
    switch (specificCase['status']) {
        case 'New':
            status = '<img class="main-case-status-img" src="../assets/dashboard/new.png">'
            break;
        case 'Ongoing':
            status =  '<img class="main-case-status-img" src="../assets/dashboard/processing.png">'
            break;
        case 'Finished':
            status =  '<img class="main-case-status-img" src="../assets/dashboard/completed.png">'
            break;
    }

    // case information
    document.getElementById('main-case-container')
    .innerHTML += 
        '<div class="main-case-image">' +
            '<img src="' + specificCase['photos'][0]+ '" alt="Photo submitted by user">' + 
        '</div>' +
        '<div class="main-case-image">' +
            '<img src="' + specificCase['photos'][1]+ '" alt="Photo submitted by user">' + 
        '</div>' +
        '<div class="main-case-image">' +
            '<img src="' + specificCase['photos'][2]+ '" alt="Photo submitted by user">' + 
        '</div>' +
        '<div class="main-case-info">' +
            '<p class="main-case-info-label">Category:</p><p class="main-case-info-value">' + specificCase['category'] + '</p>' + 
            '<p class="main-case-info-label">Case ID:</p><p class="main-case-info-value">' + CASEID + '</p>' + 
            '<p class="main-case-info-label">Submitted On:</p><p class="main-case-info-value">' + formatDate(specificCase['submitted_on']) + '</p>' + 
            '<p class="main-case-info-label">Submitted By:</p><p class="main-case-info-value">' + specificCase['submitted_by'] + '</p>' + 
            '<p class="main-case-info-label">Location:</p><p class="main-case-info-value">' + specificCase['location'] + '</p>' + 
            '<p class="main-case-info-label">Urgency Level:</p><p class="main-case-info-value">' + specificCase['urgency'] + '</p>' + 
            '<p class="main-case-info-label">Status:</p><p class="main-case-info-value-status">' + status + '</p>' + 
            '<button class="main-case-info-value-status-button-off" id="update-button">Update Status</button>' +
        '</div>' +
        '<div class="main-case-details">' +
            '<p class="main-case-details-label">Details:</p>' + 
            '<p class="main-case-details-value">' + specificCase['details'] + '</p>' + 
        '<div class="main-case-updates">' +
            '<p class="main-case-updates-label">Updates:</p>'

    // case updates
    var updatesSection = ''
    for (const updateID in specificCase['updates']) {
        const update = specificCase['updates'][updateID]

        updatesSection += 
            '<div class="main-case-updates-container">' + 
                '<p class="main-case-updates-sender">' + update['sender'] + '</p>' + 
                '<p class="main-case-updates-date">' + formatDate(update['timestamp']) + '</p>' + 
                '<p class="main-case-updates-value">' + update['message'] + '</p>'      

        if (specificCase['updates'][updateID]['sender'] === 'Maintenance Department') {
            updatesSection += 
                '<img class="main-case-updates-trash-button" id="delete_button" data-value="' + updateID + '" src="../assets/details/trash_icon.png">'
        }

        updatesSection +=
            '</div>'
    }

    document.getElementById('main-case-container')
        .innerHTML += updatesSection

    // update message box
    document.getElementById('main-case-container')
    .innerHTML += 
        '<div class="main-case-line-container"">' +
            '<hr class="main-case-line">' +
        '</div>' +
        '</div>' +
            '<div class="main-case-message">' +
                '<input type="text" id="message-input" placeholder="type a message...">' +
                '<button id="send-button">Send</button>' +
            '</div>'

    // if new case was opened update status to ongoing
    if (specificCase['status'] === 'New') {
        set(ref(database, 'users/' + USERID + '/cases/' + CASEID), {
            category:specificCase['category'],
            details:specificCase['details'],
            location:specificCase['location'],
            photos:specificCase['photos'],
            status:'Ongoing',
            submitted_by:specificCase['submitted_by'],
            submitted_on:specificCase['submitted_on'],
            updates:specificCase['updates'],
            urgency:specificCase['urgency'],
        });
    }

    // if status is not finished then display update button
    if (specificCase['status'] !== 'Finished') {
        const element = document.getElementById("update-button");

        element.classList.remove("main-case-info-value-status-button-off");
        element.classList.add("main-case-info-value-status-button");
    }

    // button for updating status of the case
    document.getElementById("update-button").onclick = function updateStatus() {
        set(ref(database, 'users/' + USERID + '/cases/' + CASEID), {
            category:specificCase['category'],
            details:specificCase['details'],
            location:specificCase['location'],
            photos:specificCase['photos'],
            status:'Finished',
            submitted_by:specificCase['submitted_by'],
            submitted_on:specificCase['submitted_on'],
            updates:specificCase['updates'],
            urgency:specificCase['urgency'],
        });
    }

    // maintenance dept. delete a message
    const elements = document.querySelectorAll("#delete_button")
    elements.forEach((element) => {
        element.addEventListener("click", function removeUpdate() {
            console.log('delete')
            const updateID = element.dataset.value
            remove(ref(database, 'users/' + USERID + '/cases/' + CASEID + '/updates/' + updateID))
        })
    });

    // maintenance dept. send a message in updates
    document.getElementById("send-button").onclick = function sendUpdate() {
        const message = document.getElementById("message-input").value
        if (message.trim() === '') {
            return
        }

        const newUpdateKey = push(child(ref(database), 'users/' + USERID + '/cases/' + CASEID + '/updates')).key

        update(ref(database, 'users/' + USERID + '/cases/' + CASEID + '/updates/' + newUpdateKey), {
            message: message,
            sender: 'Maintenance Department',
            timestamp: Date.now()
        });
    }
}

function formatDate(unixTimestamp) {
    var date = new Date(unixTimestamp);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // zero-based month
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}

// go back to dashboard function
document.getElementById("header-left-content").addEventListener("click", function goToDashboard() {
    localStorage.removeItem('CASEID')
    window.location.href = 'dashboard.html';
})

//logout function
document.getElementById("logout-button").onclick = function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        localStorage.clear()
        window.location.href = 'login.html';
    }).catch(function() {
        alert('Unexpected Error Occured!');
    });
}