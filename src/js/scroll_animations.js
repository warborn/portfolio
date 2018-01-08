import 'animation.gsap';
import 'debug.addIndicators';
import ScrollMagic from 'scrollmagic';

const controller = new ScrollMagic.Controller();

// Define banner animations
const bannerTimeline = new TimelineMax();
bannerTimeline.add(TweenMax.to('#banner', 0.4, { 
  top: '-10px', height: '63px', width: '100%', left: '0%', fontSize: '0.5rem',
  overflow: 'hidden', backgroundColor: 'rgba(121, 83, 83, 0.1)', ease:Power0.easeOut 
}));
bannerTimeline.add(TweenMax.to('#banner .headline, #banner .description, #banner .gradient-line', 0.2, { opacity: '0' }));

new ScrollMagic.Scene({
  offset: 200
})
.setTween(bannerTimeline)
.addTo(controller);
// .addIndicators({name: '#banner'});

// Define navbar animations
const menuTimeline = new TimelineMax();
menuTimeline.add(TweenMax.to('#menu', 0.4, { display: 'block', delay: 0.3 }));
new ScrollMagic.Scene({
  offset: 200
})
.setClassToggle('#menu', 'fade-in-fast')
.setTween(menuTimeline)
.addTo(controller);
// .addIndicators({name: '#menu'});

// Set the class fade-in to the banner and remove it after 1.5s
// to not interfere with the banner animation
const banner = document.getElementById('banner');
banner.classList.add('fade-in');
setTimeout(function() {
  banner.classList.remove('fade-in');
}, 1500);

// Setup event handlers to change the current active navigation link
const activeLinkClass = '-active';
const [aboutMeLink, skillsLink] = [...document.querySelectorAll('.sections .link')]
                    .slice(0, 2);

new ScrollMagic.Scene({ triggerElement: '#about-me' })
  .setClassToggle(aboutMeLink, activeLinkClass)
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: '#skills', offset: 200 })
  .on('enter', function() {
    aboutMeLink.classList.remove(activeLinkClass);
    skillsLink.classList.add(activeLinkClass);
  })
  .on('leave', function () {
    aboutMeLink.classList.add(activeLinkClass);
    skillsLink.classList.remove(activeLinkClass);
  })
  .addTo(controller);

