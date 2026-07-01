window.scrollTo(0, 0);
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// =======================
// FADE IN
// =======================
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// =======================
// NAV ANIMATION
// =======================
document.querySelectorAll("nav a").forEach((button, index) => {
    button.style.animationDelay = `${index * 120 + 800}ms`;
});

// =======================
// CURSOR SYSTEM
// =======================
const cursor = document.querySelector(".cursor");
const glow = document.querySelector(".mouse-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    document.body.style.setProperty("--x", mouseX + "px");
    document.body.style.setProperty("--y", mouseY + "px");
});

function animateCursor() {
    if (cursor) {
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    }

    if (glow) {
        glow.style.left = mouseX + "px";
        glow.style.top = mouseY + "px";
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// =======================
// BACKGROUND PARTICLES
// =======================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y < 0 || p.y > canvas.height) p.y = Math.random() * canvas.height;

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}
animate();

// =======================
// MOUSE INTERACTION (HIDDEN ITEMS)
// =======================
document.addEventListener("mousemove", (e) => {

    document.querySelectorAll(".hidden-item").forEach(el => {

        const rect = el.getBoundingClientRect();

        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        const distance = Math.sqrt(dx * dx + dy * dy);

        let radius = 260;

        if (el.dataset.type === "music") radius = 180;
        if (el.dataset.type === "egg") radius = 100;

        const intensity = Math.max(0, 1 - distance / radius);

        el.style.opacity = 0.02 + intensity * 0.7;

        const shade = Math.floor(120 + intensity * 135);
        el.style.color = `rgb(${shade},${shade},${shade})`;

        el.style.filter = `blur(${2 - intensity * 2}px)`;

        const scale = 1 + intensity * 0.35;

        el.style.transform =
            `scale(${scale}) rotate(${el.dataset.rot || 0}deg)`;
    });

});

// =======================
// HIDDEN SYMBOLS (RANDOM SPAWN)
// =======================
const layer = document.querySelector(".hidden-layer");

// categories
const symbols = ["✦","✧","✶","✹","◆","◇","◈","◎","◉","△","▽","╳","╱","╲","○","●","◌"];

const music = [
"808","404","NULL","VOID","BPM","MIDI","LOOP","REC",
"FX","AUX","WAV","GAIN","LFO","SYNC","MIX","EQ","MASTER",
"REVERB","DELAY","SATURATION","LIMITER","OSC","KYO","BEAT","PLUGIN"
];

const eggs = [
"PROJECT SAVED",
"EXPORT COMPLETE",
"24 BIT",
"48 kHz",
"BPM:140",
"KEY:Gm",
"NO CLIPPING",
"EXPORT_v12.wav",
"final_mix_FINAL_v7.wav",
"∞"
];

const COUNT = 90;

for (let i = 0; i < COUNT; i++) {

    const item = document.createElement("span");
    item.className = "hidden-item";

    const typeRandom = Math.random();
    const sizeRandom = Math.random();

    // TYPE
    if (typeRandom < 0.60) {
        item.dataset.type = "symbol";
        item.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    } else if (typeRandom < 0.90) {
        item.dataset.type = "music";
        item.innerText = music[Math.floor(Math.random() * music.length)];
    } else {
        item.dataset.type = "egg";
        item.innerText = eggs[Math.floor(Math.random() * eggs.length)];
    }

    // RANDOM POSITION (БЕЗ КЛАСТЕРОВ)
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    item.style.left = x + "%";
    item.style.top = y + "%";

    // SIZE
    let size;

    if (sizeRandom < 0.60) {
        size = 8 + Math.random() * 14;
    } else if (sizeRandom < 0.90) {
        size = 14 + Math.random() * 10;
    } else {
        size = 22 + Math.random() * 18;
    }

    item.style.fontSize = size + "px";

    // ROTATION
    const rot = Math.random() * 360;
    item.dataset.rot = rot;

    item.style.animation = `floatSymbol ${8 + Math.random() * 8}s ease-in-out infinite`;

    layer.appendChild(item);
}
