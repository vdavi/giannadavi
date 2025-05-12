function checkAnswer(answer) {
    if (answer === 'A') {
        document.getElementById("result").innerText = "Correct! Plants use photosynthesis.";
    } else {
        document.getElementById("result").innerText = "Try again!";
    }
}

/*
git init
git remote add origin {remote_repository_url}
git add .
git commit -m "Initial commit"
git push -u origin main
*/