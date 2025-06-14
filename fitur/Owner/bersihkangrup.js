const { default: axios } = require("axios");

const cmd = `bersihkangrup`; 
const args = `[minimal member]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func

    if(isOwner){
        if(!isset(arg)) return nyarios(`masukan minimal member`);
        let jumlahgrup = 0;
        const allgrup = Object.values(await sock.groupFetchAllParticipating());
        for await (const {participants, id, subject} of allgrup) {
            if(participants.length > Number(arg)) continue;
            try{
                sock.sendMessage(id,{text: `Owner Sedang Membersihkan Grup Dengan Minimal Member ${arg}`},{}).then(mes => {
                    sock.groupLeave(id).then(v => {
                        sock.chatModify({
                            delete: true,
                            lastMessages: [{ key: mes.key, messageTimestamp: mes.messageTimestamp }]
                        }, mes.key.remoteJid);
                    })
                })
            }catch(e){
                console.log(id, e)
            }
            jumlahgrup++;
            console.log("Delete",subject,{jumlahgrup})
        }
        await nyarios(`selsai dengan *${jumlahgrup} Grup*`);
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};