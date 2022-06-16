let chat = new Chat;

$(document).ready(function(){
	const inputHelper = new InputHelper;

	runSphere(null);

	// const tag = "gretting";
	// const inputs = ["Hola","Buenas tardes","buenas noches"];
	// const replys = ["¿Qué tal?","¿Cómo te va?"];

	// importIntent(tag,inputs,replys);
	window.addVar = function(element)
	{
		const value = $(element).text();
		const _element = inputHelper.getElement();

		$(_element).val($(_element).val()+value);
	}

	function importIntent(tag,inputs,replys)
	{
		$("#tag").val(tag);

		inputs.forEach((value,key)=>{
			let input = $("#phrases-input").find(".input");
			$(input).val(value);
			passIntentAsSet($(input));
		});

		replys.forEach((value,key)=>{
			let reply = $("#phrases-replys").find(".replys");
			$(reply).val(value);
			passIntentAsSetAnswer($(reply));
		});
	}	
	
	window.importIntent = function(element,intent_for_import_id)
	{
		dinamicLoader.show(element,"preloader-sm-black");


		chat.importIntent((response)=>{
			if(response.s == 1)
			{
				$(".special-alert-overlay").remove();
				importIntent(response.tag,response.inputs,response.replys);
			}
		},{intent_for_import_id:intent_for_import_id});
	}

	function runAnimatedBar()
	{
		let animateBar = new AnimateBar;

		typeIt(animateBar.phrases);

		animateBar.stepBar(()=>{
	    	animateBar.stepBar(()=>{
		    	animateBar.stepBar(()=>{
		    		animateBar.stepBar(()=>{
				    });
			    });
		    });
	    });
	    
	    function typeIt(text)
	    {
			const instance = new TypeIt("#phrase", {
			  	strings: text,
			  	speed: 50,
			  	waitUntilVisible: true,
				breakLines: false,
			}).go();
	    }
	}

	window.saveIntent = function(element)
	{
		dinamicLoader.show(element);

		let intents = [];

		$(".input").each((s,v)=>{
			intents.push($(v).val());
		});

		let replys = [];

		$(".replys").each((s,v)=>{
			replys.push($(v).val());
		});

		$(".content").addClass("d-none");
		$("#progress-container").removeClass("d-none");
		// $(".sphere").removeClass("d-none");

		// runSphere(intents);
		runAnimatedBar();

		chat.saveIntent((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				// $(element).text("Saved").removeAttr("disabled");
			}
		},{sheet_per_proyect_id:getParam("sppid"),tag:$("#tag").val(),intents:intents,replys:replys});
	}

	window.checkTag = function(element)
	{
		const val = $(element).val();

		$(element).val(val.replace(" ","_").toLowerCase());
	}

	window.checkIntentInput = function(event,element)
	{
		if(event.keyCode == 13)
		{
			passIntentAsSet($(element));
		}	
	}

	function passIntentAsSet(element)
	{
		$("#intent-data").removeClass("d-none");

		let row_cloned = element.parent().clone();

		row_cloned.find(".input").addClass("form-control-appended");
		row_cloned.find(".button-delete").removeClass("d-none");
		$("#phrases").append(row_cloned);

		$(element).val("");

		$("#input-size").text($(".input").length-1);
	}
	
	window.checkIntentInputAnswer = function(event,element)
	{
		inputHelper.setElement(element);

		if(event.keyCode == 13)
		{
			passIntentAsSetAnswer($(element));
		}	
	}


	function passIntentAsSetAnswer(element)
	{
		$("#intent-data").removeClass("d-none");

		let row_cloned = element.parent().clone();

		row_cloned.find(".input").addClass("form-control-appended");
		row_cloned.find(".button-delete").removeClass("d-none");
		$("#answers").append(row_cloned);

		$(element).val("");
		
		$("#replys-size").text($(".replys").length-1);
	}


	function runSphere(textbs)
	{
		  const canvas = document.getElementById('canvas');

	      const texts = [
		    'HTML5', 'Javascript', 'Scala', 'Kotlin', 'Erlang',
		    'CSS', 'Python', 'Java', 'PostgreSQL', 'MongoDB',
		    'Android', 'TensorFlow', 'Flask', 'React', 'Redis',
		    'NodeJS', 'OCaml', 'Redux', 'Rx',
		  ];

		  texts.push("Saving I.A.");
		  texts.push("Training I.A.");
		  texts.push("Saving I.A.");
		  texts.push("Training I.A.");
		  texts.push("Saving I.A.");
		  texts.push("Training I.A.");
		  texts.push("Saving I.A.");
		  texts.push("Training I.A.");

		  const counts = [1,2,4,5,4,2,1];

		  const options = {
		    tilt: Math.PI / 9,
		    initialVelocityX: 0.09,
		    initialVelocityY: 0.09,
		    initialRotationX: Math.PI * 0.14,
		    initialRotationZ: 0
		  };

		  wordSphere(canvas, texts, counts, options);
		   
		  /**
		   * WordSphere
		   * Written by Hyojun Kim in 2017. Licensed in MIT.
		   */
		  function wordSphere(canvas, texts, counts, options) {
		    const π = Math.PI; // happy math!
		    const {
		      width = 500,
		      height = 500,
		      radius = 150,
		      padding = 50,
		      fontSize = 22,
		      tilt = 0,
		      initialVelocityX = 0,
		      initialVelocityY = 0,
		      initialRotationX = 0,
		      initialRotationZ = 0,
		    } = options;
		    
		    let vx = initialVelocityX, vy = initialVelocityY;
		    let rx = initialRotationX, rz = initialRotationZ;
		    
		    // canvas setup
		    let ctx = canvas.getContext('2d'); 
		    ctx.textAlign = 'center';
		    
		    // Hi-DPI support
		    canvas.width = width * 2;
		    canvas.height = height * 2;
		    canvas.style.width = `${width}px`;
		    canvas.style.height = `${height}px`;
		    ctx.scale(2,2); 

		    // scrolling
		    let clicked = false, lastX, lastY;
		    canvas.addEventListener('mousedown', event => {
		      clicked = true;
		      lastX = event.screenX;
		      lastY = event.screenY;
		    });
		    canvas.addEventListener('mousemove', event => {
		      if (!clicked) return;
		      [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
		      [lastX, lastY] = [event.screenX, event.screenY];

		      // rotation update
		      rz += -dy * 0.01;
		      rx += dx * 0.01;

		      // velocity update
		      vx = dx * 0.1;
		      vy = dy * 0.1;

		      if (!looping) startLoop();
		    });
		    canvas.addEventListener('mouseup', e => clicked = false);
		    canvas.addEventListener('mouseleave', e => clicked = false);
		    
		    function rot(x,y,t) {
		      return [x*Math.cos(t)-y*Math.sin(t), x*Math.sin(t)+y*Math.cos(t)];
		    }

		    function render() {
		      ctx.clearRect(0, 0, canvas.width, canvas.height);

		      let ix = 0, iz = 0, i = 1;
		      for (const text of texts) {
		        const degZ = (π/(counts.length-1)) * iz;
		        const degX = (2*π/counts[iz]) * ix;

		        let x = radius * Math.sin(degZ) * Math.cos(degX);
		        let y = radius * Math.sin(degZ) * Math.sin(degX); 
		        let z = radius * Math.cos(degZ) + 8*(ix % 2) /* randomness */;

		        // camera transform
		        [y,z] = rot(y, z, tilt);
		        [x,z] = rot(x, z, rz);
		        [x,y] = rot(x, y, rx);

		        // convert to cartesian and then draw.
		        const alpha = 0.6 + 0.4 * (x/radius);
		        const size = fontSize + 2 + 5*(x/radius);
		        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
		        ctx.font = `${size}px "Helvetica Neue", sans-serif`;
		        ctx.fillText(text, y + width/2, -z + height/2);

		        ix--;
		        if (ix < 0) {
		          iz++;
		          ix = counts[iz] - 1;
		        }
		        i++;
		      }
		    }

		    // renderer
		    let looping = false;
		    function rendererLoop() {
		      if (looping) window.requestAnimationFrame(rendererLoop);
		      render();
		      
		      // deacceleration - dirty code xD
		      if (vx > 0) vx = vx - 0.01;
		      if (vy > 0) vy = vy - 0.01;
		      if (vx < 0) vx = vx + 0.01;
		      if (vy > 0) vy = vy + 0.01;
		      if (vx == 0 && vy == 0) stopLoop();
		      
		      rz += vy * 0.01;
		      rx += vx * 0.01;
		    }

		    function startLoop() {
		      looping = true;
		      window.requestAnimationFrame(rendererLoop);
		    }

		    function stopLoop() {
		      looping = false;
		    }
		    startLoop();
		  }
	}
});


class AnimateBar {
	constructor()
	{
		this.initial_progress = 0;
		this.step = 0;
		this.actual_progress = 0;
		this.final_progress = 100;
		this.phrases = ["Entrenando Inteligencia Artificial","Vinculando preguntas y respuestas","Finalizando...","¡Listo, intents guardados!"];

	}
	async setAnimation(callback)
	{
		$(".progress-bar").animate({'width':this.actual_progress +'%'}, {
			duration: 200,
			complete : function() {
				callback();
			}
		});
	}
	async stepBar(callback)
	{	
		setTimeout(()=>{
			if(this.step < this.phrases.length)
			{
				this.step++;

				this.actual_progress = (this.step * 100) / this.phrases.length;
			} else {
				this.actual_progress = this.final_progress;
			}
			
			this.setAnimation(callback);
		},2000);
	}
	_getRandom() { 
		return this.getRandom(this.actual_progress,this.final_progress);
	}
	getRandom(min, max) { 
	  return Math.floor(Math.random() * (max - min + 1) + min);
	}
}


class InputHelper {
	constructor()
	{
		this.element = null;
	}
	getElement()
	{
		return this.element;
	}
	setElement(element)
	{
		this.element = element;
	}
}