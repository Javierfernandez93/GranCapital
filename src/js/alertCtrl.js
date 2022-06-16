var alertCtrl = {
    modal : false,
    body : false,
    footer : false,
    createUUID : function()
    {
        var d = new Date().getTime();

        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); 
        }

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return uuid;
    },
    showMessage : function(title,subTitle)  {
        this.modal({
            title : title,
            subTitle : subTitle,
        });
    },
    create : function(options)  {
        var defaults = {
            title: "", 
            subTitle: $("<p />"),
            closeIcon: false, 
            id: this.createUUID(), 
            open: function () { }, 
            buttons: [],
            inputs: [],
            size: 'modal-sm',
        };

        this.settings = $.extend(true, {}, defaults, options);

        var $modal = $("<div />").attr("id", this.settings.id).attr("role", "dialog").addClass("modal fade")
                        .append($("<div />").addClass("modal-dialog modal-dialog-centered "+this.settings.size)
                            .append($("<div />").addClass("modal-content text-center fw-bold")
                                .append($("<div />").addClass("modal-header border-0")
                                    .append($("<h4 />").addClass("modal-title").text(this.settings.title)))
                                .append($("<div />").addClass("modal-body")
                                    .append(this.settings.subTitle))
                                .append($("<div />").addClass("modal-footer border-0")
                                )
                            )
                        );
        $modal.shown = false;
        $modal.dismiss = function ()
        {
            $modal.modal('hide');

            this.settings = $.extend(true, {}, defaults, options);
            object_id=this.settings.id;

            window.setTimeout(function (){
                $("body").removeClass("modal-open");
                $(".responsive-bootstrap-toolkit").remove();
                $(".modal-backdrop").remove();
                $("#"+object_id).remove();
            }, 500);
        }

        if (this.settings.closeIcon)
            $modal.find(".modal-header").prepend($("<button />").attr("type", "button").addClass("close").html("&times;").click(function () { $modal.dismiss() }));

        // add the buttons
        var $footer = $modal.find(".modal-footer");
        var $body = $modal.find(".modal-body");
        var hasInput = this.settings.inputs.length ? true : false;

        this.modal = $modal;
        this.body = $body;
        this.footer = $footer;

        for(var i=0; i < this.settings.inputs.length; i++)
        {
            this.addInput(this.settings.inputs[i]);
        }

        for(var i=0; i < this.settings.buttons.length; i++)
        {
            if(i == 0 && this.settings.buttons[i].class == undefined) {
                this.settings.buttons[i].class = "btn-primary";
            }

            this.addbutton(this.settings.buttons[i]);
        }

        this.settings.open($modal);

        $modal.on('shown.bs.modal', function (e) {
            $modal.shown = true;
        });

        return this;
    },
    modal : function(settings)  {
        let alert = this.create(settings);
        this.present(alert.modal);
    },
    addInput : function(input)  {
        if(input)
        {
            let id = input.id ? input.id : this.createUUID();
            input.id = id;

            if(input.type === "radio")
            {
                let div = $("<div />").addClass("form-check");
                let _input = $("<input />").addClass("form-control underlined")
                    .attr("class", "form-check-input")
                    .attr("id", id)
                    .attr("type", input.type)
                    .attr("name", input.name)
                    .attr("placeholder", input.placeholder)
                    .attr("value",input.value);
                
                let label = $("<label />").addClass("form-check-label")
                    .attr("class", "custom-control-label")
                    .attr("for", id)
                    .text(input.text);

                    div.append(_input,label);

                this.body.append(div);
            } else {
                let div = $("<div />").addClass("form-group mb-1");

                if(input.label != undefined)
                { 
                    div.append($("<label />").attr("for", id).text(input.label));    
                }

                let _input = $("<input />").addClass("form-control")
                    .attr("id", id)
                    .attr("type", input.type)
                    .attr("name", input.name)
                    .val(input.value)
                    .attr("placeholder", input.placeholder);

                if(input.min != undefined)
                {
                    _input.attr("min",input.min);
                }

                if(input.maxLenght != undefined)
                {
                    _input.attr("maxlength",input.maxLenght);
                }

                div.append(_input);
                this.body.append(div);
            }
        }
    },
    addbutton : function(btn)  {
        let id = btn.id ? btn.id : this.createUUID();
            btn.id = id;

        let _class = btn.class == undefined ? "btn-light" : btn.class;
        
        this.footer.prepend($("<button />").addClass("btn "+_class)
            .attr("id", id)
            .attr("type", "button")
            .text(btn.text)
            .click(()=>
            {
                var hasInput = this.settings.inputs.length ? true : false;
                if(hasInput)
                {
                    btn.handler(this.getInputsData(this.settings.inputs));
                    this.modal.dismiss();
                } else {
                    btn.handler(this.modal)
                }

                if(btn.role == 'cancel') 
                {
                    this.modal.dismiss();   
                }
            }))

    },
    present : function($modal)  {
        $modal.modal("show");
        
        setTimeout(()=>{
            $modal.find("button").eq(0).focus();
        },400);
    },
    getInputsData : function(inputs)  {
        var data = {};
        inputs.forEach((input)=>{
            if(input.type == "radio")
            {
                data[input.name] = $("input[name='"+input.name+"']:checked").val();
            } else {
                data[input.name] = $("#"+input.id).val();
            }
        });
        return data;
    },
};