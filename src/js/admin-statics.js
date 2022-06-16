$(document).ready(function(){
  let options = {useEasing: true, useGrouping: true, separator: ',', decimal: '.'};
  statics = new Statics;
  // getMostViewedComponents();
  // getMostViewedComputers();
  // getLastestVisitors();
  getRegisters();
  // getLoginsLogs();
  // getReffers();
  
  window.getLastestVisitors = function() {
    getLastestVisitors();
  }

  window.getRegisters = function() {
    getRegisters();
  }

  window.getReffers = function() {
    getReffers();
  }

  window.getLoginsLogs = function() {
    getLoginsLogs();
  }

  function getLastestVisitors() {
    statics.getLastestVisitors((response)=>{
      if(response.s == 1) {
        $('#visitor-organic').easyPieChart({
            barColor: "#222",
            animate: 2000
        });

        $('#visitor-facebook').easyPieChart({
            barColor: "#07A",
            animate: 3000
        });

        $('#visitor-google').easyPieChart({
            barColor: "#4caf50",
            animate: 4000
        });
        
        $('#visitor-google').data('easyPieChart').update(response.google);
        $('#visitor-facebook').data('easyPieChart').update(response.facebook);
        $('#visitor-organic').data('easyPieChart').update(response.organic);

        var amount_visitors_organic = new CountUp('amount-visitors-organic', 0, response.organic, 0, 2, options);
        if (!amount_visitors_organic.error) {amount_visitors_organic.start(); } else {   console.error(amount_visitors_organic.error); }
        var amount_visitors_facebook = new CountUp('amount-visitors-facebook', 0, response.facebook, 0, 2, options);
        if (!amount_visitors_facebook.error) {amount_visitors_facebook.start(); } else {   console.error(amount_visitors_facebook.error); }
        var amount_visitors_google = new CountUp('amount-visitors-google', 0, response.google, 0, 2, options);
        if (!amount_visitors_google.error) {amount_visitors_google.start(); } else {   console.error(amount_visitors_google.error); }
      }
    });
  }

  function getReffers() {
    statics.getReffers((response)=>{
      if(response.s == 1) {
        $(".box-users-reffers").html(response.html);
      }
    });
  }

  function getLoginsLogs() {
    statics.getLoginsLogs((response)=>{
      if(response.s == 1) {
        $(".box-users").html(response.html);
      }
    });
  }

  function getRegisters() {
    statics.getRegisters((response)=>{
      if(response.s == 1) {
        
        if(response.amount_registers_status == 1) {
          $(".box-actua-month").addClass("color-green");
          $("#amount-registers-status").html("+")
        } else  {
          $(".box-actua-month").addClass("color-red");
        }

        var amount_registers_total = new CountUp('amount-registers-total', 0, response.amount_registers_total, 0, 2, options);
        if (!amount_registers_total.error) {amount_registers_total.start(); } else {   console.error(amount_registers_total.error); }
        var amount_registers_actual_month = new CountUp('amount-registers-actual-month', 0, response.amount_registers_actual_month, 0, 2, options);
        if (!amount_registers_actual_month.error) {amount_registers_actual_month.start(); } else {   console.error(amount_registers_actual_month.error); }
        var amount_registers_last_month = new CountUp('amount-registers-last-month', 0, response.amount_registers_last_month, 0, 2, options);
        if (!amount_registers_last_month.error) {amount_registers_last_month.start(); } else {   console.error(amount_registers_last_month.error); }
      }
    });
  }

  window.getMostViewedComponents = function() {
    getMostViewedComponents();
    getMostViewedComputers();
  }

  function getMostViewedComponents() {
    statics.getMostViewedComponents((response)=>{
      if(response.s == 1) {
        $(".box-statics-components").html(response.html);
      }
    });
  }
  function getMostViewedComputers() {
    statics.getMostViewedComputers((response)=>{
      if(response.s == 1) {
        $(".box-statics-computers").html(response.html);
      }
    });
  }
});

class Statics extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  getReffers(callback,data){
    return this.call('../../app/application/get_reffers.php',data,callback,false);
  }
  getLoginsLogs(callback,data){
    return this.call('../../app/application/get_logins_logs.php',data,callback,false);
  }
  getRegisters(callback,data){
    return this.call('../../app/application/get_registers.php',data,callback,false);
  }
  getLastestVisitors(callback,data){
    return this.call('../../app/application/get_lastest_visitors.php',data,callback,false);
  }
  getMostViewedComponents(callback,data){
    return this.call('../../app/application/get_most_viewed_components.php',data,callback,false);
  }
  getMostViewedComputers(callback,data){
    return this.call('../../app/application/get_most_viewed_computers.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};