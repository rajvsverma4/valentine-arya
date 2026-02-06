// ================= CONFIG =================

const config = window.VALENTINE_CONFIG || {};


// ================= TITLE =================

document.title = config.pageTitle || "For You ❤️";


// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("valentineTitle").textContent =
        `${config.valentineName || "My Love"}, my love...`;


    // -------- Q1 (Custom Intro) --------

    document.getElementById("question1Text").textContent =
        "Hey Arya 💖, This is Adarsh... Will you be my Valentine? 😘";

    document.getElementById("yesBtn1").textContent =
        config.questions?.first?.yesBtn || "Yes";

    document.getElementById("noBtn1").textContent =
        config.questions?.first?.noBtn || "No";

    document.getElementById("secretAnswerBtn").textContent =
        config.questions?.first?.secretAnswer || "Click Me";


    // -------- Q2 --------

    document.getElementById("question2Text").textContent =
        config.questions?.second?.text || "";

    document.getElementById("startText").textContent =
        config.questions?.second?.startText || "";

    document.getElementById("nextBtn").textContent =
        config.questions?.second?.nextBtn || "Next";


    // -------- Q3 --------

    document.getElementById("question3Text").textContent =
        config.questions?.third?.text || "";

    document.getElementById("yesBtn3").textContent =
        config.questions?.third?.yesBtn || "Yes";

    document.getElementById("noBtn3").textContent =
        config.questions?.third?.noBtn || "No";


    createFloatingElements();
    setupMusicPlayer();
    setInitialPosition();
});


// ================= FLOATING =================

function createFloatingElements() {

    const container = document.querySelector(".floating-elements");
    if (!container) return;

    (config.floatingEmojis?.hearts || []).forEach(h => {

        const div = document.createElement("div");
        div.className = "heart";
        div.innerHTML = h;

        setRandomPosition(div);
        container.appendChild(div);
    });
}


function setRandomPosition(el) {

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDelay = Math.random() * 5 + "s";
    el.style.animationDuration =
        10 + Math.random() * 20 + "s";
}


// ================= NAVIGATION =================

function showNextQuestion(num) {

    document
        .querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    document
        .getElementById(`question${num}`)
        ?.classList.remove("hidden");
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


// ================= LOVE =================

const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");


function setInitialPosition() {

    if (!loveMeter) return;

    loveMeter.value = 100;
    loveValue.textContent = 100;
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

        if (bg.paused) {
            bg.play();
        } else {
            bg.pause();
        }
    });
}


// ================= YES =================

function handleYesClick() {
    showNextQuestion(2);
}


// ================= NO =================

const noMessages = [
    "Think about it twice! 🤔",
    "I know your heart doesn't say no 💕",
    "Are you sure? Really sure? 😏",
    "I knew you'd click No first 😂",
    "Your finger slipped, right? 😜"
];

let noIndex = 0;
let noTryCount = 0;


// Position bubble under button
function positionBubble(btn, bubble) {

    const rect = btn.getBoundingClientRect();

    bubble.style.left =
        rect.left + rect.width / 2 + "px";

    bubble.style.top =
        rect.bottom + 8 + "px";

    bubble.style.transform = "translateX(-50%)";
}


// Handle No click
function handleNoClick(event) {

    const btn = event.target;

    const bubble =
        document.getElementById("noMessageBubble");

    noTryCount++;


    // After 5 tries → surrender ❤️
    if (noTryCount >= 5) {

        btn.style.position = "static";
        btn.textContent = "Okay… Yes ❤️";

        btn.onclick = () => handleYesClick();


        if (bubble) {

            bubble.textContent =
                "Haha 😜 I knew it! You love me ❤️";

            positionBubble(btn, bubble);

            showBubble(bubble, 2000);
        }

        return;
    }


    // Normal move
    moveButton(btn);


    if (!bubble) return;


    const msg =
        noMessages[noIndex % noMessages.length];

    noIndex++;


    bubble.textContent = msg;

    positionBubble(btn, bubble);

    showBubble(bubble, 2000);
}


// ================= BUBBLE AUTO HIDE =================

function showBubble(bubble, time = 2000) {

    bubble.classList.remove("hidden");
    bubble.classList.add("show");

    clearTimeout(window.noMsgTimer);

    window.noMsgTimer = setTimeout(() => {

        bubble.classList.remove("show");
        bubble.classList.add("hidden");
        bubble.textContent = "";

    }, time);
}
