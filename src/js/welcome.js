var Welcome = {
	setUserInBoardFromPrewelcome : function(callback,data) {
		return this.getProvider({url:'set_user_in_a_board_from_prewelcome'},callback,data);
	},
	acceptCommerceAuction : function(callback,data) {
		return this.getProvider({url:'accept_auction_per_commerce'},callback,data);
	},
	getPaymentLog : function(callback,data) {
		return this.getProvider({url:'get_payment_log'},callback,data);
	},
	loginWithFacebook : function(callback,data) {
		return this.getProvider({url:'login_user_with_facebook'},callback,data);
	},
	loginUser : function(callback,data) {
		return this.getProvider({url:'login_user'},callback,data);
	},
	updateUser : function(callback,data) {
		return this.getProvider({url:'update_user'},callback,data);
	},
	updateUserPhoto : function(callback,data) {
		return this.getProvider({url:'update_user_photo'},callback,data);
	},
	saveBuyForReload : function(callback,data) {
		return this.getProvider({url:'save_buy_for_reload'},callback,data);
	},
	registratePayPalBuy : function(callback,data) {
		return this.getProvider({url:'registrate_paypal_buy'},callback,data);
	},
	saveBuy : function(callback,data) {
		return this.getProvider({url:'save_buy'},callback,data);
	},
	makeUserAuction : function(callback,data) {
		return this.getProvider({url:'make_auction_user'},callback,data);
	},
	deleteAuction : function(callback,data) {
		return this.getProvider({url:'delete_auction'},callback,data);
	},
	callToWaiter : function(callback,data) {
		return this.getProvider({url:'call_to_waiter'},callback,data);
	},
	getAllUserAuctions : function(callback,data) {
		return this.getProvider({url:'get_all_auction_user'},callback,data);
	},
	getAllUserActiveAuctions : function(callback,data) {
		return this.getProvider({url:'get_all_auction_user_active'},callback,data);
	},
	resetOrder : function(callback,data) {
		return this.getProvider({url:'reset_order'},callback,data);
	},
	checkIfAuctionIsTaked : function(callback,data) {
		return this.getProvider({url:'check_if_auction_is_taked'},callback,data);
	},
	acceptAuction : function(callback,data) {
		return this.getProvider({url:'accept_auction'},callback,data);
	},
	setAuctionAsExpired : function(callback,data) {
		return this.getProvider({url:'set_auction_as_expired'},callback,data);
	},
	registrateBuy : function(callback,data) {
		return this.getProvider({url:'registrate_buy'},callback,data);
	},
	getSubscriptionReload : function(callback,data) {
		return this.getProvider({url:'get_subscription_reload'},callback,data);
	},
	getSubscription : function(callback,data) {
		return this.getProvider({url:'get_subscription'},callback,data);
	},
	getOrderStatus : function(callback,data) {
		return this.getProvider({url:'get_order_status'},callback,data);
	},
	cancelOrder : function(callback,data) {
		return this.getProvider({url:'cancel_order'},callback,data);
	},
	getOrder : function(callback,data) {
		return this.getProvider({url:'get_order'},callback,data);
	},
	getActiveOrder : function(callback,data) {
		return this.getProvider({url:'get_active_order'},callback,data);
	},
	getRefferPerUser : function(callback,data) {
		return this.getProvider({url:'get_reffer_per_user'},callback,data);
	},
	saveRefferPerUser : function(callback,data) {
		return this.getProvider({url:'save_reffer_per_user'},callback,data);
	},
	confirmOrder : function(callback,data) {
		return this.getProvider({url:'confirm_order'},callback,data);
	},
	getCommercesWithPrewelcome : function(callback,data) {
		return this.getProvider({url:'get_commerces_with_prewelcome'},callback,data);
	},
	savePercentajeShareCommerce : function(callback,data) {
		return this.getProvider({url:'get_save_percentaje_share_menu'},callback,data);
	},
	saveShareCommerce : function(callback,data) {
		return this.getProvider({url:'get_save_share_menu'},callback,data);
	},
	getForShareMenu : function(callback,data) {
		return this.getProvider({url:'get_commerces_for_share_menu'},callback,data);
	},
	setRequestPerProduct : function(callback,data) {
		return this.getProvider({url:'set_request_per_product'},callback,data);
	},
	getCarPerUser  : function(callback,data) {
		return this.getProvider({url:'get_car_per_user'},callback,data);
	},
	saveCarPerUser  : function(callback,data) {
		return this.getProvider({url:'save_car_per_user'},callback,data);
	},
	getAllvaletParking  : function(callback,data) {
		return this.getProvider({url:'get_all_valete_parking'},callback,data);
	},
	getCatalogModelCar  : function(callback,data) {
		return this.getProvider({url:'get_catalog_model_car'},callback,data);
	},
	getCatalogBrandCar  : function(callback,data) {
		return this.getProvider({url:'get_catalog_brand_car'},callback,data);
	},
	saveUserRegistrationId : function(callback,data) {
		return this.getProvider({url:'save_registration_id'},callback,data);
	},
	getFaqs : function(callback,data) {
		return this.getProvider({url:'get_faqs'},callback,data);
	},
	getWalletReffer : function(callback,data) {
		return this.getProvider({url:'get_wallet_reffer'},callback,data);
	},
	getWallet : function(callback,data) {
		return this.getProvider({url:'get_wallet'},callback,data);
	},
	getUserCoins : function(callback,data) {
		return this.getProvider({url:'get_user_coins'},callback,data);
	},
	getUsersAround : function(callback,data) {
		return this.getProvider({url:'get_users_around'},callback,data);
	},
	getUsersAroundForFood : function(callback,data) {
		return this.getProvider({url:'get_users_around_for_food'},callback,data);
	},
	getSpecialData : function(callback,data) {
		return this.getProvider({url:'load_special_data'},callback,data);
	},
	/* commerce */
	save : function(callback,data)  {
    	return this.getProvider({url:'save_commerce'},callback,data);
  	},
	checkVarsBeforeSave : function(callback,data)  {
		return this.getProvider({url:'check_vars_before_save'},callback,data);
	},
	setReamingTime : function(callback,data)  {
		return this.getProvider({url:'set_reaming_time'},callback,data);
	},
	createUUID : function()
    {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function")
        {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
        {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
	create : function(options)  {
		var defaults = {
            title: "", 
            subTitle: $("<p />"),
            closeIcon: false, 
            id: this.createUUID(), 
            open: function () { }, 
            buttons: [],
            inputs: [],
            size: 'modal-sm',
        };

        var settings = $.extend(true, {}, defaults, options);

        // create the DOM structure
        var $modal = $("<div />").attr("id", settings.id).attr("role", "dialog").addClass("modal fade")
                        .append($("<div />").addClass("modal-dialog "+settings.size)
                            .append($("<div />").addClass("modal-content")
                                .append($("<div />").addClass("modal-header")
                                    .append($("<h4 />").addClass("modal-title").text(settings.title)))
                                .append($("<div />").addClass("modal-body")
                                    .append(settings.subTitle))
                                .append($("<div />").addClass("modal-footer")
                                )
                            )
                        );
        $modal.shown = false;
        $modal.dismiss = function ()
        {
        	$modal.modal('hide');
            // loop until its shown
            // this is only because you can do $.fn.alert("utils.js makes this so easy!").dismiss(); in which case it will try to remove it before its finished rendering
            // if (!$modal.shown)
            // {
            //     window.setTimeout(function ()
            //     {
            //         $modal.dismiss();
            //     }, 50);
            //     return;
            // }

            // // hide the dialogue
            // $modal.modal("hide");
            // // remove the blanking
            // $modal.prev().remove();
            // // remove the dialogue
            // $modal.empty().remove();

            window.setTimeout(function (){
	            $("body").removeClass("modal-open");
	            $(".responsive-bootstrap-toolkit").remove();
	            $(".modal-backdrop").remove();
            }, 500);
        }

        if (settings.closeIcon)
            $modal.find(".modal-header").prepend($("<button />").attr("type", "button").addClass("close").html("&times;").click(function () { $modal.dismiss() }));

        // add the buttons
        var $footer = $modal.find(".modal-footer");
        var $body = $modal.find(".modal-body");
        var hasInput = settings.inputs.length ? true : false;

        for(var i=0; i < settings.inputs.length; i++)
        {
            (function (input) {
            	let id = input.id ? input.id : Welcome.createUUID();
            	settings.inputs[i].id = id;
                $body.append($("<input />").addClass("form-control underlined")
                    .attr("id", id)
                    .attr("type", input.type)
                    .attr("name", input.name)
                    .attr("placeholder", input.placeholder)
                    )
            })(settings.inputs[i]);
        }

        for(var i=0; i < settings.buttons.length; i++)
        {
            (function (btn) {
            	let id = btn.id ? btn.id : Welcome.createUUID();
            	settings.buttons[i].id = id;
                $footer.prepend($("<button />").addClass("btn btn-secondary")
                    .attr("id", id)
                    .attr("type", "button")
                    .text(btn.text)
                    .click(function ()
                    {
                    	if(hasInput)
                    	{
                        	btn.handler(Welcome.getInputsData(settings.inputs));
                    		$modal.dismiss();
                    	} else {
                        	btn.handler($modal)
                    	}
                    	if(btn.role == 'cancel') 
                    	{
                    		$modal.dismiss();	
                    	}
                    }))
            })(settings.buttons[i]);
        }

        settings.open($modal);

        $modal.on('shown.bs.modal', function (e) {
            $modal.shown = true;
        });

        // $modal.modal("show");

        return $modal;
	},
	modal : function(settings)  {
		$modal = this.create(settings);
		this.present($modal);
	},
	present : function($modal)  {
		$modal.modal("show");
	},
	getInputsData : function(inputs)  {
		var data = [];
		if(inputs.length)
		{
			for (var i = inputs.length - 1; i >= 0; i--) {
				let name = inputs[i].name;
				data.name = $("#"+inputs[i].id).val();
			}
		}
		return data;
	},
	validateCode : function(callback,data)  {
		return this.getProvider({url:'validate_code'},callback,data);
	},
	getUsersList : function(callback,data)  {
		return this.getProvider({url:'get_users_list'},callback,data);
	},
	getAllWaiters : function(callback,data)  {
		return this.getProvider({url:'get_waiter_per_commerce'},callback,data);
	},
	setOrdenAsAtendence : function(callback,data)  {
		return this.getProvider({url:'set_order_as_atendence'},callback,data);
	},
	getAllOfferAuctionPerCommerce : function(callback,data)  {
		return this.getProvider({url:'get_all_offer_auctions_per_commerce'},callback,data);
	},
	searchUser : function(callback,data)  {
		return this.getProvider({url:'search_user'},callback,data);
	},
	getUsersOnMyCommerce : function(callback,data)  {
		return this.getProvider({url:'get_users_on_my_commerce'},callback,data);
	},
	addToCart : function(callback,data)  {
		return this.getProvider({url:'add_dish_to_cart'},callback,data);
	},
	setUserAsPreWelcome : function(callback,data)  {
		return this.getProvider({url:'set_user_in_prewelcome'},callback,data);
	},
	setProductStatus : function(callback,data)  {
		return this.getProvider({url:'set_product_order_as_status'},callback,data);
	},
	deleteProductPerCommerce : function(callback,data)  {
		return this.getProvider({url:'delete_product_per_commerce'},callback,data);
	},
	getCarPerUser : function(callback,data)  {
		return this.getProvider({url:'get_car_per_user_for_commerce'},callback,data);
	},
	getCarsPerUser : function(callback,data)  {
		return this.getProvider({url:'get_cars_per_user_for_commerce'},callback,data);
	},
	getCarPerUserPending : function(callback,data)  {
		return this.getProvider({url:'get_car_per_user_pending_for_commerce'},callback,data);
	},
	setCarAsFinish : function(callback,data)  {
		return this.getProvider({url:'set_car_as_finish'},callback,data);
	},
	setCarAsPending : function(callback,data)  {
		return this.getProvider({url:'set_car_as_pending'},callback,data);
	},
	addPriceToProduct : function(callback,data)  {
		return this.getProvider({url:'set_product_price'},callback,data);
	},
	saveCategoryProduct : function(callback,data)  {
		return this.getProvider({url:'save_category_product'},callback,data);
	},
	saveProductPerCommerce : function(callback,data)  {
		return this.getProvider({url:'save_product_per_commerce'},callback,data);
	},
	hasRefferProgram : function(callback,data)  {
		return this.getProvider({url:'has_reffer_program'},callback,data);
	},
	signOnRefferProgram : function(callback,data)  {
		return this.getProvider({url:'sign_on_reffer_program'},callback,data);
	},
	getCategoryProduct : function(callback,data)  {
		return this.getProvider({url:'get_category_product'},callback,data);
	},
	getCatalogProduct : function(callback,data)  {
		return this.getProvider({url:'get_catalog_product'},callback,data);
	},
	makeDishOfDay : function(callback,data)  {
		return this.getProvider({url:'make_dish_of_day'},callback,data);
	},
	getDishesByKindForCommerce : function(callback,data)  {
		return this.getProvider({url:'get_dishes_by_kind_for_commerce'},callback,data);
	},
	getDishesByKind : function(callback,data)  {
		return this.getProvider({url:'get_dishes_by_kind'},callback,data);
	},
	getPendingOrdersByKind : function(callback,data)  {
		return this.getProvider({url:'get_pending_orders_by_kind'},callback,data);
	},
	closeOrder : function(callback,data)  {
		return this.getProvider({url:'close_order'},callback,data);
	},
	getAmountOfDinner : function(callback,data)  {
		return this.getProvider({url:'get_amount_of_dinner'},callback,data);
	},
	saveHelper : function(callback,data)  {
		return this.getProvider({url:'save_helper'},callback,data);
	},
	saveParkingHelper : function(callback,data)  {
		return this.getProvider({url:'save_parking_helper'},callback,data);
	},
	getCatalogCommerceUser : function(callback,data)  {
		return this.getProvider({url:'get_catalog_commerce_user'},callback,data);
	},
	getBalance : function(callback,data)  {
		return this.getProvider({url:'get_balance'},callback,data);
	},
	getAllOfferAuctionFromCommerce : function(callback,data)  {
		return this.getProvider({url:'get_all_offer_auctions_from_commerce'},callback,data);
	},
	getAuctionsAceptedPerUsersToCommerce : function(callback,data)  {
		return this.getProvider({url:'get_auctions_acepted_per_users_to_commerce'},callback,data);
	},
	getAuctionsPerUsersToCommerce : function(callback,data)  {
		return this.getProvider({url:'get_auctions_per_users_to_commerce'},callback,data);
	},
	sendProposalToUser : function(callback,data)  {
		return this.getProvider({url:'send_proposal_to_user'},callback,data);
	},
	getAllAuctionsPerCommerce : function(callback,data)  {
		return this.getProvider({url:'get_all_auctions_per_commerce'},callback,data);
	},
	saveAuctionsPerCommerce : function(callback,data)  {
		return this.getProvider({url:'save_auctions_per_commerce'},callback,data);
	},
	getAllForMap : function(callback,data)  {
		return this.getProvider({url:'get_all_commerces_for_map'},callback,data);
	},
	getAll : function(callback,data)  {
		return this.getProvider({url:'get_all_commerces'},callback,data);
	},
	setUserInBoard : function(callback,data)  {
		return this.getProvider({url:'set_user_in_a_board'},callback,data);
	},
	getPendingOrder : function(callback,data)  {
		return this.getProvider({url:'get_pending_orders'},callback,data);
	},
	getEndingOrder : function(callback,data)  {
		return this.getProvider({url:'get_ending_orders'},callback,data);
	},
	getDoneOrder : function(callback,data)  {
		return this.getProvider({url:'get_done_orders'},callback,data);
	},
	getActiveOrder : function(callback,data)  {
		return this.getProvider({url:'get_active_orders'},callback,data);
	},
	getPendingRewards : function(callback,data)  {
		return this.getProvider({url:'get_pending_rewards'},callback,data);
	},
	getDistanceCommerce : function(callback,data)  {
		return this.getProvider({url:'get_distance_commerce'},callback,data);
	},
	getCommerceNearOfMeToNotification : function(callback,data)  {
		return this.getProvider({url:'get_commerces_near_of_me_to_notification'},callback,data);
	},
	getAllPromoMine : function(callback,data)  {
		return this.getProvider({url:'get_all_my_commerces'},callback,data);
	},
	getAllPurses : function(callback,data)  {
		return this.getProvider({url:'get_all_purses'},callback,data);
	},
	getCatalogActiviy : function(callback,data)  {
		return this.getProvider({url:'get_catalog_activiy'},callback,data);
	},
	sendFreeCoins : function(callback,data)  {
		return this.getProvider({url:'send_free_coins_to_user_by_commerce'},callback,data);
	},
	makeRewardRequest : function(callback,data)  {
		return this.getProvider({url:'make_reward_request'},callback,data);
	},
	refuseRequest : function(callback,data)  {
		return this.getProvider({url:'refuse_request'},callback,data);
	},
	sendRequestedFreeCoins : function(callback,data)  {
		return this.getProvider({url:'send_requested_free_coins_to_user_by_commerce'},callback,data);
	},
	getFreeCoinsSendedToMe : function(callback,data)  {
		return this.getProvider({url:'get_free_coins_sended_to_me'},callback,data);
	},
	getPackage : function(callback,data)  {
		return this.getProvider({url:'get_package'},callback,data);
	},
	setCommerceAsOpened : function(callback,data)  {
		return this.getProvider({url:'set_commerce_as_opened'},callback,data);
	},
	getAllMine : function(callback,data)  {
		return this.getProvider({url:'get_all_commerces_mine'},callback,data);
	},
	getAnalitycs : function(callback,data)  {
		return this.getProvider({url:'get_analitycs'},callback,data);
	},
	searchPlace : function(callback,data)  {
		return this.getProvider({url:'search_place'},callback,data);
	},
	deleteOfferLastFood : function(callback,data)  {
		return this.getProvider({url:'delete_last_food_offers'},callback,data);
	},
	getLastFoodOffersNoExpired : function(callback,data)  {
		return this.getProvider({url:'get_last_food_offers_no_expired'},callback,data);
	},
	getLastFoodOffers : function(callback,data)  {
		return this.getProvider({url:'get_last_food_offers'},callback,data);
	},
	getEspecialOffers : function(callback,data)  {
		return this.getProvider({url:'get_special_offers'},callback,data);
	},
	getAnalitycsDetail : function(callback,data)  {
		return this.getProvider({url:'get_analitycs_detail'},callback,data);
	},
	getCommerceNearOfMe : function(callback,data)  {
		return this.getProvider({url:'get_commerces_near_of_me'},callback,data);
	},
	getOffersPerCommerce : function(callback,data) {
		return this.getProvider({url:'get_offers_per_commerce'},callback,data);
	},
	getOffersCommercesNearOfMe : function(callback,data) {
		return this.getProvider({url:'get_offers_commerces_near_of_me'},callback,data);
	},
	saveOffersPerCommerce : function(callback,data) {
		return this.getProvider({url:'save_offers_per_commerce'},callback,data);
	},
	saveSpecialOfferPerCommerce : function(callback,data) {
		return this.getProvider({url:'save_special_offer_per_commerce'},callback,data);
	},
	getCoinsPerCommerceId : function(callback,data) {
		return this.getProvider({url:'get_coins_per_commerce_id'},callback,data);
	},
	changeCoinsPerOfferFromCommerce : function(callback,data) {
		return this.getProvider({url:'change_coins_per_offer_from_commerce'},callback,data);
	},
	getReportCoinsGranted : function(callback,data) {
		return this.getProvider({url:'get_report_coins_granted'},callback,data);
	},
	getReportCoinsGrantedView : function(callback,data) {
		return this.getProvider({url:'get_report_coins_granted_view'},callback,data);
	},
	getPromotionsChanged : function(callback,data) {
		return this.getProvider({url:'get_promotions_changed'},callback,data);
	},
	getPromotionsPending : function(callback,data) {
		return this.getProvider({url:'get_promotions_pending'},callback,data);
	},
	getPromotionsDelivered : function(callback,data) {
		return this.getProvider({url:'get_promotions_delivered'},callback,data);
	},
	setAsDelivered : function(callback,data) {
		return this.getProvider({url:'set_promotion_delivered'},callback,data);
	},
	savePricesFuel : function(callback,data) {
		return this.getProvider({url:'save_prices_fuel'},callback,data);
	},
	sendCoinsToCommerceFromUser : function(callback,data) {
		return this.getProvider({url:'send_coins_to_commerce_from_user'},callback,data);
	},
	getProvider : function(call,callback,data){
		let returnData = {
			timeOut : 100,
			async : true,
			loadOldObject : false,
			url : '../../app/application/'+call.url+'.php',
		};

		if(data != undefined) returnData.data = data;

		// var OldObject = $(data.object).html();
		// 	parent = this;

		__getJSONRequestNAsync(returnData,function(response){
			if(response.success == 1)
			{
				if(response.unique_id != undefined) unique_id = response.unique_id;

				$(data.object).html(response.html);

				if(data.callback !== false) parent.getProvider(data.callback);
			} else {
				if(response.html) $(data.object).html(response.html);
			}
			if(callback) callback(response);
		});
	}
};