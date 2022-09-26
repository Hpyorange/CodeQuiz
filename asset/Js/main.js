const main = document.querySelector('#main');
const title = document.createElement('h1');
const card = document.createElement('div');
const cardHeader = document.createElement('div');
const viewScore = document.createElement('a');
const timer = document.createElement('p'); // timer container
let initTime = 75;
let quizTime = initTime;
const cardContent = document.createElement('div');
const cardFooter = document.createElement('div');
let questNum = 0;
const h2Element = document.createElement('h2');
const penalty = 10;
let resultText = '';
const pElement = document.createElement('p');
let count = 0 ;

let questionArray = [
    {
      question: "Commonly used data types Do Not Include:",
      rightAnswer: "alerts",
      options: ["strings", "booleans", "alerts", "numbers"]
    },
    {
      question: "The condition in an if / else statement is enclosed with _____.",
      rightAnswer: "parenthesis",
      options: ["quotes", "curly brackets", "parenthesis", "square brackets"]
    },
    {
      question: "Arrays in JavaScript can be used to store",
      rightAnswer: "all of the above",
      options: ["numbers and strings", "other arrays", "booleans", "all of the above"]
    },
    {
      question: "String values must be enclosed within ______ when being assigned to variables",
      rightAnswer: "quotes",
      options: ["commas", "curly brackets", "quotes", "parentheses"]
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      rightAnswer: "console.log",
      options: ["JavaScript", "terminal/bash", "for loops", "console.log"]
    }
];  

card.setAttribute('class','card');


cardHeader.setAttribute('class','cardHeader');

viewScore.setAttribute('class','vScore');
viewScore.setAttribute('href','#');
viewScore.addEventListener('click',viewScores);

title.setAttribute('class','title');
title.textContent = 'Code Quiz';

viewScore.textContent = 'View high scores';

timer.textContent = `Time Remaining: ${quizTime}s`; 

cardContent.setAttribute('class','content');


main.append(title);
main.append(card);
card.append(cardHeader);
card.append(cardContent);
card.append(cardFooter);
cardHeader.append(viewScore);
cardHeader.append(timer);

function Timer() {
    quizTime--;
    timer.textContent = `Time Remaining: ${quizTime}s`;
  
    if (quizTime < 1) {
        window.clearInterval(remain);
        endQuiz();
    }
}

function firstPage(){

    const previousContent = document.querySelector('.content');
    if(previousContent){
      previousContent.remove();
    }

    quizTime = initTime;
    questNum = 0;
    timer.textContent = `Time Remaining: ${quizTime}s`;

    const firstContent = document.createElement('div');
    firstContent.setAttribute('class','content');
    card.append(firstContent);

    h2Element.textContent = `Coding Quiz Challenge`;
    firstContent.append(h2Element);
    
    pElement.textContent = `Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!`;
    pElement.setAttribute('class','text')
    firstContent.append(pElement);

    const startBtn = document.createElement('button');
    startBtn.textContent = `Start Quiz`;
    startBtn.setAttribute('class','startBtn');
    firstContent.append(startBtn);
    startBtn.addEventListener('click',start);
}

function start(){

    remain = setInterval("Timer()", 1000); 
    questionPage();
    return;

}

function questionPage(){

    const previousContent = document.querySelector('.content');
    previousContent.remove();

    const questionContent  = document.createElement('div');
    questionContent.setAttribute('class','content');
    card.append(questionContent); 
    

    h2Element.textContent = questionArray[questNum].question;
    questionContent.append(h2Element);
    h2Element.setAttribute('class','qText');

    const options = document.createElement('ul');
    options.setAttribute('class','answers');
    questionContent.append(options);

    let i = 0;
    questionArray[questNum].options.forEach(answer => {
      const liElement = document.createElement("li");
      const btn = document.createElement("button");
      btn.setAttribute("data-value", answer);
      btn.setAttribute("class", "btn");
      btn.textContent = `${i + 1}. ${answer}`;
      liElement.appendChild(btn);
      options.appendChild(liElement);
      i++;
    })

    cardFooter.setAttribute('class','footer');
    card.append(cardFooter);
    cardFooter.textContent = resultText;
    const answers = document.querySelector(".answers");
    answers.addEventListener("click", checkResult);
    return;
}

