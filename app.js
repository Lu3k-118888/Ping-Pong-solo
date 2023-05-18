/*----  Declaring Variables ------------------------------------------*/
var Rod1=document.getElementById("rod-1");
var Rod2=document.getElementById("rod-2");
var ball=document.getElementById("ball");
var movement=30;
const thisRod1="Rod 1";
const thisRod2="Rod 2";
const storeName="abc";
const storeScore=0;
let whichBar;
let moveX=2;
let moveY=2;
let ballMoving;
let border=12;
let score;
let highScore;
let gameStart=false;
localStorage.setItem(storeScore,"null");
localStorage.setItem(storeScore,"null");
var sc = document.getElementById('score1');
/*-----  function for  alert   messages  ---------------------------*/
(function(){
    highScore=localStorage.getItem(storeScore);
    whichBar=localStorage.getItem(storeName);
    if(whichBar==="null" || highScore==="null"){
        alert("The Game Starts....");
        highScore=0;
        whichBar=thisRod1;
    }
    else{
        alert(whichBar + " has maximum score of " + highScore*100);
    }
    gameReset(whichBar);
})();
/*-----  function for Game Start or Reset ---------------------------*/
function gameReset(barName){
    Rod1.style.left=((window.innerWidth-Rod1.offsetWidth)/2)+"px";
    Rod2.style.left=((window.innerWidth-Rod2.offsetWidth)/2)+"px";
    ball.style.left=((window.innerWidth-ball.offsetWidth)/2)+"px";
    if(barName === thisRod1){
        ball.style.top=Rod2.getBoundingClientRect().y-Rod2.getBoundingClientRect().height+"px";
        moveY=-2;
    }
    else if(barName === thisRod2){
        ball.style.top=Rod1.getBoundingClientRect().height+"px";
        moveY=2;       
    }
    score=0;
    gameStart=false;
}
/*----------   setting up key controls for playing ------------------*/
document.addEventListener('keydown',function(event){
    if(event.keyCode==68 || event.keyCode==39){
        if(parseInt(Rod1.style.left)<(window.innerWidth-Rod1.offsetWidth-border)){
            Rod1.style.left=parseInt(Rod1.style.left)+movement+'px';
            Rod2.style.left=Rod1.style.left;
        };
    };
    if(event.keyCode==65 || event.keyCode==37){
        
        if(parseInt(Rod1.style.left)>border){
            Rod1.style.left=parseInt(Rod1.style.left)-movement+'px';
            Rod2.style.left=Rod1.style.left;
        };
    };
    if(event.keyCode==13){
        
        if(!gameStart){
            gameStart=true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY=ballRect.y;
            let ballDia=ballRect.width;
            let Rod1Height=Rod1.offsetHeight;
            let Rod2Height=Rod2.offsetHeight;
            let Rod1Width=Rod2.offsetWidth;
            let Rod2Width=Rod2.offsetWidth;
            ballMoving = setInterval(function(){
            
                let Rod1X=Rod1.getBoundingClientRect().x;
                let Rod2X=Rod2.getBoundingClientRect().x;
                let ballCentre=ballX+ballDia/2;
                ballX+=moveX;
                ballY+=moveY;
                ball.style.left=ballX+"px";
                ball.style.top=ballY+"px";
                if(((ballX+ballDia)>window.innerWidth) || (ballX<0)){
                    moveX=-moveX;
                }
                if(ballY<=Rod1Height){
                    moveY=-moveY;
                    score++;
                    if((ballCentre<Rod1X) || (ballCentre>(Rod1X+Rod1Width))){
                        dataStoring(score,thisRod2);
                    }
                }
                if((ballY+ballDia)>=(window.innerHeight-Rod2Height)){
                    moveY=-moveY;
                    score++;
                    sc.innerHTML=highScore;
                    if((ballCentre<Rod2X) || (ballCentre>(Rod2X+Rod2Width))){
                        dataStoring(score,thisRod1);
                    }
                }  
            }, 10);
        }
    }
});
/*  function for data storing   and score Management----------------*/
function dataStoring(scoreObtained,winningBar){
    if(score>highScore){
        highScore=score;
        localStorage.setItem(storeName,winningBar);
        localStorage.setItem(storeScore,highScore);
    }
    clearInterval(ballMoving);
    gameReset(winningBar);
    alert(winningBar+" wins with score of "+(scoreObtained*100)+". Max Score is: "+(highScore*100));
}


 
