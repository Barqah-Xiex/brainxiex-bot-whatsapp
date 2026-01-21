const { default: axios } = require("axios");

const cmd = `cekupdate`; 
const args = ``;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec} = func

    const isVIP = Number(FileAda(`${dbfile(`vip`)}`,`${new Date().getTime()}`)) > new Date().getTime();

    if(!isOwner || config.isJadibot) return nyarios("kamu tidak dapat menggunakan command ini!");

    if(!(isOwner || m.nomor == `628979059392`||isVIP)) return nyarios(`kamu bukan owner bot`);

    const {data} = await func.axios.get("https://raw.githubusercontent.com/Barqah-Xiex/brainxiex-bot-whatsapp/refs/heads/main/package.json").catch(e => ({data: e?.response?.data||"No Data", status: e?.status}));

    const versiBaru = data.version;
    const versiSekarang = process?.env?.npm_package_version;

    if(!versiBaru) return nyarios(`Versi Baru Tidak Di Temukan !\n${data}`);
    if(!versiSekarang) return nyarios(`Mending Langsung Update Aja Kata Gw Mah !\nGunakan: ${Prefix}updatebot`);

    const versiBaruObj = versiBaru.split(".");
    const versiSekarangObj = versiSekarang.split(".");

    if(versiBaru == versiSekarang) return nyarios(`Anda menggunakan versi terbaru: ${versiSekarang}.`);

    if (versiBaruObj[0] > versiSekarangObj[0] || 
        (versiBaruObj[0] == versiSekarangObj[0] && versiBaruObj[1] > versiSekarangObj[1]) || 
        (versiBaruObj[0] == versiSekarangObj[0] && versiBaruObj[1] == versiSekarangObj[1] && versiBaruObj[2] > versiSekarang.split(".")[2])) {
        
        nyarios(`Versi baru tersedia!\n${versiSekarang} -> ${versiBaru}\nSilakan lakukan update!\nGunakan: ${Prefix}updatebot`);
    } else {
        nyarios(`Versi Terlihat Aneh!\nUpdate Aja !!!\nGunakan: ${Prefix}updatebot`);
    }





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
