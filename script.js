// ================= CONFIG =================

const config = window.VALENTINE_CONFIG || {};

let firstYesDone = false;
let maxTriggered = false;


// ================= TITLE =================

document.title = config.pageTitle || "For You ❤️";


// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("valentineTitle").textContent =
        `${config.valentineName || "My Love"}, my love...`;


    document.getElementById("question1Text").textContent =
        "Hey Arya 💖, This is Adarsh... Will you be my Valentine? 😘";

    document.getElementById("yesBtn1").textContent = "Yes";
    document.getElementById("noBtn1").textContent = "No";


    document.getElementById("question2Text").textContent =
        "How much do you love me? 😘";

    document.getElementById("startText").textContent =
        "Love Meter";

    document.getElementById("nextBtn").textContent = "Next";


    document.getElementById("question3Text").textContent =
        "So… Will you be mine forever? ❤️";

    document.getElementById("yesBtn3").textContent = "Yes 💖";
    document.getElementById("noBtn3").textContent = "No 😜";


    createFloatingElements();
    setupMusicPlayer();
    initLoveMeter();
});


// ================= FLOATING =================

function createFloatingElements() {

    const container = document.querySelector(".floating-elements");
    if (!container) return;

    ["❤️","💖","💕","💘"].forEach(h => {

        const div = document.createElement("div");
        div.className = "heart";
        div.innerHTML = h;

        setRandomPosition(div);
        container.appendChild(div);
    });
}


function setRandomPosition(el) {

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDelay = Math.random() * 3 + "s";
    el.style.animationDuration =
        10 + Math.random() * 15 + "s";
}


// ================= NAVIGATION =================

function showNextQuestion(num) {

    document.querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    document.getElementById(`question${num}`)
        ?.classList.remove("hidden");
}


// ================= NO MOVE =================

function moveButton(btn) {

    const pad = 80;

    const x =
        Math.random() * (window.innerWidth - pad*2) + pad;

    const y =
        Math.random() * (window.innerHeight - pad*2) + pad;

    btn.style.transition =
        "all 0.35s cubic-bezier(0.68,-0.55,0.27,1.55)";

    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";

    btn.style.transform = "scale(1.1) rotate(4deg)";

    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 200);
}


// ================= LOVE METER =================

let loveMeter, loveValue, extraLove;

function initLoveMeter() {

    loveMeter = document.getElementById("loveMeter");
    loveValue = document.getElementById("loveValue");
    extraLove = document.getElementById("extraLove");

    if (!loveMeter) return;


    loveMeter.value = 100;
    loveValue.textContent = 100;


    loveMeter.addEventListener("input", () => {

        const value = +loveMeter.value;

        loveValue.textContent = value;


        // Glow
        const p = value / 10000;

        loveMeter.style.boxShadow =
            `0 0 ${15+p*50}px rgba(255,23,68,1),
             0 0 ${25+p*70}px rgba(255,128,171,1)`;


        shakeScreen(p);


        // Text
        if (value > 100 && extraLove) {

            extraLove.classList.remove("hidden");

            if (value >= 9000) {
                extraLove.textContent = "MAX LOVE 💍🔥";
                extraLove.classList.add("super-love");
            }
            else if (value >= 5000) {
                extraLove.textContent = "Too Much Love 😍";
            }
            else {
                extraLove.textContent = "More Than 100% 😘";
            }

        } else if (extraLove) {
            extraLove.classList.add("hidden");
        }


        // FINAL MODE
        if (value >= 10000 && !maxTriggered) {

            maxTriggered = true;

            startFinalExplosion();
        }

        if (value < 9800) maxTriggered = false;
    });
}


// ================= FINAL EXPLOSION =================

function startFinalExplosion() {

    slowMotion();
    shockwave();
    particleStorm();
    fireworks();
}


// Time slow + zoom
function slowMotion() {

    document.body.style.transition = "transform 0.4s ease";
    document.body.style.transform = "scale(1.05)";

    document.body.style.filter = "brightness(1.2)";

    setTimeout(() => {

        document.body.style.transform = "scale(1)";
        document.body.style.filter = "none";

    }, 600);
}


