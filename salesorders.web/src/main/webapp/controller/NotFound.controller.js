sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
], function(Controller, UIComponent) {
	"use strict";

	return Controller.extend("salesorders.controller.NotFound", {
	
		onInit : function() {
			var notFoundTarget = UIComponent.getRouterFor(this).getTarget("notFoundTarget");
			notFoundTarget.attachDisplay(function(oEvent) {
				var path = oEvent.getParameter("data").path;
				if (path) {
					var escapedPath = jQuery.sap.encodeHTML(path);
					var messageBundle = this.getView().getModel("i18n").getResourceBundle();
					var notFoundMessage = messageBundle.getText("objectNotFoundMessage", [escapedPath]);
					this.byId("messagePage").setText(notFoundMessage);
				}
			}, this);
		}
		
	});
});