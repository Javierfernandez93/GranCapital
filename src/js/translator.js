// class Translator extends Http {  
//   constructor()
//   {
//     super();
//     this.initVars();
//   }
//   initVars() {
//     this.Language = new Language;
//     this.DataBase = new DataBase;
//     this.tag_name = 't';
//   }
//   init() {
//     let t = Array.from($(this.tag_name));
//     let input = Array.from($("input"));

//     this.DataBase.setWords(t.concat(input));

//     this.DataBase.getDataBase((found)=>{
//       if(found == true) {
//         this.translateWords();
//       }
//     },this.Language.getActualLanguage());
//   }
//   translateWords() {
//     const words = this.DataBase.getWords();
    
//     for(let i=0;i<words.length;i++)
//     {
//       let element = words[i];

//       if(element != undefined)
//       {
//         let type = $(words[i]).get(0).tagName;
//         let word = null;

//         if(type == "T"){
//           word = $(element).text();
//         } else if(type == "INPUT") {
//           if($(element).attr("placeholder"))
//           {
//             word = $(element).attr("placeholder");
//           }
//         } 

//         if(word != null)
//         {
//           let word_translated = this.translateWord(word);

//           if(word_translated != false) {
//             if(type == "T"){
//               $(element).text(word_translated);
//             } else if(type == "INPUT") {
//               $(element).attr("placeholder",word_translated);
//             } 
//           }
//         }
//       }
//     }
//   }
//   translateWord(word) {
//     if(this.DataBase.getDBWords()[word] != undefined)
//     {
//       return this.DataBase.getDBWords()[word];
//     } else {
//       // console.warn("[Translator:OBJ] => Must to translate : "+word);
//       // console.log(word);
//     }

//     return word;
//   }
// }

// class Cookie {
//   setStorage(name, value) {
//     if(typeof(Storage) !== "undefined") {
//       if(name !== "undefined")
//       {
//         localStorage[name] = value;
//       }
//     }
//   }
//   getStorage(name, value) {
//     return localStorage[name];
//   }
//   setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }
//   getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
// }

// class DataBase extends Cookie {
//   constructor() {
//     super();
//     this.Http = new Http;
//     this.db_words = false;
//     this.save_db = true;
//     this.words = false;
//   }
//   getDataBase(callback,actual_language) {

//     if(this.db_words == false)
//     {
//       if(this.getStorage(actual_language) == undefined)
//       {
//         this.getBaseFile((db_words)=>{

//           if(db_words != undefined) {
//             this.setDBWords(db_words,actual_language);
              
//             if(callback != undefined) callback(true);
//           }
//         },actual_language);
//       } else {
//         this.setDBWords(JSON.parse(this.getStorage(actual_language)));

//         if(callback != undefined) callback(true);
//       }
//     }
//   }
//   setDBWords(db_words,actual_language) {
//     this.db_words = db_words;
//     if(this.save_db == true) {
//       this.setStorage(actual_language,JSON.stringify(this.db_words));
//     }
//   }
//   getDBWords() {
//     return this.db_words;
//   }
//   setWords(words) {
//     this.words = words;
//   }
//   getWords() {
//     return this.words;
//   }
//   getFileName(actual_language) {
//     return actual_language.toLowerCase();
//   }
//   getBaseFile(callback,actual_language,data){
//     return this.Http.call("../../app/application/"+this.getFileName(actual_language)+".json",data,callback);
//   }
// }

// class Language extends Cookie {
//   constructor() {
//     super();
//     this.ES = "ES";
//     this.EN = "EN";

//     this.checkCookieLanguage();
//   }
//   checkCookieLanguage() {
//     if(this.getCookie("language") != "") {
//       this.actual_language = this.getCookie("language");
//     } else {
//       let userLang = navigator.language || navigator.userLanguage; 

//       userLang = userLang.substring(0,2);
//       userLang = userLang.toUpperCase();

//       this.actual_language = userLang;
//     }
//   }
//   getActualLanguage(actual_language) {
//     return this.actual_language;
//   }
//   setActualLanguage(actual_language) {
//     this.actual_language = actual_language;
    
//     if(this.actual_language != undefined)
//     {
//       this.setCookie("language",this.actual_language,365);
//     }
//   }
// }

// let translator = new Translator;

// function translateWords() {
//   translator.translateWords();
// }

// function translate(word) {
//   return translator.translateWord(word);
// }

// $(document).ready(function(){
//   translator.init();

//   window.changeLanguage = function(language) {
//     translator.initVars();
//     translator.Language.setActualLanguage(language);
//     location.reload();
//   }
// });
