let chat = new Chat;

$(document).ready(function(){

	window.attendIA = function(element,chat_per_sheet_id)
	{
		dinamicLoader.showLoader(element);
		
		chat.attendIA((response)=>{
			if(response.s == 1)
			{
				chat.last_conversation_per_chat_id = null;

				getConversationPerChatPerSheet(chat_per_sheet_id);
			}
		},{chat_per_sheet_id:chat_per_sheet_id});
	}

	window.attendHuman = function(element,chat_per_sheet_id)
	{
		dinamicLoader.showLoader(element);
		
		chat.attendHuman((response)=>{
			if(response.s == 1)
			{
				chat.last_conversation_per_chat_id = null;

				getConversationPerChatPerSheet(chat_per_sheet_id);
			}
		},{chat_per_sheet_id:chat_per_sheet_id});
	}

	function toggleTemplates(element)
	{
		$("#ask-templates").toggleClass("d-none");
	}

	window.toggleTemplates = function(element)
	{
		toggleTemplates();
	}

	window.getConversationPerChatPerSheet = function(element,chat_per_sheet_id)
	{
		dinamicLoader.show($(".response-chat"),"preloader-md m-5");

		$(".chat-item").removeClass("chat-item-selected");

		chat.last_conversation_per_chat_id = null;

		$(element).addClass("chat-item-selected");

		getConversationPerChatPerSheet(chat_per_sheet_id);
	}

	function getConversationPerChatPerSheet(chat_per_sheet_id)
	{
		chat.setChatPerSheetId(chat_per_sheet_id);

		chat.getConversationPerChatPerSheet((response)=>{
			if(response.s == 1)
			{
				$(".response-chat").html(response.html);

				chat.listenNewMessages();
			}
		},{chat_per_sheet_id:chat.getChatPerSheetId()});
	}

	if(getParam("cpsid"))
	{	
		getConversationPerChatPerSheet(getParam("cpsid"));
	} 

	// if(getParam("sppid"))
	// {
	// 	chat.getChatsPerSheet((response)=>{
	// 		if(response.s == 1)
	// 		{
	// 			$(".response").html(response.html);
	// 		}
	// 	},{sheet_per_proyect_id:getParam("sppid")});
	// }

	if(getParam("sppid"))
	{
		dinamicLoader.show($(".response"),"preloader-md m-5");

		chat.getChatsPerSheet((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$(".response").html(response.html);

				if(response.chats_per_sheet.length)
				{
					$(".chat-item").eq(0).click();
				}
			}
		},{sheet_per_proyect_id:getParam("sppid")});
	}

	window.sendMessageKeyUp = function(event,element,chat_per_sheet_id)
	{
		if(event.keyCode == 13)
		{
			sendMessage(element,chat_per_sheet_id);
		}
	}

	window._sendMessage = function(message,element,chat_per_sheet_id)
	{
		toggleTemplates();
		_sendMessage(message,element,chat_per_sheet_id);
	}

	function _sendMessage(message,element,chat_per_sheet_id)
	{
		Loader.showLoader(element);
		
		chat.addMessage(message,SENDER.ADMIN);

		chat.sendMessage((response)=>{
			
			if(response.s == 1)
			{
				Loader.hideLoader();
			
				$(element).removeAttr("disabled").val("").focus();

				if(response.last_conversation_per_chat_id != undefined) 
				{
					chat.setLastConversationPerChatId(response.last_conversation_per_chat_id);
				}

				if(response.r != undefined)
				{
					let answer = response.r;
					chat.setRobotAsReply(answer);
				}
			}

		},{chat_per_sheet_id:chat_per_sheet_id,message:message,send_from:SENDER.ADMIN});
	}

	function sendMessage(element,chat_per_sheet_id)
	{
		let message = $("#webflow-chat-input").val();

		_sendMessage(message,element,chat_per_sheet_id);
	}

	window.sendMessage = function(element,chat_per_sheet_id)
	{
		sendMessage(element,chat_per_sheet_id);
	}
});
