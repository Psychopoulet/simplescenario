"use strict";

// deps

	const 	path = require('path'),
			assert = require('assert'),
			
			SimpleScenarios = require('../main.js');

// tests

describe('scenarios', function() {

	let container;

	before(function() {

		return SimpleScenarios.delete().then(function () {
			return SimpleScenarios.init().then(function (_container) {
				container = _container;
			})
		});

	});

	after(function() {
		return SimpleScenarios.delete();
	});

	it('should create data', function(done) {

		container.get('scenarios').add({
			'name': 'test',
			'name': 'test'
		}).then(function(scenario) {
			assert.deepStrictEqual("test", scenario.name, "Scenario added is not valid (params)");
			done();
		}).catch(done);

	});

	it('should return the last inserted data', function(done) {

		container.get('scenarios').lastInserted().then(function(scenario) {
			assert.deepStrictEqual("test", scenario.name, "Scenario added is not valid (params)");
			done();
		}).catch(done);

	});

	it("should return all the data with the name 'test'", function(done) {

		container.get('scenarios').search({ 'name': 'test' }).then(function(scenarios) {
			assert.strictEqual(1, scenarios.length, "Scenario returned are not valid");
			done();
		}).catch(done);

	});

	it("should return one data with the name 'test'", function(done) {

		container.get('scenarios').searchOne({ 'name': 'test' }).then(function(scenario) {
			assert.notStrictEqual(null, scenario, "Scenario returned is not valid");
			done();
		}).catch(done);

	});

	it("should edit last inserted data", function(done) {

		container.get('scenarios').lastInserted().then(function(scenario) {
			scenario.name = 'test2';
			return container.get('scenarios').edit(scenario);
		}).then(function(scenario) {

			assert.strictEqual('test2', scenario.name, "Scenario returned is not valid");
			done();

		}).catch(done);

	});

	it("should delete last inserted data", function(done) {

		container.get('scenarios').lastInserted().then(function(scenario) {
			return container.get('scenarios').delete(scenario);
		}).then(function() {
			return container.get('scenarios').lastInserted();
		}).then(function(scenario) {
			
			assert.strictEqual(null, scenario, "Scenario returned is not valid");
			done();

		}).catch(done);

	});

});
