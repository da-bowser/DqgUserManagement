sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";
	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function() {
			console.log("*********** Init Mock Server: JSon model ***********");
			this.initMockServer();

		},
		
		
		initMockServer : function() {
			// Mock Data: Groups
			var oMockDataGroups = this.createResponseObject("groups/", "../localService/mockdata/Groups.json");
				
			// Mock Data: Role DQG_ADMIN
			var oMockDataDqgAdmin_GroupRoles = this.createResponseObject("groups/roles\\?groupName=DQG_Admin", "../localService/mockdata/DQG_ADMIN_GroupRoles.json");
			var oMockDataDqgAdmin_RoleUsers = this.createResponseObject("groups/users\\?groupName=DQG_Admin", "../localService/mockdata/DQG_ADMIN_GroupUsers.json");
			
			// Mock Data: Role DQG_EndUser
			var oMockDataDqgEndUser_GroupRoles = this.createResponseObject("groups/roles\\?groupName=DQG_EndUser", "../localService/mockdata/DQG_EndUser_GroupRoles.json");
			var oMockDataDqgEndUser_RoleUsers = this.createResponseObject("groups/users\\?groupName=DQG_EndUser", "../localService/mockdata/DQG_EndUser_GroupUsers.json");
			
			// Mock Data: Role DQG_ROOT
			var oMockDataDqgRoot_GroupRoles = this.createResponseObject("groups/roles\\?groupName=DQG_Root", "../localService/mockdata/DQG_ROOT_GroupRoles.json");
			var oMockDataDqgRoot_RoleUsers = this.createResponseObject("groups/users\\?groupName=DQG_Root", "../localService/mockdata/DQG_ROOT_GroupUsers.json");
				
			// Mock Data: Role DQG_SuperUser
			var oMockDataDqgSuperUser_GroupRoles = this.createResponseObject("groups/roles\\?groupName=DQG_SuperUser", "../localService/mockdata/DQG_SuperUser_GroupRoles.json");
			var oMockDataDqgSuperUser_RoleUsers = this.createResponseObject("groups/users\\?groupName=DQG_SuperUser", "../localService/mockdata/DQG_SuperUser_GroupUsers.json");
			
			// Mock Data: User, s0011528409
			var oMockData_s0011528409_Groups = this.createResponseObject("users/groups\\?userId=s0011528409", "../localService/mockdata/s0011528409_Groups.json");
			var oMockData_s0011528409_Roles = this.createResponseObject("users/roles\\?userId=s0011528409", "../localService/mockdata/s0011528409_Roles.json");

			// Mock Data: User, s0016140232
			var oMockData_s0016140232_Groups = this.createResponseObject("users/groups\\?userId=s0016140232", "../localService/mockdata/s0016140232_Groups.json");
			var oMockData_s0016140232_Roles = this.createResponseObject("users/roles\\?userId=s0016140232", "../localService/mockdata/s0016140232_Roles.json");

			// Mock Data: User, s0015986424
			var oMockData_s0015986424_Groups = this.createResponseObject("users/groups\\?userId=s0015986424", "../localService/mockdata/s0015986424_Groups.json");
			var oMockData_s0015986424_Roles = this.createResponseObject("users/roles\\?userId=s0015986424", "../localService/mockdata/s0015986424_Roles.json");
			

			this.createNewMockServer(
				"/DEK_API_FROM_NEO_APP/authorization/v1/accounts/a6c4db1e3/", 
				[
					oMockDataGroups, 
					oMockDataDqgAdmin_GroupRoles, 
					oMockDataDqgAdmin_RoleUsers,
					oMockDataDqgEndUser_GroupRoles,
					oMockDataDqgEndUser_RoleUsers,
					oMockDataDqgRoot_GroupRoles,
					oMockDataDqgRoot_RoleUsers,
					oMockDataDqgSuperUser_GroupRoles,
					oMockDataDqgSuperUser_RoleUsers,
					oMockData_s0011528409_Groups,
					oMockData_s0011528409_Roles,
					oMockData_s0015986424_Groups,
					oMockData_s0015986424_Roles,
					oMockData_s0016140232_Groups,
					oMockData_s0016140232_Roles
				]
			);
		},
			
			
		createResponseObject : function(sRegexPath, sResponseFile) {
			var responseObject =
				{
					method : "GET",
					path : new RegExp(sRegexPath),
					response : function(oXhr, sUrlParams) {
						oXhr.respondFile(
							200, 
							{"Content-Type": "application/json"},
							sResponseFile
						);
						console.log("MockServer: intercepted request to: " + oXhr.url);
						return true;
					}
				};
			return responseObject;
		},
		

		createNewMockServer : function(sRootUri, oRequests) {
			var oMockServer = new MockServer({
									rootUri: sRootUri,
									requests: oRequests
			});

			oMockServer.start();
			console.log("New MockServer created for " + sRootUri);
			console.log(oMockServer);
		}
		
	};
});