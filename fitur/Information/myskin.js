module.exports.cmd = `myskin`;
module.exports.args = ``;
module.exports.category = `Information`;
module.exports.message = async (sock, m, store) => {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll},player} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func;

    // const axios = sock.sendRequest(m);
    sock.sendMessage(m.chat,{react: {
        text: "⏳",
        key: m.key
    }});

    const Akun = await player(m.sender);

    if(!isset(Akun.pName)) return nyarios("kamu belum terdaftar di server samp")

    const skinID = Akun.pSkin||137;
    
    sock.sendMessage(id, {
        image: {
            url: `https://xiex.my.id/api/image/banner?apikey=APIKEY&text=${Akun.pName}&ppimg=${encodeURIComponent(`https://assets.open.mp/assets/images/skins/${skinID}.png`)}&ppimg_h=400`
        },
    },{
        quoted: m
    })

}