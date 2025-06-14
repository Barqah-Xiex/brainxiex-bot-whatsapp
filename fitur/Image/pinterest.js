const { default: axios } = require("axios");
const { argv } = require("yargs");

const cmd = `pinterest`; 
const args = `[search]`;
const category = `Image`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    const isVIP = Number(FileAda(`${dbfile(`vip`)}`,`${new Date().getTime()}`)) > new Date().getTime();
    
    if(!isVIP) return nyarios(`Kamu bukan VIP !`);
    if(isset(arg)){
        const search = `${arg}`;
        const {data: {Barqah:{image}}} = await sock.sendRequest(m).post(`${baseURL}/api/search/pinterest`,{apikey,search});
        sock.sendMessage(id,{image: {url: image[Math.floor(Math.random()*image.length)]}, caption: `*ulangi untuk mencari result lain`}, {quoted: m})
    }else{
        sendMessage(id, {text: `masukan linknya`},{quoted:m})
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