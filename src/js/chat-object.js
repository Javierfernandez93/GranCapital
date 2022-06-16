class ModelMLActions {
	static OFENSIVE_LANGUAGE = "ofensive_language";
	static SPAM = "spam";
	static SYSTEM_TIME = "system_time";
}

class Chat extends Http {
	static DEFAULT_LISTENING_WAITING = 15000;
	static DEFAULT_TIME_WRITTING = 100;
	static DEFAULT_TIME = 100;
	static TIME_PER_LETTER = 90;
	constructor() {
		super();
		//webhooks
		this.page = 1;
		this.facebook = 2;

		this.state = ChatState.MINIMIZED;
		this.messages = [];
		this.chat_per_sheet_id = null;
		this.last_conversation_per_chat_id = null;
		this.robot_state = ChatState.WAITING;
		this.interval = null;
	}
	_getNewConversationMessages()
	{
		this.getNewConversationMessages((response)=>{
			if(response.s == 1)
			{
				this.setLastConversationPerChatId(response.last_conversation_per_chat_id);
				
				response.messages.forEach((message,key)=>{
					this.addMessage(message.message,message.send_from,message.catalog_hook_id);
				});
			}
		},{chat_per_sheet_id:this.getChatPerSheetId(),last_conversation_per_chat_id:this.getLastConversationPerChatId()});
	}
	listenNewMessages()
	{
		this._getNewConversationMessages();

		this.interval = setInterval(()=>{
			this._getNewConversationMessages();
		},Chat.DEFAULT_LISTENING_WAITING);
	}
	getChatPerSheetId()
	{
		return this.chat_per_sheet_id;
	}
	setChatPerSheetId(chat_per_sheet_id)
	{
		this.chat_per_sheet_id = chat_per_sheet_id;
	}
	getLastConversationPerChatId()
	{
		return this.last_conversation_per_chat_id;
	}
	setLastConversationPerChatId(last_conversation_per_chat_id)
	{
		this.last_conversation_per_chat_id = last_conversation_per_chat_id;
	}
	setRobotState(ROBOT_STATE)
	{
		if(ROBOT_STATE == ChatState.WAITING)
		{
			$(".chatbot-satus").text("");
		} else if(ROBOT_STATE == ChatState.WRITTING) {
			$(".chatbot-satus").text("Escribiendo...");
		}
	}
	getRandomArbitrary(min, max) {
	    return Math.random() * (max - min) + min;
	}
	getWaitingTime(string)
	{
		return Math.floor(Chat.DEFAULT_TIME_WRITTING + (string.length * Chat.TIME_PER_LETTER) + this.getRandomArbitrary(0,2000));
	}
	setRobotAsReply(response)
	{
		this.setRobotState(ChatState.WRITTING);

		setTimeout(()=>{
			this.addMessage(response,SENDER.ROBOT);
			this.setRobotState(ChatState.WAITING);
		},this.getWaitingTime(response));
	}
	hasMessages()
	{
		return this.messages.length > 0;
	}
	addMessageBox(message,time,sender,catalog_hook_id)
	{
		let _class = sender == SENDER.USER ? "right" : ""
		let arrow = sender == SENDER.USER ? "arrow-right" : "arrow-left";
		let order = sender == SENDER.USER ? "order-2" : "";

		let li = $("<li />").addClass(_class);
		let conversation_list = $("<div />").addClass("conversation-list");
		let media = $("<div />").addClass("media");
		let img = $("<img />").addClass("rounded-circle "+order+" avatar-xs").attr("src","http://localhost:8888/Admin/dist/assets/images/users/avatar-2.jpg");
		let media_body = $("<div />").addClass("media-body "+arrow+" ms-3");
		let ctext_wrap = $("<div />").addClass("ctext-wrap");
		let conversation_name = $("<div />").addClass("conversation-name").text("From");
		let p = $("<p />").html(message);
		let p_chat_time = $("<p />").addClass("chat-time mb-0");
		let i = $("<i />").addClass("bx bx-time-five align-middle me-1");

		p_chat_time.append(i).append("time");

		ctext_wrap.append(conversation_name,p,p_chat_time);
		
		media_body.append(ctext_wrap);
		media.append(img,media_body);
		conversation_list.append(media);
		li.append(conversation_list);

		$(".chat-conversation .simplebar-content").append(li);

		if($('.chat-conversation .simplebar-content').length)
		{
			$('.chat-conversation .simplebar-content').scrollTop($('.chat-conversation .simplebar-content')[0].scrollHeight);
		}
	}
	_addMessageBox(message,time,sender,catalog_hook_id)
	{
		let div_row = $("<div />").addClass("row animate__animated animate__fadeInDown");

		/* col-1*/
		// let col_auto_1 = $("<div />").addClass("col-auto");
		// let anchor = $("<a/>").addClass("avatar avatar-md");
		// let img = $("<img/>").addClass("avatar-img rounded-circle");
		// anchor.append(img);
		// col_auto_1.append(anchor);
		/* col-1*/
		/* col-2*/
		let col_auto_2 = $("<div/>").addClass("col-auto");
		let card = $("<div/>").addClass("card");
		let card_body = $("<div/>").addClass("card-body");
		let card_text_1 = $("<div/>").addClass("card-text mb-1 lead").html(message);
		let card_text_2 = $("<div/>").addClass("card-text small mb-1").text(time);
		let card_text_3 = $("<span/>").addClass("mx-3");

		if(catalog_hook_id == this.facebook) {
			card_text_3.html('<i class="fab fa-facebook-messenger"></i> messenger')
		} else if(catalog_hook_id == this.page){
			card_text_3.html('<i class="fas fa-globe"></i> página');
		}

		card_text_2.append(card_text_3);
		/* col-2*/
		
		if(sender == SENDER.USER)
		{
			div_row.addClass("justify-content-end");
			// col_auto_1.addClass("order-1");
			card.addClass("bg-primary");
			card_text_1.addClass("text-white");
			card_text_2.addClass("text-light");
			// img.attr("src","../../src/img/chat/user.svg");
		} else {
			card.addClass("bg-gray");
			// img.attr("src","https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg");
		}

		card_body.append(card_text_1,card_text_2);
		card.append(card_body);
		col_auto_2.append(card);

		div_row.append(col_auto_2);

		$("#webflow-chat-messages").append(div_row);

		if($('#webflow-chat-messages').length)
		{
			$('#webflow-chat-messages').scrollTop($('#webflow-chat-messages')[0].scrollHeight);
		}
	}
	addMessage(text,SENDER,catalog_hook_id)
	{
		let message = new Message;
		
		message.setText(text);
		message.setSender(SENDER);
		message.setTime(date());
		message.setCatalogHookId(catalog_hook_id);

		this.messages.push(message);

		this.addMessageBox(message.getText(),message.getTime(),message.getSender(),message.getCatalogHookId());
	}
	messageIncoming()
	{
		$("#chat-minimized").addClass("bg-primary");
	}
	getState()
	{
		return this.state;
	}
	setState(state)
	{
		this.state = state;
	}
    init(callback,data){
    	return this.call("../../app/application/init_chat.php",data,callback);
 	}
 	testIntent(callback,data){
    	return this.call("../../app/application/test_intent.php",data,callback);
    }
 	saveIntent(callback,data){
    	return this.call("../../app/application/save_intent.php",data,callback);
    }
 	sendMessage(callback,data){
    	return this.call("../../app/application/send_message.php",data,callback);
 	}
 	getChatsPerSheet(callback,data){
    	return this.call("../../app/application/get_chats_per_sheet.php",data,callback);
 	}
 	setChatPerSheet(callback,data){
    	return this.call("../../app/application/set_chat_per_sheet.php",data,callback);
 	}
 	getConversationPerChatPerSheet(callback,data){
    	return this.call("../../app/application/get_conversation_per_chat_per_sheet.php",data,callback);
 	}
 	getConversation(callback,data){
    	return this.call("../../app/application/get_conversation.php",data,callback);
 	}
 	getWelcomeMessage(callback,data){
    	return this.call("../../app/application/get_welcome_message.php",data,callback);
 	}
 	getNewConversationMessages(callback,data){
    	return this.call("../../app/application/get_new_conversation_messages.php",data,callback);
	}
	importIntent(callback,data){
    	return this.call("../../app/application/import_intent.php",data,callback);
	}
	attendIA(callback,data){
    	return this.call("../../app/application/attend_ia.php",data,callback);
	}
	attendHuman(callback,data){
    	return this.call("../../app/application/attend_human.php",data,callback);
	}
}

class SENDER {
	static ROBOT = 0;
	static USER = 1;
	static ADMIN = 2;
}

class ChatState {
	static MAXIMIZED = "MAXIMIZED";
	static MINIMIZED = "MINIMIZED";
	static WRITTING = "WRITTING";
	static WAITING = "WAITING";
}

class Message {
	constructor()
	{
		this.text = null;
		this.time = null;
		this.sender = SENDER.ROBOT;
		this.catalog_hook_id = 1;
	}
	getTime()
	{
		return this.time;
	}
	setTime(time)
	{
		this.time = time;	
	}
	getText()
	{
		return this.text;
	}
	setText(text)
	{
		this.text = text;	
	}
	setCatalogHookId(catalog_hook_id)
	{
		this.catalog_hook_id = catalog_hook_id;	
	}
	getCatalogHookId()
	{
		return this.catalog_hook_id;	
	}
	getSender()
	{
		return this.sender;
	}
	setSender(sender)
	{
		this.sender = sender;	
	}
}