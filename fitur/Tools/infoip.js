const { default: axios } = require("axios");

const cmd = `infoip`; 
const args = `[ip]`;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana ipnya ?`);
    
    const localhost = {
        "status": "success",
        "continent": "Asia",
        "continentCode": "AS",
        "country": "Indonesia",
        "countryCode": "ID",
        "region": "JB",
        "regionName": "West Java",
        "city": "Tasikmalaya",
        "district": "",
        "zip": "",
        "lat": -7.3263,
        "lon": 108.221,
        "timezone": "Asia/Jakarta",
        "offset": 25200,
        "currency": "IDR",
        "isp": "PT. Telekomunikasi Indonesia",
        "org": "",
        "as": "AS7713 PT Telekomunikasi Indonesia",
        "asname": "telkomnet-as-ap",
        "reverse": "",
        "mobile": false,
        "proxy": false,
        "hosting": false,
        "query": "36.74.41.116"
    }

    const ip = arg.includes("xiex.my.id") ? localhost : await sock.sendRequest(m).get(`http://ip-api.com/json/${arg}?fields=66846719`).then(v => v.data).catch(e => {error: "kesalahan input"});
    const text = Object.keys(ip).map(v => `*${v}* = ${ip[v]}`).join("\n")

    nyarios(text);

}
module.exports = {cmd,args,category,message};