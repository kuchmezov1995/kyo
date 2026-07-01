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

function flash() {
    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background = "white";
    flash.style.opacity = "0.08";
    flash.style.pointerEvents = "none";
    flash.style.zIndex = "1";

    document.body.appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 80 + Math.random() * 120);
}

// редкий триггер молнии
setInterval(() => {
    if (Math.random() > 0.92) {
        flash();
    }
}, 1500);
