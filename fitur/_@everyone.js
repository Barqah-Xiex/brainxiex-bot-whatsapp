const { default: axios } = require("axios");
const id = `@everyone`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, db, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs} = func

    
    
    
    
    
    if(!body.includes(`@everyone`)) return 0;
    if(!m.chat.endsWith("g.us")) return nyarios(`hanya bisa di gunakan di grup`);
    if((await player(id)).antitagall) return nyarios(`anti taggall aktif`);
    const {participants,subject,owner,desc} = await sock.groupMetadata(m.chat);
    const isAdmin = getGroupAdmins(participants).includes(m.sender);
    function getGroupAdmins (participants) {
        let admins = []
        for (let i of participants) {
            i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins || []
     }
    const isVIP = (await player(m.sender)).pVip >= 1;//Number(FileAda(`${dbfile(`vip`)}`,`${new Date().getTime()}`)) > new Date().getTime();
    if(!(isVIP||isAdmin)) return nyarios(`hanya di gunakan untuk pengguna VIP / Admin Grup`);
    sendMessage(m.chat, { text : body.replace(/@everyone/g,`*@everyone*`), mentions: participants.map(a => a.id)}, { quoted: m });
    return 1;
}
module.exports = {id,action};