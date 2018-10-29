sap.ui.define([
	"dk/dhek/DqgUserManagement/controller/BaseController",
	"dk/dhek/DqgUserManagement/util/authorizationApi",
	"dk/dhek/DqgUserManagement/util/common"
], function (BaseController, AuthApi, Common) {
	"use strict";

	return BaseController.extend("dk.dhek.DqgUserManagement.controller.AuthUserDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 */
		onInit : function() {
			// Initialize router
			var oRouter = this.getRouter();
			oRouter.getRoute("RouteToUserDetailsView").attachMatched(this._onRouteMatched, this);
		},
		
		
		/**
		 * Initialize view when route is matched as part of navigation
		 */
		_onRouteMatched : function(oEvent) {
			// Get group id from url parameter as part of route
			var sUser = oEvent.getParameter("arguments").sUser;

			// Update page title
			this.setPageTitle(sUser);
			
			// Add data to tables
			this.addDataToTables(sUser);
		},
		

		setPageTitle : function(sUser) {
			this.getView().byId("idPageAuthUserDetails").setTitle("Authorization details: " + sUser);
		},
		
		
		addDataToTables : function(sUser) {
			var oView = this.getView();

			// Get data: assigned users
			var oAssignedGroups = AuthApi.getData("users", "groups", "userId", sUser);
			
			// Get data: assigned roles
			var oAssignedRoles = AuthApi.getData("users", "roles", "userId", sUser);
			
			// Bind assigned users to relevant List
			Common.bindDataToTable(oView, "idlistAssignedGroups", oAssignedGroups);
			
			// Bind assigned roles to relevant List
			Common.bindDataToTable(oView, "idTableAssignedRoles", oAssignedRoles);
		},
		
		
		navBack : function(oEvent) {
			this.onNavBack();
		}

	});

});