class Image {
	constructor()
	{
		this.image_element = '#box-img-upload';
		this.file_element = '#image';
	}
	setPreloaded(callback){
		callback($(this.image_element).html('<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'))
	}
	uploadImage(data){
		$(this.file_element).click();
		$(this.file_element ).change(()=>{
			this.setPreloaded(()=>{
				this.upload((response)=>{
					$(this.image_element).html("<img style='width:100%;' src='"+response+"'/>");
					$(this.file_element+'_val').val(response);
				});
			});
		});
	}
	upload(callback,data){
		let form = new FormData();
		var file = $(this.file_element)[0].files[0];
		var reader = new FileReader();
	  reader.onloadend = function() {
	    callback(reader.result)
	  };
	  reader.readAsDataURL(file);
		// form.append("file",$(this.file_element)[0].files[0]);	

		// let fileContent = $.ajax({
		// 	data: form,
		// 	url: '../../app/application/upload_image.php',
		// 	async:false,
		// 	type: "POST",
		// 	cache: false,
		// 	contentType: false,
		// 	processData: false
		// }).responseText;

		// callback(fileContent);
	}
}