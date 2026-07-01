window.scrollTo(0, 0);
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ===== Fade In =====
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


// ===== Links Animation =====
document.querySelectorAll("nav a").forEach((button, index) => {
    button.style.animationDelay = `${index * 120 + 800}ms`;
});

const cursor = document.querySelector(".cursor");
const glow = document.querySelector(".mouse-glow");

// стартовая позиция (центр экрана)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// 1. записываем позицию мыши
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 2. постоянно двигаем курсор к этой позиции
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

// запускаем анимацию
animateCursor();

document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// создаём "пыль"
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

    // пыль
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

        // Прозрачность
        el.style.opacity = 0.01 + intensity * 0.65;

        // Цвет
        const shade = Math.floor(120 + intensity * 135);
        el.style.color = `rgb(${shade}, ${shade}, ${shade})`;

        // Размытие
        el.style.filter = `blur(${2 - intensity * 2}px)`;

        // Увеличение
        const scale = 1 + intensity * 0.35;

        el.style.transform =
            `scale(${scale}) rotate(${getComputedStyle(el).getPropertyValue("--r")})`;

    });

});

// =======================
// Hidden Symbols
// =======================

const layer = document.querySelector(".hidden-layer");

// =======================
// Categories
// =======================

// Декоративные символы
const symbol = [
    "✦","✧","✶","✹","◆","◇","◈","◎","◉",
    "△","▽","╳","╱","╲","○","●","◌"
];

// Музыкальные термины
const music = [
    "808","404","NULL","VOID","BPM","MIDI","LOOP","REC",
    "FX","AUX","WAV","GAIN","LFO","SYNC","MIX","EQ","MASTER",
    "REVERB","DELAY","SATURATION","LIMITER","OSC", "KYO", "BEAT", "PLUGIN"
];

// Пасхалки
const egg = [
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

const clusters = [
    {x:15,y:20},
    {x:32,y:35},
    {x:70,y:18},
    {x:82,y:40},
    {x:18,y:72},
    {x:42,y:82},
    {x:64,y:65},
    {x:84,y:78},
    {x:50,y:50},
    {x:8,y:48}
];

const COUNT = 90;

for(let i=0;i<COUNT;i++){

    const item=document.createElement("span");

    item.className="hidden-item";

    const typeRandom = Math.random();
    
    const sizeRandom = Math.random();

if (typeRandom < 0.60) {

    item.dataset.type = "symbol";

    item.innerText =
        symbol[Math.floor(Math.random() * symbol.length)];

} else if (typeRandom < 0.90) {

    item.dataset.type = "music";

    item.innerText =
        music[Math.floor(Math.random() * music.length)];

} else {

    item.dataset.type = "egg";

    item.innerText =
        egg[Math.floor(Math.random() * egg.length)];

}

const cluster = clusters[Math.floor(Math.random()*clusters.length)];

const spread = 10;

item.style.left =
(cluster.x + (Math.random()-0.5)*spread) + "%";

item.style.top =
(cluster.y + (Math.random()-0.5)*spread) + "%";

    let size;

if (sizeRandom < 0.60){

    size = 8 + Math.random() * 14;

}else if(sizeRandom < 0.90){

    size = 14 + Math.random() * 10;

}else{

    size = 22 + Math.random() * 18;

}

    item.style.fontSize=size+"px";

    const rot=(Math.random()*360)+"deg";

    item.style.setProperty("--r",rot);

    item.style.animation=`floatSymbol ${8+Math.random()*8}s ease-in-out infinite`;

    layer.appendChild(item);

}
