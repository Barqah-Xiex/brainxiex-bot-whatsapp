const { default: axios } = require("axios");

const cmd = `tariktaxi`; 
const args = ``;
const category = `JOB`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,sleep} = func;
	
    const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
    const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
    const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;
    
    if(!isTempatGame){
        return nyarios("WAJIB DI TEMPAT GAME !!!!\nLINK DI BAWAH !!!\n\n*Brainxiex Team*\nhttps://chat.whatsapp.com/IaF1WLRZS1vLvSuki9ipR7\n\n*Brainxiex*\nhttps://chat.whatsapp.com/JHgUISoG2bYCQLVXiFANaf\n\n*Game Area*\nhttps://chat.whatsapp.com/LmbD6QYEWnmEzEp4Tk2znx\n\n*Roleplay*\nhttps://chat.whatsapp.com/L82BriJfTYM6sxnA3LiipL")
    }

    const Akun = await player(m.sender);

    if(Akun.pJob != 72) return nyarios(`Kamu bukan supir taxi !\ndaftar kerja dulu di *${Prefix}pekerjaan*`);
	
    global.muteFromBot[m.sender] = true;
    const loading = await sock.loadingMessage(id,`${m.pushName} Mencari Penumpang...`,10_000);
    await loading.editLoading("Dapat !!!");
    
    await sleep(1000);
    
    await loading.editLoading("Mengkalkulasi jarak....");
    
    await sleep(1000);
    
    const jarak = Math.floor(Math.random() * 50);
    
    await loading.editLoading(`Jarak *${jarak}KM*`);
    
    await sleep(1000);
    
    await loading.editLoading(`*Kamu* sedang menyetir Taxi dan menempuh jarak *${jarak}KM*`);
	
    if(new Date().getTime()%2 == 0 && jarak >= 10){
        await loading.editLoading(`Membeli Bensin...`);
    
    	await sleep(5000);
        
        await loading.editLoading(`*Kamu* sedang menyetir Taxi dan menempuh jarak *${jarak}KM*`);
    }
    
    await sleep(1000*jarak);
   
    await Akun.add("pExp",1);
    await Akun.add("pCash",jarak*10);
    
    await loading.editLoading(`*Kamu* Telah Mengantarkannya dan di beri Uang Sebesar *${jarak}bx*`);
    
    await sleep(3000);
    
    global.muteFromBot[m.sender] = false;
    
    await loading.editLoading(achivment([`${jarak*10}bx/${jarak}KM`]));

}
module.exports = {cmd,args,category,message};