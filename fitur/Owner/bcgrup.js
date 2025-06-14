const { default: axios } = require("axios");

const cmd = `bcgrup`; 
const args = `[text]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func

    if(isOwner){
        if(!isset(arg)) return nyarios(`masukan perintah`);


        const quoted = {...m.msg, ...m.quoted, ...(m.quoted ? m.quoted : m||m.msg)?.message?.documentMessage}||(m.quoted ? m.quoted : m||m.msg)
    	const mime = quoted.mimetype || ''
    	const isMedia = /image/.test(mime)

        m.message[m.mtype].caption = `*「 Broadcast 」*
${arg}
    
    
*「 Broadcast 」*`;
        

        let jumlahgrup = 0;
            let allgrup;
        	let isFromMysql = true;
			// try { allgrup = await (await getAll("SELECT `id`,`member` FROM `grup` WHERE 1",[])); }
			try { allgrup = await Object.values(await sock.groupFetchAllParticipating()); isFromMysql = false; }
			catch(e) { allgrup = Object.values(await sock.groupFetchAllParticipating()); isFromMysql = false; }
            for await(const v of allgrup){
                try {
                    const i = v.id;
                    const member = isFromMysql ? JSON.parse(v.member).map(v => v.split("@")[0]) : [sock.user.jid.split("@")[0]];
                    if((!isFromMysql)||member.includes(sock.user.jid.split("@")[0])){
                        console.log(v.id,true);
                        const text = `*「 Broadcast 」*
${arg}
    
    
*「 Broadcast 」*`
                        const tidur = Math.floor(Math.random()*10) * 1000;
                        console.log("tidur sebentar selama",tidur,"ms")
                        await sleep(tidur);
                        if(isMedia){
                            sock.relayMessage(i, m.message, {messageId: `BarqahXiexGantengINIVirtualBot${(new Date().getTime())}`}).catch(e => console.error(e));
                        }else{
                            sock.banner(i,{image: banner, text}).catch(e => console.error(e));
                            // sendMessage(i, { text : text.replace(/@everyone/g,`*@everyone*`)},{}).catch(e => console.error(e));
                        }
                        jumlahgrup++;
                    } else {
                        console.log(v.id,false);
                    }
                } catch (error) {
                    
                }

            }
        await nyarios(`selsai dengan *${jumlahgrup} Grup*`);
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};