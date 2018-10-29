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
			// Create
			// NB: rootUri is taken from file: serviceBinding.js
			var oMockServer = new MockServer({
				rootUri: "/DEK_API_FROM_NEO_APP/authorization/v1/accounts/"
			});
			
			// optional
			/*
			MockServer.config({
				autoRespond : true,
				serverDelay : 1000
			});
			*/
			
			// Simulate against the metadata and mock data
			// The parameter bGenerateMissingMockData is cool: if any mockdata is missing, it will be auto generated
			var sPath = jQuery.sap.getModulePath("dk.dhek.DqgUserManagement.localService");
			oMockServer.simulate(
									sPath + "/metadata.xml",
									{
										sMockdataBaseUrl : sPath + "/mockdata",
										bGenerateMissingMockData: true
									}
								);
								
			// Start
			oMockServer.start();
			console.log("Soldiers of mock! Go save the day...");
			jQuery.sap.log.info("Running the app with mock data");
		}
	};
});