const { default: axios } = require("axios");

const cmd = `buybibit`; 
const args = ``;
const category = `Shop`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment, callcmd} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    const Akun = await player(m.sender);

    if(!isset(arg)) return nyarios(`masukin nama bibitnya`);

    const kebun = JSON.parse(Akun.Bot_WA_Kebun)||[];

    if(kebun.length >= Akun.Bot_WA_Kebun_Max) return nyarios(`Kebun penuh gunakan *${Prefix}kebun* untuk melihat atau *${Prefix}panen* untuk memanen`);

    const tanaman = await rpg.item.Sayuran();
    
    if(Object.keys(tanaman).includes(arg)){
        if(!Object.keys(tanaman).slice(0,Math.floor(Akun.pLevel/2)+1).includes(arg)) return nyarios(`level tidak mencukupi`);

        global.muteFromBot[m.sender] = true;
        kebun.push([new Date().getTime()+(tanaman[arg]*60*1000),arg])
        
        await Akun.add("pCash", -(Math.floor(tanaman[arg]/2)));
        await Akun.put("Bot_WA_Kebun",JSON.stringify(kebun));
        
        
        global.muteFromBot[m.sender] = false;

        callcmd(m,"kebun");
    }else{
        nyarios("masukan nama bibit dengan benar");
    }

}
module.exports = {cmd,args,category,message};