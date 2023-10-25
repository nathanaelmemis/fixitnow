import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getDatabase, ref, get  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

import firebaseConfig from './firebaseConfig.js';
initializeApp(firebaseConfig)

const auth = getAuth()
const database = getDatabase()

// login function
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((auth) => {
        // check if user is an admin
        get(ref(database), 'admins').then((snapshot) => {
            if (snapshot.val()['admins'][auth['user']['uid']] === '') {
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid Credentials!');
            }
        });
    })
    .catch(function() {
        alert('Invalid Credentials!');
    });
}

document.getElementById("enter-button").addEventListener("click", login)

document.getElementById("email").addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        document.getElementById("password").focus()
    }
})

document.getElementById("password").addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        login()
    }
})