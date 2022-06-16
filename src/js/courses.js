$(document).ready(function(){
    let courses = new Courses;

    dinamicLoader.showLoader($("#response"));

    if(getParam("cid"))
    {
        courses.getCourse((response)=>{

            dinamicLoader.closeLoader();

            if(response.s === 1)
            {
                $("#response").html(response.html);
            }
        },{course_id:getParam("cid")});
    } else if(getParam("spcid")) {
        courses.getCourseSession((response)=>{

            dinamicLoader.closeLoader();

            if(response.s === 1)
            {
                $("#response").html(response.html);
            }
        },{session_per_course_id:getParam("spcid")});
    } else {
        courses.getListCourses((response)=>{

            dinamicLoader.closeLoader();

            if(response.s === 1)
            {
                $("#response").html(response.html);
            }
        });
    }

    window.enrrollInCourse = function(element,course_id)
    {
        dinamicLoader.showLoader(element);

        courses.enrrollInCourse((response)=>{
            dinamicLoader.closeLoader(element);
            if(response.s == 1)
            {
                // redirection to course
            }
        },{course_id:course_id});
    }
});

class Courses extends Http {
	constructor() {
		super();
	}
	getListCourses(callback,data){
    	return this.call("../../app/application/get_list_courses.php",data,callback);
	}
    getCourse(callback,data){
    	return this.call("../../app/application/get_course.php",data,callback);
	}
    enrrollInCourse(callback,data){
    	return this.call("../../app/application/enroll_in_course.php",data,callback);
	}
    getCourseSession(callback,data){
    	return this.call("../../app/application/get_course_session.php",data,callback);
	}
}


