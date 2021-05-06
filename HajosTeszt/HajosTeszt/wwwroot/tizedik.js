var questionId = 3;
var helyesValasz;

var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timeoutHandler;

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (nextQuestion <= 3) {
        for (var i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        console.log("LocalStorage használatban..");
        kerdesMegjelenites();
    }
}

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kerdesMegjelenites()
                }
            }
        );
}

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;

    if (!kerdes) return;
    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerText = kerdes.questionText
    document.getElementById("valasz1").innerText = kerdes.answer1
    document.getElementById("valasz2").innerText = kerdes.answer2
    document.getElementById("valasz3").innerText = kerdes.answer3
    helyesValasz = kerdes.correctAnswer;
    questionId = kerdes.questionId;
    if (kerdes.image) {
        document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
        document.getElementById("kep").style.display = "block";
    }
    else {
        document.getElementById("kep").style.display = "none";
    }

    document.getElementById("valasz1").classList.remove("jo", "rossz");
    document.getElementById("valasz2").classList.remove("jo", "rossz");
    document.getElementById("valasz3").classList.remove("jo", "rossz");
}

vissza = function () {
    document.getElementById("valasz1").classList.remove("jo", "rossz");
    document.getElementById("valasz2").classList.remove("jo", "rossz");
    document.getElementById("valasz3").classList.remove("jo", "rossz");
    document.getElementById("kerdes_szoveg").innerText = "";
    document.getElementById("valasz1").innerText = "";
    document.getElementById("valasz2").innerText = "";
    document.getElementById("valasz3").innerText = "";

    if (displayedQuestion != 0) displayedQuestion--;
    else displayedQuestion = 2;
    kerdesMegjelenites();

    document.getElementById("valasz1").style.pointerEvents = "auto";
    document.getElementById("valasz2").style.pointerEvents = "auto";
    document.getElementById("valasz3").style.pointerEvents = "auto";
}

elore = function () {
    clearTimeout(timeoutHandler)

    document.getElementById("valasz1").classList.remove("jo", "rossz");
    document.getElementById("valasz2").classList.remove("jo", "rossz");
    document.getElementById("valasz3").classList.remove("jo", "rossz");
    document.getElementById("kerdes_szoveg").innerText = "";
    document.getElementById("valasz1").innerText = "";
    document.getElementById("valasz2").innerText = "";
    document.getElementById("valasz3").innerText = "";

    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites();

    document.getElementById("valasz1").style.pointerEvents = "auto";
    document.getElementById("valasz2").style.pointerEvents = "auto";
    document.getElementById("valasz3").style.pointerEvents = "auto";
}

valaszt1 = function () {
    if (helyesValasz == 1) {
        document.getElementById("valasz1").classList.toggle("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers >= 3) {
            if (nextQuestion != numberOfQuestions) {
                kerdesBetoltes(nextQuestion, displayedQuestion);
                nextQuestion++;
            } else {
                console.log("Kérdéslista végére értünk");
            }
        }
    }
    else {
        document.getElementById("valasz1").classList.toggle("rossz");
        hotList[displayedQuestion].goodAnswers = 0;
    }
    document.getElementById("valasz1").style.pointerEvents = "none";
    document.getElementById("valasz2").style.pointerEvents = "none";
    document.getElementById("valasz3").style.pointerEvents = "none";

    timeoutHandler = setTimeout(elore, 3000);
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

valaszt2 = function () {
    if (helyesValasz == 2) {
        document.getElementById("valasz2").classList.toggle("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers >= 3) {
            if (nextQuestion != numberOfQuestions) {
                kerdesBetoltes(nextQuestion, displayedQuestion);
                nextQuestion++;
            } else {
                console.log("Kérdéslista végére értünk");
            }
        }
    }
    else {
        document.getElementById("valasz2").classList.toggle("rossz");
        hotList[displayedQuestion].goodAnswers = 0;
    }
    document.getElementById("valasz1").style.pointerEvents = "none";
    document.getElementById("valasz2").style.pointerEvents = "none";
    document.getElementById("valasz3").style.pointerEvents = "none";

    timeoutHandler = setTimeout(elore, 3000);
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

valaszt3 = function () {
    if (helyesValasz == 3) {
        document.getElementById("valasz3").classList.toggle("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers >= 3) {
            if (nextQuestion != numberOfQuestions) {
                kerdesBetoltes(nextQuestion, displayedQuestion);
                nextQuestion++;
            } else {
                console.log("Kérdéslista végére értünk");
            }
        }
    }
    else {
        document.getElementById("valasz3").classList.toggle("rossz");
        hotList[displayedQuestion].goodAnswers = 0;
    }
    document.getElementById("valasz1").style.pointerEvents = "none";
    document.getElementById("valasz2").style.pointerEvents = "none";
    document.getElementById("valasz3").style.pointerEvents = "none";

    timeoutHandler = setTimeout(elore, 3000);
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("elore_gomb").onclick = elore;
    document.getElementById("vissza_gomb").onclick = vissza;
    init()
}