$(document).ready(function(){
	let notifications = new Notifications;
  let game = new Game;

  // notifications.push("Ganaste","Felicidades ganaste 1 Talento","bg-dark");
  
  game.showAmount();

  $("#min-bank").text(Game.MIN_BANK+1);
  $("#min-bank-withdraw").text(Game.MIN_BANK_WITHDRAW);

  window.playDown = function(element)
  {
    game.play(Game.DOWN);
    getState();
  } 

  window.doBank = function(element)
  {
    game.doBank();
  }

  window.playUp = function(element)
  {
    game.play(Game.UP);
    getState();
  } 

  function getState() {
    if(game.getState() === Game.WIN)
    {
      $("#state").text("Ganaste");

      setTimeout(()=>{
        // notifications.push("Ganaste","Felicidades ganaste 1 Talento","bg-primary");
      },500);

      game.setAmount(game.getAmount()+1);
    } else if(game.getState() === Game.LOSE) {
      $("#state").text("Perdiste");

      game.setAmount(game.getAmount()-1);
    }
    
    game.showAmount();
    game.addRow();
  }
});

class Game extends Http {
  static UP = 1;
  static DOWN = 0;
  static WIN = 1;
  static LOSE = 0;
  static MIN_BANK = 1;
  static MIN_BANK_WITHDRAW = 50;
  static MAX_VALUE = 100;
  constructor()
  {
    super();
    this.playing = false;
    this.state = Game.LOSE;
    this.array_losses = [];
    this.array_wins = [];
    this.amount = 20;
    this.amount_saved = 0;
    this.number = 0;
  }
  addRow() 
  {
    let div_row = $("<div/>").addClass("row");
    let div_col_6_1 = $("<div/>").addClass("col-12 py-2 align-items-center col-lg-6");
    let div_col_6 = $("<div/>").addClass("col-12 py-2 align-items-center col-lg-6");

    let p_number_text = $("<p/>").addClass("lead m-0 text-white").text("Número");
    let p_number = $("<p/>").addClass("lead m-0 text-white");
    let p_status = $("<p/>").addClass("lead m-0 text-white");
    let p_status_text = $("<p/>").addClass("lead m-0 text-white").text("Estatus");

    if(this.getState() == Game.WIN) {
      div_row.addClass("bg-success");
      p_status.text("Tu ganas");
    } else if (this.getState() == Game.LOSE) {
      div_row.addClass("bg-danger");
      p_status.text("La casa gana");
    }

    p_number.text(this.getNumber());

    div_col_6_1.append(p_number_text,p_number);
    div_col_6.append(p_status_text,p_status); 
    div_row.append(div_col_6_1,div_col_6);

    $("#box-results").prepend(div_row);
  }
  showAmountSaved() 
  {
    $("#amount-saved").text(this.getAmountSaved());
  }
  showAmount() 
  {
    if(this.getAmount() > Game.MIN_BANK)
    { 
      $("#do-bank").removeAttr("disabled");
    } else {
      $("#do-bank").attr("disabled",true);
    }

    $("#amount").text(this.getAmount());
  }
  doBank() 
  {
    if(this.getAmount() > Game.MIN_BANK)
    {
      this.setAmountSaved(this.getAmountSaved()+Game.MIN_BANK);
      this.setAmount(this.getAmount()-Game.MIN_BANK);
      this.showAmountSaved();
      this.showAmount();
    }
  }
  getAmount() 
  {
    return this.amount;
  }
  setAmount(amount) 
  {
    this.amount = amount;
  }
  getAmountSaved() 
  {
    return this.amount_saved;
  }
  setAmountSaved(amount_saved) 
  {
    this.amount_saved = amount_saved;
  }
  getNumber() 
  {
    return this.number;
  }
  setNumber(number) 
  {
    this.number = number;
  }
  play(chose) 
  {
    this.setPlaying(true);
    let number = this.getRand();

    this.setNumber(number);

    $("#number").text(number);

    if(chose == Game.UP) {
      if(number > (Game.MAX_VALUE/2))
      {
        this.setState(Game.WIN);
      } else {
        this.setState(Game.LOSE);
      }
    } else if(chose == Game.DOWN) {
      if(number < (Game.MAX_VALUE/2))
      {
        this.setState(Game.WIN);
      } else {
        this.setState(Game.LOSE);
      }
    }
  }
  setState(state) 
  {
    this.state = state;
  }
  getState() 
  {
    return this.state;
  }
  setPlaying(playing) 
  {
    this.playing = playing;
  }
  getPlaying()
  {
    return this.playing;
  }
  getRand()
  {
    return Math.floor(Math.random() * Game.MAX_VALUE);
  }
}