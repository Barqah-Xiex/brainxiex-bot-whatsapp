const { default: axios } = require("axios");

const cmd = `cuaca`; 
const args = `[Lokasi]`;
const category = ``;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func
	
    if(!isset(arg)) return nyarios(`Masukan contoh: ${Prefix}${cmd} Tasikmalaya`);
    const cuaca = await sock.sendRequest(m).post(`${baseURL}/api/tools/cuaca`,{apikey,lokasi:arg}).then(({data}) => data);
    
    nyarios(`「 📍 」 Lokasi: ${cuaca.location}
「 🗺️ 」 Negara: ${cuaca.country}
「 🌤️ 」 Cuaca: ${cuaca.weather}
「 🌡️ 」 Temperatur: ${cuaca.currentTemp}
「 💠 」 Temperatur Min.: ${cuaca.maxTemp}
「 📛 」 Temperatur Maks.: ${cuaca.minTemp}
「 💦 」 Kelembaban: ${cuaca.humidity}
「 🌬️ 」 Angin: ${cuaca.windSpeed}`)
}
module.exports = {cmd,args,category,message};