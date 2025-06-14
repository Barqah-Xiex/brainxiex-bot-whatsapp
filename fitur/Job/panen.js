const cmd = `panen`;
const args = ``;
const category = `job`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, callcmd} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func
	
    const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
    const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
    const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;
    
    if(!isTempatGame){
        return nyarios("WAJIB DI TEMPAT GAME !!!!\nLINK DI BAWAH !!!\n\n*Brainxiex Team*\nhttps://chat.whatsapp.com/IaF1WLRZS1vLvSuki9ipR7\n\n*Brainxiex*\nhttps://chat.whatsapp.com/JHgUISoG2bYCQLVXiFANaf\n\n*Game Area*\nhttps://chat.whatsapp.com/LmbD6QYEWnmEzEp4Tk2znx\n\n*Roleplay*\nhttps://chat.whatsapp.com/L82BriJfTYM6sxnA3LiipL")
    }

    const Akun = await player(m.sender);

    if(Akun.pJob != 10) return nyarios(`Kamu bukan petani !\ndaftar kerja dulu di *${Prefix}pekerjaan*`);
    global.muteFromBot[m.sender] = true;
    
    const Kebun = JSON.parse(Akun.Bot_WA_Kebun)||[]
    const inv = JSON.parse(Akun.Bot_WA_Inventory)||[];

    const tm = new Date().getTime()

    let tersisa = 0;
    const newkebun = [];

    Kebun.forEach((k) => {
        if((k[0] - tm) <= 0){
            if((inv.length >= Akun.Bot_WA_Inventory_Max)){
                newkebun.push(k);
                tersisa++;
            }else{
                if((k[0] - tm) <= (24*60*60*1000)){
                    inv.push(k[1]);
                }else{
                    inv.push(k[1]);
                    Akun.add("pExp",1);
                }
            }
        }else{
            newkebun.push(k);
        }
    });

    await Akun.put("Bot_WA_Inventory",JSON.stringify(inv));
    await Akun.put("Bot_WA_Kebun",JSON.stringify(newkebun));

    global.muteFromBot[m.sender] = false;

    await nyarios(tersisa >= 1 ? "beberapa tidak dapat di panen karena tas penuh" : "semua berhasil di panen");
    if(newkebun.length > 0) callcmd(m,'kebun');
    callcmd(m,'inv');

}
module.exports = {cmd,args,category,message};