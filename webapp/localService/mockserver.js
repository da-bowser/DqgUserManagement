sap.ui.define([
	"sap/ui/core/util/MockServer",
	"dk/dhek/DqgUserManagement/localService/mockserverJson",
	"dk/dhek/DqgUserManagement/localService/mockserverOdata"
], function(MockServer, MockServerJson, MockServerOdata) {
	"use strict";
	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function() {
			MockServerJson.initMockServer();
			MockServerOdata.init();
		}
		
	};
});