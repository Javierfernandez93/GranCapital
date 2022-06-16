$(document).ready(function(){
	let chatHandler = new ChatHandler;
	let websocket = null;

	// let xhr = chatHandler.makeSocket((response)=>{},{room_id:1});
	// console.log(xhr);

	chatHandler.init((response)=>{
		if(response.s == 1)
		{
			console.log(response);
			chatHandler.setPassword(response.password);
			chatHandler.setEmail(response.email);
			chatHandler.setUniqueId(response.unique_id);
			chatHandler.setUrl(response.url);
			chatHandler.startListeningFunctions();
		}
	});
	
	function sendMessage(message)
	{
		if(message != "")
		{
			dinamicLoader.show($("#send"));
			$("#send").attr("disabled",true);

			setTimeout(()=>{
				chatHandler.send(message,chatHandler.getUniqueId());
				
				dinamicLoader.close();
				$("#message").val("");
			},400);
		}
	}

	window.sendMessage = function(element)
	{
		sendMessage($('#message').val(),chatHandler.getUniqueId());
	}

	window.onWriting = function(element)
	{
		chatHandler.send();
	}	

	window.cancel = function()
	{
	}

	window.sendMessageKeyUp = function(event,element)
	{
		if(event.keyCode == 13)
		{
			sendMessage($('#message').val(),chatHandler.getUniqueId());
		}
	}
});

class ChatHandler extends Http {
	constructor() {
		super();
		this.url = null;
		this.webSocket = null;
		this.unique_id = null;
		this.HTML = "HTML";
		this.CONNECTED = "CONNECTED";
		this.password = null;
		this.email = null;
	}
	getEmail()
	{
		return this.email;
	}
	setEmail(email)
	{
		this.email = email;
	}
	getPassword()
	{
		return this.password;
	}
	setPassword(password)
	{
		this.password = password;
	}
	getUniqueId()
	{
		return this.unique_id;
	}
	setUniqueId(unique_id)
	{
		this.unique_id = unique_id;
	}
	getUrl()
	{
		return this.url;
	}
	setUrl(url)
	{
		this.url = url;
	}
	send(message,kind)
	{
		this.webSocket.send(JSON.stringify({message:message,unique_id:this.getUniqueId(),kind:this.HTML,email:this.getEmail(),password:this.getPassword()}));
	}
	_addMessageHtml(message,time,imagen,unique_id)
	{
		let div_row = $("<div />").addClass("row animate__animated animate__fadeInDown");

		/* col-1*/
		let col_auto_1 = $("<div />").addClass("col-auto");
		let anchor = $("<a/>").addClass("avatar avatar-md");
		let img = $("<img/>").addClass("avatar-img rounded-circle");
		anchor.append(img);
		col_auto_1.append(anchor);
		/* col-1*/
		/* col-2*/
		let col_auto_2 = $("<div/>").addClass("col-auto");
		let card = $("<div/>").addClass("card");
		let card_body = $("<div/>").addClass("card-body");
		let card_text_1 = $("<div/>").addClass("card-text mb-1").html(message);
		let card_text_2 = $("<div/>").addClass("card-text small mb-1").text(time);
		/* col-2*/
		
		img.attr("src",imagen);

		if(unique_id == this.getUniqueId())
		{
			div_row.addClass("justify-content-end");
			col_auto_1.addClass("order-1");
			card.addClass("bg-primary");
			card_text_1.addClass("text-white");
			card_text_2.addClass("text-light");
		}

		card_body.append(card_text_1,card_text_2);
		card.append(card_body);
		col_auto_2.append(card);

		div_row.append(col_auto_1,col_auto_2);

		$("#webflow-chat-messages").append(div_row);

		$('#webflow-chat-messages').scrollTop($('#webflow-chat-messages')[0].scrollHeight);
	}
	_addMessageConnection(message,time,unique_id)
	{
		let card = $("<div/>").addClass("card bg-success");
		let card_body = $("<div/>").addClass("card-body");
		let div = $("<div/>").addClass("text-light text-center").text(message);

		card_body.append(div);
		card.append(card_body);

		$("#webflow-chat-messages").append(card);

		$('#webflow-chat-messages').scrollTop($('#webflow-chat-messages')[0].scrollHeight);
	}
	addMessageBox(message,time,unique_id,imagen,message_type)
	{
		if(message_type == this.HTML)
		{
			this._addMessageHtml(message,time,imagen,unique_id);
		} else if(message_type == this.CONNECTED) {
			this._addMessageConnection(message,time,unique_id);
		} 
	}
	startListeningFunctions()
	{
		let self = this;
		this.webSocket = new WebSocket(this.getUrl()); 

		this.webSocket.onopen = function(event) 
		{ 
			// self.addMessageBox("Connection is established",date(),getParam("sender"));
		}

		this.webSocket.onmessage = function(event) {
			var data = JSON.parse(event.data);

			console.log(event);

			self.addMessageBox(data.message,date(),data.unique_id,data.imagen,data.message_type);
		};
		
		this.webSocket.onerror = function(event){
			// self.addMessageBox("Problem due to some error",date(),getParam("sender"));
			console.log("Problem due to some error");
		};

		this.webSocket.onclose = function(event){
			// self.addMessageBox("Connection closed",date(),getParam("sender"));
			console.log("Connection closed");
			self.startListeningFunctions();
		}; 
	}
	init(callback,data){
    	return this.call("../../app/application/init_chat_single",data,callback);
	}
	makeSocket(callback,data){
    	return this.singleCall("../../app/application/make_socket",data,callback);
	}
}

class SENDER {
	static ROBOT = 0;
	static USER = 1;
	static ADMIN = 2;
}