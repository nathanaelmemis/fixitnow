import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getDatabase, ref, onValue, push, update, child, set, remove  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
import firebaseConfig from './firebaseConfig.js';
initializeApp(firebaseConfig)

// components
import { MainCaseStatusIMG } from "./Components/MainCaseStatusIMG.js";
import { MainCase } from "./Components/MainCase.js";
import { MainCaseUpdates } from "./Components/MainCaseUpdates.js";
import { MainCaseUpdatesMessageBox } from "./Components/MainCaseUpdatesMessageBox.js";

// check if user is valid
const auth = getAuth()
onAuthStateChanged(auth, (user) => {
    if(!user) {
        window.location.href = 'index.html';
        process.exit()
    }
});

// parse the query URL into an object
const params = new URLSearchParams(window.location.search);
// access the parameters
const USERID = params.get('userID');
const CASEID = params.get('caseID');

if(!USERID || !CASEID) {
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
    document.getElementById('main-case-container')
    .innerHTML = '' 

    // get case status
    let status = new MainCaseStatusIMG().render(specificCase['status'])

    // case information
    document.getElementById('main-case-container')
    .innerHTML += new MainCase().render(specificCase, status, CASEID)

    // case updates
    for (const updateID in specificCase['updates']) {
        document.getElementById('main-case-container')
        .innerHTML += new MainCaseUpdates().render(specificCase, updateID)
    }

    // update message box
    document.getElementById('main-case-container')
    .innerHTML += new MainCaseUpdatesMessageBox().render()

    // if new case was opened update status to ongoing
    if (specificCase['status'] === 'New') {
        setCaseStatus(specificCase, 'Ongoing')
    }

    // if status is not finished then display update button
    if (specificCase['status'] !== 'Finished') {
        const element = document.getElementById("update-button");

        element.classList.remove("main-case-info-value-status-button-off");
        element.classList.add("main-case-info-value-status-button");
    }

    // button for updating status of the case
    document.getElementById("update-button").onclick = function updateStatus() {
        setCaseStatus(specificCase, 'Finished')
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

function setCaseStatus(specificCase, status) {
    set(ref(database, 'users/' + USERID + '/cases/' + CASEID), {
        category: specificCase['category'],
        details: specificCase['details'],
        location: specificCase['location'],
        photos: specificCase['photos'],
        status: status,
        submitted_by: specificCase['submitted_by'],
        submitted_on: specificCase['submitted_on'],
        updates: specificCase['updates'],
        urgency: specificCase['urgency'],
    });
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
        window.location.href = 'index.html';
    }).catch(function() {
        alert('Unexpected Error Occured!');
    });
}