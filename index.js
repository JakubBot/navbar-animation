let tl = gsap.timeline({
   paused: true ,
   delay: .5,
   onStart: () => {
    body.classList.add('noscroll')
  },
  onReverseComplete: () => {
    body.classList.remove('noscroll')
  }
  });



tl.from(".menu__informations", {
  scaleX: 0,
  duration: 1.2,
  ease: "Expo.easeInOut",
  transformOrigin: "left center",
})
.from(".menu__images img", {
  scaleX: 0,
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
)

let navStatus = false;
let menuImg = document.querySelectorAll(".menu__images img");
let links = document.querySelectorAll(".imgChanger ul li a");
let body = document.querySelector('body')
document.querySelector(".hamburger").addEventListener("click", function () {
  if (this.getAttribute("aria-expanded") === "false") {
    gsap.to(window, {duration: .5, scrollTo: 0});
    tl.play();
    this.setAttribute("aria-expanded", "true");
  } else {
    tl.reverse();
    this.setAttribute("aria-expanded", "false");
    navStatus = false;
  }
});


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



links.forEach((link,index) => {
  link.addEventListener("click", () => {
    let scrollTarget = link.getAttribute('href');

    let tlScroll = gsap.timeline({
      paused: true
    }).to(window, {duration: 2, scrollTo: scrollTarget, ease: "expo.inOut"})
   let fullTlScroll = gsap.timeline();
   fullTlScroll.add(tl.reverse()).add(tlScroll.play())


    document.querySelector(".hamburger").setAttribute("aria-expanded", "false");
    navStatus = false;

  });
});


// let tlm = gsap.timeline({
//   paused: true
// }).to(".link", {x: 300});
// let tlm2 = gsap.timeline({
//   paused: true
// }).to('.link', {x:1000});
// let tlm3 = gsap.timeline({
//   paused: true
// }).to(window, {duration: .5, scrollTo: ".content"});
// document.querySelector('.link').addEventListener('click', () => {
//   let tlmF = gsap.timeline().add(tlm.play()).add(tlm2.play()).add(tlm3.play())
 
// })