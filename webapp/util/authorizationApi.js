sap.ui.define([
], function() {
	"use strict";

	var sToken = "";

	return {

		getTokenBearer : function() {
			if (sToken !== "") {
				// Do nothing
				//console.log("Token already fetched. Re-using...");
			} else {
				//console.log("Token not fetched. Fetching...");
				
				// NB: user name and password are for OAuth. They are defined on SCP | Security | OAuth => Platform API.
				// Since we are calling services from itelligence DQG DEV SCP which resides in HANA.ONDEMAND.COM and not HANATRIAL.ONDEMAND.COM we must use a destination pointing
				// to HANA.ONDEMAND.COM. 
				// It is not possible to fetch OAuth token from HANATRIAL.ONDEMAND.COM and and then use for HANA.ONDEMAND.COM.
				$.ajax({
					type: "POST",
					url: "/DEK_API_FROM_NEO_APP/oauth2/apitoken/v1?grant_type=client_credentials",
					async: false,
					dataType: "json",
					headers: {
	    				"Authorization": "Basic " + btoa("55bb2c06-9378-316a-8b4b-71fe629b563c" + ":" + "54420bde-07ae-34a3-9729-74d1e4f26081")		// from itelligence SCP (it.guardian - DEV)
//	    				"Authorization": "Basic " + btoa("6e31959a-c632-3340-899e-6cda3181d4e3" + ":" + "7d5431ec-72c4-3a42-bd8e-f0e076167847")		// from personal SCP (p1941644311trial)
					},
					success: function (data, textStatus, jqXHR) {
						sToken = data.access_token;
						console.log("Token fetched succesfully");
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log("--------------------------------");
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
						console.log("--------------------------------");
					}
				});
			}
			return sToken;
		},
		

		getData : function(sArea, sSubArea, sAreaParameterName, sAreaParameterValue) {
			var sToken = this.getTokenBearer();
			var sUrl = this.buildUrl(sArea, sSubArea, sAreaParameterName, sAreaParameterValue);
			var oResult;
			
			$.ajax({
				type: "GET",
				url: sUrl ,
				async: false,
				dataType: "json",
				headers: {
    				"Authorization": "Bearer " + sToken
				},
				success: function (data, textStatus, jqXHR) {
					oResult = data;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log("--------------------------------");
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
					console.log("--------------------------------");
				}
			});
			return oResult;
		},
		
		
		buildUrl : function(sArea, sSubArea, sAreaParameterName, sAreaParameterValue) {
			var root = "/DEK_API_FROM_NEO_APP/authorization/v1/accounts/a6c4db1e3/";	// Fetching data from itelligence DQG DEV sub account
			var url = root + sArea + "/";
			
			if (sSubArea !== null) {
				url = url + sSubArea + "?" + sAreaParameterName + "=" + sAreaParameterValue;
			}
			
			//console.log("Url created: " + url);
			return url;
		}

	};
});