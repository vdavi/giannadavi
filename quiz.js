const questions = [
    { text: "True or false? Biology is the scientific study of living organisms and their origins.", options: ["A. True", "B. False"], answer: "A" },
    { text: "What do cells compose? (Check all that apply)", options: ["Plants", "Animals", "Single-celled bacterium"], answer: ["Plants", "Animals", "Single-celled bacterium"] },
    { text: "What is the process plants use to make their own food?", options: ["A. Autotrophs", "B. Heterotrophs", "C. Photosynthesis", "D. Natural selection"], answer: "C" },
    { text: "What type of environment can animals occupy?", options: ["A. Terrestrial", "B. Aquatic and Terrestrial", "C. Aquatic"], answer: "B" },
    { text: "True or false? Plants and animals have the same capacity for movement.", options: ["A. False", "B. True"], answer: "A" },
    { text: "True or false? Environments only include non-living things.", options: ["A. True", "B. False"], answer: "B" },
    { text: "What are genes made of?", options: ["A. Alleles", "B. RNA", "C. Cells", "D. DNA"], answer: "D" },
    { text: "What process encourages evolution?", options: ["A. Ecosystems", "B. Biology", "C. Photosynthesis", "D. Natural selection"], answer: "D" }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackImage = document.getElementById("feedback-image");

    feedbackImage.classList.add("d-none"); // Hide image on new question
    questionElement.innerText = questions[currentQuestion].text;
    optionsElement.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {
        let inputType = Array.isArray(questions[currentQuestion].answer) ? "checkbox" : "radio";
        optionsElement.innerHTML += `<div><input type="${inputType}" name="q${currentQuestion}" value="${option.split('. ')[1]}"> ${option}</div>`;
    });
}

function nextQuestion() {
    const feedbackImage = document.getElementById("feedback-image");
    const userAnswers = document.querySelectorAll(`input[name="q${currentQuestion}"]:checked`);
    
    // Convert selected options to an array of values
    let userResponse = Array.from(userAnswers).map(input => input.value);

    let correctAnswer = questions[currentQuestion].answer;
    let isCorrect = false;

    // Check if answer is correct (for multiple-choice and checkbox questions)
    if (Array.isArray(correctAnswer)) {
        isCorrect = JSON.stringify(userResponse.sort()) === JSON.stringify(correctAnswer.sort());
    } else {
        isCorrect = userResponse.length > 0 && userResponse[0] === correctAnswer;
    }

    // Show correct or incorrect feedback image
    feedbackImage.src = isCorrect ? "images/correctanswer.png" : "images/incorrectanswer.png";
    feedbackImage.classList.remove("d-none");

    // Increase score if correct
    if (isCorrect) {
        score++;
    }

    // Move to the next question after 2 seconds
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showFinalResult();
        }
    }, 2000);
}

    feedbackImage.classList.remove("d-none");

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showFinalResult();
        }
    }, 2000);
}

function showFinalResult() {
    const quizContainer = document.getElementById("quiz-container");
    const feedbackImage = document.getElementById("feedback-image");
    const resultText = document.getElementById("result");

    quizContainer.classList.add("d-none");
    feedbackImage.src = score >= 6 ? "images/youpassed.png" : "images/youfailed.png";
    feedbackImage.classList.remove("d-none");
    resultText.innerText = `You scored ${score}/8. ` + (score >= 6 ? "✅ You passed!" : "❌ You failed. Try again!");
    resultText.classList.add(score >= 6 ? "text-success" : "text-danger");
}

window.onload = loadQuestion;