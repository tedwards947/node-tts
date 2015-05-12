'use strict';

/*
	Useful links:

	TTS transpiled from eSpeak:
	https://github.com/christopherdebeer/speak.js

	node-speaker
	https://github.com/TooTallNate/node-speaker


	Made by Tony Edwards.
*/
var speak = require('./nodeSpeakCustom/node-speak');
var Speaker = require('speaker');

var speaker = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 22050
});



/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge_options(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}



/*
	wrapStringInXML() wraps the string with SSML (Speech Synthesis Markup Language), 
	which the transpiled library is able to interpret. Should support most 
	markup, but not all. Use at your own risk.

	SSML Reference doc: 
	https://msdn.microsoft.com/en-us/library/office/hh361578%28v=office.14%29.aspx

	@param string The string to wrap. Can include SSML.
	@returns xml.join(), the newly wrapped XML.
*/
function wrapStringInXML(string) {
    var xml = [];
    xml.push('<speak version="1.0" mlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">');
    xml.push(string);
    xml.push('<hr>'); //to pad the end of the string so that there is a nice ending pause
    xml.push('</speak>');
    return xml.join();
}




/*
	speakToMe uses the node-speak library (which is transpiled from eSpeak)
	to generate a 64 bit stream which is then written to the speaker.

	@param text The text to speak. Can include SSML.
	@param speakOptions (optional) Accepts options to be passed to node-speak.
		(see https://github.com/christopherdebeer/speak.js)
	@returns undefined
*/

function speakToMe(text, speakOptions) {
    var speakParams = {
        callback: function callback(audio) {
            //takes the encoded audio from node-speak and adds it to a buffer
            var buffer = new Buffer(audio || '', 'base64');

            //pass the buffer to speaker
            speaker.write(buffer);
        }
    };


    if (console && console.log) {
        //simply echoes the text
        console.log('Speaking text: ', text);
    }

    //wraps the text in SSML
    text = wrapStringInXML(text);

    try {
        speak(text, merge_options(speakOptions || {}, speakParams));
    } catch (e) {
        if (console && console.log) {
            console.log('Error in speak(). Check SSML (if used) and speakParams.');
        }
    }

    return;
}

module.exports.speak = speakToMe;