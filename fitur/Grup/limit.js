const cmd = `limit`;
const args = ``;
const category = `Grup`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, callcmd} = sock;
    const {chat: id, body, arg, isOwner, nyarios,isGroup} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    if(!isGroup) return nyarios(`gunakan di grup`);
    const pem = await nyarios("Mengecek data....");
    const send = (a) => sock.editMessage(pem,a);

    const g = await player(id);
    await send(`limit sekarang: *${g.limit}*`);
    await player(id);

}
module.exports = {cmd,args,category,message};