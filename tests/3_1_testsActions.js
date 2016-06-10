"use strict";

// deps

	const 	assert = require("assert"),
			SimpleScenarios = require(require("path").join(__dirname, "..", "lib", "main.js"));

// tests

describe("actions", function() {

	let container;

	before(function() {

		return SimpleScenarios.delete().then(function () {
			return SimpleScenarios.init();
		}).then(function (_container) {
			container = _container;
		});

	});

	after(function() {
		return SimpleScenarios.delete();
	});

	it("should create data", function(done) {

		container.get("actionstypes").add({
			"code": "actiontype",
			"name": "actiontype"
		}).then(function(actiontype) {

			return container.get("actions").add({
				"type": actiontype,
				"name": "actionbase",
				"params": "{\"test\": \"test\"}"
			});

		}).then(function(action) {

			assert.strictEqual("actionbase", action.name, "Action added is not valid (name)");
			assert.strictEqual("actiontype", action.type.code, "Action added is not valid (type code)");
			assert.strictEqual("actiontype", action.type.name, "Action added is not valid (type name)");
			assert.deepStrictEqual({"test": "test"}, action.params, "Action added is not valid (params)");

			done();

		}).catch(done);

	});

	it("should return the last inserted data", function(done) {

		container.get("actions").last().then(function(action) {

			assert.strictEqual("actionbase", action.name, "Action added is not valid (name)");
			assert.strictEqual("actiontype", action.type.code, "Action added is not valid (type code)");
			assert.strictEqual("actiontype", action.type.name, "Action added is not valid (type name)");
			assert.deepStrictEqual({"test": "test"}, action.params, "Action added is not valid (params)");

			done();

		}).catch(done);

	});

	it("should return all the data with the name \"actionbase\"", function(done) {

		container.get("actions").search({ "name": "actionbase" }).then(function(actions) {

			assert.strictEqual(1, actions.length, "Actions returned are not valid");
			done();

		}).catch(done);

	});

	it("should return one data with the name \"actionbase\"", function(done) {

		container.get("actions").searchOne({ "name": "actionbase" }).then(function(action) {

			assert.notStrictEqual(null, action, "Action returned is not valid");
			done();

		}).catch(done);

	});

	it("should return all the data with the action type having the code \"actiontype\"", function(done) {

		container.get("actions").search({ "type": { "code": "actiontype" } }).then(function(actions) {

			assert.strictEqual(1, actions.length, "Actions returned are not valid");
			done();

		}).catch(done);

	});

	it("should return all the data with the action type having the name \"actiontype\"", function(done) {

		container.get("actions").search({ "type": { "name": "actiontype" } }).then(function(actions) {

			assert.strictEqual(1, actions.length, "Actions returned are not valid");
			done();

		}).catch(done);

	});

	it("should edit last inserted data", function(done) {

		container.get("actions").last().then(function(action) {
			action.name = "test2";
			return container.get("actions").edit(action);
		}).then(function(action) {

			assert.strictEqual("test2", action.name, "Action returned is not valid");
			done();

		}).catch(done);

	});

	it("should bind wrong executer", function(done) {

		container.get("actionstypes").last().then(function(actiontype) {
			
			container.get("actions").bindExecuter(actiontype).then(function() {
				assert.ok(false, "Wrong executer does not generate error");
				done();
			}).catch(function(err) {
				assert.strictEqual("string", typeof err, "Wrong executer generate incorrect error");
				done();
			});

		}).catch(done);

	});

	it("should bind executer with wrong actiontype", function(done) {

		container.get("actions").bindExecuter({}).then(function() {
			assert.ok(false, "Wrong executer does not generate error");
			done();
		}).catch(function(err) {
			assert.strictEqual("string", typeof err, "Wrong executer generate incorrect error");
			done();
		});

	});

	it("should bind executer", function(done) {

		container.get("actionstypes").last().then(function(actiontype) {

			return container.get("actions").bindExecuter(actiontype, function(action) {
				assert.strictEqual("test2", action.name, "Action returned is not valid");
			});

		}).then(function() {
			return container.get("actions").last();
		}).then(function(action) {

			container.get("actions").execute(action);
			done();

		}).catch(done);

	});

	it("should delete last inserted data", function(done) {

		container.get("actions").last().then(function(action) {
			return container.get("actions").delete(action);
		}).then(function() {
			return container.get("actions").last();
		}).then(function(action) {
			assert.strictEqual(null, action, "Action returned is not valid (name)");
			done();
		}).catch(done);

	});

	it("should create data with action", function(done) {

		let actionBase;

		container.get("actionstypes").last().then(function(actiontype) {

			return container.get("actions").add({
				"type": actiontype,
				"name": "actionbase"
			});

		}).then(function(action) {
			actionBase = action;
			return container.get("actionstypes").last();
		}).then(function(actiontype) {

			return container.get("actions").add({
				type: actiontype,
				name: "actionafter"
			});

		}).then(function(actionafter) {
			return container.get("actions").linkAfterAction(actionBase, actionafter);
		}).then(function(action) {

			assert.strictEqual("actionbase", action.name, "Action added is not valid (name)");
			assert.strictEqual("actiontype", action.type.code, "Action added is not valid (type code)");
			assert.strictEqual("actiontype", action.type.name, "Action added is not valid (type name)");
			assert.strictEqual("actionafter", action.after.name, "Action added is not valid (after name)");
			assert.strictEqual("action", action.after.nodetype, "Action added is not valid (after nodetype)");

			return container.get("actions").unlinkAfter(actionBase);

		}).then(function(action) {

			assert.strictEqual("actionbase", action.name, "Action added is not valid (name)");
			assert.strictEqual("actiontype", action.type.code, "Action added is not valid (type code)");
			assert.strictEqual("actiontype", action.type.name, "Action added is not valid (type name)");
			assert.strictEqual(null, action.after, "Action added is not valid (after)");

			done();

		}).catch(done);


	});

	it("should create data with condition", function(done) {

		let actionBase;

		container.get("actions").search().then(function(actions) {

			actionBase = actions[1];

			return container.get("conditionstypes").add({
				"code": "conditiontype",
				"name": "conditiontype"
			});

		}).then(function(conditiontype) {

			return container.get("conditions").add({
				type: conditiontype,
				name: "conditionafter",
				value: "test"
			});

		}).then(function(conditionafter) {
			return container.get("actions").linkAfterCondition(actionBase, conditionafter);
		}).then(function(action) {

			assert.strictEqual("actionbase", action.name, "Action added is not valid (name)");
			assert.strictEqual("actiontype", action.type.code, "Action added is not valid (type code)");
			assert.strictEqual("actiontype", action.type.name, "Action added is not valid (type name)");
			assert.strictEqual("conditionafter", action.after.name, "Action added is not valid (after name)");
			assert.strictEqual("condition", action.after.nodetype, "Action added is not valid (after nodetype)");

			return container.get("actions").unlinkAfter(actionBase);

		}).then(function(action) {

			assert.strictEqual("actionbase", action.name, "Action added is not valid (name)");
			assert.strictEqual("actiontype", action.type.code, "Action added is not valid (type code)");
			assert.strictEqual("actiontype", action.type.name, "Action added is not valid (type name)");
			assert.strictEqual(null, action.after, "Action added is not valid (after)");

			done();

		}).catch(done);


	});

});