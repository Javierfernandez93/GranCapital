$(document).ready(function(){
  let movie = new Movie;

  $("body").on("click","#upload-image",function(){
    $("#"+$(this).data("image")).click();
  });

  $('body').on('change',".input-image",function(){
    let _this = this;

    readMultipleFiles(this.files).then((images)=>{
      for (var i = 0; i < images.length; i++) {
        let div = $("<div/>",{
          class:"col-md-6 mt-4"
        });

        let img = $("<img/>",{
          src:images[i],
        }).css({"width":"100%"})

        div.append(img);
        
        $(".box-images").append(div);
      }
    }).catch((err)=>{
        console.error("Well that sucks:", err);
    });
    
    var file = _this.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      $("[data-image='"+$(_this).attr("id")+"']").attr("src",reader.result);
    }
    
    reader.readAsDataURL(_this.files[0]);
  });

  function readMultipleFiles(files){
    var results = [];
    
    var promises = Array.from(files, function(file){
      return readFile(file)
      .then(function(data){
          results.push(data);
          // Implicitely return undefined. Data is already in results
      });
    });
    
    return Promise.all(promises)
    .then(function(_){ // Don't care about the array of undefineds
        return results;
    });
  }

  function readFile(file){
    return new Promise(function(resolve, reject){
      var reader = new FileReader();
      reader.onloadended = function(){
        resolve(reader.result);
      }
      reader.onload = function(evt){
        resolve(evt.target.result);
      };
      reader.onerror = function(err) {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }


  window.addId = function(fileId) {
    $("#fileId").val(fileId);
  }
  
  window.addIntoLink = function(element,link) {
    $(element).html("Añadido");
    $("#link").val(link);
  }

  window.getMoviesDir = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    movie.getMoviesDir((response)=>{
      if(response.s == 1) {
        $(element).removeAttr("disabled").html("Listo");
        $(".box-movies").html(response.html);
      }
    });
  }

  window.getCoincidences = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    movie.getCoincidences((response)=>{
      if(response.s == 1) {
        $(element).removeAttr("disabled").html("Listo");
        $(".box-movies-uploaded").html(response.html);
      }
    },{movie:$("#movie").val()});
  }

  window.generateId = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    movie.generateId((response)=>{
      if(response.s == 1) {
        $(element).removeAttr("disabled").html("Listo");
        $("#fileId").val(response.token);
      }
    });
  }

  window.saveMovie = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    movie.saveMovie((response)=>{
      if(response.s == 1)
      {
        $.each($("input[type=file]"),(k,input)=>{
          let data = new FormData();
          let files = input.files;

          if(files.length) {
            $.each(files, (key, value)=>{
                data.append(key, value);
                data.append("movie_id",response.movie_id);
            });

            movie.saveMovieImage((response)=>{
              $(element).html("Listo");
            },data);
          }
        });    

      }
    },{link:$("#link").val(),year:$("#year").val(),movie:$("#movie").val(),description:$("#description").val(),fileId:$("#fileId").val(),link_movie_id:$("#link_movie_id").val()});
  }
  window.getMoviesUploaded = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    movie.getMoviesUploaded((response)=>{
      if(response.s == 1)
      {
        $(element).html("¡Listo!").removeAttr("disabled").removeClass("btn-primary").addClass("btn-success");
        $(".box-movies-uploaded").html(response.html);  
      }
    });
  }

  window.updateVideosLinks = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    movie.updateVideosLinks((response)=>{
      if(response.s == 1)
      {
        $(element).html("¡Listo!").removeAttr("disabled").removeClass("btn-primary").addClass("btn-success");
        setTimeout(()=>{location.reload()},1000);
      }
    });
  }

  window.updateVideoLink = function(element,movie_id) {
    $(element).html("Espere...").attr("disabled",true);
    let link = $(element).parent().parent().parent().parent().parent().find(".link").val();
    movie.updateVideoLink((response)=>{
      if(response.s == 1)
      {
        $(element).html("¡Listo!").removeAttr("disabled").removeClass("btn-primary").addClass("btn-success");
        setTimeout(()=>{location.reload()},1000);
      }
    },{movie_id:movie_id,link:link});
  }
});

class Movie extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  saveMovieImage(callback,data){
    return this.callFile('../../app/application/save_movie_image.php',data,callback,false);
  }
  getCoincidences(callback,data){
    return this.call('../../app/application/get_coincidences_movie.php',data,callback,false);
  }
  generateId(callback,data){
    return this.call('../../app/application/generate_id.php',data,callback,false);
  }
  saveMovie(callback,data){
    return this.call('../../app/application/pcloud/example/save_movie.php',data,callback,false);
  }
  getMoviesDir(callback,data){
    return this.call('../../app/application/get_movies_dir.php',data,callback,false);
  }
  getMoviesUploaded(callback,data){
    return this.call('../../app/application/pcloud/example/get_movies_uploaded.php',data,callback,false);
  }
  updateVideosLinks(callback,data){
    return this.call('../../app/application/pcloud/example/update_videos_links.php',data,callback,false);
  }
  updateVideoLink(callback,data){
    return this.call('../../app/application/update_video_link.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};