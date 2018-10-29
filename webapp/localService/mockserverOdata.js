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
			console.log("*********** Init Mock Server: Odata model ***********");

			var oMockServer = new MockServer({
				rootUri: "/test/dek/authApi/Users.xsodata/"
			});
			
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

			oMockServer.start();
			console.log("New MockServer created for /test/dek/authApi/Users.xsodata/");
		}
		
	};
});