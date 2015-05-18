jQuery.sap.declare("ui5testing.Component");

sap.ui.core.UIComponent.extend("ui5testing.Component", {

	// hier werden die Routen definiert
	// Schema:
	// 1. config: Grundeinstellungen zu den Views im Routing
	// viewType: welcher Typ von View soll verwendet werden
	// viewPath: Pfad, in dem die Views der Anwendung liegen
	// targetControl: auf welches Controll sollen sich die Angaben der Routen beziehen
	// clearTarget: Soll die Ziel-Aggregation beim Routing vorher gelöscht werden
	//
	// 2. routes: Definierte Routen
	// pattern: Muster der URL. Werte in geschweiften Klammern können dynamisch sein.
	// name: Benennung der Route, um diese über den Namen schneller ansteuern zu können
	// viewLevel: verwendet um die Transition beim View-Wechsel zu steuern. 
	// targetAggregation: Welche Aggregation meiner App ist durch die Route betroffen
	// view: welche View soll geladen werden
	// subroutes: verschachtelte Routen, um das Master-Detail-Verhalten zu erhalten
	
	metadata : {
		routing : {
			config : {
				viewType : "XML",
				viewPath : "ui5testing.view",
				targetControl : "idAppControl", // id meiner SplitApp, die in der
												// Main.view erstellt wurde
				clearTarget : false
			},
			routes : [ {
				pattern : "",
				name : "index",
				view : "Master",
				viewLevel : 0,
				targetAggregation : "masterPages",
				subroutes : [ {
					pattern : "applicants/{id}",
					name : "applicants",
					view : "Detail",
					viewLevel : 1,
					targetAggregation : "detailPages",

				}, {
					pattern : "{all*}",
					name : "empty",
					view : "Empty",
					viewLevel : 1,
					targetAggregation : "detailPages"
				} ]
			} ]
		}
	}
});

ui5testing.Component.prototype.init = function() {
	jQuery.sap.require("sap.ui.core.routing.History");
	jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

	sap.ui.core.UIComponent.prototype.init.apply(this);

	var router = this.getRouter();
	this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
	router.initialize();
};

ui5testing.Component.prototype.destroy = function() {
	if (this.routeHandler) {
		this.routeHandler.destroy();
	}
	sap.ui.core.UIComponent.destroy.apply(this, arguments);
};

ui5testing.Component.prototype.createContent = function() {

	// create root view
	var oView = sap.ui.view({
		id : "app",
		viewName : "ui5testing.view.Main",
		type : "JS",
		viewData : {
			component : this
		}
	});

	// set i18n Model
	var i18nModel = new sap.ui.model.resource.ResourceModel({
		bundleUrl : "i18n/messageBundle.properties"
	});
	oView.setModel(i18nModel, "i18n");

	// Using a local model for offline development
	var oModel = new sap.ui.model.json.JSONModel("model/mock_applicants.json");
	oView.setModel(oModel);

	console.log("model set");

	// set device model
	var deviceModel = new sap.ui.model.json.JSONModel({
		isPhone : jQuery.device.is.phone,
		isNoPhone : !jQuery.device.is.phone,
		listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
		listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
	});
	deviceModel.setDefaultBindingMode("OneWay");
	oView.setModel(deviceModel, "device");

	// done
	return oView;
};