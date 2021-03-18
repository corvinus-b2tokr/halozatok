window.onload = function () {
    var faktoriális = function (n) {
        let er = 1;
        for (let i = 2; i <= n; i++) {
            er = er * i;
        }
        return er;
    }

    for (var i = 0; i < 10; i++) {
        var ujDiv = document.createElement("div");
        ujDiv.innerHTML = i + 1;
        document.getElementById("szamok").appendChild(ujDiv);
        ujDiv.classList.add(`szam${i + 1}`);
    }

    for (var sor = 0; sor < 10; sor++) {
        var ujDiv2 = document.createElement("div");
        ujDiv2.classList.add("sor");
        ujDiv2.classList.add(`sor${sor + 1}`);
        document.getElementById("pascal").appendChild(ujDiv2);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var ujDiv3 = document.createElement("div");
            ujDiv3.classList.add("elem");
            ujDiv3.innerHTML = `${faktoriális(sor) / (faktoriális(oszlop) * faktoriális(sor - oszlop))}`;
            ujDiv2.appendChild(ujDiv3);
        }
    }
}