sap.ui.controller("ui5testing.view.Detail", {
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
		
		// Lädt den Router für diese View
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		// Führt die Funktion handleRouteMatched() aus, wenn definierte 
		// Routeing-Muster angesteuert wurden 
		this.router.attachRoutePatternMatched(this.handleRouteMatched, this);

		// Die folgenden Schritte sind nötig, wenn die Anwendung initial über die gemachte Route
		// gestartet werden soll.
		// Problem: Die Route wird schneller abgearbeitet, wie die Daten im Model geladen werden können.
		// Mittels attachRequestCompleted() wird der View erst dann der Inhalt zugewiesen, wenn die Daten
		// garantiert geladen wurden. Anstatt über handleRouteMatched() wird die Übergebene ID direkt aus dem
		// Hash der URL gelesen und verarbeitet. (Feedback zur Verbesserung immer willkommen)
		this.model = sap.ui.getCore().byId("app").getModel();
		this.model.attachRequestCompleted(function(oEvent) {
			console.log("attachRequestCompleted");
			var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			var hash = oHashChanger.getHash();
			var objectId = hash.split("/")[1];
			
			that.setViewContext(objectId);
		});
	},

	// Behandelt alle Routen der Detail-View. Wir brauchen aber nur Aktionen für die
	// Route namens "applicants"
	handleRouteMatched : function(evt) {
		console.log("handleRouteMatched");
		var routeName = evt.getParameter("name");
		
		if (routeName == "applicants") {
			var objectId = evt.getParameter("arguments").id;
			this.setViewContext(objectId);
		}
	},

	// Setzt den Context der View anhand des aus der URL ermittelten Models
	// Anhand der ID wird aus dem JSON-Datensatz der entsrechende Datenpfad ausgelesen
	// Anhand des Pfades wird ein Context erstellt und dieser Context an die View gebunden
	
	setViewContext : function(objectId) {
		console.log("setViewContext");
		
		// Legt die Model-Daten unter "applicants" in ein Array
		var data = this.model.getData()["applicants"];

		var pathId;
		
		// Absicherung, falls keine Daten vorhanden sind
		if (data) {
			// Schleife durch die JSON-Datensätze
			// Hat einer dieser Datensätze die übergebene ID, 
			// dann entspricht i den gesuchten Pfad im Model  
			for (var i = 0; data.length; i++) {
				if (objectId == data[i].id) {
					pathId = i;
					break;
				}
			}
			
			// Baut Pfad zusammen
			var sPath = "/applicants/" + pathId;

			// Erstellung des Context anhand dem Model und Pfad
			var context = new sap.ui.model.Context(this.model, sPath)
			this.getView().setBindingContext(context);

			// Abschließend Event-Funktion auslösen, mittels der der Eintrag in der
			// Master-Liste hervorgeben werden soll.
			this.raiseDetailApplicantCalled(pathId);
		}
	},
	
	// Sendet an den Master-Controller das Event, dass ein Datensatz mittels
	// Routing ausgewählt wurde. Übergibt dabei den Pfad zum Context als Parameter
	raiseDetailApplicantCalled : function(pathId){
		var eventBus = sap.ui.getCore().getEventBus();

		eventBus.publish("detailToMaster", "detailApplicantCalled", 
		    {
		        sPathId: pathId
		    }
		);
	},
	
	// Mobile Rücknavigation mittels Index-Route
	handleNavButtonPress : function(evt) {
		this.router.navTo("index");
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf ui5testing.view.Detail
	 */
//	onBeforeRendering : function() {
//		
//	},
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf ui5testing.view.Detail
	 */
//	onAfterRendering : function() {
//	},
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