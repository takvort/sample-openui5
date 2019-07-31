sap.ui.define([
	"sap/ui/core/UIComponent",
	"salesorders/util/Config"
], function(UIComponent, Config) {
	"use strict";

	return UIComponent.extend("salesorders.Component", {

		metadata : {
			manifest : "json"
		},

		init : function() {
			UIComponent.prototype.init.apply(this, arguments);
			
			this.getRouter().initialize();
		}

	});

});
