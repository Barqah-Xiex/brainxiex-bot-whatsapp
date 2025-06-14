const cmd = `addlimit`;
const args = `[nominal]`;
const category = `Grup`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, callcmd} = sock;
    const {chat: id, body, arg, isOwner, nyarios,isGroup} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    if(!isGroup) return nyarios(`gunakan di grup`);

    const pem = await nyarios("Mengecek data....");
    const send = (a) => sock.editMessage(pem,a);

    const p = await player(m.sender);

    if(!isset(arg)) return send(`gunakan: ${Prefix}${cmd} nominal`);

    const nominal = Number(arg.split(" ")[0]);

    if(isNaN(nominal)||nominal == NaN) return send(`masukan nominal dengan benar !!!`);
    if(nominal <= 0) return send(`gak bisa kurang dari sama dengan 0`);
    if(nominal > 100_000) return send(`gak bisa lebih dari 100k`);
    if(nominal > p.pCash) return send(`uang kurang`);
    
    await send(`uang cukup ...`);
    await send(`mengecek data grup ..`);

    const g = await player(id);
    await send(`limit sekarang:  ${g.limit}\nmenambah limit .`);
    await g.add("limit",nominal);
    await send(`Penambahan limit grup berhasil !\nlimit sekarang: *${g.limit+nominal}*`);
    await player(id);
    (await player(m.sender)).add("pCash",-nominal);

}
module.exports = {cmd,args,category,message};