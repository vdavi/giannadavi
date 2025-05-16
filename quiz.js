function submitQuiz() {
    let score = 0;

    const answers = {
        q1: "A",
        q2: ["Plants", "Animals", "Bacterium"],
        q3: "C",
        q4: "B",
        q5: "A",
        q6: "B",
        q7: "D",
        q8: "D"
    };

    for (let key in answers) {
        let userAnswer = document.querySelector(`input[name="${key}"]:checked`)?.value;
        
        if (key === "q2") {
            let checkboxes = document.querySelectorAll(`input[name="q2"]:checked`);
            let selectedValues = Array.from(checkboxes).map(cb => cb.value);
            if (JSON.stringify(selectedValues.sort()) === JSON.stringify(answers[key].sort())) {
                score++;
            }
        } else if (userAnswer === answers[key]) {
            score++;
        }
    }

    const resultElement = document.getElementById("result");
    resultElement.innerText = `You scored ${score}/8. ` + (score >= 6 ? "✅ You passed!" : "❌ You failed. Try again!");
    resultElement.classList.add(score >= 6 ? "text-success" : "text-danger");
}