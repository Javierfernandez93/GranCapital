 $(document).ready(function() {
	let cine = new Cine;

	cine.getVideoLink((response)=>{
		if(response.s == 1){
			var video = document.getElementById("video");

			document.getElementById("source").src = response.link;
  		video.load();
  		$("#link").attr("href",response.link).html(response.link);
			$("#video").on('timeupdate', function() {
				console.log($("#video")[0].currentTime);
				console.log(video)
    		// $('.current').text(video[0].currentTime);
			});
		}
	},{movie_id:60});
});

class Cine extends Http {
	constructor()
	{
		super();
		this.options = {};
	}
	getVideoLink(callback,data){
		return this.call('../../app/application/get_video_link.php',data,callback);
	}
}