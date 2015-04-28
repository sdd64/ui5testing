jQuery.sap.declare("ui5testing.Component");

sap.ui.core.UIComponent.extend("ui5testing.Component", {

	metadata : {
		name : "UI5 Testing",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},
	},
	
	rootView : "sap.ui.demo.tdg.view.App",
	
	config : {
		resourceBundle : "i18n/messageBundle.properties",
		serviceConfig : {
			name : "Northwind",
			serviceUrl : "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
		},
	},
	
	routing : {
		
	},
	
	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "ui5testing.view.Main",
			type : "JS",
			viewData : { component : this }
		});

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// set i18n Model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");
		
		// Using a local model for offline development
		
		var oModel = new sap.ui.model.json.JSONModel("model/mock_applicants.json");
		oView.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isNoPhone : ! jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");
		
		// done
		return oView;
	}
});