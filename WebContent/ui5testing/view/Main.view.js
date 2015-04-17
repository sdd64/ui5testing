sap.ui.jsview("ui5testing.view.Main", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf ui5testing.Main
	 */
	getControllerName : function() {
		return "ui5testing.view.Main";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf ui5testing.Main
	 */
	createContent : function(oController) {
		this.setDisplayBlock(true);

		// create app
		this.app = new sap.m.SplitApp();

		// load the master page
		var master = sap.ui.xmlview("Master", "ui5testing.view.Master");
		master.getController().nav = this.getController();

		// this.app.addPage(shell, true);
		this.app.addPage(master, true);

		var empty = sap.ui.xmlview("Empty", "ui5testing.view.Empty");
		this.app.addPage(empty, false);

		return this.app;
	}

});