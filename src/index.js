import 'particles.js';
import 'animation.gsap';
import 'debug.addIndicators';
import ScrollMagic from 'scrollmagic';

particlesJS.load('particles-js', 'src/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

let controller = new ScrollMagic.Controller();

// new ScrollMagic.Scene({
//   offset: 200
// })
// .setTween('#banner', 0.5, { top: '0', left: '0', width: '100%' })
// .addTo(controller)
// .addIndicators({name: '#banner'});

new ScrollMagic.Scene({
  offset: 200
})
.setTween('#banner', 0.1, { display: 'none' })
.setClassToggle('#banner', 'hidden')
.addTo(controller)
// .addIndicators({name: '#banner'});

// new ScrollMagic.Scene({
//   offset: 200
// })
// .setTween('#banner', 5, { display: 'none' })
// .setClassToggle('#banner', 'hidden')
// .addTo(controller)
// .addIndicators({name: '#banner'});

new ScrollMagic.Scene({
  offset: 200
})
.setTween('#menu', 0.1, { display: 'block' })
.setClassToggle('#menu', 'fade-in-fast')
.addTo(controller)
// .addIndicators({name: '#menu'});