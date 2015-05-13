jQuery.sap.declare("ui5testing.Component");

sap.ui.core.UIComponent.extend("ui5testing.Component", {

	metadata : {
		routing : {
			config : { 
				viewType:"XML",
				viewPath:"ui5testing.view",
				targetControl:"idAppControl",
				clearTarget : false
			},
			routes : [
			          {
			              pattern : "",
			              name : "Master",
			              view : "Master",
			              viewLevel : 0,
			              targetAggregation : "masterPages",
			              subroutes : [
			                  {
			                      pattern : "applicants/{id}",
			                      name : "Detail",
			                      view : "Detail",
			                      viewLevel : 1,
			                      targetAggregation : "detailPages",

			                  },
			                  {
			                      pattern : "{all*}",
			                      name : "Empty",
			                      view : "Empty",
			                      targetAggregation : "detailPages"
			                  }
			              ]
			          }
			      ]
		}
	}
});


ui5testing.Component.prototype.init = function(){
	jQuery.sap.require("sap.ui.core.routing.History");
	jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
	
	sap.ui.core.UIComponent.prototype.init.apply(this);
	
	var router = this.getRouter();
	this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
	router.initialize();
};

ui5testing.Component.prototype.destroy = function(){
	if(this.routeHandler){
		this.routeHandler.destroy();
	}
	sap.ui.core.UIComponent.destroy.apply(this,arguments);
};

ui5testing.Component.prototype.createContent = function(){
	// create root view
	var oView = sap.ui.view({
		id : "app",
		viewName : "ui5testing.view.Main",
		type : "JS",
		viewData : {
			component : this
		}
	});
	// // Using OData model to connect against a real service
	// var url =
	// "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
	// var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>",
	// "<password>");
	// oView.setModel(oModel);

	// set i18n Model
	var i18nModel = new sap.ui.model.resource.ResourceModel({
		bundleUrl : "i18n/messageBundle.properties"
	});
	oView.setModel(i18nModel, "i18n");

	// Using a local model for offline development
	var oModel = new sap.ui.model.json.JSONModel(
			"model/mock_applicants.json");
	oView.setModel(oModel);

	// set device model
	var deviceModel = new sap.ui.model.json.JSONModel(
			{
				isPhone : jQuery.device.is.phone,
				isNoPhone : !jQuery.device.is.phone,
				listMode : (jQuery.device.is.phone) ? "None"
						: "SingleSelectMaster",
				listItemType : (jQuery.device.is.phone) ? "Active"
						: "Inactive"
			});
	deviceModel.setDefaultBindingMode("OneWay");
	oView.setModel(deviceModel, "device");


	// done
	return oView;
};