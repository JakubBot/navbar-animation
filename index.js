
let tl = gsap.timeline({
  paused: true,
  onStart: () => {
    body.classList.add("noscroll");
  },
  onReverseComplete: () => {
    body.classList.remove("noscroll");
  },
});

tl.from(".menu__informations", {
  scaleX: 0,
  duration: 1.2,
  ease: "Expo.easeInOut",
  transformOrigin: "left center",
})
  .from(".menu__images", {
    width: 0,
    duration: 1.5,
    ease: "Expo.easeInOut",
    transformOrigin: "left center",
  })
  .from(
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
let menuImg = document.querySelectorAll(".menu__images img");
let links = document.querySelectorAll(".imgChanger ul li a");
let body = document.querySelector("body");
document.querySelector(".hamburger").addEventListener("click", function () {
  
  let addTimelines = gsap.timeline();

  

  if (this.getAttribute("aria-expanded") == "false") {
    let scrollTl = gsap.timeline({
      paused: true
    }).to(window, { duration: 0.5, scrollTo: 0 })

    addTimelines.add(scrollTl.play()).add(tl.play())
    
    this.setAttribute("aria-expanded", "true");
  } else {
    addTimelines.add(tl.reverse())
    
    this.setAttribute("aria-expanded", "false");
    navStatus = false;
  }
});

links.forEach((link, index) => {
  link.addEventListener("mouseenter", () => {
    if (navStatus == true) {
      gsap.to(menuImg[index], {
        autoAlpha: 1,
        duration: 0.8,
      });
    }
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(menuImg[index], {
      autoAlpha: 0,
      duration: 0.8,
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    let scrollTarget = link.getAttribute("href");

    let tlScroll = gsap.timeline({
        paused: true,
      })
      .to(window, { duration: 2, scrollTo: scrollTarget, ease: "expo.inOut" });
    let addTimelines = gsap.timeline();
    addTimelines.add(tl.reverse()).add(tlScroll.play());

    document.querySelector(".hamburger").setAttribute("aria-expanded", "false");
    navStatus = false;
  });
});

window.addEventListener("load", function() { window. scrollTo(0, 0); });
document.addEventListener("touchmove", function(e) { e.preventDefault()});
