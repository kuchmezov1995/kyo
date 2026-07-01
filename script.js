// ===== Live Clock =====
const clock = document.querySelector(".clock");

function updateClock() {
    if (!clock) return;

    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");

    clock.textContent = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 1000);


// ===== Fade In =====
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


// ===== Links Animation =====
document.querySelectorAll("nav a").forEach((button, index) => {
    button.style.animationDelay = `${index * 120 + 800}ms`;
});

const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {

    const x = e.clientX;
    const y = e.clientY;

    dot.style.left = x + "px";
    dot.style.top = y + "px";

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

});
