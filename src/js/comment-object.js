class Comment extends Http
{
	constructor()
	{
		super();
	}
  	saveComment(callback,data){
    	return this.call('../../app/application/save_comment.php',data,callback,false);
  	}
}