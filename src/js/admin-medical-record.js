$(document).ready(function(){
var animation = bodymovin.loadAnimation({
		  container: document.getElementById('locked'),
		  renderer: 'svg',
		  loop: false,
		  autoplay: true,
		  path: '../../src/assets/locked.json'
		});
	

	window.doAnimation = function() {
		animation.goToAndPlay(0);


	}

	window.sendCaseFile = function(company_id,name) {
		// alert(company_id + name);
	}
});