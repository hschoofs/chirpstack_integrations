const mqtt = require('mqtt');
const fs = require('fs');


const client = mqtt.connect('mqtts://exampleserver.com',{ port: '8883', username: '**********', password: '********',
  key:  fs.readFileSync('tls_key.pem'),
  cert: fs.readFileSync('tls_certificate.pem'),
  ca:  fs.readFileSync('ca_certificate.pem') ,
  rejectUnauthorized: true,
});

client.on('connect', () => {
  client.subscribe('application/495/device/+/event/up');    //change according to your chirpstack application name 
});

client.on('message', (topic, message) => {
  console.log(typeof(message));
  jsn = JSON.parse(message);
  var env_data = jsn.data;
  if(env_data != null){
  console.log(Decoder(env_data));
  }
  // console.log(`Received message: ${message.toString()}`);
  // client.end();
});


// the following part is only for decoding the received data, not necessery if the data is already decoded on the chirpstack server

function Decoder(bytes) {


  var myBuffer = [];
  var str = bytes;
  var buffer = new Buffer.alloc(str.length, str, 'base64');
  for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i]);
    }

//console.log(myBuffer);
// var data_dec = Decoder(myBuffer, lora_port)

//console.log(data_dec);
//new Date() = Date.now();
//var time_form = time.toISOString();
//console.log(new Date().toISOString());
//console.log(time_form);


  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var decoded = {};

  // temperature

  rawTemp = myBuffer[0] + myBuffer[1] * 256;

  degreesC_temp = sflt162f(rawTemp) * 100;

	decoded.degreesC = (Math.round(degreesC_temp * 100) / 100).toFixed(2);


  // humidity
  rawHumid = myBuffer[2] + myBuffer[3] * 256;
  humidity_dec = sflt162f(rawHumid) * 100;

	decoded.humidity = (Math.round(humidity_dec * 100) / 100).toFixed(2);

	// decoded.time_utc = new Date().toISOString();


  return decoded;
}

function sflt162f(rawSflt16)
	{
	// rawSflt16 is the 2-byte number decoded from wherever;
	// it's in range 0..0xFFFF
	// bit 15 is the sign bit
	// bits 14..11 are the exponent
	// bits 10..0 are the the mantissa. Unlike IEEE format,
	// 	the msb is transmitted; this means that numbers
	//	might not be normalized, but makes coding for
	//	underflow easier.
	// As with IEEE format, negative zero is possible, so
	// we special-case that in hopes that JavaScript will
	// also cooperate.
	//
	// The result is a number in the open interval (-1.0, 1.0);
	//

	// throw away high bits for repeatability.
	rawSflt16 &= 0xFFFF;

	// special case minus zero:
	if (rawSflt16 == 0x8000)
		return -0.0;

	// extract the sign.
	var sSign = ((rawSflt16 & 0x8000) != 0) ? -1 : 1;

	// extract the exponent
	var exp1 = (rawSflt16 >> 11) & 0xF;

	// extract the "mantissa" (the fractional part)
	var mant1 = (rawSflt16 & 0x7FF) / 2048.0;

	// convert back to a floating point number. We hope
	// that Math.pow(2, k) is handled efficiently by
	// the JS interpreter! If this is time critical code,
	// you can replace by a suitable shift and divide.
	var f_unscaled = sSign * mant1 * Math.pow(2, exp1 - 15);

	return f_unscaled;
	}
