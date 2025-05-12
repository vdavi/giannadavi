function checkAnswer(answer) {
    if (answer === 'A') {
        document.getElementById("result").innerText = "Correct! Plants use photosynthesis.";
    } else {
        document.getElementById("result").innerText = "Try again!";
    }
}