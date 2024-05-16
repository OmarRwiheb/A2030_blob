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

let dropdownProfile = document.querySelector(".user-list");
let dropdownProfileList = document.getElementById("dropdown-profile");
let dropdownArrow = document.querySelector(".arrow");

dropdownProfile.addEventListener("click", () => {
  if (dropdownProfileList.style.display == "none") {
    dropdownProfileList.style.display = "flex";
  } else {
    dropdownProfileList.style.display = "none";
  }
});

let mobNav = document.querySelector("#dropdown-head-mob");
let mobNav_menu = document.getElementById("mob-dropdown");
let cover = document.querySelector(".list-cover");
mobNav.addEventListener("click", () => {
  if (cover.style.transform == "translateY(1px)")
    cover.style.transform = "translateY(120px)";
  else cover.style.transform = "translateY(1px)";
});
