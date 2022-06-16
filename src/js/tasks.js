$(document).ready(function(){
	let tasks = new Tasks;
  let taskUrgency = new TaskUrgency;
  let taskList = new TaskList;

  $("body").tooltip({ selector:'[data-toggle=tooltip]'});

  getTasks($(".response"));

  dinamicLoader.showLoader($(".response"));

  window.saveTask = function(element)
  {
    dinamicLoader.show(element,"preloader-sm-success");

    let id = $(element).parent().parent().attr("id");
    let taskAttr = taskList.getElementByUniqueId(id);

    tasks.saveTask((response)=>{
      dinamicLoader.close();

      if(response.s == 1)
      {
        getTasks($(".response"),tasks.getCompanyId());
      }
    },{status:taskAttr.getStatus(),user_login_id:taskAttr.getUserLoginId(),task:taskAttr.getTask(),catalog_task_id:taskAttr.getCatalogTaskId(),catalog_task_urgency_id:taskAttr.getCatalogTaskUrgencyId(),programated_date:taskAttr.getProgramatedDate()});
  }

  window.setProgramatedDate = function(element)
  {
    let id = $(element).parent().parent().attr("id");
    let taskAttr = taskList.getElementByUniqueId(id);

    taskAttr.setProgramatedDate($(element).val());

    checkFields(id,taskAttr);
  }

  window.setTaskName = function(element)
  {
    let id = $(element).parent().parent().parent().parent().parent().attr("id");
    let taskAttr = taskList.getElementByUniqueId(id);

    taskAttr.setTask($(element).val());

    checkFields(id,taskAttr);
  }
    
  function checkFields(unique_id,taskAttr)
  {
    $("body").find("#"+unique_id).find(".btn-save").attr("disabled",true);

    if(!taskAttr.getTask())
    {
      return false;
    }

    if(!taskAttr.getProgramatedDate())
    {
      return false;
    }

    if(!taskAttr.getCatalogTaskId())
    {
      return false;
    }

    $("body").find("#"+unique_id).find(".btn-save").removeAttr("disabled");
  }

  window.setTaskStatus = function(element,STATUS)
  {
    let btn_group = $(element).parent().parent().parent();

    $(btn_group).removeClass("bg-success bg-warning bg-primary bg-danger").addClass(tasks.getBgColor(STATUS));
    $(btn_group).find(".dropdown-toggle").removeClass("bg-success bg-warning bg-primary bg-danger").addClass(tasks.getBgColor(STATUS)).text(tasks.getStatusName(STATUS));

    let id = $(element).parent().parent().parent().parent().attr("id");
    let taskAttr = taskList.getElementByUniqueId(id);

    taskAttr.setStatus(STATUS);

    checkFields(id,taskAttr);
  }

  window.setCatalogTaskUrgencyId = function(element,catalog_task_urgency_id)
  {
    let btn_group = $(element).parent().parent().parent();

    $(btn_group).removeClass("bg-success bg-warning bg-danger").addClass(taskUrgency.getPriorityClass(catalog_task_urgency_id));
    $(btn_group).find(".dropdown-toggle").removeClass("bg-success bg-warning bg-danger").addClass(taskUrgency.getPriorityClass(catalog_task_urgency_id)).text(taskUrgency.getUrgencyName(catalog_task_urgency_id));

    let id = $(element).parent().parent().parent().parent().attr("id");
    let taskAttr = taskList.getElementByUniqueId(id);

    taskAttr.setCatalogTaskUrgencyId(catalog_task_urgency_id);

    checkFields(id,taskAttr);
  }

  window.setCatalogTaskId = function(element)
  {
    let id = $(element).parent().parent().parent().parent().parent().attr("id");
    let taskAttr = taskList.getElementByUniqueId(id);

    taskAttr.setCatalogTaskId($(element).val());

    checkFields(id,taskAttr);
  }

  window.setTaskAsReady = function(element,task_per_user_id)
  {
    tasks.setTaskAsReady((response)=>{
      if(response.s == 1)
      {
        getTasks($(".response")); 
      }
    },{task_per_user_id:task_per_user_id});
  }

  window.setTaskAsWorking = function(element,task_per_user_id)
  {
    tasks.setTaskAsWorking((response)=>{
      if(response.s == 1)
      {
        getTasks($(".response")); 
      }
    },{task_per_user_id:task_per_user_id});
  }

  window.setTaskAsStoped = function(element,task_per_user_id)
  {
    tasks.setTaskAsStoped((response)=>{
      if(response.s == 1)
      {
        getTasks($(".response")); 
      }
    },{task_per_user_id:task_per_user_id});
  }

  window.setTaskAsDeleted = function(element,task_per_user_id)
  {
    tasks.setTaskAsDeleted((response)=>{
      if(response.s == 1)
      {
        getTasks($(".response")); 
      }
    },{task_per_user_id:task_per_user_id});
  }

  window.saveCommentTask = function(event,element,task_per_user_id,reply_comment_per_task_id)
  {
    if(event.keyCode == 13)
    {
      event.preventDefault();

      saveCommentTask(element,$(element).val(),task_per_user_id,reply_comment_per_task_id);
    } 
  }  

  function saveCommentTask(element,comment,task_per_user_id,reply_comment_per_task_id)
  {
    tasks.saveCommentTask((response)=>{
      if(response.s == 1)
      {
          getCommentsByTaskSingle(element,task_per_user_id);
      }
    },{task_per_user_id:task_per_user_id,comment,comment,reply_comment_per_task_id:reply_comment_per_task_id});
  }

  window.getCommentsByTaskSingle = function(element,task_per_user_id)
  {
    getCommentsByTaskSingle(element,task_per_user_id);
  }

  window.getCommentsByTask = function(element,task_per_user_id)
  {
    getCommentsByTask(element,task_per_user_id);
  }

  function getCommentsByTask(element,task_per_user_id)
  {
    dinamicLoader.showLoader(element,"preloader-sm-success");

    showLeftAlertWS('getCommentsByTask',(response)=>{
      dinamicLoader.hide();
    },{task_per_user_id:task_per_user_id});
  }

  function getCommentsByTaskSingle(element,task_per_user_id)
  {
    dinamicLoader.showLoader($(".card-body-special-alert"));

    tasks.getCommentsByTask((response)=>{
      
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".card-body-special-alert").html(response.html);
      }
    },{task_per_user_id:task_per_user_id});
  }

  window.addTask = function(element)
  {
    $("#advise").addClass("d-none");
    $("#table-task").removeClass("d-none");

    let id = getUniqueId();
    dinamicLoader.showLoader(element);

    tasks.addTask((callback)=>{  
      let taskAttr = new TaskAttr;
      taskAttr.setUniqueId(id);
      taskAttr.setUserLoginId(tasks.getCompanyId());
      taskList.add(taskAttr);

      dinamicLoader.close();
    },id);
  }

  window.getTasks = function(element,company_id)
  {
    tasks.setCompanyId(company_id);
    getTasks(company_id);
  }

  window.getTasksImageLoader = function(element,company_id)
  {
    tasks.setCompanyId(company_id);
    getTasksImageLoader(element,company_id);
  }

  function getTasksImageLoader(element,company_id = false)
  {
    getTasks($(element).find("#names"),company_id)
  }

  function getTasks(element,company_id = false)
  {
    dinamicLoader.showLoader(element,"preloader-sm-black");

    tasks.getTasks((response)=>{
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".response").html(response.html);
      }
    },{company_id:company_id});
  }
});

