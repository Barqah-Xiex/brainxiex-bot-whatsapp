const { default: axios } = require("axios");

const cmd = `tabung`; 
const args = `[nominal]`;
const category = `Bank`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    if(!isset(arg)) return nyarios(`masukin nominalnya`);
    const input_nominal = `${arg.split(` `)[0]}`.replace(/[^0-9]/g, '');

    
    const Akun = await player(m.sender);
    
    
    const nominal = Number(input_nominal);

    
    if(isNaN(nominal)||nominal == NaN) return nyarios(`masukan nominal dengan benar !!!`);
    if(nominal <= 0) return nyarios(`gak bisa kurang dari sama dengan 0`);
    if(nominal > 100_000) return nyarios(`gak bisa lebih dari 100k`);
    if(nominal > Akun.pCash) return nyarios(`uang kurang`);
    
    
    global.muteFromBot[m.sender] = true;
    
    await Akun.add("pCash",-nominal);
    await Akun.add("pBank",nominal);
    
    global.muteFromBot[m.sender] = false;
    
    
    
    sock.banner(id,{image:`${baseURL}/api/image/banner?font_size=150&apikey=${apikey}&text=${encodeURIComponent(`+${nominal} bx`)}`,caption:`${achivment([`Bank: +${nominal}`,`Uang: -${nominal}`])}`})


}
module.exports = {cmd,args,category,message};