let tl = gsap.timeline({ paused: true });

tl.from(".menu__informations", {
  scaleX: 0,
  duration: 1.2,
  ease: "Expo.easeInOut",
  transformOrigin: "left center",
});

tl.from(".menu__images img", {
  scaleX: 0,
  duration: 1.5,
  ease: "Expo.easeInOut",
  transformOrigin: "left center",
});

tl.from(
  ".menu__links ul li",
  {
    autoAlpha: 0,
    ease: "Expo.easeInOut",
    duration: 2,
    stagger: 0.1,
    y: 20,
    onComplete: () => {
      navStatus = true;
    },
  },
  "<-.3"
);

let navStatus = false;

document.querySelector(".hamburger").addEventListener("click", function () {
  if (this.getAttribute("aria-expanded") === "false") {
    tl.play();
    this.setAttribute("aria-expanded", "true");
  } else {
    tl.reverse();
    this.setAttribute("aria-expanded", "false");
    navStatus = false;
  }
});

let links = document.querySelectorAll(".imgChanger ul li a");

let menuImg = document.querySelectorAll(".menu__images img");
links.forEach((link, index) => {
  link.addEventListener("mouseenter", () => {
    if (navStatus == true) {
      let img = document.querySelector(".menu__images img.active");
      gsap.to(img, {
        autoAlpha: 0,
        duration: 0.8,
      });
      img.classList.remove("active");
      menuImg[index].classList.add("active");
      gsap.to(menuImg[index], {
        autoAlpha: 1,
        duration: 0.8,
      });
    }
  });
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    tl.reverse();
    document.querySelector(".hamburger").setAttribute("aria-expanded", "false");
    navStatus = false;
  });
});
