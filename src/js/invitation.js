$(document).ready(function(){
	window.showVideo = function() {
		// alert();
		let alert = alertCtrl.create({
	      title: "", 
	      size : 'modal-lg',
	      subTitle: '<video width="100%" height="100%" controls><source src="../../src/files/video/2019-09-03.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>',
	  });

	  alertCtrl.present(alert.modal);	   
	}
  
});