const { default: axios } = require("axios");

const cmd = `addvip`; 
const args = ``;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    if(!isOwner || config.isJadibot) return nyarios("kamu tidak dapat menggunakan command ini!");

    if(!isset(arg)) return nyarios(`gunakan: ${Prefix}${cmd} [jumlah hari]`);

    const [hari] = arg.split(" ");

    if(hari > 30 || hari <= -1) return nyarios(`gunakan: ${Prefix}${cmd} [jumlah hari 1 - 30]`);

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []));
    
    if(!isset(mentioned[0]) || (mentioned == m.sender)) return nyarios(`target tidak di temukan`);
    
    const orangnya = mentioned[0];
    const Orang = await player(orangnya);
    if(Orang.pVip <= 0) return nyarios("player ini tidak vip");

    const time = Number(`${Orang.pVipTime}`) + (Number(`${hari}`)*24*60*60);
    Orang.put("pVipTime",time);


    nyarios(`berhasil menambahvip @${orangnya.split("@")[0]} selama ${hari} hari`);




}
module.exports = {cmd,args,category,message};