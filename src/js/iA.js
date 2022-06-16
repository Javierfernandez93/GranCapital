$(document).ready(function(){
	new TypeIt("#typeIt", {
	  speed: 50,
	  startDelay: 900
	})
	  .type("Es hora de ...", {delay: 100})
	  .move(-3, {speed: 25, delay: 100})
	  .type(' presentar ')
	  .type('la ')
	  .type('<n class="text-pink">evolución de los negocios</n>',{delay: 2000})
	  .delete(57, {delay: 100})
	  .move('END')
	  .type('Bienvenido a la era de la <n class="text-pink">I.A. con CodDex.com</n>', {delay: 4000})
	  .go();
});