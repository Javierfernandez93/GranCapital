$(document).ready(function(){
  let scheduleJob = new ScheduleJob;

  scheduleJob.init();

  window.closeSchedulePending = function()
  {
    $(".schedule-job-overlay").addClass("d-none");
  }
});

class ScheduleJob extends Http {
  constructor() {
    super();

    this.schedule_pendings = null;
    this.INTERVAL = 5000;
    this.LIMIT_MINUTS = 5;
    this.BUSY = false;
  }
  startJob() {
    this.interval = setInterval(()=>{ 
      this.getSchedulePendings().forEach((schedule_pending,key)=>{
        if(this.BUSY == false)
        {
          let startTime = unixToDate(schedule_pending.programated_date)
          let minutes = diferenceInMinutes(startTime,endTime);
          
          if(minutes <= this.LIMIT_MINUTS) 
          {
            this.BUSY = true;
            this.showAlertSchedule(schedule_pending);
            clearInterval(this.interval);
          }
        
        }
      });
    }, this.INTERVAL);
  }
  showAlertSchedule(schedule_pending) {
    if(schedule_pending != undefined)
    {
      this.getPendingVideoconsultingTemplate((response)=>{
        if(response.s == 1)
        {
          $(".schedule-job-overlay").removeClass("d-none").html(response.html);
        }
      },{schedule_pending:schedule_pending});
    }
  }
  getSchedulePendings() {
    return this.schedule_pendings;
  }
  setSchedulePendings(schedule_pendings) {
    this.schedule_pendings = schedule_pendings;
  }
  init() {
    this.getPendingVideoconsulting((response)=>{
      if(response.s == 1) {
        this.setSchedulePendings(response.schedule_pendings);
        this.startJob();
      }
    });
  }
  getPendingVideoconsulting(callback,data){
    return this.call("../../app/application/get_pending_videoconsulting_premium.php",data,callback,false);
  }
  getPendingVideoconsultingTemplate(callback,data){
    return this.call("../../app/application/get_pending_videoconsulting_template_premium.php",data,callback,false);
  }
}