// Shockwave ring
function shockwave() {

    const wave = document.createElement("div");

    wave.style.position = "fixed";
    wave.style.left = "50%";
    wave.style.top = "50%";

    wave.style.width = "20px";
    wave.style.height = "20px";

    wave.style.border =
        "3px solid rgba(255,60,120,0.9)";

    wave.style.borderRadius = "50%";
    wave.style.transform = "translate(-50%,-50%)";

    wave.style.zIndex = 99999;

    document.body.appendChild(wave);


    wave.animate([
        { transform:"translate(-50%,-50%) scale(1)", opacity:1 },
        { transform:"translate(-50%,-50%) scale(40)", opacity:0 }
    ],{
        duration:900,
        easing:"ease-out"
    });

    setTimeout(()=>wave.remove(),900);
}


// Hearts + sparkles
function particleStorm() {

    for(let i=0;i<120;i++){

        const p = document.createElement("div");

        p.innerHTML = Math.random()>0.5?"💖":"✨";

        p.style.position="fixed";
        p.style.left="50%";
        p.style.top="50%";

        p.style.pointerEvents="none";
        p.style.zIndex=9999;

        document.body.appendChild(p);


        const x=(Math.random()-0.5)*800;
        const y=(Math.random()-0.5)*600;

        p.animate([
            {transform:"scale(1)",opacity:1},
            {transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}
        ],{
            duration:1000,
            easing:"ease-out"
        });

        setTimeout(()=>p.remove(),1000);
    }
}


// Fireworks
function fireworks(){

    for(let i=0;i<6;i++){

        setTimeout(()=>{

            particleStorm();

        },i*250);
    }
}


// Shake
function shakeScreen(p=0.3){

    const c=document.querySelector(".container");
    if(!c)return;

    const i=2+p*7;

    c.style.transform=
        `translate(${Math.random()*i-i/2}px,
                   ${Math.random()*i-i/2}px)`;

    setTimeout(()=>{
        c.style.transform="translate(0,0)";
    },40);
}


// ================= MUSIC =================

function setupMusicPlayer(){

    const t=document.getElementById("musicToggle");
    const bg=document.getElementById("bgMusic");

    if(!bg)return;

    t?.addEventListener("click",()=>{

        if(bg.paused) bg.play();
        else bg.pause();
    });
}


// ================= YES =================

function handleYesClick(){

    if(!firstYesDone){

        firstYesDone=true;

        particleStorm();
        shakeScreen(1);
    }

    showNextQuestion(2);
}


// ================= CELEBRATION =================

function celebrate(){

    document
        .querySelectorAll(".question-section")
        .forEach(q=>q.classList.add("hidden"));

    const c=document.getElementById("celebration");
    if(!c)return;

    c.classList.remove("hidden");


    document.getElementById("celebrationTitle").textContent=
        "I Love You Arya ❤️";

    document.getElementById("celebrationMessage").textContent=
        "You made Adarsh the happiest 💖";

    document.getElementById("celebrationEmojis").textContent=
        "💍💘🥰💕✨";


    startFinalExplosion();
}


// ================= NO =================

const noMessages=[
 "Think again 🤔",
 "You love me 💕",
 "No chance 😏",
 "Try harder 😜",
 "Okay fine ❤️"
];

let noIndex=0,noTry=0;


function positionBubble(btn,b){

    const r=btn.getBoundingClientRect();

    b.style.left=r.left+r.width/2+"px";
    b.style.top=r.bottom+10+"px";
}


function showBubble(b,m){

    b.textContent=m;

    b.classList.remove("hidden");
    b.classList.add("show");

    clearTimeout(window.noTimer);

    window.noTimer=setTimeout(()=>{

        b.classList.remove("show");
        b.classList.add("hidden");

    },2000);
}


function handleNoClick(e){

    const btn=e.target;
    const b=document.getElementById("noMessageBubble");

    noTry++;


    if(noTry>=5){

        btn.textContent="Okay Yes ❤️";
        btn.onclick=()=>handleYesClick();

        showBubble(b,"I knew it 😜❤️");

        return;
    }


    moveButton(btn);


    const msg=noMessages[noIndex%noMessages.length];
    noIndex++;

    positionBubble(btn,b);
    showBubble(b,msg);
}
