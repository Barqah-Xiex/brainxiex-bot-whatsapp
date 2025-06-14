const cmd = `eval`
const args = `[javascript syntax]`
const category = `Owner`
async function message (sock, m, store){
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,warna} = func
    if(!isOwner || config.isJadibot) return nyarios("kamu tidak dapat menggunakan command ini!");
    try{
        if(m.isOwner && (!config.publicbot || m.nomor == 628979059392)){
            try {
                nyarios(`${require(`util`).format(await eval(m.arg))}`);
            }catch(e){
                nyarios(`Error: ${e}`);
            }
        }else{
            sock.sendMessage(m.chat,{text: `*[ Failed ]* kamu bukan Pemilik Bot ini`},{quoted: m});
        }
    }catch(e){
        console.error(e)
    }
}
module.exports = {cmd,message,args,category}