const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
    ],
  },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersCont = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const playAgain = document.querySelector(".play");
var bg = document.querySelector(".bg-img");

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selAnswer;

const showRes = ()=>{
  resultScreen.style.display = "flex";
  gameScreen.style.display = "none";

  resultScreen.querySelector(".correct").textContent = `Correct Answers: ${correctCount}`;
  resultScreen.querySelector(".wrong").textContent = `Wrong Answers: ${wrongCount}`;
  total < 0 ? resultScreen.querySelector(".score").textContent = `Score: 0`: resultScreen.querySelector(".score").textContent = `Score: ${total}`;
  if (wrongCount === 0){
    swal({
      title: "What a genius!",
      text : "You got a perfect score!",
      button: "Nice!"
    });
  }
}

const showQ = (qNumber) => {
  if(qIndex === data.length) return showRes();
  question.textContent = data[qNumber].question;
  answersCont.innerHTML = data[qNumber].answers
    .map(
      //"item" representa en este caso "answers" e "index" representa en que puesto del array se esta fijando
      (item, index) =>
        `
      <div class="answer">
        <input type="radio" class="answerCirculito" name="answer" 
        id="${index}" value="${item.isCorrect}">
        <label for="${index}">${item.answer}</label>
      </div>
      `
    )
    .join("");
  selectAns();
};


const selectAns = () => {
  answersCont.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      selAnswer = e.target.value;
      console.log(selAnswer);
    });
  });
};

function sub() {
  submit.addEventListener("click", () => {
    if (selAnswer !== undefined) {
      selAnswer === "true" ? correctCount++ : wrongCount++;
      total = (correctCount - wrongCount) * 10 ;
      qIndex++;
      showQ(qIndex);
    }else swal({
      title: "Please Select an Answer",
      icon: "warning",
      button: "Ok"
    });
    if(qIndex === 2){
      gameScreen.querySelector(".question").style.fontSize = "35px";
    }

  });
}



document.addEventListener("mousemove", function (e) {
  var movingVal = 5;
  var x = (e.clientX * movingVal) / 250;
  var y = (e.clientY * movingVal) / 250;

  bg.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
});

const reload = ()=>{
  playAgain.addEventListener("click", ()=>{
    location.reload();
  });
}


// funciones para el header


const burg = document.querySelector(".burg");
const burgMenu = document.querySelector(".burgMenu");


function menuBase(){
    burg.innerHTML = 
    `
    <img src="../img/mebnu.svg" alt="">
    `
}


function toggleMenu(){
    if(burg.classList.contains('open')) {
        // If menu is open, close it
        burg.style.transform = "translateX(0)";
        menuBase(); // Restore the original menu icon
        burg.classList.remove('open');
        burgMenu.style.right = "-20vw";
    } else {
        // If menu is closed, open it
        burg.style.transform = "translateX(-11vw) rotate(180deg)";
        burg.innerHTML = 
        `
        <img src="../img/x.svg" alt="">
        `
        burg.classList.add('open');
        burgMenu.style.right = "0";
    }
}


burg.addEventListener("click", toggleMenu); 
menuBase();
showQ(qIndex);
sub();
reload();
