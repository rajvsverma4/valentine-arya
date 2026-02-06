// ================= CONFIG =================

const config = window.VALENTINE_CONFIG || {};


// ================= VALIDATION =================

function validateConfig() {

    const warnings = [];

    if (!config.valentineName) {
        config.valentineName = "My Love";
    }

    const isValidHex = (hex) =>
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

    Object.entries(config.colors || {}).forEach(([key, value]) => {

        if (!isValidHex(value)) {
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (parseFloat(config.animations?.floatDuration) < 5) {
        config.animations.floatDuration = "5s";
    }

    if (
        config.animations?.heartExplosionSize < 1 ||
        config.animations?.heartExplosionSize > 3
    ) {
        config.animations.heartExplosionSize = 1.5;
    }
}


// ================= DEFAULT COLORS =================

function getDefaultColor(key) {

    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };

    return defaults[key];
}


// ================= TITLE =================

document.title = config.pageTitle || "For You ❤️";


// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {

    validateConfig();

    document.getElementById("valentineTitle").textContent =
        `${config.valentineName || "My Love"}, my love...`;


    // -------- Q1 --------

    document.getElementById("question1Text").textContent =
        config.questions?.first?.text || "";

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

    (config.floatingEmojis?.bears || []).forEach(b => {

        const div = document.createElement("div");
        div.className = "bear";
        div.innerHTML = b;

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


// ================= LOVE METER =================

const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");


function setInitialPosition() {

    if (!loveMeter) return;

    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = "100%";
}


loveMeter?.addEventListener("input", () => {

    const value = parseInt(loveMeter.value);

    loveValue.textContent = value;

    if (value > 100) {

        extraLove?.classList.remove("hidden");

        const overflow = (value - 100) / 9900;

        const extraWidth =
            overflow * window.innerWidth * 0.8;

        loveMeter.style.width =
            `calc(100% + ${extraWidth}px)`;


        if (value >= 5000) {

            extraLove?.classList.add("super-love");
            extraLove.textContent =
                config.loveMessages?.extreme || "";

        } else if (value > 1000) {

            extraLove?.classList.remove("super-love");
            extraLove.textContent =
                config.loveMessages?.high || "";

        } else {

            extraLove?.classList.remove("super-love");
            extraLove.textContent =
                config.loveMessages?.normal || "";
        }

    } else {

        extraLove?.classList.add("hidden");
        extraLove?.classList.remove("super-love");

        loveMeter.style.width = "100%";
    }
});


// ================= CELEBRATION =================

function celebrate() {

    document
        .querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    const c = document.getElementById("celebration");
    if (!c) return;

    c.classList.remove("hidden");


    document.getElementById("celebrationTitle").textContent =
        config.celebration?.title || "I Love You ❤️";

    document.getElementById("celebrationMessage").textContent =
        config.celebration?.message || "";

    document.getElementById("celebrationEmojis").textContent =
        config.celebration?.emojis || "";


    createHeartExplosion();
}


// ================= HEARTS =================

function createHeartExplosion() {

    const container =
        document.querySelector(".floating-elements");

    if (!container) return;


    for (let i = 0; i < 50; i++) {

        const heart = document.createElement("div");

        const list =
            config.floatingEmojis?.hearts || ["❤️"];

        const h =
            list[Math.floor(Math.random() * list.length)];


        heart.innerHTML = h;
        heart.className = "heart";

        container.appendChild(heart);

        setRandomPosition(heart);
    }
}


// ================= MUSIC =================

function setupMusicPlayer() {

    const musicControls =
        document.getElementById("musicControls");

    const musicToggle =
        document.getElementById("musicToggle");

    const bgMusic =
        document.getElementById("bgMusic");

    const musicSource =
        document.getElementById("musicSource");


    if (!config.music?.enabled) {

        if (musicControls)
            musicControls.style.display = "none";

        return;
    }


    if (musicSource)
        musicSource.src = config.music.musicUrl;


    if (bgMusic) {

        bgMusic.volume =
            config.music.volume || 0.5;

        bgMusic.load();


        if (config.music.autoplay) {

            bgMusic.play().catch(() => {

                if (musicToggle)
                    musicToggle.textContent =
                        config.music.startText;
            });
        }
    }


    musicToggle?.addEventListener("click", () => {

        if (!bgMusic) return;


        if (bgMusic.paused) {

            bgMusic.play();

            musicToggle.textContent =
                config.music.stopText;

        } else {

            bgMusic.pause();

            musicToggle.textContent =
                config.music.startText;
        }
    });
}


// ================= YES =================

function handleYesClick() {

    const q1 =
        document.getElementById("question1");

    if (q1)
        q1.classList.add("hidden");


    setTimeout(() => {
        showNextQuestion(2);
    }, 300);
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


function handleNoClick(event) {

    const btn = event.target;

    noTryCount++;


    // After 5 tries -> surrender ❤️
    if (noTryCount >= 5) {

        btn.style.position = "static";
        btn.style.transition = "all 0.3s ease";
        btn.style.transform = "scale(1)";

        btn.textContent = "Okay… Yes ❤️";

        btn.onclick = () => {
            handleYesClick();
        };


        const bubble =
            document.getElementById("noMessageBubble");

        if (bubble) {

            bubble.textContent =
                "Haha 😜 I knew it! You love me ❤️";

            bubble.classList.remove("hidden");
            bubble.classList.add("show");

            setTimeout(() => {
                bubble.classList.remove("show");
            }, 2000);
        }

        return;
    }


    // Normal behavior
    moveButton(btn);


    const bubble =
        document.getElementById("noMessageBubble");

    if (!bubble) return;


    const msg =
        noMessages[noIndex % noMessages.length];

    noIndex++;


    bubble.textContent = msg;

    bubble.classList.remove("hidden");
    bubble.classList.add("show");


    clearTimeout(window.noMsgTimer);

    window.noMsgTimer = setTimeout(() => {
        bubble.classList.remove("show");
    }, 1800);
}
