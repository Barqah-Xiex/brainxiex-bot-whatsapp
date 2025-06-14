const cmd = `inventory`;
const args = ``;
const category = `Information`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func
    
    const Akun = await player(m.sender);
    const inventory = JSON.parse(Akun.Bot_WA_Inventory)||[];

    const json = { inventory };

    const text = `${Object.keys(json).map(v => `*₊⁺${v}⁺₊*\n${json[v].map(v => `✧${Prefix}${v}`).join(`\n`)}`).join(`\n\n`)}`;

     
    await nyarios(text);

}
module.exports = {cmd,args,category,message};