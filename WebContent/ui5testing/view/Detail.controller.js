sap.ui.controller("ui5testing.view.Detail", {

	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf ui5testing.view.Detail
	 */
	onInit : function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
	},

	_handleRouteMatched : function(evt) {
		var args = evt.getParameter("arguments");	
		
		var id = evt.getParameter("arguments").id;
		var sPath = "/applicants/" + id;
		var model = this.getView().getModel();
				
		var context = new sap.ui.model.Context(model, sPath)
		this.getView().setBindingContext(context);
		
		var masterViewList = sap.ui.getCore().byId("Master").byId("list");
		var item = masterViewList.getItems()[id];
		
		if (item) {
			item.setSelected(true);
		}	 
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf ui5testing.view.Detail
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf ui5testing.view.Detail
 */
// onAfterRendering: function() {
//		var masterViewList = sap.ui.getCore().byId("Master").byId("list");
//		var item = masterViewList.getItems()[this.id];
//		
//		if (item) {
//			item.setSelected(true);
//		}
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf ui5testing.view.Detail
 */
// onExit: function() {
//
// }
});