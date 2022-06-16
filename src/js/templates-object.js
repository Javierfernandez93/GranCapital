class Templates extends Http {
  constructor()
  {
    super();
  }
  getTemplates(callback,data){
    return this.call("../../app/application/get_templates.php",data,callback,false);
  }
  getTemplate(callback,data){
    return this.call("../../app/application/get_template.php",data,callback,false);
  }
  getTemplateFromSheet(callback,data){
    return this.call("../../app/application/get_template_from_sheet.php",data,callback,false);
  }
  assingTemplateToSheet(callback,data){
    return this.call("../../app/application/assing_template_to_sheet.php",data,callback,false);
  }
  saveTemplateThumbnail(callback,data){
    return this.call("../../app/application/save_template_thumbnail.php",data,callback,false,0,"POST");
  }
}