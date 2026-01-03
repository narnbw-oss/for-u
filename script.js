/* PAGE SWITCHER */
function goTo(num){
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById("page" + num).style.display = "block";

    if(num === 2) startGame();
    if(num === 5) startTypewriter();
}

/* CLICK + VIBRATE */
function playClick(){
    const click = new Audio("click.b.m4a");
    click.play();
    if(navigator.vibrate) navigator.vibrate(80);
}

/* BGM FADE-IN */
document.addEventListener("click", () => {
    const bgm = document.getElementById("bgm");
    if(bgm.paused){
        bgm.volume = 0;
        bgm.play();
        let fade = setInterval(() => {
            if(bgm.volume < 1){
                bgm.volume = Math.min(bgm.volume + 0.05,1);
            } else clearInterval(fade);
        },150);
    }
});

/* MEMORY GAME */
const icons = ["❤️","❤️","⭐","⭐","⚪","⚪","💖","💖","🌸","🌸","✨","✨"];
let firstCard=null, secondCard=null, lockBoard=false, moves=0;

function startGame(){
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";
    moves=0;
    document.getElementById("moves").innerText = "Moves: 0";
    firstCard=null;
    secondCard=null;
    lockBoard=false;
    document.getElementById("nextBtn").disabled = true;

    let shuffled = [...icons].sort(()=>Math.random()-0.5);
    shuffled.forEach(icon=>{
        let card=document.createElement("div");
        card.className="card";
        card.dataset.value=icon;
        card.innerText="?";
        card.onclick=()=>flip(card);
        board.appendChild(card);
    });
}

function flip(card){
    if(lockBoard || card===firstCard) return;
    card.innerText=card.dataset.value;
    card.classList.add("flipped");
    if(!firstCard){ firstCard=card; return; }

    moves++;
    document.getElementById("moves").innerText="Moves: "+moves;
    secondCard=card;
    checkMatch();
}

function checkMatch(){
    if(firstCard.dataset.value===secondCard.dataset.value){
        firstCard.onclick=null;
        secondCard.onclick=null;
        const allFlipped=Array.from(document.querySelectorAll(".card")).every(c=>c.classList.contains("flipped"));
        if(allFlipped) document.getElementById("nextBtn").disabled=false;
        resetTurn();
    } else {
        lockBoard=true;
        setTimeout(()=>{
            firstCard.innerText="?";
            secondCard.innerText="?";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        },350);
    }
}

function resetTurn(){ [firstCard,secondCard,lockBoard]=[null,null,false]; }

/* TYPEWRITER */
const typewriterText = " We’re already close, and I’m comfortable being here with you. I enjoy talking to you, the way we connect, and I don’t want to step away from that. I know you don’t want a relationship, and you’ve been honest about that from the start. I accept it not because I have to, but because I genuinely want to be here with you, in the way you’re comfortable with. I want to be close to you. To talk every day, to laugh together, to care about each other even without a label, without a title, without calling it a relationship. I’m not holding my feelings back or pretending this means nothing. I’m choosing to stay close because that’s what I want, simply and honestly. And this website isn’t meant to prove anything. It’s just my way of showing that my feelings and my effort are real. I built it from scratch, just for you, because this closeness truly means something to me." ;
function startTypewriter(){
    const el = document.getElementById("typewriter");
    el.innerText = "";
    let i = 0;
    const interval = setInterval(()=>{
        if(i < typewriterText.length){
            el.innerText += typewriterText.charAt(i);
            i++;
        } else clearInterval(interval);
    },50);
}