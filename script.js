const questions = [
    {
        question: "Which is the smallest ocean in the world ?",
        answers: [
            { text: "Indian", correct: false },
            { text: "Arctic", correct: true },
            { text: "Atlantic", correct: false },
            { text: "Pacific", correct: false },
        ]
    },
    {
        question: "In which ocean 'Beramuda Triangle' is Located ?",
        answers: [
            { text: "Atlantic", correct: true },
            { text: "Indian", correct: false },
            { text: "Pacific", correct: false },
            { text: "Arctic", correct: false },
        ]
    },
    {
        question: "Which country is known as 'Land of Rising Sun' ?",
        answers: [
            { text: "USA", correct: false },
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "India", correct: false },
        ]
    },
    {
        question: "Which is the largest continent in the world ?",
        answers: [
            { text: "Asia", correct: true },
            { text: "Australia", correct: false },
            { text: "Africa", correct: false },
            { text: "Arctic", correct: false },
        ]
    },
    {
        question: "Which is longest river in the world ?",
        answers: [
            { text: "Great Ganga", correct: false },
            { text: "Niger", correct: false },
            { text: "Amazon", correct: false },
            { text: "Nile", correct: true },
        ]
    },
    {
        question: "Which is largest flower in the world ?",
        answers: [
            { text: "Rafflesia", correct: true },
            { text: "Jasmine", correct: false },
            { text: "Balloon Flower", correct: false },
            { text: "Camellia", correct: false },
        ]
    },
    {
        question: "Which is the 29th state of India ?",
        answers: [
            { text: "Uttarakhand", correct: false },
            { text: "Telangana", correct: true },
            { text: "Uttar Pradesh", correct: false },
            { text: "Madhya Pradesh", correct: false },
        ]
    },
    {
        question: "Which state has the longest coastal line in India ?",
        answers: [
            { text: "Gujarat", correct: true },
            { text: "Kerala", correct: false },
            { text: "Karnataka", correct: false },
            { text: "West Bengal", correct: false },
        ]
    },
    {
        question: "On which river the Uri dam is constructed ?",
        answers: [
            { text: "Jhalam", correct: true },
            { text: "Beas", correct: false },
            { text: "Sutlej", correct: false },
            { text: "Ganga", correct: false },
        ]
    },
    {
        question: "Which is the highest dam of India ?",
        answers: [
            { text: "Rihand Dam", correct: false },
            { text: "Mettur Dam", correct: false },
            { text: "Sardar Sarovar Dam", correct: false },
            { text: "Tehri Dam", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() { 
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { 
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();