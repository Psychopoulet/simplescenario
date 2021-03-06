"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			fs = require("fs"),
			
			NodeScenarios = require(require("path").join(__dirname, "..", "lib", "main.js"));

// tests

describe("main without given file", () => {

	before(() => {
		return NodeScenarios.delete();
	});

	it("should create database", (done) => {

		NodeScenarios.init().then((container) => {

			fs.stat(path.join(__dirname, "..", "lib", "database.sqlite3"), (err, stats) => {

				assert.strictEqual(true, (!err && stats && stats.isFile()), "Database was not created.");

				assert.strictEqual(true, container.has("junctions"), "Junctions is not instancied");
				assert.strictEqual(true, container.get("junctions") instanceof require(path.join(__dirname, "..", "lib", "models", "junctions.js")), "Junctions is not a correct instance");

				assert.strictEqual(true, container.has("scenarios"), "Scenarios is not instancied");
				assert.strictEqual(true, container.get("scenarios") instanceof require(path.join(__dirname, "..", "lib", "models", "scenarios.js")), "Scenarios is not a correct instance");

				assert.strictEqual(true, container.has("triggers"), "Triggers is not instancied");
				assert.strictEqual(true, container.get("triggers") instanceof require(path.join(__dirname, "..", "lib", "models", "triggers.js")), "Triggers is not a correct instance");

				assert.strictEqual(true, container.has("actions"), "Actions is not instancied");
				assert.strictEqual(true, container.get("actions") instanceof require(path.join(__dirname, "..", "lib", "models", "actions.js")), "Actions is not a correct instance");
				assert.strictEqual(true, container.has("actionstypes"), "ActionsTypes is not instancied");
				assert.strictEqual(true, container.get("actionstypes") instanceof require(path.join(__dirname, "..", "lib", "models", "actionstypes.js")), "ActionsTypes is not a correct instance");

				assert.strictEqual(true, container.has("conditions"), "Conditions is not instancied");
				assert.strictEqual(true, container.get("conditions") instanceof require(path.join(__dirname, "..", "lib", "models", "conditions.js")), "Conditions is not a correct instance");
				assert.strictEqual(true, container.has("conditionstypes"), "ConditionsTypes is not instancied");
				assert.strictEqual(true, container.get("conditionstypes") instanceof require(path.join(__dirname, "..", "lib", "models", "conditionstypes.js")), "ConditionsTypes is not a correct instance");

				done();
				
			});

		}).catch(done);

	}).timeout(5000);

	it("should release database", () => {
		return NodeScenarios.release();
	});

	it("should delete database", () => {
		return NodeScenarios.delete();
	});

});

describe("main with given file", () => {

	before(() => {
		return NodeScenarios.delete();
	});

	it("should create database", (done) => {

		let db = path.join(__dirname, "test.sqlite3");

		NodeScenarios.init(db).then((container) => {

			fs.stat(db, (err, stats) => {

				assert.strictEqual(true, (!err && stats && stats.isFile()), "Database was not created.");

				assert.strictEqual(true, container.has("junctions"), "Junctions is not instancied");
				assert.strictEqual(true, container.get("junctions") instanceof require(path.join(__dirname, "..", "lib", "models", "junctions.js")), "Junctions is not a correct instance");

				assert.strictEqual(true, container.has("scenarios"), "Scenarios is not instancied");
				assert.strictEqual(true, container.get("scenarios") instanceof require(path.join(__dirname, "..", "lib", "models", "scenarios.js")), "Scenarios is not a correct instance");

				assert.strictEqual(true, container.has("triggers"), "Triggers is not instancied");
				assert.strictEqual(true, container.get("triggers") instanceof require(path.join(__dirname, "..", "lib", "models", "triggers.js")), "Triggers is not a correct instance");

				assert.strictEqual(true, container.has("actions"), "Actions is not instancied");
				assert.strictEqual(true, container.get("actions") instanceof require(path.join(__dirname, "..", "lib", "models", "actions.js")), "Actions is not a correct instance");
				assert.strictEqual(true, container.has("actionstypes"), "ActionsTypes is not instancied");
				assert.strictEqual(true, container.get("actionstypes") instanceof require(path.join(__dirname, "..", "lib", "models", "actionstypes.js")), "ActionsTypes is not a correct instance");

				assert.strictEqual(true, container.has("conditions"), "Conditions is not instancied");
				assert.strictEqual(true, container.get("conditions") instanceof require(path.join(__dirname, "..", "lib", "models", "conditions.js")), "Conditions is not a correct instance");
				assert.strictEqual(true, container.has("conditionstypes"), "ConditionsTypes is not instancied");
				assert.strictEqual(true, container.get("conditionstypes") instanceof require(path.join(__dirname, "..", "lib", "models", "conditionstypes.js")), "ConditionsTypes is not a correct instance");

				done();
				
			});

		}).catch(done);

	}).timeout(5000);

	it("should release database", () => {
		return NodeScenarios.release();
	});

	it("should delete database", () => {
		return NodeScenarios.delete();
	});

});
