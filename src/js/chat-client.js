let chat = new Chat;

$(document).ready(function(){
	chat.setChatPerSheet((response)=>{
		chat.setChatPerSheetId(response.chat_per_sheet_id);

		if(response.s == 1)
		{
			getConversation();

			chat.listenNewMessages();
		}
	},{sheet_per_proyect_id:getParam('sppid')});

	function getConversation(chat_per_sheet_id)
	{
		chat.getConversation((response)=>{
			if(response.s == 1)
			{

			} else if(response.r == "NOT_CONVERSATION") {
				sendWelcomeMessage();
			}
		},{chat_per_sheet_id:chat.getChatPerSheetId()});
	}

	function sendWelcomeMessage() 
	{
		chat.getWelcomeMessage((response)=>{
			if(response.s == 1)
			{
				chat.addMessage(response.message,SENDER.ROBOT);
				chat.sendMessage((response)=>{
					if(response.s == 1)
					{
					}
				},{message:response.message});
			}
		},{chat_per_sheet_id:chat.getChatPerSheetId()});
	}
});