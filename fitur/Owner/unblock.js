const { default: axios } = require("axios");

const cmd = `unblock`; 
const args = `[orangnya]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs,exec} = func

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []))

    if(!isOwner||config.publicbot) return nyarios(`kamu bukan Owner`);
    if(!isset(arg)) return nyarios(`mana argumennya ?`);
    if(mentioned[0] == m.sender) return nyarios(`tag orangnya`);

    sock.updateBlockStatus(mentioned[0], 'unblock').then(a => nyarios(`Berhasil membuka blokir ${mentioned[0].split("@")[0]}`)).catch(a => nyarios(`Gagal membuka blokir ${mentioned[0].split("@")[0]}`))
}
module.exports = {cmd,args,category,message};