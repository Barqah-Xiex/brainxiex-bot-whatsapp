const { default: axios } = require("axios");
return 0;
const cmd = `aprpplayer`; 
const args = ``;
const category = `SAMP`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    


    const [host,port] = [`acepride-rp.com`,7777];
    const player = arg;
    console.log(player)
    sock.sendRequest(m).post(`${baseURL}/api/servergame/samp`,{apikey,host,port}).then(({data:{Barqah}}) => {
        try{
            const {online,maxplayers,hostname,gamemode,mapname,rules:{worldtime},players} = Barqah;
            if(online > 100) return nyarios(`Player lebih dari 100 jadi tidak bisa :(`)
            if(!isset(player)) return nyarios(`${players.map(({id,name,score,ping}) => `*${name} (${id})*\nLevel: ${score}\nPing: ${ping}`).join(`\n\n`)}`)
            nyarios(`${players.filter(v => `${v.name}`.toLocaleLowerCase().includes(player.toLocaleLowerCase())).map(({id,name,score,ping}) => `*${name} (${id})*\nLevel: ${score}\nPing: ${ping}`).join(`\n\n`)}`)
        }catch(e){
            nyarios(`server samp mati`); 
        }
    }).catch(e => nyarios(`server samp mati atau server utama brainxiex mati`))
    
    
}
module.exports = {cmd,args,category,message};