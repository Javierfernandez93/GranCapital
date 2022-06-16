let windowWebFlow = null;

window.frameLoaded = function() {
	windowWebFlow = window.frames[0];
}
	
load(()=>{
//   $('#ruler').ruler({
//       unit: 'px',
//       minWidth: 30,
//       maxWidth: screen.width,
//       width: 300,
//       draggable: true,
//       resizable: true,
//       autoResize: true,
//       tickMajor: 50,
//       tickMinor: 10,
//       tickMicro: 1,
//       showLabel: true,
//       arrowStyle:'arrow'
//   });
//   $("#drop-left").droppable({
//     accept: "#main-aside",
//     drop: function( event, ui ) {
//       $(this).addClass("ui-state-highlight aside-left");

//       setTimeout(()=>{
//         $("#main-aside").removeClass("main-aside-floating ui-droppable ui-state-highlight aside-left").removeAttr("style").addClass("col-3");
//       },500);
//     }
//   });

	setTimeout(()=>{
		windowWebFlow.initEngine((response)=>{
			$(".template-path").text(response.full_path).removeClass("d-none");
		});
	},1000);

	$("body").tooltip({ selector:'[data-toggle=tooltip]', trigger: "hover"});

	window.changeSize = function(element,size) {
		$(".btn-size").removeClass("active");
		$(element).addClass("active");
		$("#frame").css("width",size);

		windowWebFlow.hideTabContent();
		windowWebFlow.relocateTabMenu();
	}

	window.toggleChat = function()
	{
		windowWebFlow.toggleChat($("#enable-chat").is(":checked"));
	}

	window.saveWebFlow = function(element)
	{
		windowWebFlow.saveWebFlow(element);
	}

	window.toggleFullView = function()
	{
		windowWebFlow.toggleFullView();
	}

	window.saveSheetName = function(element)
	{
		windowWebFlow.saveSheetName(element);
	}

	window.getMyStorageFiles = function(element)
	{
		windowWebFlow.getMyStorageFiles(element);
	}
});