// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    const isValidHex = (hex) =>
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (
        config.animations.heartExplosionSize < 1 ||
        config.animations.heartExplosionSize > 3
    ) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(w => console.warn("- " + w));
    }
}

// Default colors
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

// Set title
document.title = config.pageTitle;


// Init when DOM ready
window.addEventListener("DOMContentLoaded", () => {

    validateConfig();

    document.getElementById("valentineTitle").textContent =
        `${config.valentineName}, my love...`;

    // Q1
    document.getElementById("question1Text").textContent =
        config.questions.first.text;

    document.getElementById("yesBtn1").textContent =
        config.questions.first.yesBtn;

    document.getElementById("noBtn1").textContent =
        config.questions.first.noBtn;

    document.getElementById("secretAnswerBtn").textContent =
        config.questions.first.secretAnswer;

    // Q2
    document.getElementById("question2Text").textContent =
        config.questions.second.text;

    document.getElementById("startText").textContent =
        config.questions.second.startText;

    document.getElementById("nextBtn").textContent =
        config.questions.second.nextBtn;

    // Q3
    document.getElementById("question3Text").textContent =
        config.questions.third.text;

    document.getElementById("yesBtn3").textContent =
        config.questions.third.yesBtn;

    document.getElementById("noBtn3").textContent =
        config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
    setInitialPosition();
});


// Floating emojis
function createFloatingElements() {

    const container = document.querySelector(".floating-elements");

    config.floatingEmojis.hearts.forEach(h => {
        const div = document.createElement("div");
        div.className = "heart";
        div.innerHTML = h;
        setRandomPosition(div);
        container.appendChild(div);
    });

    config.floatingEmojis.bears.forEach(b => {
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


// Navigation
function showNextQuestion(num) {
    document
        .querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    document
        .getElementById(`question${num}`)
        .classList.remove("hidden");
}


// No button move
function moveButton(btn) {

    const x =
        Math.random() * (window.innerWidth - btn.offsetWidth);

    const y =
        Math.random() * (window.innerHeight - btn.offsetHeight);

    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}


// Love meter
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

        extraLove.classList.remove("hidden");

        const overflow =
            (value - 100) / 9900;

        const extraWidth =
            overflow * window.innerWidth * 0.8;

        loveMeter.style.width =
            `calc(100% + ${extraWidth}px)`;


        if (value >= 5000) {

            extraLove.classList.add("super-love");
            extraLove.textContent =
                config.loveMessages.extreme;

        } else if (value > 1000) {

            extraLove.classList.remove("super-love");
            extraLove.textContent =
                config.loveMessages.high;

        } else {

            extraLove.classList.remove("super-love");
            extraLove.textContent =
                config.loveMessages.normal;
        }

    } else {

        extraLove.classList.add("hidden");
        extraLove.classList.remove("super-love");
        loveMeter.style.width = "100%";
    }
});


// Celebration
function celebrate() {

    document
        .querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    const c = document.getElementById("celebration");

    c.classList.remove("hidden");

    document.getElementById("celebrationTitle").textContent =
        config.celebration.title;

    document.getElementById("celebrationMessage").textContent =
        config.celebration.message;

    document.getElementById("celebrationEmojis").textContent =
        config.celebration.emojis;

    createHeartExplosion();
}


// Hearts
function createHeartExplosion() {

    for (let i = 0; i < 50; i++) {

        const heart = document.createElement("div");

        const h =
            config.floatingEmojis.hearts[
                Math.floor(
                    Math.random() *
                    config.floatingEmojis.hearts.length
                )
            ];

        heart.innerHTML = h;
        heart.className = "heart";

        document
            .querySelector(".floating-elements")
            .appendChild(heart);

        setRandomPosition(heart);
    }
}


// Music
function setupMusicPlayer() {

    const musicControls =
        document.getElementById("musicControls");

    const musicToggle =
        document.getElementById("musicToggle");

    const bgMusic =
        document.getElementById("bgMusic");

    const musicSource =
        document.getElementById("musicSource");


    if (!config.music.enabled) {
        musicControls.style.display = "none";
        return;
    }

    musicSource.src = config.music.musicUrl;

    bgMusic.volume =
        config.music.volume || 0.5;

    bgMusic.load();


    if (config.music.autoplay) {

        bgMusic.play().catch(() => {
            musicToggle.textContent =
                config.music.startText;
        });
    }


    musicToggle.addEventListener("click", () => {

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


// YES button
function handleYesClick() {

    const q1 =
        document.getElementById("question1");

    if (q1) {
        q1.classList.add("hidden");
    }

    const secret =
        document.querySelector(".secret-answer");

    if (secret) {
        secret.classList.remove("hidden");
    }
}


// NO button messages
const noMessages = [
    "Think about it twice! 🤔",
    "I know your heart doesn't say no 💕",
    "Are you sure? Really sure? 😏",
    "I knew you'd click No first 😂",
    "Your finger slipped, right? 😜"
];

let noIndex = 0;


function handleNoClick(event) {

    const btn = event.target;

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
