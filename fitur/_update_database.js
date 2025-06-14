const { default: axios } = require("axios");
const id = `UpdateDatabase`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs} = func
    
    try{
        player(sender).then(p => {
            if(p.pVip >= 1){
                if((p.pVipTime*1000) < new Date().getTime() ){
                    p.put("pVip",0);
                    p.put("pVipTime",0);
                }
            }
            if(p.pExp > (p.pLevel+1)*10){
                p.put("pExp",0);
                p.add("pLevel",1);
                p.add("pCash",p.Level+1);
                nyarios(`*Selamat Kamu Naik Level !!!*\n+1 Level\n+${p.Level+1}`);
            }
            p.put("waName",pushName);
            sock.profilePictureUrl(m.sender, "image").then(ppimg => p.put("ppimg",ppimg))//.catch(v => `${baseURL}/media/1655612010102undefined.png`);
        });
        player(id).then(g => {
            sock.groupMetadata(m.chat).then((full) => {
                g.put("member",JSON.stringify(full.participants.map(({id}) => id)));
                //g.put("full",JSON.stringify(full));
            })
        })
    }catch(e){
        console.log(e);
    }
    
}
module.exports = {id,action};