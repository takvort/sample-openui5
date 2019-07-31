sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("salesorders.controller.App", {

		onBeforeRendering : function() {
			this.setHomeIcons();
			this.setDocumentTitle();
		},

		setHomeIcons : function() {
			this.byId("app").setHomeIcon({
				"phone" : "img/sales-order.png",
				"phone@2" : "img/sales-order.png",
				"tablet" : "img/sales-order.png",
				"tablet@2" : "img/sales-order.png",
				"icon" : "img/sales-order.png"
			});
		},

		setDocumentTitle : function() {
			var messageBundle = this.getView().getModel("i18n").getResourceBundle();
			document.title = messageBundle.getText("appTitle");
		}

	});

});
