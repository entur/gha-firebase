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
        footer.appendChild(author);
        let div = document.createElement("article");
        div.classList = ["entry"];
        div.appendChild(description);
        div.appendChild(footer);
 
        document.querySelector("#journal").appendChild(div);
    });
}
 
window.addEventListener("load", async function () {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    await fetch("desc");
});
