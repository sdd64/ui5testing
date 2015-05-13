jQuery.sap.require("ui5testing.util.Formatter");

sap.ui.controller("ui5testing.view.Master", {
	handleApplicantSelect : function (evt) {
		
        var context  = evt.getParameter("listItem").getBindingContext();
        var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
        var path = context.getPath();
        
        oHashChanger.setHash( path.slice(1) );
	},
	
	handleSearch : function (evt) {
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("lastname", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},

	
	// Handy Modus!
	handleApplicantPress : function (evt){
		var context = evt.getSource().getBindingContext();	
	    this.nav.to("Detail", context);
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ui5testing.Master
*/
	onInit: function() {
		//this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},
	
	onRouteMatched: function(evt){
	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ui5testing.Master
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ui5testing.Master
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ui5testing.Master
*/
//	onExit: function() {
//
//	}

});