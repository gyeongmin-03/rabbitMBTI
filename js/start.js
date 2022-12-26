const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = {
  'E' : 0,
  'I' : 0,
  'N' : 0,
  'S' : 0,
  'F': 0,
  'T' : 0,
  'P' : 0,
  'J': 0,
};

function start() {
  document.getElementById('mButton').setAttribute('disabled', 'true')
  begin()
}


function calResult(){
  console.log(select);
  if(select['E'] > select['I']){
    var EnI = 'E';
  } else{
    var EnI = 'I';
  }
  if(select['F'] > select['T']){
    var FnT = 'F';
  } else{
    var FnT = 'T';
  }
  if(select['N'] > select['S']){
    var NnS = 'N';
  } else{
    var NnS = 'S';
  }
  if(select['P'] > select['J']){
    var PnJ = 'P';
  } else{
    var PnJ = 'J';
  }
  
  var result = EnI + NnS + FnT + PnJ;
  return result;
}



function setResult(){
  
  if(calResult() === 'ISFP' || calResult() === 'INFP'){
    var r = '1';
  } else if(calResult() === 'ISTJ' || calResult() === 'INTJ'){
    var r = '2';
  } else if(calResult() === 'ISFJ' || calResult() === 'INFJ'){
    var r = '3';
  } else if(calResult() === 'ESTJ' || calResult() === 'ENTJ'){
    var r = '4';
  } else if(calResult() === 'ISTP' || calResult() === 'INTP'){
    var r = '5';
  } else if(calResult() === 'ENTP' || calResult() === 'ESTP'){
    var r = '6';
  } else if(calResult() === 'ENFP' || calResult() === 'ESFP'){
    var r = '7';
  } else if(calResult() === 'ESFJ' || calResult() === 'ENFJ'){
    var r = '8';
  }



  const imgDiv = document.querySelector('#resultImg');
  var imgURL ='./mbtiHTML/'   + r + '.html';
  imgDiv.href = imgURL;

}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    // setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-4');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.3s";
      children[i].style.animation = "fadeOut 0.3s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    },250)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 0.6s";
  main.style.animation = "fadeOut 0.6s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 0.6s";
    qna.style.animation = "fadeIn 0.6s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 300)
    let qIdx = 0;
    goNext(qIdx);
  }, 300);
}
