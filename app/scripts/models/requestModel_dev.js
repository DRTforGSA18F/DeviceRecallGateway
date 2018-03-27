// RequestModel.js
// ----------
define([
	'jquery', 'backbone'
], function($, Backbone) {
	'use strict';

	// Creates a new Backbone Model class object
	var RequestModel = Backbone.Model.extend({

		// Model URL
		url: '',

		// Default values for all of the Model attributes
		defaults: {
			searchTerms: '',
			distributionPattern: '',
			recallStatus: '',
			dateRange: '',
			skip: 0
		},

		clearModel: function() {
			this.set({
				searchTerms: '',
				distributionPattern: '',
				recallStatus: '',
				dateRange: '',
				skip: 0
			});
		},
		generateURL: function() {
			var serviceURL = '';
			serviceURL = window.gblResults

			if (this.get('searchTerms') || this.get('recallStatus') || this.get('distributionPattern') || this.get('dateRange')) {
				serviceURL = serviceURL + 'search=';

				if (this.get('searchTerms')) {
					serviceURL = serviceURL + 'product_description:' + this.get('searchTerms').replace(/,/g, '+');
				}
				if (this.get('recallStatus')) {
					serviceURL = serviceURL + ((this.get('searchTerms')) ? '+AND+' : '') + 'status=' + this.get('recallStatus').replace(/,/g, '+');
				}
				if (this.get('distributionPattern')) {
					serviceURL = serviceURL + ((this.get('searchTerms') || this.get('recallStatus')) ? '+AND+' : '') + 'distribution_pattern=nationwide+' + this.get('distributionPattern').replace(/,/g, '+');
				}
				if (this.get('dateRange')) {
					serviceURL = serviceURL + ((this.get('searchTerms') || this.get('recallStatus') || this.get('distributionPattern')) ? '+AND+' : '') + 'report_date:[' + this.get('dateRange')[0] + '0101+TO+' + this.get('dateRange')[1] + ((this.get('dateRange')[1] === 2015) ? '0530' : '0101') + ']';
				}
				serviceURL = serviceURL + '&';

			}


			serviceURL = serviceURL + 'skip=' + ((this.get('skip') === undefined || isNaN(this.get('skip'))) ? 0 : this.get('skip')) + '&limit=5'

			return serviceURL
		},

		generateCountURL: function() {
			var serviceURL = window.gblResults;
			if (this.get('searchTerms')) {
				serviceURL = serviceURL + 'search=product_description:' + this.get('searchTerms').replace(/,/g, '+') + '&';
			}
			serviceURL = serviceURL + 'count=classification.exact';
			return serviceURL;
		}

	});

	// Returns the Model class
	return RequestModel;
});