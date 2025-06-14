const { default: axios } = require("axios");

const cmd = `bckontak`; 
const args = `[text]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func

    if(isOwner){
        if(!isset(arg)) return nyarios(`masukan perintah`);
        let jumlahkontak = 0;
        const  listkontakid = Object.keys(store.contacts);
            for await(const v of listkontakid){
                try{
                    const i = v;
                    console.log(v.id,true);
                    const text = `*「 Information 」*
    ${arg}
    
    
    *「 Information 」*`
                    const tidur = Math.floor(Math.random()*60) * 1000;
                    console.log("tidur sebentar selama",tidur,"ms");
                    await sleep(tidur);
                    jumlahkontak++;
                    sendMessage(i, { text : text.replace(/@everyone/g,`*@everyone*`)},{})
                    .then(mek => console.log(`${i.split("@")[0]}`, jumlahkontak, "/", listkontakid.length, `(${Math.floor((jumlahkontak/listkontakid.length)*100)} %)`))
                    .catch(v => console.error(v));
                }catch(e){
                    console.log(e);
                }

            }
        await nyarios(`selsai dengan *${i} Grup*`);
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};