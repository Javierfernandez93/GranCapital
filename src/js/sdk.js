let zuum = null;

var js = {
	load(d, s, id, src) {
		return new Promise(resolve => {
			var js, fjs = d.getElementsByTagName(s)[0];
	     	if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = src;
		    js.addEventListener('load', ()=>{
		    	resolve();
		    });	
		    fjs.parentNode.insertBefore(js, fjs);
		    
		});
	}
}

var css = {
	load(d, s, id, src) {
		var css, fcss = d.getElementsByTagName('head')[0];
     	if (d.getElementById(id)) {return;}
	    css = d.createElement(s); css.id = id;
	    css.href = src;
	    css.rel  = 'stylesheet';
		css.type = 'text/css';
	    fcss.parentNode.insertBefore(css, fcss);
	}
}

var core = {
	init()
	{	
		js.load(document,'script','zuum-jquery','http://localhost:8888/z/src/js/jquery-3.1.1.js').then((respolve)=>{
			js.load(document,'script','zuum-boxLoader','http://localhost:8888/z/src/js/boxLoader.js').then((respolve)=>{
				js.load(document,'script','zuum-http','http://localhost:8888/z/src/js/http.js').then((resolve)=>{
					js.load(document,'script','zuum-maincore','http://localhost:8888/z/src/js/sdk-zuum.js').then((resolve)=>{
						zuum = new Zuum;
						window.initZuum();
					});
				});
			});
		});
	}
}

core.init();