class Tasks extends Http {
  static CANCELED = -2;
  static STOPED = -1;
  static MAKED = 0;
  static WORKING = 1;
  static DONE = 2;
  constructor()
  {
    super();
    this.company_id = false;
  }
  getBgColor(status) {
    if(status == Tasks.DONE) {
      return "bg-success";
    } else if(status == Tasks.WORKING) {
      return "bg-primary";
    } else if(status == Tasks.STOPED) {
      return "bg-danger";
    } else if(status == Tasks.CANCELED) {
      return "bg-warning";
    }
  }
  getStatusName(status) {
    if(status == Tasks.DONE) {
      return "Listo";
    } else if(status == Tasks.WORKING) {
      return "En proceso";
    } else if(status == Tasks.STOPED) {
      return "Estancado";
    } else if(status == Tasks.CANCELED) {
      return "Cancelado";
    }
  }
  getCompanyId() {
    return this.company_id;
  }
  setCompanyId(company_id) {
    this.company_id = company_id;
  }
  addTask(callback,id) {
    let tr = $("#clone").clone("text-center");
    tr.removeClass("d-none");
    tr.attr("id",id);

    $("tbody").append(tr);

    tr.find("#task_name").focus();

    if(callback != undefined) setTimeout(()=>{ callback(true); }, 500);
  }
  saveTask(callback,data){
    return this.call("../../app/application/save_task.php",data,callback);
  }
  saveCommentTask(callback,data){
    return this.call("../../app/application/save_comment_task.php",data,callback);
  }
  getTasks(callback,data){
    return this.call("../../app/application/get_tasks.php",data,callback);
  } 
  getCommentsByTask(callback,data){
    return this.call("../../app/application/get_comments_by_task.php",data,callback);
  } 
  setTaskAsReady(callback,data){
    return this.call("../../app/application/set_task_as_ready.php",data,callback);
  } 
  setTaskAsWorking(callback,data){
    return this.call("../../app/application/set_task_as_working.php",data,callback);
  } 
  setTaskAsStoped(callback,data){
    return this.call("../../app/application/set_task_as_stoped.php",data,callback);
  } 
  setTaskAsDeleted(callback,data){
    return this.call("../../app/application/set_task_as_deleted.php",data,callback);
  } 
};

