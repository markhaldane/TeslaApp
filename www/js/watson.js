'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
    username: 'c2d2f1ba-d508-455c-b703-0648f85d7633',
    password: 'PYuIeqMyETDu',
    version: 'v1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

var params = {
    content_type: 'audio/wav'
};

// create the stream
var recognizeStream = speech_to_text.createRecognizeStream(params);

// pipe in some audio
fs.createReadStream('../../resources/speech.wav').pipe(recognizeStream);

// and pipe out the transcription
var result = "";
recognizeStream.pipe(result);
document.getElementById("watson-text").value(result);


// listen for 'data' events for just the final text
// listen for 'results' events to get the raw JSON with interim results, timings, etc.

recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

['data', 'results', 'error', 'connection-close'].forEach(function(eventName) {
    recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
});
