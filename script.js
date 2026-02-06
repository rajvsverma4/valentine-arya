// ================= CONFIG =================

const config = window.VALENTINE_CONFIG || {};

let sparkleTimer = null;
let firstYesDone = false;


// ================= TITLE =================

document.title = config.pageTitle || "For You ❤️";


// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("valentineTitle").textContent =
        `${config.valentineName || "My Love"}, my love...`;


    // Q1
    document.getElementById("question1Text").textContent =
        "Hey Arya 💖, This is Adarsh... Will you be my Valentine? 😘";

    document.getElementById("yesBtn1").textContent = "Yes";
    document.getElementById("noBtn1").textContent = "No";


    // Q2
    document.getElementById("question2Text").textContent =
        config.questions?.second?.text || "How much do you love me? 😘";

    document.getElementById("startText").textContent =
        config.questions?.second?.startText || "Love Meter";

    document.getElementById("nextBtn").textContent = "Next";


    // Q3
    document.getElementById("question3Text").textContent =
        config.questions?.third?.text || "So… Will you be mine forever? ❤️";

    document.getElementById("yesBtn3").textContent = "Yes 💖";
    document.getElementById("noBtn3").textContent = "No 😜";


    createFloatingElements();
    setupMusicPlayer();
    initLoveMeter();
    initSparkles();
    initGlitter();
});


// ================= FLOATING =================

