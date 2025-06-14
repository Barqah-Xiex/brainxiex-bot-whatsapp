const { default: axios } = require("axios");

const cmd = `pekerjaan`; 
const args = `[pekerjaan]`;
const category = `RPG`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    const Akun = await player(m.sender);

    const arrpekerjaan = [
        10, // petani
        11, // miner
        15, // pemetik
        17, // nelayan
        72, // supir taxi
        73, // ojek
        74, // penyihir
    ]


    const listpekerjaan = `*Pekerjaan*\n\n${arrpekerjaan.map((v,i) => `${i+1}. ${jobName(v)}`).join("\n")}\n\ngunakan: ${Prefix}${cmd} [perkerjaan]\ncontoh: ${Prefix}${cmd} Petani`
    let msg = sock.Baileys.generateWAMessageFromContent(id, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: sock.Baileys.proto.Message.InteractiveMessage.create({
                    header: sock.Baileys.proto.Message.InteractiveMessage.Header.create({
                        title: "Pekerjaan",
                        subtitle: '',
                        hasMediaAttachment: false
                    }),
                    body: sock.Baileys.proto.Message.InteractiveMessage.Body.create({
                        text: `${arrpekerjaan.map((v,i) => `${i+1}. ${jobName(v)}`).join("\n")}`
                    }),
                    footer: sock.Baileys.proto.Message.InteractiveMessage.Footer.create({
                        text: 'powered By Brainxiex'
                    }),
                    nativeFlowMessage: sock.Baileys.proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify({
                                    title: "Pilih Pekerjaan",
                                    sections: [
                                        {
                                            title: "Pilih pekerjaan yang mau di coba",
                                            highlight_label: "pilih pekerjaan",
                                            rows: arrpekerjaan.map(v => ({header: `${jobName(v)}`,title: `Menjadi Seorang ${jobName(v)}`,description: `biaya 100bx`,id:`${Prefix}${cmd} ${jobName(v)}`}))
                                        }
                                    ] 
                                })
                            },
                        ],
                    }),
                }),
            }
        }
    }, {})

    
    // if(!isset(arg)) return await sock.relayMessage(msg.key.remoteJid, msg.message, { messageId: `BarqahXiexGantengINIVirtualBot${(new Date().getTime())}`}, {quoted: m});;
    // if(jobID(arg) == -1) return await sock.relayMessage(msg.key.remoteJid, msg.message, { messageId: `BarqahXiexGantengINIVirtualBot${(new Date().getTime())}`}, {quoted: m});;
    if(!isset(arg)) return await nyarios(listpekerjaan);
    if(jobID(arg) == -1) return await nyarios(`INPUT SALAH !\n\n`+listpekerjaan);

    const harga = 100;

    if(Akun.pCash < harga) return nyarios("uang kamu kurang dari "+harga+"bx");

    Akun.add("pCash",-harga);
    const k = await Akun.put("pJob",jobID(arg));
	const pem = await nyarios(require("util").format(k));
    await sock.editMessage(pem, `Sukses Mendaftar Pekerjaan\n\nPekerjaanmu Sekarang *${jobName(jobID(arg))}*\nPekerjaanmu Sebelumnya *${jobName(Akun.pJob)}*\n\n-${harga}bx`)
}
module.exports = {cmd,args,category,message};