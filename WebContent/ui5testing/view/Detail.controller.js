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
		console.log("detail init");
		var that = this;
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

		this.model = sap.ui.getCore().byId("app").getModel();
		this.model.attachRequestCompleted(function(oEvent) {
			console.log("attachRequestCompleted");
			var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			var hash = oHashChanger.getHash();
			var objectId = hash.split("/")[1];
			
			that._setViewContext(objectId);
		});
	},

	_handleRouteMatched : function(evt) {
		console.log("_handleRouteMatched");
		var objectId = evt.getParameter("arguments").id;
		this._setViewContext(objectId);
	},

	_setViewContext : function(objectId) {
		console.log("_setViewContext");
		var model = sap.ui.getCore().byId("app").getModel();
		var data = model.getData()["applicants"];

		var pathId;
		if (data) {
			for (var i = 0; data.length; i++) {
				if (objectId == data[i].id) {
					pathId = i;
					break;
				}
			}

			var sPath = "/applicants/" + pathId;

			var context = new sap.ui.model.Context(model, sPath)
			
			
			var list = sap.ui.getCore().byId("Master").byId("list");
			var item = list.getItems()[pathId];
			item.setSelected(true);
			console.log(pathId);
			console.log("le item");
			console.log(item);
			
			this.getView().setBindingContext(context);
		}
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf ui5testing.view.Detail
	 */
	onBeforeRendering : function() {
		
	},
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf ui5testing.view.Detail
	 */
	onAfterRendering : function() {
	},
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