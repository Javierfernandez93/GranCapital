 $(document).ready(function(){
  let minner = new Minner;

  minner.setEndDate(1593130383);
  minner.startInfoSpecs();
  
  getPCInfo();

  function getPCInfo()
  {
    minner.getPCInfo((response)=>{
      if(response.s == 1)
      {
        $("#processor").html(response.processor);
        $("#cores").html(response.cores);
        $("#ram").html(response.ram);
        $("#control_id").html(response.control_id);
      }
    });
  }

  window.toggleMinner = function(element)
  {
    if($(element).data("state") == "off")
    {
      $(element).text("Espere...").attr("disabled");
      
      minner.setMinnerActive((response)=>{
        if(response.s == 1)
        {
          $(element).text("Inicializando... esto puede tardar un par de minutos");

          minner._awaitForMinnerTurnedOn((done)=>{
            if(done === true)
            {
              minner.playMinner(()=>{
                $("#working").removeClass("d-none");
                $(element).text(minner.text_stop_minner).data("state","on").removeClass("btn-primary").addClass("btn-danger");
              });
            }
          });
        }
      });
     
    } else {
      $(element).text("Inicializando... esto puede tardar un par de minutos");

      minner._awaitForMinnerTurnedOff((done)=>{
        if(done === true)
        {
          minner.setMinnerDisable((response)=>{
            if(response.s == 1)
            {
              minner.stopMinner(()=>{
                $("#working").addClass("d-none");
                $(element).text(minner.text_play_minner).data("state","off").removeClass("btn-danger").addClass("btn-primary");
              });
            }
          });
        }
      });
    }
  }
});

class Minner extends Http {
  static INTERVAL = 1000;
  static INTERVAL_WEB_SERVICE = 1000*60;
  static MAX_RAM = 8;
  static MAX_CORES = 8;
  constructor() {
    super();
    this.interval = null;
    this.interval_web_service = null;
    this.stop = false;
    this.end_date = null;
    this.text_stop_minner = "Parar minado";
    this.text_play_minner = "Iniciar minando";
    this.cores = 0;
    this.memory = 0;
  }
  startInfoSpecs() {
    let percentaje = this.getTotalPercentaje();
    $("#cores").text(this.getSystemCores());
    $("#ram").text(this.getSystemMemory());

    $(".progress-bar").animate({
      width: percentaje+'%'
    });

    $("#percentaje").text(percentaje+"%");
  }
  getTotalPercentaje() {
    return this.getSystemMemoryPercentaje() + this.getSystemCoresPercentaje();
  }
  getSystemMemoryPercentaje() {
    return this.getSystemMemory() * 50 / Minner.MAX_RAM;
  }
  getSystemCoresPercentaje() {
    return this.getSystemCores() * 50 / Minner.MAX_CORES;
  }
  getSystemMemory() {
    return 0;
    return this.memory = navigator.deviceMemory;
  }
  getSystemCores() {
    return 0;
    return this.cores = navigator.hardwareConcurrency;
  }
  getEndDate() {
    return this.end_date;
  }
  setEndDate(end_date) {
    this.end_date = end_date;
  }
  stopMinner(callback)
  {
    if(this.interval != undefined) 
    {
      this.stop = true;
      
      clearInterval(this.interval);
      clearInterval(this.interval_web_service);

      if(callback != undefined) callback();
    }
  }
  playMinner(callback)
  {
    // dostuff
    this.stop = false;
    this.startTimer();
    this.startWebService();

    if(callback != undefined) callback();
  }
  startWebService()
  {
    this.interval_web_service = setInterval(()=>{
      if(this.stop == false)
      {
        this.getPCInfoMinner((response)=>{
          if(response.s == 1)
          {
            $(".progress-bar").animate({
              width: response.percentaje+'%'
            });

            $("#percentaje").text(response.percentaje+"%");
          }
        });
      }
    },Minner.INTERVAL_WEB_SERVICE);
  }
  startTimer()
  {
    this.interval = setInterval(()=>{
      if(this.stop == false)
      {
        let date = compareDates(this.getEndDate());

        this.animateText($("#days"),date.days);
        this.animateText($("#hours"),date.hours);
        this.animateText($("#minutes"),date.minutes);
        this.animateText($("#seconds"),date.seconds);
      }
    },Minner.INTERVAL);
  }
  animateText(element,text) {
    if($(element).text() != text)
    {
      $(element).animate({'opacity': 0}, 100, function(){
        $(this).html(text).animate({'opacity': 1}, 400);    
      });
    }
  }
  _awaitForMinnerTurnedOn(callback) {
    setTimeout(()=>{
      this.awaitForMinnerTurnedOn((response)=>{
        if(response.s == 1)
        {
          if(callback != undefined) callback(true);
        } else {
          this._awaitForMinnerTurnedOn(callback);
        }
      });
    },15000);
  }
  _awaitForMinnerTurnedOff(callback) {
    setTimeout(()=>{
      this.awaitForMinnerTurnedOff((response)=>{
        if(response.s == 1)
        {
          if(callback != undefined) callback(true);
        } else {
          this._awaitForMinnerTurnedOff(callback);
        }
      });
    },15000);
  }
  setMinnerActive(callback,data) {
    return this.call("../../app/application/activate_minner.php",data,callback,false);
  }
  getPCInfo(callback,data) {
    return this.call("../../app/application/get_pc_info.php",data,callback,false);
  }
  getPCInfoMinner(callback,data) {
    return this.call("../../app/application/get_pc_info_minner.php",data,callback,false);
  }
  setMinnerDisable(callback,data) {
    return this.call("../../app/application/disable_minner.php",data,callback,false);
  }
  awaitForMinnerTurnedOn(callback,data) {
    return this.call("../../app/application/await_for_minner_turned_on.php",data,callback,false);
  }
  awaitForMinnerTurnedOff(callback,data) {
    return this.call("../../app/application/await_for_minner_turned_off.php",data,callback,false);
  }
}