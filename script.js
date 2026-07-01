const loader = document.getElementById("loader");
const percent = document.getElementById("percent");
const app = document.querySelector(".app");

let p = 0;

const load = setInterval(() => {

  p += Math.random() * 10;

  percent.textContent = Math.floor(p) + "%";

  if (p >= 100) {
    p = 100;
    clearInterval(load);

    setTimeout(() => {
      loader.style.display = "none";
      app.classList.add("show");
    }, 400);
  }

}, 60);

// simple canvas background (safe)
let stars = [];

for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
  });
}

function draw() {

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(s.x, s.y, s.r, s.r);
  });

  requestAnimationFrame(draw);
}

draw();
