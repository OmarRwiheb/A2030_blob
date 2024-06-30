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

window.addEventListener('scroll', function() {
  var myElement = document.getElementsByClassName('fixed-register-button')[0];
  var scrollPosition = window.scrollY + window.innerHeight;
  var pageHeight = document.documentElement.scrollHeight;
  var triggerPosition = pageHeight * 0.99;

  if (window.innerWidth <= 981) {
      if (scrollPosition >= triggerPosition) {
          myElement.style.display = 'none';
      } else {
          myElement.style.display = 'block';
      }
  } else {
      myElement.style.display = 'none'; // Ensuring it's visible for widths &gt; 981
  }
});

(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "07/12/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "LET'S GET TO DREAMING!!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }());