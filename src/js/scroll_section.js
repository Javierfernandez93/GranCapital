$(document).ready(function(){
    setTimeout(function(){
        $("body").scrollTop( 0 );
    },100);

    // scrollEffect();
    // $("a[data-link]").click(function(){
    //     $("#toggle").click();
    // });

    // $("#login_button_cancel").click(function(){
    //     $("html, body").stop().animate({ scrollTop: parseInt(10) }, 800);
    // });

    $("#see_another_video").click(function(e){
        e.preventDefault();
        if($(this).data("actual_video") == "")
        {
            $(this).data("actual_video","shopping_club")
            $(this).html('<i class="fa fa-video-camera"></i> '  + __Translate("Watch start video"));
            loadVideo("home")
            $(this).removeClass("button_green").addClass("button_blue")
        } else if($(this).data("actual_video") == "shopping_club") {
            $(this).data("actual_video","home")
            $(this).html('<i class="fa fa-video-camera"></i> '  + __Translate("Watch shopping club video"));
            loadVideo("shopping_club")
            $(this).removeClass("button_blue").addClass("button_green")
        }

        return false;
    })

    function loadVideo(video)
    {
        if(video == "home")
        {
            if($("#language").val() == "spanish")
            {
                $("#video_es").attr("src","//player.vimeo.com/video/110658706?title=0&amp;byline=0&amp;portrait=0")
                $("#video_es").attr("src", $("#video_es").attr("src"));
            } else {
                $("#video_en").attr("src","//player.vimeo.com/video/110658707?title=0&amp;byline=0&amp;portrait=0")
                $("#video_en").attr("src", $("#video_en").attr("src"));
            }
        } else {
            if($("#language").val() == "spanish")
            {
                $("#video_es").attr("src","//player.vimeo.com/video/108153578?title=0&amp;byline=0&amp;portrait=0")
                $("#video_es").attr("src", $("#video_es").attr("src"));
            } else {
                $("#video_en").attr("src","//player.vimeo.com/video/107939796?title=0&amp;byline=0&amp;portrait=0")
                $("#video_en").attr("src", $("#video_en").attr("src"));
            }
        }
        return false;
    }


    // function scrollEffect()
    // {
    //     var nav_height = $("nav").css("height");
    //     var height     = nav_height.substring(0,nav_height.indexOf("px"));

    //     $("html, body").stop().animate({ scrollTop: parseInt($("#befree-vento").offset().top) - (parseInt(height)+50), }, 100);

    //     $("a[data-link]").bind("click", function(){
    //         var link = $(this).attr("data-link");
    //         var input_focus = $(this).attr("data-focus");
    //         var position = parseInt($("#" + link).offset().top) - (parseInt(height) + 5);

    //         $("html, body").stop().animate({ scrollTop: parseInt(position) }, 800);

    //         event.preventDefault();

    //         $("a").removeClass("current");
    //         $(this).addClass("current");

    //         if(input_focus)
    //         {
    //             $("#" + input_focus).focus();
    //         }

    //     });
    // }

    // --------------------   //////   -------------------------//
    // --------------- INVITATION FUNCTIONS --------------------//
    // --------------------   //////   -------------------------//
    $("#accept_mail").keyup(function(e){
        if(e.keyCode == 13)
        {
            $("#accept_button_ok").click();
            return false;
        }

        return false;
    });

    // translate_data_by_find();

    $("#accept_button_ok").on("click", function(){
        var accept_mail = $("#accept_mail");

        if(!__isValidMail(accept_mail.val()))
        {
            var options = {"Ok": function(){ __closeMessage(); accept_mail.focus(); } };
            __showMessage({"message": __Translate("The e-mail is incorrect. Please try again"), "options": options });
            return false;
        }

        var request = __getJSONRequestAsync({"url": "subcore/application/has_invitation.php", "image_path": "../../subcore/css/images/loader.gif", "data" : {mail: accept_mail.val() }}, function(data){

            var options = {"Ok": function(){ __closeMessage(); window.location.href = "../signup/signup.php?mail=" + accept_mail.val(); }};

            if (data.success=="1")
            {
                __showMessage({"message": __Translate("Congratulations on accepting the invitation!"), "options": options });
            } else {
                __showMessage({"message": __Translate("Congratulations you have generated an invitation!"), "options": options });
            };
        });
    });
});