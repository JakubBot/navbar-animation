let tl = gsap.timeline({
  paused: true,
  onStart: () => {
    body.classList.add('noscroll');
  },
  onReverseComplete: () => {
    body.classList.remove('noscroll');
  },
});

tl.to('.menu__informations', {
  scaleX: 1,
  duration: 1.2,
  ease: 'Expo.easeInOut',
  transformOrigin: 'left center',
})
  .fromTo(
    '.menu__images',
    {
      width: 0,
    },
    {
      width: '40%',
      duration: 1.5,
      ease: 'Expo.easeInOut',
      transformOrigin: 'left center',
    }
  )
  .from(
    '.menu__links ul li',
    {
      autoAlpha: 0,
      ease: 'Expo.easeInOut',
      duration: 2,
      stagger: 0.1,
      y: 20,
    },
    '<-.3'
  );

//prevent from seeing nav image on loading page
gsap.set('.menu', { autoAlpha: 1 });

const links = document.querySelectorAll('.menu__scroller ul li a');
const body = document.querySelector('body');

document.querySelector('.hamburger').addEventListener('click', function () {
  if (this.getAttribute('aria-expanded') == 'false') {
    gsap.to(window, { duration: 0.5, scrollTo: 0 }).then(() => {
      tl.play();
    });

    this.setAttribute('aria-expanded', 'true');
  } else {
    tl.reverse();

    this.setAttribute('aria-expanded', 'false');
  }
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    
    let scrollTarget = link.getAttribute('href');

    tl.reverse().then(() => {
      gsap.to(window, {
        duration: 2.2,
        scrollTo: scrollTarget,
        ease: 'expo.inOut',
      });
    });
    document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
  });
});
