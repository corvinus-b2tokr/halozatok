var kerdesek;
var sorszam;
sorszam = 1;
var helyesValasz;

function k�rd�sMegjelen�t�s(k�rd�s) {
    console.log(k�rd�s);
    document.getElementById("kerdes_szoveg").innerText = k�rd�s.questionText
    document.getElementById("valasz1").innerText = k�rd�s.answer1
    document.getElementById("valasz2").innerText = k�rd�s.answer2
    document.getElementById("valasz3").innerText = k�rd�s.answer3
    document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + k�rd�s.image;
}

function k�rd�sBet�lt�s(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hib�s v�lasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => k�rd�sMegjelen�t�s(data));
} 

function v�laszfeldolgoz�s(v�lasz) {
    if (!v�lasz.ok) {
        console.error(`Hib�s v�lasz: ${response.status}`)
    }
    else {
        return v�lasz.json()
    }
}

function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data)
        );
}

vissza = function () {
    document.getElementById("valasz1").classList.remove("jo");
    document.getElementById("valasz2").classList.remove("jo");
    document.getElementById("valasz3").classList.remove("jo");
    document.getElementById("valasz1").classList.remove("rossz");
    document.getElementById("valasz2").classList.remove("rossz");
    document.getElementById("valasz3").classList.remove("rossz");
    document.getElementById("kerdes_szoveg").innerText = "";
    document.getElementById("valasz1").innerText = "";
    document.getElementById("valasz2").innerText = "";
    document.getElementById("valasz3").innerText = "";
    if (sorszam != 0) sorszam = sorszam - 1;
    else sorszam = 2;
    kerdesMegjelenites(sorszam);
}

elore = function () {
    document.getElementById("valasz1").classList.remove("jo");
    document.getElementById("valasz2").classList.remove("jo");
    document.getElementById("valasz3").classList.remove("jo");
    document.getElementById("valasz1").classList.remove("rossz");
    document.getElementById("valasz2").classList.remove("rossz");
    document.getElementById("valasz3").classList.remove("rossz");
    document.getElementById("kerdes_szoveg").innerText = "";
    document.getElementById("valasz1").innerText = "";
    document.getElementById("valasz2").innerText = "";
    document.getElementById("valasz3").innerText = "";
    if (sorszam != 2) sorszam = sorszam + 1;
    else sorszam = 0;
    kerdesMegjelenites(sorszam);
}

valaszt1 = function () {
    if (helyesValasz == 1) document.getElementById("valasz1").classList.toggle("jo");
    else document.getElementById("valasz1").classList.toggle("rossz");
}

valaszt2 = function () {
    if (helyesValasz == 2) document.getElementById("valasz2").classList.toggle("jo");
    else document.getElementById("valasz2").classList.toggle("rossz");
}

valaszt3 = function () {
    if (helyesValasz == 3) document.getElementById("valasz3").classList.toggle("jo");
    else document.getElementById("valasz3").classList.toggle("rossz");
}

function letoltesBefejezodott(d) {
    console.log("Sikeres let�lt�s")
    console.log(d)
    kerdesek = d;
    kerdesMegjelenites(sorszam);
}

function kerdesMegjelenites(kerdes) {
    let kerdesSzoveg = document.getElementById("kerdes_szoveg");
    let valasz1 = document.getElementById("valasz1");
    let valasz2 = document.getElementById("valasz2");
    let valasz3 = document.getElementById("valasz3");
    let kep = document.getElementById("kep");

    let elem = document.createElement("div")
    elem.innerHTML = kerdesek[kerdes].questionText
    kerdesSzoveg.appendChild(elem);
    let elem2 = document.createElement("div")
    elem2.innerHTML = kerdesek[kerdes].answer1
    valasz1.appendChild(elem2);
    let elem3 = document.createElement("div")
    elem3.innerHTML = kerdesek[kerdes].answer2
    valasz2.appendChild(elem3);
    let elem4 = document.createElement("div")
    elem4.innerHTML = kerdesek[kerdes].answer3
    valasz3.appendChild(elem4);
    helyesValasz = kerdesek[kerdes].correctAnswer;
    kep.innerHTML = `<img src="https://szoft1.comeback.hu/hajo/${kerdesek[kerdes].image}" />`
}

window.onload = function () {
    //letoltes();
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => k�rd�sMegjelen�t�s(data)
        );
}