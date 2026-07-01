const loader = document.getElementById("loader");
const percent = document.getElementById("percent");
const app = document.querySelector(".app");

// ===== LOADER =====

let p = 0;

const load = setInterval(() => {
  p += Math.floor(Math.random() * 8);

  if (p >= 100) {
    p = 100;
    clearInterval(load);

    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
        app.classList.add("show");
      }, 800);

    }, 400);
  }

  percent.textContent = p + "%";
}, 120);

// ===== SIMPLE PARTICLES / LIGHT FX =====
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// particles
let particles = [];

for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.2
  });
}

// ⚡ МОЛНИЯ (ВАЖНО: теперь точно глобальная функция)
function drawLightning(x1, y1, x2, y2) {

  ctx.beginPath();
  ctx.moveTo(x1, y1);

  let prevX = x1;
  let prevY = y1;

  for (let i = 0; i < 8; i++) {

    const x = x1 + (x2 - x1) * (i / 8) + (Math.random() - 0.5) * 40;
    const y = y1 + (y2 - y1) * (i / 8) + (Math.random() - 0.5) * 40;

    ctx.lineTo(x, y);

    prevX = x;
    prevY = y;
  }

  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "white";
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

// ⚡ случайные молнии
function randomLightning() {

  const x1 = Math.random() * canvas.width;
  const y1 = Math.random() * canvas.height;

  const x2 = Math.random() * canvas.width;
  const y2 = Math.random() * canvas.height;

  drawLightning(x1, y1, x2, y2);

}

// реже, чтобы заметно было
setInterval(randomLightning, 2500);

// ⚡ вспышка
function flash() {
  const f = document.createElement("div");

  f.style.position = "fixed";
  f.style.inset = "0";
  f.style.background = "white";
  f.style.opacity = "0.12";
  f.style.pointerEvents = "none";
  f.style.zIndex = "99999";

  document.body.appendChild(f);

  setTimeout(() => f.remove(), 90);
}

// чуть позже, чтобы точно увидеть
setTimeout(flash, 800);

// animation loop
function animate() {

  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fill();

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 130) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.stroke();
    }

  });

  requestAnimationFrame(animate);
}

animate();
// ===== CUSTOM CURSOR =====

const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", (e) => {

  const x = e.clientX;
  const y = e.clientY;

  // основной курсор
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";

  // хвост с задержкой
  setTimeout(() => {
    trail.style.left = x + "px";
    trail.style.top = y + "px";
  }, 60);

});
function randomLightning() {

  const x1 = Math.random() * window.innerWidth;
  const y1 = Math.random() * window.innerHeight;

  const x2 = Math.random() * window.innerWidth;
  const y2 = Math.random() * window.innerHeight;

  drawLightning(x1, y1, x2, y2);

}

setInterval(randomLightning, 4000);
function flash() {
  const f = document.createElement("div");

  f.style.position = "fixed";
  f.style.inset = 0;
  f.style.background = "white";
  f.style.opacity = "0.08";
  f.style.pointerEvents = "none";
  f.style.zIndex = 9999;

  document.body.appendChild(f);

  setTimeout(() => {
    f.remove();
  }, 120);
}

setTimeout(() => {
  flash();
}, 1200);
