const { default: axios } = require("axios");

const cmd = `setvip`; 
const args = `[vipid] [tag]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func

    if(!isOwner || config.isJadibot) return nyarios("kamu tidak dapat menggunakan command ini!");

    if(!isOwner || config.publicbot) return nyarios("kamu tidak dapat menggunakan command ini!");



    if(!isset(arg)) return nyarios(`gunakan: ${Prefix}${cmd} [1 - 4]\n1. Bronze\n2. Silver\n3. Gold\n4. Diamond`);

    const [idvip] = arg.split(" ");

    if(idvip > 5 || idvip <= -1) return nyarios(`gunakan: ${Prefix}${cmd} [0 - 5]\n0. Hapus VIP\n1. Bronze\n2. Silver\n3. Gold\n4. Diamond\n5. Netherite`);

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []));1

    if(!isset(mentioned[0]) || (mentioned == m.sender)) return nyarios(`target tidak di temukan`);

    const orangnya = mentioned[0];

    const time = Math.floor(new Date().getTime()/1000) + (30*24*60*60);

    const Orang = await player(orangnya);
    Orang.put("pVip",idvip);
    Orang.put("pVipTime",time);

    const namavip = ["None","Bronze","Silver","Gold","Diamond","Netherite"];

    nyarios(`berhasil menjadikan @${orangnya.split("@")[0]} menjadi Vip ${namavip[Number(idvip)]} selama 30 hari`);




}
module.exports = {cmd,args,category,message};