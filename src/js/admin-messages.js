$(document).ready(function(){
  let messages = new Messages;
  
  messages.__loadMessages();
  messages.loadMessages();

  window.activeMessage = function(chat_per_streaming_id) {
    messages.stopLoadMessages();
    messages.activeMessage((response)=>{
      if(response.s == 1) {
        location.reload();
      }
    },{chat_per_streaming_id:chat_per_streaming_id});
  }

  window.deleteMessage = function(chat_per_streaming_id,hash) {
    messages.stopLoadMessages();
    messages.deleteMessage((response)=>{
      if(response.s == 1) {
        location.reload();
      }
    },{hash:hash,chat_per_streaming_id:chat_per_streaming_id});
  }
});

class Messages extends Http {
  constructor()
  {
    super();
    this.interval = false;
    this.TIMER = 10000; // 10 secs
    this.options = {};
  }
  stopLoadMessages(){
    clearInterval(this.interval);
  }
  __loadMessages(){
    this._loadMessages((response)=>{
      $(".box-messages").html(response.html);
    },{streaming_connection_id:this.getVar("streaming_connection_id")});
  }
  loadMessages(){
    this.interval = setInterval(()=>{ 
      this.__loadMessages();
    },this.TIMER);
  }
  _loadMessages(callback,data){
    return this.call('../../app/application/load_messages.php',data,callback,false);
  }
  activeMessage(callback,data){
    return this.call('../../app/application/active_message.php',data,callback,false);
  }
  deleteMessage(callback,data){
    return this.call('../../app/application/delete_message.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};