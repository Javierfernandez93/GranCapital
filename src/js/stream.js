jwplayer.key = "iW9XczQqRIYrv2ZuqnxixqeRQ7HPLuLhpWYHtYtL20E=";

$(document).ready(function(){
  let channel = new Channel;
  let timer = new Timer;
  let ad = new Ad;
  let stream = new Stream;

  timer.debug = 2;

  wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       false,       // default
    live:         true        // default
  });
  wow.init();
  
  stream.getActiveStreaming();

  ad.startShowingAds();
  timer.startCount();

  window.loadStreaming = function(link,channel) {
    stream.loadStreaming(link,channel);
    $(".box-channels").addClass("hide");
  };
  window.showChannelList = function() {
    channel.getChannelsList((response)=>{
      if(response.s == 1) {
        $(".box-channels").removeClass("hide").html(response.html)
      }
    });
  }
});

class Channel extends Http {
  constructor() {
    super();
    this.element = "#box-channel";
    this.channel_name = "Undefined";
    this.pin_channel = false;
  }
  showChannel(channel_name) {
    this.channel_name = channel_name;
    $(this.element).removeClass("hide").html(this.channel_name);
  }
  getChannelsList(callback,data){
    return this.call('../../app/application/get_channels_list.php',data,callback,false);
  }
}
class Timer {
  constructor() {
    this.DEBUG_CONSOLE = 1;
    this.DEBUG_HTML = 2;
    this.debug = 1;
    this.i = 1;
    this.element = "#box-debug-time";
    this.interval = false;
  }
  startCount() {
    this.interval = setInterval(()=>{ 
      switch(this.debug)
      {
        case this.DEBUG_CONSOLE:
          console.info(this.secondsToMinutes(this.i));
        break;
        case this.DEBUG_HTML:
          $(this.element).removeClass("hide").html(this.secondsToMinutes(this.i));
        break;
      }
      
      this.i++;
    },1000);
  }
   stopCount(){
    clearInterval(this.interval);
  }
  secondsToMinutes(time){
    var minutes = "0" + Math.floor(time / 60);
    var seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }
}
class Ad extends Http {
  constructor()
  {
    super();
    this.element = ".box-banners";
    this.interval_ad = false;
    this.interval_ads = false;
    this.ads = false;
    this.TIMER_INTERVAL = (1000 * 60) * 15; // 15 minutes
    this.TIMER_SLEEP = 10000; // 10 seconds
    this.TIMER = 10000;
    this.index = 0;
    this.round = 0;
    this.rounds = 1;
    this.options = {};
  }
  setNextIndex(){
    if(this.index < this.ads.length-1) {
      this.index ++;
    } else {
      this.index = 0;
      this.round++;
    }
  }
  deleteAdContainer(){
    $(this.element).addClass("hide");
  }
  stopAds(){
    this.round = 0;
    this.deleteAdContainer();
    clearInterval(this.interval_ad);
  }
  showAd(ad){
    let _class = (this.index%2 == 0) ? "fadeInLeft" : "fadeInUp";

    let div_row = $("<div/>",{ 
         class: "box-main-ad wow row " + _class 
      }
    );
    let div_col = $("<div/>",{ 
         class: "box-main-ad bg-green py-2 col-md-6 px-4 offset-md-3" 
      }
    );
    let div_inside = $("<div/>",{ 
         class: "row" 
      }
    );
    let div_image = $("<div/>",{ 
         class: "text-center col-md-2" 
      }
    );
    let image = $("<div/>",{ 
         class: "ad-logo-round",
         css : {
           'background-image':"url("+ad.logo+")"
         }
      }
    );
    let div_text_main = $("<div/>",{ 
         class: "text-left col-md-10",
      }
    );
    let div_text = $("<div/>",{ 
         class: "row box-vertical-center",
         css : {
           "height": "100%"
         }
      }
    );
    let div_text_child = $("<div/>",{ 
         class: "col-md-12",
      }
    );
    let p_name = $("<p/>",{ 
         class: "lead my-0 text-white",
         text : ad.name
      }
    );
    let p_message = $("<p/>",{ 
         class: "lead my-0 text-white",
         text : ad.message
      }
    );
    div_text_main.append(div_text);
    div_text.append(div_text_child);
    div_text_child.append(p_name);
    div_text_child.append(p_message);
    div_image.append(image);
    div_inside.append(div_image);
    div_inside.append(div_text_main);
    div_col.append(div_inside);
    div_row.append(div_col);

    $(this.element).html(div_row);
  }
  showAds(){
    setTimeout(()=>{
      console.log("starting to execute...");
      this.interval_ads = setInterval(()=>{ 
        console.log("showing ads...");
        this.interval_ad = setInterval(()=>{ 
          
          $(this.element).removeClass("hide");
          
          if(this.round <= this.rounds)
          {
            this.showAd(this.ads[this.index]);
            this.setNextIndex();
          } else {
            this.stopAds();
          }
        },this.TIMER);
      },this.TIMER_INTERVAL);
    },this.TIMER_SLEEP);
  }
  startShowingAds(){
    this.getAdsStreaming((response)=>{
      if(response.s == 1)
      {
        this.ads = response.ads;
        this.showAds();
      }
    },{token:this.getVar("token"),key:this.getVar("key")});
  }
  getAdsStreaming(callback,data){
    return this.call('../../app/application/get_ads_streaming.php',data,callback,false);
  }
}

class Stream extends Http {
  constructor()
  {
    super();
    this.video = "streaming";
    this.channel = new Channel;
    this.options = {};
  }
  loadStreaming(list,channel){

    jwplayer(this.video).setup({
      sources: [
        {file: list},
       // {file: "rtmps://stream8.mexiserver.com:443/mtkcloud/mtkcloud"}
      ],
      rtmp: {
        bufferlength: 3,
      },
      autostart: 'true',
      title : channel,
      width: '100%',
      aspectratio: '4:2.26',
      image: "../../src/img/bg-live-loading.png",
      stretching : "exactfit",
      fallback: true,
      androidhls: true,
      primary: 'html5',
      volume: 100
    }).on('error', ()=>{
      jwplayer(this.video).load({
        file:"http://futexperto.com/apps/stream/3.mp4",
        image: "../../src/img/logo.png",
      });
      jwplayer(this.video).play();
      this.getActiveStreaming();
    });

    this.channel.showChannel(channel);

    // console.log(jwplayer(this.video).getCurrentQuality());
    // jwplayer(this.video).setCurrentQuality(-100);
    // console.log(jwplayer(this.video).getCurrentQuality());

    jwplayer(this.video).on('ready',function(e) {
      console.log(e)
    });
  }
  _getActiveStreaming(callback,data){
    return this.call('../../app/application/get_active_streaming.php',data,callback,false);
  }
  getActiveStreaming(){
    this._getActiveStreaming((response)=>{
      this.loadStreaming(response.list,response.channel);
    },{catalog_server_id:"1"});
  }
  deleteStreaming(callback,data){
    return this.call('../../app/application/delete_streaming.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
}