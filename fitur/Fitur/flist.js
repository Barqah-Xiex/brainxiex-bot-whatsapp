const { writeFileSync, readdirSync, statSync } = require("fs");

const cmd = `flist`; 
const args = ``;
const category = `Fitur`;
async function message(liana, m, store) {
    const {sendMessage, config,resize,media2buffer} = liana;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot} = config;
    
    if(isOwner){
        const text = readdirSync(`./fitur`).map(v => {
            const date =  new Date((statSync(`./fitur/${v}`).mtime));
            const tanggal = date.getDate()
            const bulan = date.getMonth()
            const tahun = date.getFullYear()
        
            const jam = date.getHours();
            const menit = date.getMinutes();
            return `*${v}*\n${tanggal}/${bulan}/${tahun} ${jam}:${menit}`
        }).join(`\n\n`)
        sendMessage(id,{text},{quoted: m})
    }else{
        sendMessage(id,{text: `kamu bukan owner bot ini`},{quoted: m})
    }
}
module.exports = {cmd,args,category,message};