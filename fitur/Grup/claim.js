const cmd = `claim`;
const args = ``;
const category = `Grup`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, callcmd, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios,isGroup} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func
    sock.claim = sock.claim||{};
    sock.claim[m.sender] = sock.claim[m.sender]||0;
    
    if(sock.claim[m.sender] > new Date().getTime()) return nyarios(`Tunggu *${sock.countdown(Math.floor((sock.claim[m.sender] - new Date().getTime())))}* Lagi !`);
    if(!isGroup) return nyarios(`gunakan di grup`);
    const pem = await nyarios("Mengecek data....");
    const send = (a) => sock.editMessage(pem,a);
    
    
    const g = await player(id);
    await send("Grup [OK]");
    const p = await player(m.sender);
    await send("Kamu [OK]");

    await send("limit grup +20");
    await g.add("limit",20);
    await send("money +20"); 
    await p.add("pCash",20);
    sock.claim[m.sender] = new Date().getTime() + ((Math.random()*(60*60))*1000);
    await send(achivment(["+20 Limit Grup","+20 Bx"]));
    await player(id);
    await player(m.sender);

}
module.exports = {cmd,args,category,message};