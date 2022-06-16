$(document).ready(function(){
	const nav = document.getElementById("nav");
	
	var sticky = nav.offsetTop + nav.offsetHeight;

	window.onscroll = function() 
	{ 
	  if (window.pageYOffset > sticky) {
	    nav.classList.add("sticky");

	    $(nav).find("nav").removeClass("my-5");
	    $(nav).find("#content").removeClass("col-11 col-xl-9").addClass("col-12");
	    $(nav).find("#navbar").removeClass("rounded");
	  } else {
	    nav.classList.remove("sticky");

	    $(nav).find("nav").addClass("my-5");
	    $(nav).find("#content").removeClass("col-12").addClass("col-11 col-xl-9");
	    $(nav).find("#navbar").addClass("rounded");
	  }
	};
});