sap.ui.define([
	"dk/dhek/DqgUserManagement/controller/BaseController",
	"dk/dhek/DqgUserManagement/util/authorizationApi",
	"dk/dhek/DqgUserManagement/util/common"
], function (BaseController, AuthApi, Common) {
	"use strict";

	return BaseController.extend("dk.dhek.DqgUserManagement.controller.AuthUsers", {

		onInit : function() {
			this.loadUsers();
			console.log("Users fetched...");
		},


		loadUsers : function() {
			// Get list of all unique DQG users
			var oUniqueUsers = this.getAllUsers();

			// Bind users to table
			var oView = this.getView();
			Common.bindDataToTable(oView, "idUserList", oUniqueUsers);
		},


		getAllUsers : function() {
			var aGroups = ["DQG_Admin", "DQG_EndUser", "DQG_Root", "DQG_SuperUser"];
			var aUniqueUsers = [];
			
			// Get users with DQG roles from SCP
			var i;
			for (i = 0; i < aGroups.length; i++) {
				var oCurrentUsers = AuthApi.getData("groups", "users", "groupName", aGroups[i]);
				aUniqueUsers = this.addNewUsers(aUniqueUsers, oCurrentUsers);
			}
			
			// Get supplemental info (names and company) from HANA database (dqg solution)
			// TO-DO

			// Build data object of users with supplemental data
			var oData = { users : []};
			for (i = 0; i < aUniqueUsers.length; i++) {
				var oCurrentUser = aUniqueUsers[i];
				var obj = { 
							userId : oCurrentUser, 
							firstName : "fname_" + i,
							lastName : "lname_" + i,
							company : "company_" + i
						};
				oData.users.push( obj );
			}

			return oData;
		},
		
		
		addNewUsers : function(aUniqueUsers, oCurrentUsers) {
			// Add users part of data object to array if the user is new
			var index;
			for (index = 0; index < oCurrentUsers.users.length; index++) {
				if ($.inArray(oCurrentUsers.users[index].name, aUniqueUsers) === -1) {
					aUniqueUsers.push(oCurrentUsers.users[index].name);
				} 
			}
			return aUniqueUsers;
		},
		
		
		navToUserDetailsView : function(oEvent) {
			// Selected item is contained in a string similar to: __item1-__xmlview3--idUserList-12
			// We thus need to extract the last digits to get the index.
			var longId = oEvent.getParameter("id");
			var offset = longId.lastIndexOf("-");
			var selectedIndex = longId.substring(offset + 1);

			// Get name contained in selected item
			var oItems = this.getView().byId("idUserList").getItems();
			var sUser = oItems[selectedIndex].mAggregations.cells[0].getProperty("text");
			
			// Navigate to next view
			this.getRouter().navTo("RouteToUserDetailsView", { sUser: sUser });
		}

	});

});