function checkAnswer(answer) {
    const resultElement = document.getElementById("result");
    if (answer === 'A') {
        resultElement.innerText = "✅ Correct! Plants use photosynthesis.";
        resultElement.classList.add("text-success");
    } else {
        resultElement.innerText = "❌ Try again!";
        resultElement.classList.add("text-danger");
    }
}