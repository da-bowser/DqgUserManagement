sap.ui.define([
], function() {
	"use strict";

	return {

		bindDataToTable : function(oView, oListId, oData) {
			// Create JSON model and add data to it
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(oData);

			// Add JSON model to List object
			var oTable = oView.byId(oListId);
			oTable.setModel(oModel);
		}

	};
});