class TaskList
{
  constructor()
  {
    this.list = [];
  } 
  exist(_element)
  {
    let exist = false;
    
    this.getList().forEach((element,key)=>{
      if(element.getUniqueId() == _element.getUniqueId())
      {
        exist = true;
      }
    });

    return exist;
  }
  searchElementByUniqueId(unique_id)
  {
    let _key = false;
      
    this.getList().forEach((element,key)=>{
      if(element.getUniqueId() == unique_id)
      {
        _key = key;
      }
    });

    return _key;
  }
  getElementByUniqueId(unique_id)
  {
    let i = this.searchElementByUniqueId(unique_id);

    if(i !== false)
    {
      return this.getElement(i);
    }
  }
  getElement(i)
  {
    return this.getList()[i];
  }
  add(element)
  {
    if(this.exist(element) == false)
    {
      this.list.push(element);
    }
  }
  setList(list)
  {
    this.list = list;
  }
  getList()
  {
    return this.list;
  }
}

class TaskAttr
{
  constructor()
  {
    this.unique_id = null;
    this.task_per_user_id = null;
    this.task = null;
    this.catalog_task_id = null;
    this.catalog_task_urgency_id = null;
    this.programated_date = null;
    this.from_user_login_id = null;
    this.user_login_id = null;
    this.status = null;
  }
  setUniqueId(unique_id)
  {
    this.unique_id = unique_id;
  }
  setTaskPerUserId(task_per_user_id)
  {
    this.task_per_user_id = task_per_user_id;
  }
  setTask(task)
  {
    this.task = task;
  }
  setCatalogTaskId(catalog_task_id)
  {
    this.catalog_task_id = catalog_task_id;
  }
  setCatalogTaskUrgencyId(catalog_task_urgency_id)
  {
    this.catalog_task_urgency_id = catalog_task_urgency_id;
  }
  setProgramatedDate(programated_date)
  {
    this.programated_date = programated_date;
  }
  setFromUserLoginId(from_user_login_id)
  {
    this.from_user_login_id = from_user_login_id;
  }
  setUserLoginId(user_login_id)
  {
    this.user_login_id = user_login_id;
  }
  setStatus(status)
  {
    this.status = status;
  }
  getUniqueId()
  {
    return this.unique_id;
  }
  getTaskPerUserId()
  {
    return this.task_per_user_id;
  }
  getTask()
  {
    return this.task;
  }
  getCatalogTaskId()
  {
    return this.catalog_task_id;
  }
  getCatalogTaskUrgencyId()
  {
    return this.catalog_task_urgency_id;
  }
  getProgramatedDate()
  {
    return this.programated_date;
  }
  getFromUserLoginId()
  {
    return this.from_user_login_id;
  }
  getUserLoginId()
  {
    return this.user_login_id;
  }
  getStatus()
  {
    return this.status;
  }
  isCompleteTask()
  {
    if(this.getUniqueId() == null)
    {
      return false;
    }

    if(this.getTaskPerUserId() == null)
    {
      return false;
    }

    if(this.getTask() == null)
    {
      return false;
    }

    if(this.getCatalogTaskId() == null)
    {
      return false;
    }

    if(this.getCatalogTaskUrgencyId() == null)
    {
      return false;
    }

    if(this.getProgramatedDate() == null)
    {
      return false;
    }

    if(this.getFromUserLoginId() == null)
    {
      return false;
    }

    if(this.getUserLoginId() == null)
    {
      return false;
    }

    return true;
  }
}

class TaskUrgency
{
  static LOW = 1;
  static MIDDLE = 2;
  static HIGH = 3;
  getPriorityClass(catalog_task_urgency_id) {
    if(catalog_task_urgency_id == TaskUrgency.LOW)
    {
      return "bg-success";
    } else if(catalog_task_urgency_id == TaskUrgency.MIDDLE) {
      return "bg-warning";
    } else if(catalog_task_urgency_id == TaskUrgency.HIGH) {
      return "bg-danger";
    }
  }
  getUrgencyName(catalog_task_urgency_id) {
    if(catalog_task_urgency_id == TaskUrgency.LOW)
    {
      return "Baja";
    } else if(catalog_task_urgency_id == TaskUrgency.MIDDLE) {
      return "Media";
    } else if(catalog_task_urgency_id == TaskUrgency.HIGH) {
      return "Alta";
    }
  }
}