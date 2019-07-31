sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
    	"salesorders/util/Config"
], function(Controller, JSONModel, MessageBox, Config) {
	"use strict";

	return Controller.extend("salesorders.controller.Items", {

		onInit : function() {
			var newItemModel = new JSONModel();
			newItemModel.setSizeLimit(Number.MAX_VALUE);
			this.getView().setModel(newItemModel, "newItem");


			var itemsModel = new JSONModel();
			itemsModel.setSizeLimit(Number.MAX_VALUE);
			this.getView().setModel(itemsModel, "items");


			itemsModel.attachRequestSent(function() {
				this.getView().setBusy(true);
			}, this);
			itemsModel.attachRequestFailed(function() {
				var messageBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				MessageBox.error(messageBundle.getText("generalError"));
			}, this);
			itemsModel.attachRequestCompleted(function() {
				this.getView().setBusy(false);
			}, this);
			itemsModel.loadData(Config.serviceUrl + "/items");

			/* Alternatively the model data can be loaded with jQuery.ajax
			
			jQuery.ajax({
				type : "GET",
				url : Config.serviceUrl + "/items",
				context : this,
				beforeSend : function(){
					this.getView().setBusy(true);
				}
			}).done(function(data, textStatus, jqXHR){
				itemsModel.setData(data);
			}).fail(function(jqXHR, textStatus, errorThrown){
				var messageBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				MessageBox.error(messageBundle.getText("generalError"));
			}).always(function(){
				this.getView().setBusy(false);
			});
			
			*/
		},
		
		onAddItem : function(evt) {
			var newItemModel = this.getView().getModel("newItem");
			
			jQuery.ajax({
				type : "POST",
				url : Config.serviceUrl + "/items",
				contentType : "application/json; charset=utf-8",
				context : this,
				beforeSend : function(){
					this.getView().setBusy(true);
				},
				data : JSON.stringify({
					description : newItemModel.getProperty("/description"),
					amount :  newItemModel.getProperty("/amount")
				})
			}).done(function(data, textStatus, jqXHR){
				var itemsModel = this.getView().getModel("items");
				var items = itemsModel.getProperty("/orderItems");
				items.push(data);
				
				var newItemsArray = [].concat(items);
				itemsModel.setProperty("/orderItems", newItemsArray);
			}).fail(function(jqXHR, textStatus, errorThrown){
				var messageBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
				MessageBox.error(messageBundle.getText("generalError"));
			}).always(function(){
				this.getView().setBusy(false);
			});
		}
		
	});
});
