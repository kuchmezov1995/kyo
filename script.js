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
