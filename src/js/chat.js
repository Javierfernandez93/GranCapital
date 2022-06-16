$(document).ready(function(){
	window.testIntent = function(element)
	{
		chat.testIntent((response)=>{
			if(response.s == 1)
			{
				$("#response").val(response.r);
			}
		},{phrase:$("#phrase").val()});
	}

	window.sendMessageKeyUp = function(event,element)
	{
		if(event.keyCode == 13)
		{
			sendMessage(element);
		}
	}

	function sendMessage(element)
	{
		let message = $("#webflow-chat-input").val();

		Loader.showLoader(element);
		
		chat.addMessage(message,SENDER.USER);

		chat.sendMessage((response)=>{
			
			if(response.s == 1)
			{
				chat.setLastConversationPerChatId(response.last_conversation_per_chat_id);

				Loader.hideLoader();

				if(response.reply != undefined)
				{
					let reply = response.reply;

					// if(response.system_intent != undefined)
					// {
					// 	if(response.system_intent.tag == ModelMLActions.OFENSIVE_LANGUAGE)
					// 	{
					// 		reply = "Eliminado - Comentario inapropiado";
					// 	}
					// }
					
					chat.setRobotAsReply(reply);

					setTimeout(()=>{
						$(element).removeAttr("disabled");
						$("#webflow-chat-input").val("").focus();
					},Chat.DEFAULT_TIME);
				}
				
			}

		},{message:message,chat_per_sheet_id:chat.getChatPerSheetId(),send_from:SENDER.USER});
	}

	window.sendMessage = function(element)
	{
		sendMessage(element);
	}

	window.toggleChat = function(STATE)
	{
		chat.setState(STATE);

		if(chat.getState() == ChatState.MINIMIZED)
		{
			$("#chat-maximized").removeClass("toggleFadeIn").addClass("toggleFadeOut");
			$("#chat-minimized").removeClass("toggleFadeOut").addClass("toggleFadeIn");
		} else if(chat.getState() == ChatState.MAXIMIZED) {
			$("#chat-minimized").removeClass("toggleFadeIn").addClass("toggleFadeOut");
			$("#chat-maximized").removeClass("toggleFadeOut").addClass("toggleFadeIn");
		}
	}

	chat.init((response)=>{
		if(response.s == 1)
		{
			$("body").append(response.html);
	
			if(chat.hasMessages() == true)
			{
				chat.messageIncoming();
			}
		}
	});
});