function checkResult(event){

    let userChoice = event.target;
    console.log(event);
    if (userChoice.matches("button")) {
        let choice = userChoice.getAttribute("data-value");  
        if (choice !== questionArray[questNum].rightAnswer) {
          quizTime -= penalty; 
          timer.textContent = `Time Remaining: ${quizTime}s`; 
          resultText = `😭 Oops, your previous choice is wrong. The Correct Answer is "${questionArray[questNum].rightAnswer}"`; 

        } else {
          resultText = `Correct Answer 😄`;
        }

        questNum++;

        if (questNum < questionArray.length) {
            questionPage();
        } else { 
            endQuiz();
        }
        return;
      }
}

function endQuiz(){

    window.clearInterval(remain);

    const previousContent = document.querySelector('.content');
    previousContent.remove();

    const previousFooter = document.querySelector('.footer');
    previousFooter.remove();

    const scoreContent = document.createElement('div');
    scoreContent.setAttribute('class','content');
    card.append(scoreContent); 

    h2Element.textContent = 'End of the Quiz!'
    h2Element.setAttribute('class','eqTitle')
    scoreContent.append(h2Element);

    pElement.textContent = `Your final score is ${quizTime}.`;
    pElement.setAttribute('class','eqText');
    scoreContent.append(pElement);

    const initial = document.createElement('div');
    initial.setAttribute('class','initial')
    scoreContent.append(initial);
    
    const initialText = document.createElement('p')
    initialText.textContent = 'Please enter your initial:';
    initial.append(initialText);

    const initialTextField = document.createElement("input");
    initialTextField.setAttribute('class','textField');
    initial.append(initialTextField);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = `Submit`;
    submitBtn.setAttribute('class','submitBtn');
    scoreContent.append(submitBtn);
    submitBtn.addEventListener('click',checkValue);

}

function checkValue(){
  const initial = document.querySelector('.textField');
  const initialValue = initial.value.trim();

  console.log(initialValue);

  if (!initialValue || initialValue.length === 0){

    alert('Please enter your initial ~');

  }else{

    count++;
    let highScore = `${initialValue} - ${quizTime}`;
    localStorage.setItem(initialValue, highScore);
    viewScores();
    
  }
}

function viewScores(){
  
    const previousContent = document.querySelector('.content');
    previousContent.remove();

    const viewContent = document.createElement('div');
    viewContent.setAttribute('class','content');
    card.append(viewContent);

    h2Element.textContent = 'High Scores'
    h2Element.setAttribute('class','scoreText');
    viewContent.append(h2Element);


    for (let i = 0; i < count; i++) {

      const key = localStorage.key(i);
      const highScore = localStorage.getItem(key);

      const scoreField = document.createElement('div');
      scoreField.textContent = highScore;
      viewContent.append(scoreField);
      scoreField.setAttribute('class','scoreField');

    }

    const BtnContainer = document.createElement('div');
    BtnContainer.setAttribute('class','btnC');
    viewContent.append(BtnContainer);

    const btsBtn = document.createElement('button');
    btsBtn.setAttribute('class','btn');
    btsBtn.textContent = 'Go Back';
    BtnContainer.append(btsBtn);
    btsBtn.addEventListener('click',firstPage);

    const clearBtn = document.createElement('button');
    clearBtn.setAttribute('class','btn');
    clearBtn.textContent = 'Clear High Scores';
    BtnContainer.append(clearBtn);
    clearBtn.addEventListener('click',clear);
}

function clear(){

  localStorage.clear();
  count = 0 ;
  viewScores();

}


firstPage()

console.log(main);

