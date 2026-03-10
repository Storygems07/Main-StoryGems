// js/plans.js
document.addEventListener("DOMContentLoaded", () => {
    const planButtons = document.querySelectorAll(".plan-card .btn");

    planButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            planButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });
});
