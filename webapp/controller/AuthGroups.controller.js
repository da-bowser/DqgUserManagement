sap.ui.define([
	"dk/dhek/DqgUserManagement/controller/BaseController",
	"dk/dhek/DqgUserManagement/util/authorizationApi",
	"dk/dhek/DqgUserManagement/util/common"
], function (BaseController, AuthApi, Common) {
	"use strict";

	return BaseController.extend("dk.dhek.DqgUserManagement.controller.AuthGroups", {

		onInit : function() {
			this.loadGroups();
			console.log("Groups fetched...");
		},

		
		loadGroups : function() {
			// Get data
			var oGroups = AuthApi.getData("groups", null, null, null);
			
			// Bind data to table
			var oView = this.getView();
			Common.bindDataToTable(oView, "myList", oGroups);
		},


		navToGroupDetailsView : function(oEvent) {
			// Get the Group id selected
			var selectedGroup = oEvent.getSource().getProperty("title");

			// Navigate to next view
			this.getRouter().navTo("RouteToGroupDetailsView", { sGroup: selectedGroup });
		}

	});

});