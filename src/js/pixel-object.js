$(document).ready(function(){
	// setTimeout(()=>{
	// 	makeScreenShoot();
	// },4000);
});

class Pixel extends Http {
	constructor() {
		super();
		this.vars = null;
	}
	getVars() {
		return this.vars;
	}
	setVars(vars) {
		this.vars = vars;
	}
    saveProspect(callback,data){
    	return this.call("../../app/application/save_prospect.php",data,callback);
 	}
 	getVarsForSavePixel(callback,data){
    	return this.call("../../app/application/get_vars_for_save_pixel.php",data,callback);
 	}
 	saveProspectPixel(callback,data){
    	return this.call("../../app/application/save_prospect_pixel.php",data,callback);
 	}
}