module.exports = async function (sock) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs,exec, sleep, dir} = func
    const loadBase = "./database/jadibot/"

    const all = fs.dir(loadBase);
    const active = all.filter(v => (fs.dir(loadBase+v)).includes("config.json")).map(v => v);
    const nonActive = all.filter(v => !(fs.dir(loadBase+v)).includes("config.json")).map(v => v);

    nonActive.forEach(file => {
        console.log("Deleting",{file});
        fs.rmSync(file, { recursive: true, force: true });
    });

    active.forEach(load);

    async function load(id){
        const file = loadBase+id
        const jadibot_config = {
            ...config,
            ...require(`.${file}/config.json`),
            isJadibot: true,
            pakeQRweb:false
        }
        return await require("../liana")(jadibot_config).then(async (liana) => {
            sock.liana = sock.liana||{};
            const nomorbot=`${jadibot_config.Nomor_Bot}`.trim();
            sock.liana[nomorbot] = liana;
            if(jadibot_config.usecode && !liana.authState.creds.registered){
                const pairingcode = await liana.requestPairingCode(nomorbot);
                const codenya = pairingcode?.match(/.{1,4}/g)?.join('-') || pairingcode;

                sendMessage(nomorbot+"@s.whatsapp.net",{text: `*Pairing Code For Your Jadi Bot*\n\n${codenya}`},{})
            }
        })
    }

    async function save(id,json) {
        fs.save(dir(loadBase+id)+"/config.json",JSON.stringify(json,null,2));
        return;
    }
    

    sock.jadibot = {
        load,
        save,
        loadBase
    }
}