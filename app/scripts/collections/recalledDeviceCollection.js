// RecalledDeviceCollection.js
// ----------
define([
	'jquery', 'backbone', 'models/recalledDeviceModel'
], function($, Backbone, RecalledDrugModel) {
	'use strict';

	// Creates a new Backbone collection class object
	var RecalledDeviceCollection = Backbone.Collection.extend({

		defaults:{
			totalCount:''
		},
		// Tells the Backbone collection that all of its models will be of type Model (listed up top as a dependency)
      	model: recalledDeviceModel,

        parse:function(response){
        	if (typeof response !== 'undefined') {
				var self = this;
				this.totalCount = response.meta.results.total;
				_.each(response.results, function(detail) {
					try {
						self.push(new recalledDeviceModel(detail))

					} catch (e) {
						console.log("error while parsing for reaclled Drug collection");
					}
				});
				return this.models;
			} 
        }	

	});

	// Returns the Collection class
	return RecalledDeviceCollection;
});