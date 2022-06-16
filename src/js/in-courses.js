$(document).ready(function(){
    let courses = new Courses;

    dinamicLoader.showLoader($("#response"));

    courses.getMineCourses((response)=>{

        dinamicLoader.closeLoader();

        if(response.s === 1)
        {
            $("#response").html(response.html);
        }
    },{course_id:getParam("cid")});
});

class Courses extends Http {
	constructor() {
		super();
	}
	getMineCourses(callback,data){
    	return this.call("../../app/application/get_mine_courses.php",data,callback);
	}
}