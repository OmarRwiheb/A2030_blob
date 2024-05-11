let hamburger = document.querySelector(".hamburger");
let mob = document.querySelector(".mobile-nav");
hamburger.addEventListener("click", () => {
    if (mob.style.display == "none") {
        mob.style.display = "block";
        setTimeout(() => {
            document.querySelector(".nav-content").style.transform =
                "translateX(100%)";
        }, 100);
    } else {
        setTimeout(() => {
            document.querySelector(".nav-content").style.transform =
                "translateX(-100%)";
        }, 100);
        mob.style.display = "none";
    }
});
document.querySelector(".nav-blocker").addEventListener("click", () => {
    setTimeout(() => {
        document.querySelector(".nav-content").style.transform =
            "translateX(-100%)";
    }, 100);
    mob.style.display = "none";
});