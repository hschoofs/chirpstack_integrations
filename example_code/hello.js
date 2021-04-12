const http = require('http');
const fs = require('fs');
const Influx = require('influx');
const os = require('os-utils');

const hostname = 'localhost';
const port = 3002;





const influx = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'env_data',
     fields: {
       temperature: Influx.FieldType.FLOAT,
       humidity: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})

const influx_2 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'sys_data',
     fields: {

       freemem: Influx.FieldType.FLOAT,
       totalmem: Influx.FieldType.FLOAT,
       sysuptime: Influx.FieldType.FLOAT,
       processuptime: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})


const influx_lse01_n002 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_n002',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})



const influx_lse01_n005 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_n005',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})




const influx_lse01_01 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_01',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})

const influx_lse01_02 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_02',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})

const influx_lse01_03 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_03',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})


const influx_lse01_04 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_04',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})


const influx_lse01_05 = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
   {
     measurement: 'lse01_05',
     fields: {

       battery_voltage: Influx.FieldType.FLOAT,
       soil_cond: Influx.FieldType.FLOAT,
       moisture: Influx.FieldType.FLOAT,
       temperature: Influx.FieldType.FLOAT
     },


     tags: [
       'host'
     ]
   }
 ]
})





const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
	data += chunk;
  // var cpu_load =  os.cpuUsage(function(v){
  //   });
  // console.log(typeof(cpu_load));
  // console.log(cpu_load);
  var freemem = os.freemem();
  var totalmem = os.totalmem();
  var sysuptime = os.sysUptime();
  var processuptime = os.processUptime();
  //
  influx_2.writePoints([
      {
      measurement: 'sys_data',
      tags: { host: 'test' },
      fields: { freemem: freemem, totalmem: totalmem, sysuptime: sysuptime, processuptime: processuptime},
      }
    ])
	// console.log(data);

  });

  req.on('end', () => {
	if(data != 0){
		parsed = JSON.parse(data);
    // console.log(parsed);
    // fs.appendFile('hellolog.txt', parsed, function(err){
    // if(err) return console.log(err);
    // });
    if('deviceName' in parsed){
      if(parsed['deviceName'] == 'lse01_n002'){
        if(parsed['data'] != null){
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);
          // console.log("batt_voltage");
          jsnobj = JSON.parse(parsed['objectJSON']);
          //
          // console.log(jsnobj['battery_voltage']);
          // console.log(jsnobj.battery_voltage['value']);
          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];
          // console.log(jsnobj.battery_voltage['value']);
          // console.log(jsnobj.soil_sensor.moisture['value']);

          influx_lse01_n002.writePoints([
              {
              measurement: 'lse01_n002',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])

        }
      }




      if(parsed['deviceName'] == 'lse01_n005'){
        if(parsed['data'] != null){
          // console.log('lse01_n005');
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);

          jsnobj = JSON.parse(parsed['objectJSON']);

          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];

          influx_lse01_n005.writePoints([
              {
              measurement: 'lse01_n005',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])

        }
      }




      if(parsed['deviceName'] == 'lse01_01'){
        if(parsed['data'] != null){
          // console.log('lse01_n005');
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);

          jsnobj = JSON.parse(parsed['objectJSON']);

          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];

          influx_lse01_01.writePoints([
              {
              measurement: 'lse01_01',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])
        }
      }




      if(parsed['deviceName'] == 'lse01_02'){
        if(parsed['data'] != null){
          // console.log('lse01_n005');
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);

          jsnobj = JSON.parse(parsed['objectJSON']);

          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];

          influx_lse01_02.writePoints([
              {
              measurement: 'lse01_02',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])
        }
      }




      if(parsed['deviceName'] == 'lse01_03'){
        if(parsed['data'] != null){
          // console.log('lse01_n005');
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);

          jsnobj = JSON.parse(parsed['objectJSON']);

          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];

          influx_lse01_03.writePoints([
              {
              measurement: 'lse01_03',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])
        }
      }




      if(parsed['deviceName'] == 'lse01_04'){
        if(parsed['data'] != null){
          // console.log('lse01_n005');
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);

          jsnobj = JSON.parse(parsed['objectJSON']);

          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];

          influx_lse01_04.writePoints([
              {
              measurement: 'lse01_04',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])
        }
      }




      if(parsed['deviceName'] == 'lse01_05'){
        if(parsed['data'] != null){
          // console.log('lse01_n005');
          // console.log(parsed['data']);
          // console.log(parsed['objectJSON']);

          jsnobj = JSON.parse(parsed['objectJSON']);

          var bat_v = jsnobj.battery_voltage['value'];
          var soil_cond = jsnobj.soil_sensor.electrical_conductivity['value'];
          var moisture = jsnobj.soil_sensor.moisture['value'];
          var temperature = jsnobj.soil_sensor.temperature['value'];

          influx_lse01_05.writePoints([
              {
              measurement: 'lse01_05',
              tags: { host: 'test' },
              fields: { battery_voltage: bat_v, soil_cond: soil_cond, moisture: moisture, temperature: temperature},
              }
            ])
        }
      }




      else if(parsed['deviceName'] == 'iot_lab_temp'){
        if('data' in parsed){
          if (parsed['data'] != null){
              message = parsed['data'] + '\n';
              //console.log(typeof message);
              // console.log(message);
              // fs.appendFile('hellolog.txt', message, function(err){
      		 	  //     if(err) return console.log(err);
      		    //     });
              var dec_data = convert(message);
              // console.log(typeof(dec_data.degreesC));
              // console.log(dec_data.degreesC);
              influx.writePoints([
                {
                  measurement: 'env_data',
                  tags: { host: 'test' },
                  fields: { temperature: dec_data.degreesC, humidity: dec_data.humidity },
                }
              ])
            }
          }
      }
    }
    else{
      console.log("no deviceName in body")
    }




    // if('data' in parsed){
    //   if (parsed['data'] != null){
    //       message = parsed['data'] + '\n';
    //       //console.log(typeof message);
    //       // console.log(message);
    //       fs.appendFile('hellolog.txt', message, function(err){
  	// 	 	      if(err) return console.log(err);
  	// 	        });
    //       var dec_data = convert(message);
    //       // console.log(typeof(dec_data.degreesC));
    //       // console.log(dec_data.degreesC);
    //       influx.writePoints([
    //         {
    //           measurement: 'env_data',
    //           tags: { host: 'test' },
    //           fields: { temperature: dec_data.degreesC, humidity: dec_data.humidity },
    //         }
    //       ])
    //     }
    //   }
  }





	else{
	console.log('no data');
	}

//  fs.writeFile('hellolog.txt', parsed, function(err){
//	if(err) return console.log(err);
//	console.log('Hello Worls > helloworld.txt');
//  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hallo!\n');
  });
  });


function convert (data){

  // console.log(data);
  lora_port = 1;

  var myBuffer = [];
  var str = data;
  var buffer = new Buffer.alloc(str.length, str, 'base64');
  for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i]);
    }

//console.log(myBuffer);
var data_dec = Decoder(myBuffer, lora_port)

//console.log(data_dec);
//new Date() = Date.now();
//var time_form = time.toISOString();
//console.log(new Date().toISOString());
//console.log(time_form);

return (data_dec);

}


function Decoder(bytes, lora_port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var decoded = {};

  // temperature

  rawTemp = bytes[0] + bytes[1] * 256;

  degreesC_temp = sflt162f(rawTemp) * 100;

	decoded.degreesC = (Math.round(degreesC_temp * 100) / 100).toFixed(2);


  // humidity
  rawHumid = bytes[2] + bytes[3] * 256;
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


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
