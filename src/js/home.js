$(document).ready(function(){
	wow = new WOW({
      boxClass:     'animate__animated',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    });
    wow.init();

	new TypeIt("#typeIt", {
	  speed: 50,
	  startDelay: 900
	})
	  .type('Es hora de emprender tu negocio on line ',{delay: 1000})
	  .delete(19, {delay: 1000})
	  .type('<b class="text-pink">con CodDex.com</b>',{delay: 1000})
	  .go();
});