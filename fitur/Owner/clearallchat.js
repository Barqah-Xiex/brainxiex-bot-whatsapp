const { default: axios } = require("axios");

const cmd = `clearallchat`; 
const args = `text`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func

    if(isOwner){
        let jumlahgrup = 0;
        const allgrup = Object.values(await sock.groupFetchAllParticipating());
        for await (const {participants, id, subject} of allgrup) {
            // if(participants.length > Number(arg)) continue;
            try{
                sock.sendMessage(id,{text: isset(arg) ? arg : `> Bot Sedang Membersihkan Chat Demi Keamanan Privasi Kalian (>w<)`},{}).then(mes => {
                    sock.chatModify({
                        delete: true,
                        lastMessages: [{ key: mes.key, messageTimestamp: mes.messageTimestamp }]
                    }, mes.key.remoteJid);
                })
            }catch(e){
                console.log(id, e)
            }
            jumlahgrup++;
            console.log("Delete",subject,{jumlahgrup});
            if(Math.floor(Math.random()*10) % 2 == 0){
                const tidur = Math.floor(Math.random()*10) * 1000;
                console.log("tidur sebentar selama",tidur,"ms")
                await sleep(tidur);
            }
        }
        await nyarios(`selsai dengan *${jumlahgrup} Grup*`);
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};