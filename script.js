
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

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});
