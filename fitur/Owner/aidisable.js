const cmd = "aionchat";
const args = ``;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec} = func

    
    if(isOwner){
        if(sock.aidisable){
            sock.aidisable = false;
            nyarios("auto ai di dalam chat di matikan")
        } 
        else{
            sock.aidisable = true;
            nyarios("auto ai di dalam chat di aktikan")
        }
        
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};