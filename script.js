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

let particles = [];

for (let i = 0; i < 40; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fill();
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
