class FloatingElement
{
    constructor()
    {
        this.element_data_name = "[data-floating='true']";
        this.top_offset = "top_offset";
        this.classes = { 
            floating_element : "floating-element",
            fixed_element : "fixed-element"
        };
        this.init();
    }
    init()
    {
        $(this.element_data_name).each((key,element)=>{
            let top_offset = $(element).offset().top;
            $(element).addClass(this.classes.floating_element).data(this.top_offset,top_offset);
        });

        this._addListener();
    }
    _addListener()
    {
        window.addEventListener("scroll", (event) => {
            var top = window.scrollY;
            $(this.element_data_name).each((key,element)=>{
                let top_offset = $(element).data(this.top_offset);
                
                if(top >= $(element).data(this.top_offset))
                {
                    if($(element).hasClass(this.classes.fixed_element) == false)
                    {
                        $(element).addClass(this.classes.fixed_element);
                    }
                } else {
                    $(element).removeClass(this.classes.fixed_element);
                }
            });
        }, false);
    }
}