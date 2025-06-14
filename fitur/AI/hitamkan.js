const { default: axios } = require("axios");

const cmd = `hitamkan`; 
const args = ``;
const category = `ai`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec} = func;

    const quoted = m.quoted ? m.quoted : m || m.msg
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)

	if(!isMedia) return nyarios(`tidak ada media`)


    const mek = m.quoted || m.msg;
    const pem = await nyarios("Sedang Medownload dari Server WhatsApp");
    const filePath = await sock.downloadAndSaveMediaMessage(quoted);
    const fileName = filePath.split(`/temp/`)[1];
    const fileData = fs.readFileSync(filePath);
    await sock.editMessage(pem, "Berhasil di download !!!");
    await sock.editMessage(pem, "Menjadikan Link ...");
    const filelink = await sock.tolink(fileData,fileName);
    await sock.editMessage(pem, `Sudah Linknya *${filelink}*. membuat ...`);
    const {data} = await sock.sendRequest(m).post(`${baseURL}/api/ai/hitamkan`,{apikey, link:filelink});
    await sock.editMessage(pem, `Sudah !!`);
    // const result = {url: data.result.images[0]}
    // console.log(data.result)
    (data.result.images||[]).forEach(url => {
        try {
            sendMessage(id,{image: {url}},{quoted: m})
        } catch (error) {
            console.error(e);
        }
    });
    

}
module.exports = {cmd,args,category,message};
