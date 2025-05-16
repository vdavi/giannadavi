const questions = [
    { text: "True or false? Biology is the scientific study of living organisms and their origins.", options: ["True", "False"], answer: "True" },
    { text: "What do cells compose? (Check all that apply)", options: ["Plants", "Animals", "Single-celled bacterium"], answer: ["Plants", "Animals", "Single-celled bacterium"] },
    { text: "What is the process plants use to make their own food?", options: ["Autotrophs", "Heterotrophs", "Photosynthesis", "Natural selection"], answer: "Photosynthesis" },
    { text: "What type of environment can animals occupy?", options: ["Terrestrial", "Aquatic and Terrestrial", "Aquatic"], answer: "Aquatic and Terrestrial" },
    { text: "True or false? Plants and animals have the same capacity for movement.", options: ["False", "True"], answer: "False" },
    { text: "True or false? Environments only include non-living things.", options: ["True", "False"], answer: "False" },
    { text: "What are genes made of?", options: ["Alleles", "RNA", "Cells", "DNA"], answer: "DNA" },
    { text: "What process encourages evolution?", options: ["Ecosystems", "Biology", "Photosynthesis", "Natural selection"], answer: "Natural selection" }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackImage = document.getElementById("feedback-image");
    const submitButton = document.getElementById("submit-btn");
    const nextButton = document.getElementById("next-btn");

    // Reset visibility
    feedbackImage.classList.add("d-none");
    submitButton.classList.remove("d-none");
    nextButton.classList.add("d-none");

    // Load new question
    questionElement.innerText = questions[currentQuestion].text;
    optionsElement.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {
        let inputType = Array.isArray(questions[currentQuestion].answer) ? "checkbox" : "radio";
        optionsElement.innerHTML += `<div><input type="${inputType}" name="q${currentQuestion}" value="${option}"> ${option}</div>`;
    });
}

function checkAnswer() {
    const feedbackImage = document.getElementById("feedback-image");
    const submitButton = document.getElementById("submit-btn");
    const nextButton = document.getElementById("next-btn");

    const userAnswers = document.querySelectorAll(`input[name="q${currentQuestion}"]:checked`);
    let userResponse = Array.from(userAnswers).map(input => input.value);

    let correctAnswer = questions[currentQuestion].answer;
    let isCorrect = Array.isArray(correctAnswer) ? JSON.stringify(userResponse.sort()) === JSON.stringify(correctAnswer.sort()) : userResponse.length > 0 && userResponse[0] === correctAnswer;

    // Show feedback image
    feedbackImage.src = isCorrect ? "images/correctanswer.png" : "images/incorrectanswer.png";
    feedbackImage.classList.remove("d-none");

    // Increase score if correct
    if (isCorrect) {
        score++;
    }

    // Hide submit button, show next question button
    submitButton.classList.add("d-none");
    nextButton.classList.remove("d-none");
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    const quizContainer = document.getElementById("quiz-container");
    const feedbackImage = document.getElementById("feedback-image");
    const resultText = document.getElementById("result");
    const nextButton = document.getElementById("next-btn");

    quizContainer.classList.add("d-none");
    nextButton.classList.add("d-none");
    feedbackImage.src = score >= 6 ? "images/youpassed.png" : "images/youfailed.png";
    feedbackImage.classList.remove("d-none");
    resultText.innerText = `You scored ${score}/8. ` + (score >= 6 ? "✅ You passed!" : "❌ You failed. Try again!");
    resultText.classList.add(score >= 6 ? "text-success" : "text-danger");
}

// Initialize quiz
window.onload = loadQuestion;