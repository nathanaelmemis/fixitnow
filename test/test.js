import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, get, child  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

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

const database = getDatabase();

const userID = 'qoEQlCpVsdPjgxi1F7gNHarzbPP2'

newCaseID().then((numCases) => {
    console.log(numCases)
})

function newCaseID() {
    let numCases = 0;
    return get(child(ref(database), 'users/' + userID + '/cases')).then((snapshot) => {
        for (const eachCase in snapshot.val()) {
            numCases++;
        }
        return (10000 + numCases + 1).toString().substring(1, 5);
    });
}