class Target {
  constructor()
  {
    this.target = null;
  }
  createOutlineFollow()
  {
    if (this.getTarget() != undefined) 
    { 
      let div = document.createElement('div');
      let properties = this.getTarget().getBoundingClientRect();

      div.className = "div-follower-outline";
      div.id = "div-follower-outline";
      div.style.height = (properties.height + 12) + "px";
      div.style.width = (properties.width + 12) + "px";
      div.style.left = (properties.left - 6) + "px";
      div.style.top = (properties.top - 6 + window.scrollY) + "px";

      document.body.append(div);
    }
  }
  createDivFollow(type,id)
  {
    if (this.getTarget() != undefined) 
    {
      let div = document.createElement('div');
      let properties = this.getTarget().getBoundingClientRect();
      let tagName = this.getTarget().tagName;

      div.className = "div-follower btn-sm-option justify-content-between d-flex align-items-center";
      div.id = "div-follower";
      div.style.left = properties.left + "px";
      div.style.top = (properties.bottom + 10 + window.scrollY) + "px";
      // div.innerText = tagName;

      let span = document.createElement('button');
      span.onclick = function() { 
        showMoreOptions(this) 
      };
      span.className = "btn btn-secondary mr-2";
      
      if(type != undefined)
      {
        span.innerHTML = type.toUpperCase() + " #" + id;
      }

      let button_options = document.createElement('button');
      button_options.onclick = function() { 
        showMoreOptions(this) 
      };
      button_options.className = "btn btn-target mr-2 btn-primary";
      button_options.innerHTML = '<i class="fas fa-ruler-combined"></i>';
      // button_options.setAttribute("data-toggle","tooltip");
      button_options.setAttribute("title","Opciones avanzadas");
      button_options.setAttribute("data-gdropdown","more-options");

      let button_styles = document.createElement('button');
      button_styles.onclick = function() { 
        showMoreStyles(this)
      };
      button_styles.className = "btn btn-target mr-2 btn-primary";
      button_styles.innerHTML = '<i class="fas fa-layer-group"></i>';
      button_styles.setAttribute("data-toggle","tooltip");
      button_styles.setAttribute("title","Ver estilos");
      button_styles.setAttribute("data-gdropdown","more-styles");

      let button_parent = document.createElement('button');
      button_parent.onclick = function() { 
        setElementParentActive(); 
      };
      button_parent.className = "btn btn-target mr-2 btn-primary";
      button_parent.innerHTML = '<i class="fas fa-arrow-up"></i>';
      button_parent.setAttribute("data-toggle","tooltip");
      button_parent.setAttribute("title","Buscar elemento padre");

      let button_duplicate = document.createElement('button');
      button_duplicate.onclick = function() { 
        duplicateItem();
      };
      button_duplicate.className = "btn btn-target mr-2 btn-primary";
      button_duplicate.innerHTML = '<i class="fas fa-clone"></i>';
      button_duplicate.setAttribute("data-toggle","tooltip");
      button_duplicate.setAttribute("title","Duplicar elemento");

      let button_remove = document.createElement('button');
      button_remove.onclick = function() { 
        deleteItem();
      };
      button_remove.className = "btn btn-target mr-2 btn-danger";
      button_remove.innerHTML = '<i class="fas fa-times"></i>';
      // button_remove.setAttribute("data-toggle","tooltip");
      button_remove.setAttribute("title","Eliminar");

      div.append(span,button_options,button_styles,button_parent,button_duplicate,button_remove);
      document.body.append(div);
    }
  }
  setElementAsFollow()
  {
    if(this.getTarget() != undefined)
    {
      this.getTarget().classList.add("element-followed");
    }
  } 
  follow(type,id) 
  {
    this.clearLastTarget();
    this.setElementAsFollow();
    this.createDivFollow(type,id);
    this.createOutlineFollow();
  }
  getTarget() {
    return this.target;
  }
  clearLastTarget()
  {
    let div_follower_outline = document.getElementById("div-follower-outline");

    if(div_follower_outline != undefined)
    {
      div_follower_outline.remove();
    }

    let div_follower = document.getElementById("div-follower");
    
    if(div_follower != undefined)
    {
      div_follower.remove();
    }


    if(this.getTarget() != undefined)
    {
      if (this.getTarget().classList.contains("element-followed")) 
      {
        this.getTarget().classList.remove("element-followed");
      }
    }
  }
  setTarget(target)
  {
    if(this.target != null)
    {
      this.clearLastTarget();
    }
    this.target = document.getElementById(target);
  }
};