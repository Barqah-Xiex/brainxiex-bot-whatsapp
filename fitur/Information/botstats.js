const { default: axios } = require("axios");

const cmd = `botstats`; 
const args = ``;
const category = ``;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func
	
    let totalgrup = 0
    
    const allgrup = await (await getAll("SELECT `id`,`member` FROM `grup` WHERE 1",[]));
    const totaluser = (await (await getAll("SELECT * FROM `accounts` WHERE 1",[]))).length;


    for await(const v of allgrup){
    	const {subject,participants,desc} = await sock.groupMetadata(v.id,true).catch(v => ({subject: v.id, participants: [{id: ""}]}))
        const member = participants.map(({id}) => id);
        await sleep(participants.length*100);
        console.log(participants.length*100, v.id)
        if(member.includes(sock.user.jid)) totalgrup++;
        console.log(totalgrup)
	}
    
    nyarios(`Total User: *${totaluser} User*
Total User: *${totalgrup} Grup*`)
}
module.exports = {cmd,args,category,message};