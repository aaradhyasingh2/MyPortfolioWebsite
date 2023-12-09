function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on('scroll', ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector('#main').style.transform
      ? 'transform'
      : 'fixed',
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

// below code is locomotive code
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
});

// //change circle ka akaar when you move the circle (means cursor k sath wala circle)

var timeout;

function circleDesignChange() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener('mousemove', function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    //jb cursor move naa kre to means cursor ruka rahe to circle bura ka pura circle(yani gola) bna rahe
    timeout = setTimeout(function () {
      document.querySelector(
        '#minicircle'
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

//below function is for moving circle with cursor
function circleMouseFollower(xscale, yscale) {
  window.addEventListener('mousemove', function (dets) {
    document.querySelector(
      '#minicircle'
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}
circleDesignChange();
circleMouseFollower();

var tl = gsap.timeline();

//below code is for loading page...
function loading() {
  var a = 0;
  setInterval(function () {
    a = a + Math.floor(Math.random() * 10);
    if (a < 100) {
      document.querySelector('#loader h1').innerHTML = a + '%';
    } else {
      a = 100;
      document.querySelector('#loader h1').innerHTML = a + '%';
    }
  }, 150);
}
loading();

tl.to('#loader h1', {
  scale: 2,
  // opacity:0,
  delay: 0.3,
  duration: 1,
  onStart: loading(),
});

tl.to('#loader', {
  opacity: 0,
  top: '-100vh',
  delay: 0.3,
  duration: 1,
});

tl.from('#navbar h1, #navbar h3', {
  y: -100,
  // duration: 0.3,
  delay: -1,
  opacity: 0,
  stagger: 0.2,
});

tl.from('#page1 #hometext h3, #page1 #hometext #secondh3', {
  x: -800,
  opacity: 0,
  duration: 1,
  delay: -1,
  stagger: 1,
});
tl.from('#page1 #hometext h1', {
  x: 500,
  opacity: 0,
  duration: 1,
  delay: -1,
  stagger: 1,
});

tl.from('#page1-img', {
  scale: -1,
  opacity: 0,
  duration: 1,
  delay: 0.1,
  stagger: 2,
});

//below line for writing a given text in loop
var typed = new Typed('.text', {
  strings: [
    'Programming',
    'Web Development',
    'Frontend Developer',
    'Software Developer',
  ],
  typeSpeed: 70,
  backSpeed: 80,
  backDelay: 120,
  loop: true,
});

//below code is about skill,experience section

var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');
function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove('active-link');
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove('active-tab');
  }
  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');
}



// tl.to('.page2', {
//   scrollTrigger: {
//     trigger: '.page2',
//     scroller: '#main',
//     start: '-56% 55%',
//     end: '-35% 60%',
//     scrub: 2,
//   },
//   stagger: 2,
//   backgroundColor: 'yellow',
//   color: '#000',
// });
tl.from('#aboutimg', {
  x: -100,
  // scale: 1,
  opacity: 0,
  scrollTrigger: {
    trigger: '#aboutimg',
    scroller: '#main',
    start: '-56% 55%',
    end: '-35% 60%',
    scrub: 2,
  },
  stagger: 2,
});
// tl.from('.heading', {
//   y: -10,
//   scale: 1,
//   opacity: 0,
//   scrollTrigger: {
//     trigger: '.heading',
//     scroller: '#main',
//     start: '-56% 55%',
//     end: '-35% 60%',
//     scrub: 2,
//   },
//   stagger: 2,
// });
tl.from('.aboutcol-2 p,.aboutcol-2 a,.tab-titles p, #box img,#box h1', {
  x: 10,
  opacity: 0,
  scrollTrigger: {
    trigger: '.aboutcol-2 p,.aboutcol-2 a,.tab-titles p,#box img,#box h1',
    scroller: '#main',
    start: '-195% 67%',
    end: '-193% 65%',
    scrub: 2,
  },
  stagger: 2,
});

//text pr image hover ho jb-jb cursor textarea m le jaye tb tb...

document.querySelectorAll('.element').forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener('mouseleave', function (dets) {
    gsap.to(elem.querySelector('img, video'), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener('mousemove', function (dets) {
    //below line of code for bade space m se chhote space ko minus kr raha diff find krne k liye...
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX; //image kitna rotate hoga
    gsap.to(elem.querySelector('img, video'), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX, //cursor k sath img b move kre x-axis pr
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
