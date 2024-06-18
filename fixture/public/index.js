/*
  Don't copy what we're doing here - this is just a test fixture
  This is just a stupid test fixture for gha-firebase
*/
const firebaseConfig = {
  apiKey: "AIzaSyCqPLSzP2FeATrS5DammO7qyqtQxb3frF8",
  authDomain: "ent-ghafb-dev.firebaseapp.com",
  projectId: "ent-ghafb-dev",
  storageBucket: "ent-ghafb-dev.appspot.com",
  messagingSenderId: "64843349712",
  appId: "1:64843349712:web:af17266e72fe489429e8d5"
};

var db = undefined;
var user = undefined;
 
async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    user = firebase.auth().currentUser;
}
 
function activate() {
    // document.querySelector("#nav").style.display = "none";
    // document.querySelector("#journal").style.display = "none";
    // document.querySelector("#form").style.display = "none";
    document.querySelector("#date").valueAsDate = new Date();
    document.querySelector("#login").addEventListener("click", async function () {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        await login(email, password);
        await fetch("desc");
        document.querySelector("#current").innerHTML = user.email;
        document.querySelector("#email").value = "";
        document.querySelector("#password").value = "";
        document.querySelector("#auth").style.display = "none";
        document.querySelector("#nav").style.display = "block";
        document.querySelector("#journal").style.display = "block";
    });
    document.querySelector("#submit").addEventListener("click", async function () {
        let date = document.querySelector("#date").value;
        let description = document.querySelector("#description").value;
        if(description.trim().length == 0)
            return;
        if (new Date(date).getTime() > new Date().getTime())
            return;
        await db.collection("journal-entries").add({
            "description": description,
            "author": user.email,
            "date": new Date(date).getTime()
        });
        document.querySelector("#date").valueAsDate = new Date();
        document.querySelector("#description").value = "";
        await fetch("desc");
        document.querySelector("#journal").style.display = "block";
        document.querySelector("#form").style.display = "none";
 
    });
 
    document.querySelector("#new").addEventListener("click", async function () {
        document.querySelector("#journal").style.display = "none";
        document.querySelector("#form").style.display = "block";
    });
 
    document.querySelector("#refresh").addEventListener("click", async function () {
        await fetch("desc");
        document.querySelector("#journal").style.display = "block";
        document.querySelector("#form").style.display = "none";
    });
 
    document.querySelector("#latest").addEventListener("click", async function () {
        await fetch("desc");
        document.querySelector("#journal").style.display = "block";
        document.querySelector("#form").style.display = "none";
    });
 
    document.querySelector("#oldest").addEventListener("click", async function () {
        await fetch("asc");
        document.querySelector("#journal").style.display = "block";
        document.querySelector("#form").style.display = "none";
    });
}
 
async function fetch(order) {
    let entries = await db.collection("journal-entries").orderBy("date", order).get();
    document.querySelector("#journal").innerHTML = "";
    entries.forEach((entry) => {
        let record = entry.data();
 
        let doe = document.createElement("div");
        let date = new Date(record.date);
        doe.innerHTML = `📅 ${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()} ${date.toLocaleDateString("default", { weekday: "long" })}`
        doe.classList = ["date"];
 
        let description = document.createElement("header");
        description.innerHTML = record.description;
        description.classList = ["description"]
 
        let author = document.createElement("div");
        author.innerHTML = `✍ ${record.author}`;
        author.classList = ["author"]
 
        let footer = document.createElement("footer");
        footer.appendChild(description);
        footer.appendChild(author);
        let div = document.createElement("article");
        div.id = entry.id;
        div.classList = ["entry"];
        div.appendChild(description);
        div.appendChild(footer);
 
        document.querySelector("#journal").appendChild(div);
    });
}
 
window.addEventListener("load", async function () {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    activate();
});
