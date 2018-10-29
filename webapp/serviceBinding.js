function initModel() {
	var sUrl = "/test/dek/authApi/Users.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}