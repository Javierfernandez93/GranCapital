$(document).ready(function(){
	window.onscroll = function() { stickyListener()};

	var header = document.getElementById("nav");
	var sticky = header.offsetTop;
		
	function  stickyListener() {
	  if (window.pageYOffset > 300) {
	    header.classList.add("nav-sticky");
	  } else {
	    header.classList.remove("nav-sticky");
	  }
	}
});