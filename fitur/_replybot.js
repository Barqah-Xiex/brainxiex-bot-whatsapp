const { default: axios } = require("axios");
const id = `replybot`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs} = func

    if(id == `120363028501443334@g.us`){
        axios.get(`${baseURL}:5500/send?text=${encodeURIComponent(`§a(( ${m.pushName} )) ${m.nomor}\n§e${body}`)}`).catch(e => {})
    }
    
    
    if(body.toLocaleLowerCase().includes("bot")) {
        const buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({ "display_text": "📃 Menu", "id": "menu" })
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({ "display_text": "👤 Owner", "id": "owner" })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🖥️ Official Website",
                    url: "https://xiex.my.id",
                    merchant_url: "https://xiex.my.id"
                })
            }
        ];
        sock.sendInteractiveMessage(id, `Iya gua bot ada yang bisa gua bantu ?`, 'powered By Brainxiex', Nama_Bot, '', null, sock.InteractiveButton(buttons), m);
    }
}
module.exports = {id,action};