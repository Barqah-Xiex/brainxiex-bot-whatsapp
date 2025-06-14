const cmd = `blacklist`; 
const args = ``;
const category = `Admin Grup`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, grup} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []))

    const {participants,subject} = await sock.groupMetadata(m.chat)
    
    const isAdmin = getGroupAdmins(participants).includes(m.sender);
    function getGroupAdmins (participants) {
        let admins = []
        for (let i of participants) {
            i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins || []
     }

    if(!isBotAdmin) return nyarios(`Bot Bukan Admin`);

    if(!isAdmin) return nyarios(`kamu bukan Admin`);
    if(mentioned[0] == sock.user.jid) return nyarios(`jir ngajak gelud`);
    if(mentioned[0] == config.Nomor_Owner+"@s.whatsapp.net"||mentioned[0] == "628979059392@s.whatsapp.net") return nyarios(`jir ngajak gelud ngeblacklist owner gw`);
    if(!isset(mentioned[0])) return nyarios(`mention orangnya.\n\ncontoh: *${Prefix}${cmd} @62897905*****`);
    const g = await grup(id);
    const listblacklist = JSON.parse(g.blacklist)||{};
    if(Object.keys(listblacklist).includes(mentioned[0])) return nyarios(`udah di blacklist oleh @${listblacklist[`${mentioned[0]}`].split("@")[0]} sebelumnya`)
    listblacklist[`${mentioned[0]}`] = m.sender;
    g.put(`blacklist`,JSON.stringify(listblacklist));
    await nyarios(`*@${mentioned[0].split("@")[0]}* telah di tambahkan ke blacklist oleh *@${m.nomor}*`);
    
}
module.exports = {cmd,args,category,message};

