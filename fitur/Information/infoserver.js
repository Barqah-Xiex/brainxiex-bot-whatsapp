const { default: axios } = require("axios");

const cmd = `infoserver`; 
const args = ``;
const category = `Information`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    const data = await sock.sendRequest(m).get(`${baseURL}/api/server/info`).then(r => r.data);
    
    const {cpu, cpuTotalCoreS, cpuUsageS, ramTotalS, ramUsageS, ramKosongS, ramNodeJS, server} = data||{};

    const diubah = `*[Server Info]*

*[+] CPU [+]*
${cpu.map(({model,speed,times},i) => `*[Core ${i+1}]*\n${model}\n[speed]: ${speed}\n${Object.keys(times).map((v) => `[${v}]: ${times[v]}`).join(`\n`)}`).join(`\n\n`)}


*[+] Statistik [+]*
CPU TotalCore: ${cpuTotalCoreS}
CPU Usage: ${cpuUsageS}
RAM Kosong: ${ramKosongS}
RAM Usage: ${ramUsageS}
RAM Total: ${ramTotalS}


*[+] Nodejs RAM Usage [+]*
${Object.keys(ramNodeJS).map(v => `[${v}]: ${ramNodeJS[v]}`).join(`\n`)}

*[+] Server Information [+]*
${Object.keys(server).map(v => `[${v}]: ${server[v]}`).join(`\n`)}


`;
    const result = diubah;
    await sock.banner(id,{text: `${result}`},{quoted: m});
}
module.exports = {cmd,args,category,message};