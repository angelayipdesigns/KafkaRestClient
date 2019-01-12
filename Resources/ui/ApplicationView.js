//ApplicationView Component Constructor
function ApplicationView (appWindow) {

	var DatabaseInit = require('db/DatabaseInit').DatabaseInit;
	var databaseInit = new DatabaseInit();
	databaseInit.exec();

	//var ApplyPatchesController = require('ctrls/applypatches/ApplyPatchesController').ApplyPatchesController;
	//var applyPatchesController = new ApplyPatchesController();
	//applyPatchesController.applyPatches();

	var InitialView = require('ui/InitialView').InitialView;
	var initialView = new InitialView(appWindow);

	return initialView;
}


exports.ApplicationView = ApplicationView;
