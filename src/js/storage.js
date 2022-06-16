$(document).ready(function(){
  let storage = new Storage;
  
  function getMyStorageFiles(element,full_path,folder_name)
  {
    dinamicLoader.showLoader(element,'preloader-sm-black');

    storage.getMyStorageFiles((response)=>{
      if (response.s == 1) 
      {
        $("#storage-response").html(response.html);
      }
    },{full_path:full_path,folder_name:folder_name});
  }

  window.getMyStorageFiles = function(element,full_path,folder_name)
  {
    getMyStorageFiles(element,full_path,folder_name);    
  }

  window.getMyStorageFiles = function(element)
  {
    dinamicLoader.showLoader(element);

    storage.getMyStorageFiles((response)=>{
      dinamicLoader.closeLoader();

      if(response.s == 1)
      {
        var modal = $("<div />").attr({"id":"pop-storage","role":"dialog","tabindex":"-1"}).addClass("modal fade show modal-inner").css({"display":"block"});
        var modal_dialog = $("<div />").addClass("modal-dialog").css({"display":"block","max-width":"1200px","pointer-events":"all"}).html(response.html);
        
        modal.append(modal_dialog);

        $("body").append(modal);

        storage.setStoragePerUserId(response.storage_per_user_id);
      }
    });
  }

  window.closePopStorage = function()
  {
    $("#pop-storage").remove();
  }

  window.preUpload = function(element,full_path,folder_name)
  {
    uploadFile('#form','.progress',()=>{
      getMyStorageFiles(element,full_path,folder_name);
    });
  }

  function uploadFile(form,progress,callback)
  {
    $(progress).removeClass("d-none");
  
    $(form).ajaxSubmit({
      target: '#targetLayer',
      dataType : "json",
      beforeSubmit:function(){
        $(progress).find(".progress-bar-file").width('0%');
      },
      uploadProgress: function(event, position, total, percentageComplete)
      {
        $(progress).find(".progress-bar-file").animate({
            width: percentageComplete+'%'
        },{duration: 0});
      },
      success: function(data, textStatus, jqXHR) 
      {
        if(data.s == 1)
        {
          if (callback != undefined) { callback(); }
        }
      },
      resetForm: true
    });
  }

  window.uploadFile = function(form,progress)
  {
    event.preventDefault();

    uploadFile(form,progress);
  }
});

class Storage extends Http {
  constructor()
  {
    super();
    this.storage_per_user_id = null;
  }
  getStoragePerUserId()
  {
    return this.storage_per_user_id;
  }
  setStoragePerUserId(storage_per_user_id)
  {
    this.storage_per_user_id = storage_per_user_id;
  }
  getMyStorageFiles(callback,data){
    return this.call('../../app/application/get_my_storage_files.php',data,callback);
  }
};