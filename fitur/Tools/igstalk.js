const axios = require("axios");


const cmd = `igstalk`; 
const args = `[username]`;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner,nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset, fs,sleep} = func
    
    if(!isset(arg)) return nyarios(`apa yang mau dicari`);
    try{
        const {data:{Barqah:{name,username,description,postsH,posts,followersH,followers,followingH,following,profilePic}}} = await sock.sendRequest(m).post(`${baseURL}/api/tools/igstalk`,{apikey,username:arg});
    	await sendMessage(id,{image: {url:profilePic},caption:`[Instagram Stalk]\nNama: ${name}\nUsername: ${username}\nPost: ${posts} post\nFollowers: ${followers}\nFollowing: ${following}\nBio:\n${description}`},{quoted: m});
    }catch(e){
        nyarios("User Tidak Di Temukan")
    }
    
}
module.exports = {cmd,args,category,message};