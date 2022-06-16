$(document).ready(function(){
	let speed = 4000;

	const startAnimation = (entries, observer) => {
	  entries.forEach(entry => {
	    $(entry.target).text("0");

	    const animate = () => {
	      	const value =+ $(entry.target).data('counter');
	      	const data =+ $(entry.target).text();
	     
			const time = value / speed;
			
			if(data < value) {
				entry.target.innerText = Math.ceil(data + time);
				setTimeout(animate, 1);
			} else {
				entry.target.innerText = value;
			}
	   }
	   
	   animate();
	  });
	};

	const observer = new IntersectionObserver(startAnimation);
	const options = { root: null, rootMargin: '0px', threshold: 1 }; 
	
	$("[data-counter]").each(( index,element) =>{
	  observer.observe(element, options);
	});
});