const { default: axios } = require("axios");

const cmd = `mancing`; 
const args = ``;
const category = `JOB`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
    const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
    const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;
    
    if(!isTempatGame){
        return nyarios("WAJIB DI TEMPAT GAME !!!!\nLINK DI BAWAH !!!\n\n*Brainxiex Team*\nhttps://chat.whatsapp.com/IaF1WLRZS1vLvSuki9ipR7\n\n*Brainxiex*\nhttps://chat.whatsapp.com/JHgUISoG2bYCQLVXiFANaf\n\n*Game Area*\nhttps://chat.whatsapp.com/LmbD6QYEWnmEzEp4Tk2znx\n\n*Roleplay*\nhttps://chat.whatsapp.com/L82BriJfTYM6sxnA3LiipL")
    }

    const Akun = await player(m.sender);

    if(Akun.pJob != 17) return nyarios(`Kamu bukan nelayan !\ndaftar kerja dulu di *${Prefix}pekerjaan*`);
    if(Akun.Bot_WA_Umpan <= 0) return nyarios(`Umpan Kurang !\nbeli umpan terlebih dahulu di ${Prefix}shop`)
    
    const inv = JSON.parse(Akun.Bot_WA_Inventory)||[];

    if(inv.length >= Akun.Bot_WA_Inventory_Max) return nyarios(`Inventory penuh gunakan *${Prefix}sellinv*`);
    
    if(random([false,true,true,false])){
        const dapatnya = random(Object.keys(await rpg.item.Ikan()).slice(0,Akun.pLevel+1));
    
        inv.push(dapatnya);
    
        global.muteFromBot[m.sender] = true;
        
        // const loading = await sock.loadingMessage(id,`${m.pushName} Mancing...`,5_000);
        await Akun.add("Bot_WA_Umpan", -1);
        await Akun.add("pExp",1);
        await Akun.put("Bot_WA_Inventory",JSON.stringify(inv));
        nyarios(achivment([dapatnya]));
    }else{
        await Akun.add("Bot_WA_Umpan", -1);
        nyarios("ah tidak adapat ikan, coba lagi !!")
    }
    
    global.muteFromBot[m.sender] = false;

}
module.exports = {cmd,args,category,message};