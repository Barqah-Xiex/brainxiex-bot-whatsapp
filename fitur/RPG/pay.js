const { default: axios } = require("axios");

const cmd = `pay`; 
const args = `[nominal]`;
const category = `RPG`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    if(!isset(arg)) return nyarios(`masukin nominalnya`);
    const input_nominal = `${arg.split(` `)[0]}`.replace(/[^0-9]/g, '');
    
    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []));

    if(!isset(mentioned[0]) || (mentioned == m.sender)) return nyarios(`target tidak di temukan`);
    
    const orangnya = mentioned[0];

    global.muteFromBot[m.sender] = true;
    global.muteFromBot[orangnya] = true;

    const Akun = await player(m.sender);
    const Orang = await player(orangnya);
    
    
    const nominal = Number(input_nominal);

    
    if(isNaN(nominal)||nominal == NaN) return nyarios(`masukan nominal dengan benar !!!`);
    if(nominal <= 0) return nyarios(`gak bisa kurang dari sama dengan 0`);
    if(nominal > 100_000 && !isOwner) return nyarios(`gak bisa lebih dari 100k`);
    if(nominal > Akun.pCash) return nyarios(`uang kurang`);
    
    
    await Akun.add("pCash",-nominal);
    await Orang.add("pCash",nominal);
    
    global.muteFromBot[m.sender] = false;
    global.muteFromBot[orangnya] = false;
    
    sendMessage(m.chat,{react: {text: "✅",key: m.key}})
    .then(v => setTimeout(() => sendMessage(m.chat,{react: {text: "💸",key: m.key}}), 3000));      
    sock.banner(id,{image:{url: `${baseURL}/api/image/banner?font_size=150&apikey=${apikey}&text=${encodeURIComponent(`${nominal} bx`)}`},caption:`*Sukses* mentransfer *${Math.floor(nominal)}bx* dari *@${m.nomor}* ke *@${mentioned[0].split(`@`)[0]}*`})


}
module.exports = {cmd,args,category,message};