jQuery.sap.declare("ui5testing.util.Formatter");

ui5testing.util.Formatter = {

	_stateMap : {
	  "New" : "Warning",
	  "Retracted" : "Error",
	  "Rejected" : "Error",
	  "Pending" : "None",
	  "Employed" : "Success",
  },		

  state : function (value) {
	 return ui5testing.util.Formatter._stateMap[value];
  }	,
  
  stateText : function (value) {
	var bundle = this.getModel("i18n").getResourceBundle();
	return bundle.getText(value, "?");
  },
  
  applicantName : function (lastname, firstname) {
	  //return lastname + ", " + firstname;
	  return [lastname, firstname].filter(Boolean).join(", ");
	  //return firstname == "" ? lastname : lastname + ", " + firstname; 
  }
  
//	_statusStateMap : {
//		"P" : "Success",
//		"N" : "Warning"
//	},
//
//	statusText :  function (value) {
//		var bundle = this.getModel("i18n").getResourceBundle();
//		return bundle.getText("StatusText" + value, "?");
//	},
//	
//	statusState :  function (value) {
//		var map = sap.ui.demo.myFiori.util.Formatter._statusStateMap;
//		return (value && map[value]) ? map[value] : "None";
//	},
//	
//	date : function (value) {
//		if (value) {
//			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd.MM.yyyy"}); 
//			return oDateFormat.format(new Date(value));
//		} else {
//			return value;
//		}
//	},
//	
//	quantity :  function (value) {		
//		try {
//			return (value) ? parseFloat(value[1]).toFixed(0) : value;
//		} catch (err) {
//			return "Not-A-Number";
//		}
//	}
};