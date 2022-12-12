//Procedure via Javascript to connect to a Shelly Gen2 device and configure the WIFI via BLE (Bluetooth Low Energy)
//Obtained the service characteristics from 
//https://github.com/ALLTERCO/fleet-management

var myservice=null
var mycharacteristic2=null
var myread=null
var myvalue=null
var myserver=null
navigator.bluetooth.requestDevice({acceptAllDevices: true, optionalServices: ['5f6d4f53-5f52-5043-5f53-56435f49445f']})
.then(device => {mydevice=device})
mydevice.gatt.connect().then(server => {myserver=server})
myserver.getPrimaryService('5f6d4f53-5f52-5043-5f53-56435f49445f').then(service => {myservice=service})
myservice.getCharacteristic('5f6d4f53-5f52-5043-5f74-785f63746c5f').then(characteristic => {mycharacteristic=characteristic})
myservice.getCharacteristic('5f6d4f53-5f52-5043-5f64-6174615f5f5f').then(characteristic => {mycharacteristic2=characteristic})
ssid=""
pass=""
ssid1=""
pass1=""

const SHELLY_SET_WIFI = JSON.stringify({
    method: 'Wifi.SetConfig',
    id: 1,
    params: {
        config: { sta:{ssid:ssid, pass:pass, enable: true},
                  sta1:{ssid:ssid1, pass:pass1, enable: true}
        }
    }
});
var a=new ArrayBuffer(SHELLY_SET_WIFI.length)
var aview= new Uint8Array(a)
var b=new ArrayBuffer(4)
var bview= new Uint8Array(b)
SHELLY_SET_WIFI.split('').map((x,i)=>(aview[i]=SHELLY_SET_WIFI.charCodeAt(i)))
bview[3]=SHELLY_SET_WIFI.length

mycharacteristic.writeValue(b).then((value)=>{myvalue=value}).catch(error=>{console.error(error)})
mycharacteristic2.writeValue(a).then((value)=>{myvalue=value})
