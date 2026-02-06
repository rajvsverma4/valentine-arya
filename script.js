// ================= CONFIG =================

const config = window.VALENTINE_CONFIG || {};


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


// ================= LOVE METER (FIXED) =================

let loveMeter, loveValue, extraLove;

function initLoveMeter() {

    loveMeter = document.getElementById("loveMeter");
    loveValue = document.getElementById("loveValue");
    extraLove = document.getElementById("extraLove");

    if (!loveMeter) return;

    // Initial
    loveMeter.value = 100;
    loveValue.textContent = 100;

    if (extraLove) {
        extraLove.classList.add("hidden");
        extraLove.textContent = "";
    }


    // Live update
    loveMeter.addEventListener("input", () => {

        const value = parseInt(loveMeter.value);

        loveValue.textContent = value;


        // Over 100% reactions 💖
        if (value > 100 && extraLove) {

            extraLove.classList.remove("hidden");

            if (value >= 8000) {

                extraLove.textContent = "Infinity Love 💍❤️";
                extraLove.classList.add("super-love");

            } else if (value >= 3000) {

                extraLove.textContent = "Too Much Love 😍💖";
                extraLove.classList.remove("super-love");

            } else {

                extraLove.textContent = "More Than 100% 😘";
                extraLove.classList.remove("super-love");
            }

        } else if (extraLove) {

            extraLove.classList.add("hidden");
            extraLove.textContent = "";
            extraLove.classList.remove("super-love");
        }


        // Feedback animation
        loveMeter.style.transform = "scale(1.02)";

        setTimeout(() => {
            loveMeter.style.transform = "scale(1)";
        }, 120);
    });
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

// Q1 -> Q2
function handleYesClick() {
    showNextQuestion(2);
}


// Q2 -> Q3
function goToFinal() {
    showNextQuestion(3);
}


// Q3 -> Celebration
function finalYes() {
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

    createHeartExplosion();
}


// ================= HEARTS =================

function createHeartExplosion() {

    const container =
        document.querySelector(".floating-elements");

    if (!container) return;


    for (let i = 0; i < 50; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "💖";
        heart.className = "heart";

        container.appendChild(heart);

        setRandomPosition(heart);
    }
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


// Bubble position
function positionBubble(btn, bubble) {

    const rect = btn.getBoundingClientRect();

    bubble.style.left =
        rect.left + rect.width / 2 + "px";

    bubble.style.top =
        rect.bottom + 10 + "px";

    bubble.style.transform = "translateX(-50%) scale(1)";
}


// Bubble show
function showBubble(bubble, msg) {

    bubble.textContent = msg;

    bubble.classList.remove("hidden");
    bubble.classList.add("show");

    bubble.style.transform = "translateX(-50%) scale(1.05)";

    setTimeout(() => {
        bubble.style.transform = "translateX(-50%) scale(1)";
    }, 200);


    clearTimeout(window.noMsgTimer);

    window.noMsgTimer = setTimeout(() => {

        bubble.classList.remove("show");
        bubble.classList.add("hidden");
        bubble.textContent = "";

    }, 2000);
}


// Handle No
function handleNoClick(event) {

    const btn = event.target;

    const bubble =
        document.getElementById("noMessageBubble");

    noTryCount++;


    // Surrender ❤️
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


    // Normal move
    moveButton(btn);


    if (!bubble) return;


    const msg =
        noMessages[noIndex % noMessages.length];

    noIndex++;


    positionBubble(btn, bubble);

    showBubble(bubble, msg);
}
