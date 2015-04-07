/*
 * grunt-quail
 * http://quailjs.org/
 *
 * Copyright (c) 2014 Kevin Miller
 * Licensed under the MIT license.
 */

/*global quail:true, jQuery:true, console:true, window:true, alert:true*/
function sendMessage() {
	var args = [].slice.call(arguments);
	alert(JSON.stringify(args));
}

var options = window.gruntQuailOptions;
if(typeof options.accessibilityTests === 'undefined' &&
	typeof options.accessibilityGuideline === 'undefined') {
	sendMessage('quail.error', 'No accessibility tests defined');
}

var quailOptions = {
	jsonPath : options.quailPath,
	guideline : options.accessibilityTests,
	testFailed : function(event) {
		sendMessage('quail.fail', event.test.title.en);
	},
	complete : function(results) {
		sendMessage('quail.done');
	}
};
var jayquery = jQuery.noConflict( true );

var context = (typeof options.context !== 'undefined') ? options.context : '*:first';
var counter = 0;
var timer = setTimeout(
	function(){
		if(jayquery(context).length) {
			clearTimeout(timer);
			jayquery(context).quail(quailOptions);
		}
		else {
			if(counter >= 100){
				clearTimeout(timer);
				sendMessage('quail.error', 'Could not find page context "' + context + '".');
				sendMessage('quail.done');
			}

		}

	},100);


