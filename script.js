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

        // Радиус действия
        const radius = 180;

        // Чем ближе курсор, тем больше значение (от 0 до 1)
        const intensity = Math.max(0, 1 - distance / radius);

        // Плавное проявление
        el.style.opacity = 0.01 + intensity * 0.45;

        // Немного убираем размытие
        el.style.filter = `blur(${2 - intensity * 2}px)`;

        // Лёгкое увеличение и сохранение случайного поворота
        el.style.transform = `scale(${1 + intensity * 0.25}) rotate(${getComputedStyle(el).getPropertyValue("--r")})`;

    });

});

// =======================
// Hidden Symbols
// =======================

const layer = document.querySelector(".hidden-layer");

const symbols = [
"✦","✧","✶","✹","◆","◇","◈","◎","◉",
"△","▽","╳","╱","╲","01","10","<>",
"{}","//","K","Y","O","404","VOID","NULL"
];

const COUNT = 80;

for(let i=0;i<COUNT;i++){

    const item=document.createElement("span");

    item.className="hidden-item";

    item.innerText=symbols[Math.floor(Math.random()*symbols.length)];

    item.style.left=Math.random()*100+"%";

    item.style.top=Math.random()*100+"%";

    const size=12+Math.random()*26;

    item.style.fontSize=size+"px";

    const rot=(Math.random()*360)+"deg";

    item.style.setProperty("--r",rot);

    item.style.animation=`floatSymbol ${8+Math.random()*8}s ease-in-out infinite`;

    layer.appendChild(item);

}
