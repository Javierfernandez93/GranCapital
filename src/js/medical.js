$(document).ready(function(){
	 let medical = new Medical;

	 window.editKeyWords = function(catalog_case_file_id,key_words){
	 	console.log(catalog_case_file_id)
	 	console.log(key_words)
	 	alert = alertCtrl.create({
	      title: "Editar key words",
	      subTitle: "Ingresa los keywords, separados por comas.",
	      inputs : [
		      {
		      	value : key_words,
		      	type : "text",
		      	name : "key_words",
		      },
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.editKeyWords((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,key_words:data.key_words});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	 }
	 
	 window.changeSignName = function(catalog_sign_id){
	 	alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Ingresa el nuevo nombre del padecimiento.",
	      inputs : [
		      {
		      	type : "text",
		      	name : "sign",
		      },
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeSignName((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,sign:data.sign});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	 }

	 window.changeGenderRuleCatalogCaseFile = function(catalog_case_file_id){

	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione el género para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "gender",
		      	id : "bot",
		      	value : '0',
		      	text : "Ambos"
		      },
		      {
		      	type : "radio",
		      	name : "gender",
		      	id : "female",
		      	value : '1',
		      	text : "Sólo mujeres"
		      },
		      {
		      	type : "radio",
		      	name : "gender",
		      	id : "male",
		      	value : '2',
		      	text : "Sólo hombres"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeGenderRuleCatalogCaseFile((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,gender:$("body input[name='gender']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeAgeRuleCatalogCaseFile = function(catalog_case_file_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione el rango de edad para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "child",
		      	value : '1',
		      	text : "Niñez (5-13)"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "pubert",
		      	value : '2',
		      	text : "Adolescencia (14-17)"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "adult",
		      	value : '3',
		      	text : "Adulto (18-66)"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "old_man",
		      	value : '4',
		      	text : "Tercera edad (67+)"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeAgeRuleCatalogCaseFile((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,age:$("body input[name='age']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}
	window.changePreviousSurgeriesRuleCatalogCaseFile = function(catalog_case_file_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione una opción para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "head_surgeries",
		      	value : '1',
		      	text : "Cirugías de la cabeza"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "neck_surgeries",
		      	value : '2',
		      	text : "Cirugías de cuello"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "chest_surgeries",
		      	value : '3',
		      	text : "Cirugía de torax"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "abdomen_surgeries",
		      	value : '4',
		      	text : "Cirugías de abdomen"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "back_surgeries",
		      	value : '5',
		      	text : "Cirugías de la espalda"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "pelvic_surgeries",
		      	value : '6',
		      	text : "Cirugías de pelvís"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "limb_surgeries",
		      	value : '7',
		      	text : "Cirugías de extremidades"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changePreviousSurgeriesRuleCatalogCaseFile((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,previous_surgeries:$("body input[name='previous_surgeries']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeIMCRuleCatalogCaseFile = function(catalog_case_file_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione el rango de IMC para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "thinness",
		      	value : '1',
		      	text : "Delgadez (16-18.4)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "healthy_weight",
		      	value : '2',
		      	text : "Peso saludable (18.5-24.9)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "overweight",
		      	value : '3',
		      	text : "Sobrepeso (25-29.4)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "moderate_obesity",
		      	value : '4',
		      	text : "Obesidad moderada (30-34.9)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "severe_obesity",
		      	value : '5',
		      	text : "Obesidad moderada (35-39.9)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "morbid_obesity",
		      	value : '6',
		      	text : "Obesidad moderada (40+)"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeIMCRuleCatalogCaseFile((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,imc:$("body input[name='imc']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeAlcoholismRuleCatalogCaseFile = function(catalog_case_file_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione alcohólico para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "alcoholism",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "alcoholism",
		      	id : "alcoholism",
		      	value : '1',
		      	text : "Alcoholicos"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeAlcoholismRuleCatalogCaseFile((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,alcoholism:$("body input[name='alcoholism']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeSmokeRuleCatalogCaseFile = function(catalog_case_file_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione una opción para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_null",
		      	value : '1',
		      	text : "Menor de 10 (R. EPOC Nulo)"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_low",
		      	value : '2',
		      	text : "10 a 20 (R. EPOC Moderado)"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_intense",
		      	value : '3',
		      	text : "21 a 40 (R. EPOC Intenso)"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_high",
		      	value : '4',
		      	text : "Más de 41 (R. EPOC Alto)"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeSmokeRuleCatalogCaseFile((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_case_file_id:catalog_case_file_id,smoke:$("body input[name='smoke']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeIMCRuleCatalogSign = function(catalog_sign_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione el rango de IMC para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "imc",
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "thinness",
		      	value : '1',
		      	text : "Delgadez (16-18.4)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "healthy_weight",
		      	value : '2',
		      	text : "Peso saludable (18.5-24.9)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "overweight",
		      	value : '3',
		      	text : "Sobrepeso (25-29.4)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "moderate_obesity",
		      	value : '4',
		      	text : "Obesidad moderada (30-34.9)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "severe_obesity",
		      	value : '5',
		      	text : "Obesidad moderada (35-39.9)"
		      },
		      {
		      	type : "radio",
		      	name : "imc",
		      	id : "morbid_obesity",
		      	value : '6',
		      	text : "Obesidad moderada (40+)"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeIMCRuleCatalogSign((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,imc:$("body input[name='imc']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeAgeRuleCatalogSign = function(catalog_sign_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione el rango de edad para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "child",
		      	value : '1',
		      	text : "Niñez (5-13)"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "pubert",
		      	value : '2',
		      	text : "Adolescencia (14-17)"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "adult",
		      	value : '3',
		      	text : "Adulto (18-66)"
		      },
		      {
		      	type : "radio",
		      	name : "age",
		      	id : "old_man",
		      	value : '4',
		      	text : "Tercera edad (67+)"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeAgeRuleCatalogSign((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,age:$("body input[name='age']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	

	window.changeAlcoholismRuleCatalogSign = function(catalog_sign_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione alcohólicos para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "alcoholism",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "alcoholism",
		      	id : "alcoholism",
		      	value : '1',
		      	text : "Alcoholicos"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeAlcoholismRuleCatalogSign((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,alcoholism:$("body input[name='alcoholism']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.changeSmokeRuleCatalogSign = function(catalog_sign_id){
				
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione una opción para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_null",
		      	value : '1',
		      	text : "Menor de 10 (R. EPOC Nulo)"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_low",
		      	value : '2',
		      	text : "10 a 20 (R. EPOC Moderado)"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_intense",
		      	value : '3',
		      	text : "21 a 40 (R. EPOC Intenso)"
		      },
		      {
		      	type : "radio",
		      	name : "smoke",
		      	id : "EPOC_high",
		      	value : '4',
		      	text : "Más de 41 (R. EPOC Alto)"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeSmokeRuleCatalogSign((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,smoke:$("body input[name='smoke']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}
	window.changePreviousSurgeriesRuleCatalogSign = function(catalog_sign_id){
				
	     alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione una opción para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "all",
		      	value : '0',
		      	text : "Todos"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "head_surgeries",
		      	value : '1',
		      	text : "Cirugías de la cabeza"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "neck_surgeries",
		      	value : '2',
		      	text : "Cirugías de cuello"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "chest_surgeries",
		      	value : '3',
		      	text : "Cirugía de torax"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "abdomen_surgeries",
		      	value : '4',
		      	text : "Cirugías de abdomen"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "back_surgeries",
		      	value : '5',
		      	text : "Cirugías de la espalda"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "pelvic_surgeries",
		      	value : '6',
		      	text : "Cirugías de pelvís"
		      },
		      {
		      	type : "radio",
		      	name : "previous_surgeries",
		      	id : "limb_surgeries",
		      	value : '7',
		      	text : "Cirugías de extremidades"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changePreviousSurgeriesRuleCatalogSign((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,previous_surgeries:$("body input[name='previous_surgeries']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}	

	window.changeGenderRuleCatalogSign = function(catalog_sign_id){

	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "Seleccione el género para aplicar regla.",
	      inputs : [
		      {
		      	type : "radio",
		      	name : "gender",
		      	id : "bot",
		      	value : '0',
		      	text : "Ambos"
		      },
		      {
		      	type : "radio",
		      	name : "gender",
		      	id : "female",
		      	value : '1',
		      	text : "Sólo mujeres"
		      },
		      {
		      	type : "radio",
		      	name : "gender",
		      	id : "male",
		      	value : '2',
		      	text : "Sólo hombres"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate('Aceptar')	,
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	medical.changeGenderRuleCatalogSign((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{catalog_sign_id:catalog_sign_id,gender:$("body input[name='gender']:checked").val()});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}
});

class Medical extends Http{
	changeGenderRuleCatalogCaseFile(callback,data){
		return this.call("../../app/application/change_gender_rule_catalog_casefile.php",data,callback,false);
	}
	changeAgeRuleCatalogCaseFile(callback,data){
		return this.call("../../app/application/change_age_rule_catalog_casefile.php",data,callback,false);
	}
	changeIMCRuleCatalogCaseFile(callback,data){
		return this.call("../../app/application/change_imc_rule_catalog_casefile.php",data,callback,false);
	}
	changeAlcoholismRuleCatalogCaseFile(callback,data){
		return this.call("../../app/application/change_alcoholism_rule_catalog_casefile.php",data,callback,false);
	}
	changeSmokeRuleCatalogCaseFile(callback,data){
		return this.call("../../app/application/change_smoke_rule_catalog_casefile.php",data,callback,false);
	}
	changePreviousSurgeriesRuleCatalogCaseFile(callback,data){
		return this.call("../../app/application/change_previous_surgeries_rule_catalog_casefile.php",data,callback,false);
	}
	changeSignName(callback,data){
		return this.call("../../app/application/change_sign_name.php",data,callback,false);
	}
	editKeyWords(callback,data){
		return this.call("../../app/application/edit_keywords.php",data,callback,false);
	}
	changeGenderRuleCatalogSign(callback,data){
		return this.call("../../app/application/change_gender_rule_catalog_sign.php",data,callback,false);
	}
	changeAgeRuleCatalogSign(callback,data){
		return this.call("../../app/application/change_age_rule_catalog_sign.php",data,callback,false);
	}
	changeIMCRuleCatalogSign(callback,data){
		return this.call("../../app/application/change_imc_rule_catalog_sign.php",data,callback,false);
	}
	changeAlcoholismRuleCatalogSign(callback,data){
		return this.call("../../app/application/change_alcoholism_rule_catalog_sign.php",data,callback,false);
	}
	changeSmokeRuleCatalogSign(callback,data){
		return this.call("../../app/application/change_smoke_rule_catalog_sign.php",data,callback,false);
	}
	changePreviousSurgeriesRuleCatalogSign(callback,data){
		return this.call("../../app/application/change_previous_surgeries_rule_catalog_sign.php",data,callback,false);
	}
}