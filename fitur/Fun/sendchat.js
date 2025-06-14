const { default: axios } = require("axios");

const cmd = `sendchat`; 
const args = `[nomor] | [pesan]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, number2string} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func
    
    if(!isset(arg)) return nyarios(`gunakan *${Prefix}${cmd} nomor|pesan*\n\ncontoh:\n${Prefix}${cmd} 628979059392|Hallo bang`);
    const [nomor] = arg.split("|");
    const pesan = `${arg}`.replace(nomor+"|",``).startsWith(" ")?arg.replace(nomor+"| ",``):arg.replace(nomor+"|",``);
    const toid = FileAda(number2string(Number(`${nomor.replace(/[^\d]/g,``)}`)),`${nomor.replace(/[^\d]/g,``)}`).replace(/[^\d]/g,``);
    const [r] = await sock.onWhatsApp(toid);
    const {exists,jid} = r||{};

    if(!(exists)) return nyarios(`nomor itu tidak ada di whatsapp`);
    fs.save(dbdir("id")+number2string(Number(`${nomor.replace(/[^\d]/g,``)}`)),`${m.sender}`);
    const sendchat = await sock.banner(jid,{text: `*[Anonym Message]*
➤ ID: *${number2string(Number(`${m.nomor}`))}*
➤ Cara jawab:
${Prefix}${cmd} ${number2string(Number(`${m.nomor}`))} | Pesannya di sini !!!

➤ Isi Pesan:
${pesan}
`},{});
    await nyarios(`sudah terkirim ke @${jid.split("@")[0]}`)





function dbdir(a) {return dir("./database/" + a + "/")}
function dbfile(a) {return dbdir(a) + m.sender}
function dir(nama) {
    if (!fs.existsSync(nama)) {
        fs.mkdirSync(nama);
    }
    return nama
}
function FileAda(a,b){
    if(fs.existsSync(a)){
        return `${fs.load(a)}`
    }else{
        return b
    }
}
}
module.exports = {cmd,args,category,message};