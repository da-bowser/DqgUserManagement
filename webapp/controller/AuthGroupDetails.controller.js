sap.ui.define([
	"dk/dhek/DqgUserManagement/controller/BaseController",
	"dk/dhek/DqgUserManagement/util/authorizationApi",
	"dk/dhek/DqgUserManagement/util/common"
], function (BaseController, AuthApi, Common) {
	"use strict";

	return BaseController.extend("dk.dhek.DqgUserManagement.controller.AuthGroupDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 */
		onInit : function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("RouteToGroupDetailsView").attachMatched(this._onRouteMatched, this);
		},
		
		
		/**
		 * Initialize view when route is matched as part of navigation
		 */
		_onRouteMatched : function(oEvent) {
			// Get group id from url parameter as part of route
			var sGroup = oEvent.getParameter("arguments").sGroup;

			// Update page title
			this.setPageTitle(sGroup);
			
			// Add data to tables
			this.addDataToTables(sGroup);
		},
		
		
		setPageTitle : function(sGroup) {
			this.getView().byId("idPageAuthGroupDetails").setTitle("Authorization details: " + sGroup);
		},
		
		
		addDataToTables : function(sGroup) {
			var oView = this.getView();
			
			// Get data: assigned users
			var oAssignedUsers = AuthApi.getData("groups", "users", "groupName", sGroup);
			
			// Get data: assigned roles
			var oAssignedRoles = AuthApi.getData("groups", "roles", "groupName", sGroup);

			// Bind assigned users to relevant List
			Common.bindDataToTable(oView, "idlistAssignedUsers", oAssignedUsers);
			
			// Bind assigned roles to relevant List
			Common.bindDataToTable(oView, "idTableAssignedRoles", oAssignedRoles);
		},
		
		
		navBack : function(oEvent) {
			this.onNavBack();
		}
		
	});

});