function createFloatingElements() {

    const container = document.querySelector(".floating-elements");
    if (!container) return;

    (config.floatingEmojis?.hearts || ["❤️","💖","💕"]).forEach(h => {

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

    document
        .querySelectorAll(".question-section")
        .forEach(q => {
            q.classList.add("hidden");
            q.style.display = "none";
        });

    const next = document.getElementById(`question${num}`);

    if (next) {
        next.classList.remove("hidden");
        next.style.display = "block";
    }
}


// ================= NO MOVE =================

function moveButton(btn) {

    if (!btn) return;

    const padding = 80;

    const maxX =
        window.innerWidth - btn.offsetWidth - padding;

    const maxY =
        window.innerHeight - btn.offsetHeight - padding;

    const minX = padding;
    const minY = padding;

    const x =
        Math.random() * (maxX - minX) + minX;

    const y =
        Math.random() * (maxY - minY) + minY;


    btn.style.transition =
        "all 0.35s cubic-bezier(0.68,-0.55,0.27,1.55)";

    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";

    btn.style.transform = "scale(1.1) rotate(3deg)";

    setTimeout(() => {
        btn.style.transform = "scale(1) rotate(0deg)";
    }, 200);
}


// ================= LOVE METER =================

let loveMeter, loveValue, extraLove;
let maxTriggered = false;

function initLoveMeter() {

    loveMeter = document.getElementById("loveMeter");
    loveValue = document.getElementById("loveValue");
    extraLove = document.getElementById("extraLove");

    if (!loveMeter) return;


    loveMeter.value = 100;
    loveValue.textContent = 100;


    loveMeter.addEventListener("input", e => {

        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;


        // Glow
        const power = value / 10000;

        loveMeter.style.boxShadow =
            `0 0 ${15 + power*40}px rgba(255,23,68,1),
             0 0 ${25 + power*60}px rgba(255,128,171,1)`;


        // Shake always
        shakeScreen(power);


        // Sparkles
        spawnSparkle(e.clientX, e.clientY);


        // Messages
        if (value > 100 && extraLove) {

            extraLove.classList.remove("hidden");

            if (value >= 9000) {
                extraLove.textContent = "MAX LOVE MODE 💍🔥❤️";
                extraLove.classList.add("super-love");
            }
            else if (value >= 5000) {
                extraLove.textContent = "Too Much Love 😍💖";
                extraLove.classList.remove("super-love");
            }
            else {
                extraLove.textContent = "More Than 100% 😘";
                extraLove.classList.remove("super-love");
            }

        } else if (extraLove) {

            extraLove.classList.add("hidden");
            extraLove.textContent = "";
        }


        // Max
        if (value >= 10000 && !maxTriggered) {

            maxTriggered = true;

            flashScreen();
            ultraLoveExplosion();
        }

        if (value < 9800) maxTriggered = false;
    });
}


// ================= EFFECTS =================


// Screen shake
function shakeScreen(power = 0.2) {

    const c = document.querySelector(".container");

    if (!c) return;

    const i = 2 + power * 8;

    c.style.transform =
        `translate(${Math.random()*i-i/2}px,
                   ${Math.random()*i-i/2}px)`;

    setTimeout(() => {
        c.style.transform = "translate(0,0)";
    }, 40);
}


// Flash
function flashScreen() {

    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = "100%";
    flash.style.height = "100%";

    flash.style.background = "rgba(255,180,200,0.8)";
    flash.style.zIndex = 99999;

    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 150);
}


// Sparkles
function spawnSparkle(x, y) {

    if (!x || !y) return;

    const s = document.createElement("div");

    s.innerHTML = "✨";

    s.style.position = "fixed";
    s.style.left = x + "px";
    s.style.top = y + "px";

    s.style.pointerEvents = "none";
    s.style.zIndex = 9999;

    s.style.fontSize = "14px";

    document.body.appendChild(s);


    s.animate([
        { transform: "scale(1)", opacity: 1 },
        { transform: "translateY(-30px) scale(0)", opacity: 0 }
    ], {
        duration: 600,
        easing: "ease-out"
    });

    setTimeout(() => s.remove(), 600);
}


// Glitter background
function initGlitter() {

    setInterval(() => {

        const g = document.createElement("div");

        g.innerHTML = "✨";

        g.style.position = "fixed";
        g.style.left = Math.random()*100+"vw";
        g.style.top = "-20px";

        g.style.opacity = "0.4";
        g.style.fontSize = "10px";
        g.style.pointerEvents = "none";

        document.body.appendChild(g);


        g.animate([
            { transform: "translateY(0)", opacity: 0.4 },
            { transform: "translateY(110vh)", opacity: 0 }
        ], {
            duration: 8000,
            easing: "linear"
        });

        setTimeout(() => g.remove(), 8000);

    }, 400);
}


// Sparkle on buttons
function initSparkles() {

    document.querySelectorAll("button").forEach(btn => {

        btn.addEventListener("mouseenter", e => {

            spawnSparkle(
                e.clientX,
                e.clientY
            );
        });
    });
}


// Mini burst on first YES
function miniYesExplosion(btn) {

    const r = btn.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {

        const h = document.createElement("div");

        h.innerHTML = "💖";

        h.style.position = "fixed";
        h.style.left = r.left + r.width/2 + "px";
        h.style.top = r.top + r.height/2 + "px";

        h.style.pointerEvents = "none";

        document.body.appendChild(h);


        const x = (Math.random()-0.5)*200;
        const y = (Math.random()-0.5)*200;

        h.animate([
            { transform:"scale(1)", opacity:1 },
            { transform:`translate(${x}px,${y}px) scale(0)`, opacity:0 }
        ],{
            duration:700,
            easing:"ease-out"
        });

        setTimeout(()=>h.remove(),700);
    }
}


// ================= MUSIC =================

function setupMusicPlayer() {

    const toggle = document.getElementById("musicToggle");
    const bg = document.getElementById("bgMusic");

    if (!config.music?.enabled) return;

    if (bg) {

        bg.src = config.music.musicUrl;
        bg.volume = config.music.volume || 0.5;

        if (config.music.autoplay) {
            bg.play().catch(() => {});
        }
    }

    toggle?.addEventListener("click", () => {

        if (!bg) return;

        if (bg.paused) bg.play();
        else bg.pause();
    });
}


// ================= YES FLOW =================

function handleYesClick() {

    if (!firstYesDone) {

        firstYesDone = true;

        miniYesExplosion(
            document.getElementById("yesBtn1")
        );

        flashScreen();
        shakeScreen(0.6);
    }

    showNextQuestion(2);
}


function goToFinal() {
    showNextQuestion(3);
}


function finalYes() {

    flashScreen();
    shakeScreen(1);

    celebrate();
}


// ================= CELEBRATION =================

function celebrate() {

    document
        .querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    const c = document.getElementById("celebration");
    if (!c) return;

    c.classList.remove("hidden");


    document.getElementById("celebrationTitle").textContent =
        "I Love You Arya ❤️";

    document.getElementById("celebrationMessage").textContent =
        "You just made Adarsh the happiest person 💖";

    document.getElementById("celebrationEmojis").textContent =
        "💍💘🥰💕✨";

    ultraLoveExplosion();
}


// ================= NO =================

const noMessages = [
    "Think about it twice! 🤔",
    "I know your heart doesn't say no 💕",
    "Are you sure? 😏",
    "Come on 😜",
    "You love me ❤️"
];

let noIndex = 0;
let noTryCount = 0;


function positionBubble(btn, bubble) {

    const r = btn.getBoundingClientRect();

    bubble.style.left =
        r.left + r.width/2 + "px";

    bubble.style.top =
        r.bottom + 10 + "px";

    bubble.style.transform = "translateX(-50%)";
}


function showBubble(bubble, msg) {

    bubble.textContent = msg;

    bubble.classList.remove("hidden");
    bubble.classList.add("show");


    clearTimeout(window.noMsgTimer);

    window.noMsgTimer = setTimeout(() => {

        bubble.classList.remove("show");
        bubble.classList.add("hidden");
        bubble.textContent = "";

    }, 2000);
}


function handleNoClick(event) {

    const btn = event.target;

    const bubble =
        document.getElementById("noMessageBubble");

    noTryCount++;


    if (noTryCount >= 5) {

        btn.style.position = "static";
        btn.textContent = "Okay… Yes ❤️";

        btn.onclick = () => handleYesClick();


        if (bubble) {

            positionBubble(btn, bubble);

            showBubble(
                bubble,
                "Haha 😜 I knew it! ❤️"
            );
        }

        return;
    }


    moveButton(btn);


    if (!bubble) return;


    const msg =
        noMessages[noIndex % noMessages.length];

    noIndex++;


    positionBubble(btn, bubble);

    showBubble(bubble, msg);
}
