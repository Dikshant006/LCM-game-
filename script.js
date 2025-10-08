let num1, num2, correctLCM, score = 0;

function findLCM(a, b) {
    let max = (a > b) ? a : b;
    while (true) {
        if (max % a === 0 && max % b === 0) return max;
        max++;
    }
}

function generateQuestion() {
    document.getElementById("result").textContent = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("options").innerHTML = "";

    num1 = Math.floor(Math.random() * 10) + 2;
    num2 = Math.floor(Math.random() * 10) + 2;

    correctLCM = findLCM(num1, num2);
    document.getElementById("numbers").textContent = `Find the LCM of ${num1} and ${num2}`;

    let options = new Set([correctLCM]);
    while (options.size < 4) options.add(correctLCM + Math.floor(Math.random() * 10) + 1);

    let shuffled = Array.from(options).sort(() => Math.random() - 0.5);
    shuffled.forEach(opt => {
        let btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt);
        document.getElementById("options").appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === correctLCM) {
        document.getElementById("result").textContent = "✅ Correct! You found the LCM!";
        document.getElementById("result").style.color = "green";
        score++;
        document.getElementById("scoreDisplay").textContent = "Score: " + score;
        document.getElementById("nextBtn").style.display = "block";
        submitScore(score); // save to PHP server
    } else {
        document.getElementById("result").textContent = "❌ Oops! Try again!";
        document.getElementById("result").style.color = "red";
    }
}

function nextQuestion() {
    generateQuestion();
}

// AJAX call to save score to PHP
function submitScore(score) {
    fetch('save_score.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'score=' + score
    })
        .then(response => response.text())
        .then(data => console.log(data));
}

generateQuestion();
