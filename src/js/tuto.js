$(document).ready(function(){
  
    $("#body").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });



    // Dropdown menu
    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
            $(".sidebar-dropdown").removeClass("active");
            $(this).parent().removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }

    });

    $(window).on("load resize ", function() {
      var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
      $('.tbl-header').css({'padding-right':scrollWidth});
    }).resize();


    // close sidebar 
    $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });

    function CERRARNAVBAR(){
      $(".page-wrapper").removeClass("toggled");
    }


    //en caso de que el clik sea en cualquier parte del body
    $("#tutu-container").click(function(){
      Console.log("hola");
        $(".page-wrapper").removeClass("toggled");
    });


    //show sidebar
    $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
    });

    //switch between themes 
    var themes = "chiller-theme ice-theme cool-theme light-theme";
    $('[data-theme]').click(function () {
        $('[data-theme]').removeClass("selected");
        $(this).addClass("selected");
        $('.page-wrapper').removeClass(themes);
        $('.page-wrapper').addClass($(this).attr('data-theme'));
    });

  let tuto = new Tuto;
  
  tuto.setElement($("#tuto-container"));
  tuto.init();

  window.getTuto = function(index) {
    tuto.setIndex(index);
    tuto.setContent();
    tuto.clearInterval();
    CERRARNAVBAR();
  }
});

class Tuto {
  constructor() {
    this.element = false;
    this.interval = false;
    this.seconds = 0; // seconds
    this.max_seconds = 5; // seconds
    this.interval_duration = 1000; // milis
    this.steps = [
      {
        image : "../../apps/tuto/src/media/1.1.webm",
        title : "¿Cómo Instalo la aplicacion?",
        subTitle : "A",
        max_seconds : 30
      },
      {
        image : "../../apps/tuto/src/media/1,2.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },

      {
       image : "../../apps/tuto/src/media/1.3.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/1.4.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/1.5.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/1.6.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/1.7.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/1.8.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/1.9.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      },
      {
       image : "../../apps/tuto/src/media/2.0.webm",
        title : "¿Cómo añadir miembros?",
        subTitle : "B",
        max_seconds : 40
      }




      

 
    ];
    this.index = 0;
  }
  init() {
    this.setContent();
    this.setIntervals();
  }
  resetSeconds() {
    this.seconds = 0;
  }
  clearInterval() {
    clearInterval(this.interval);
    this.resetSeconds();
  }
  setIntervals() {
    this.interval = setInterval(()=>{
      if(this.seconds >= this.steps[this.index].max_seconds) {
        this.clearInterval();
        this.nextIndex();
        this.init();
      } else {
        this.seconds++;
      }
    },this.interval_duration);
  }
  nextIndex() {
    if(this.index < this.steps.length-1)
      this.index++;
    else 
      this.setIndex(0);
  }
  setIndex(index) {
    this.index = index;
  }
  setContent() {
    // this.element.removeClass("wow animated bounceIn").addClass("wow animated bounceIn");
    this.element.find("#title").text(this.steps[this.index].title);
    this.element.find("#subtitle").text(this.steps[this.index].subTitle);
    this.element.find("#tuto-gift").attr("src",this.steps[this.index].image);
  }
  setElement(element) {
    this.element = element;
  }
}