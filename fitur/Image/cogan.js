const { default: axios } = require("axios");
const { argv } = require("yargs");

const cmd = `cogan`; 
const args = ``;
const category = `Image`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    // const isVIP = Number(FileAda(`${dbfile(`vip`)}`,`${new Date().getTime()}`)) > new Date().getTime();
    
    // if(!isVIP) return nyarios(`Kamu bukan VIP !`)
    const value = ["Cowok Ganteng", "Cowok Ganteng", "Cowok Chindo","Cowok Cakep","Cowok Ganteng Putih", "Cowok Ganteng Chindo", "Cowok Ganteng China", "Korean Boy", "Korean Boy Handsome"];
    const search = `${value[Math.floor(Math.random()*value.length)]}`;
    const {data: {Barqah:{image}}} = await sock.sendRequest(m).post(`${baseURL}/api/search/pinterest`,{apikey,search});
    sock.sendMessage(id,{image: {url: image[Math.floor(Math.random()*image.length)]}, caption: `*ulangi untuk mencari result lain`}, {quoted: m});
    

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