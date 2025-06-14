const { default: axios } = require("axios");

const cmd = `shop`; 
const args = ``;
const category = `Shop`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    const tanaman = await rpg.item.Sayuran();

    const {Bot_WA_Inventory_Max,Bot_WA_Kebun_Max} = await player(m.sender);


    const text = `======> *Shop* <======

✧ ✧ ✧ Umpan Mancing ✧ ✧ ✧
> Harga: 1/1bx
> Untuk Memancing Ikan
\`${Prefix}buyumpan [nominal]\`


${Object.keys(tanaman).map(v=>`✧ ✧ ✧ Bibit ${v} ✧ ✧ ✧
> Harga: 1/${tanaman[v]/2}bx
> Waktu Tumbuh: ${tanaman[v]} Menit
> Harga Jual: ${tanaman[v]}bx
\`${Prefix}buybibit ${v}\``).join("\n\n")}


======> *Sell* <======

✧ ✧ ✧ Sell All Item ✧ ✧ ✧
> Harga: tergantung
> Menjual semua barang di inventory
\`${Prefix}sellinv\`

`
    return nyarios(text);
    // return nyarios(text);

    // let msg = sock.Baileys.generateWAMessageFromContent(id, {
    //     viewOnceMessage: {
    //         message: {
    //             messageContextInfo: {
    //                 deviceListMetadata: {},
    //                 deviceListMetadataVersion: 2,
    //             },
    //             interactiveMessage: sock.Baileys.proto.Message.InteractiveMessage.create({
    //                 header: sock.Baileys.proto.Message.InteractiveMessage.Header.create({
    //                     title: "TOKO",
    //                     subtitle: '',
    //                     hasMediaAttachment: false
    //                 }),
    //                 body: sock.Baileys.proto.Message.InteractiveMessage.Body.create({
    //                     text: ``
    //                 }),
    //                 footer: sock.Baileys.proto.Message.InteractiveMessage.Footer.create({
    //                     text: 'powered By Brainxiex'
    //                 }),
    //                 nativeFlowMessage: sock.Baileys.proto.Message.InteractiveMessage.NativeFlowMessage.create({
    //                     buttons: [
    //                         {
    //                             "name": "single_select",
    //                             "buttonParamsJson": JSON.stringify({
    //                                 title: "Beli Umpan",
    //                                 sections: [
    //                                     {
    //                                         title: "Rekomendasi 100 Umpan",
    //                                         highlight_label: "rekomendasi",
    //                                         rows: [100,1,10,100,1000,10000,100000,10000000].map(v => ({header: `${v} Umpan`,title: `Harga ${v} bx`,description: `sekali mancing 1 umpan`,id:`buyumpan ${v}`}))
    //                                     }
    //                                 ] 
    //                             })
    //                         },
    //                         {
    //                             "name": "single_select",
    //                             "buttonParamsJson": JSON.stringify({
    //                                 title: "Beli Bibit",
    //                                 sections: [
    //                                     {
    //                                         title: "Silahkan Pilih Sesuai Kebutuhan",
    //                                         highlight_label: "rekomendasi",
    //                                         rows: Object.keys(tanaman).map(v => ({header: `Bibit ${v}`,title: `Harga ${tanaman[v]/2} bx`,description: `waktu tumbuh: ${tanaman[v]/2} menit\nharga jual: ${tanaman[v]/2} bx`,id:`buybibit ${v}`}))
    //                                     }
    //                                 ] 
    //                             })
    //                         },
    //                         {
    //                             "name": "single_select",
    //                             "buttonParamsJson": JSON.stringify({
    //                                 title: "Upgrade",
    //                                 sections: [
    //                                     {
    //                                         title: "Silahkan Pilih Sesuai Kebutuhan",
    //                                         highlight_label: "rekomendasi",
    //                                         rows: [
    //                                             {
    //                                                 header: `Perbesar Tas`,
    //                                                 title: `Harga ${(Bot_WA_Inventory_Max+1)*1000} bx`,
    //                                                 description: `Menambah Kapasitas tasmu menjadi ${(Bot_WA_Inventory_Max+1)} slot`,
    //                                                 id:`upgradetas`
    //                                             },
    //                                             {
    //                                                 header: `Perluas Kebun`,
    //                                                 title: `Harga ${(Bot_WA_Kebun_Max+1)*10000} bx`,
    //                                                 description: `Menambah Kapasitas tasmu menjadi ${(Bot_WA_Kebun_Max+1)} tanaman`,
    //                                                 id:`upgradekebun`
    //                                             },
    //                                         ]
    //                                     }
    //                                 ] 
    //                             })
    //                         },
    //                     ],
    //                 }),
    //             }),
    //         }
    //     }
    // }, {})
    // sock.relayMessage(msg.key.remoteJid, msg.message, { messageId: `BarqahXiexGantengINIVirtualBot${(new Date().getTime())}`}, {quoted: m});


}
module.exports = {cmd,args,category,message};