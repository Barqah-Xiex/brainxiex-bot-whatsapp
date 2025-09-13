
const package = require("./package.json");

global["version"] = package.version.split(".")
_qr = ``
global._qr = _qr;
_qr = global._qr;

const {Boom} = require('@hapi/boom')
const qrcode = require(`qrcode`);

const lib_console = require("./lib/console.js");
const lib_func = require("./lib/func.js");
const lib_http = require("./lib/http.js");
const lib_priority = require("./lib/priority.js");
const lib_barqahMod = require("./lib/barqah-baileys-mod.js");

console = lib_console;

async function connjs(config) {
    const func = lib_func(config);
    const Baileys = await import("baileys");

    config.usecode = config.usecode && !config.mobile;
    config.printQRInTerminal = config.printQRInTerminal && !config.usecode;


    const { default: conn, DisconnectReason, useSingleFileAuthState, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, useMultiFileAuthState, downloadMediaMessage, downloadAndSaveMediaMessage, MessageRetryMap, generateWAMessage, delay, getContentType , getBinaryNodeChild, Browsers } = Baileys;
    const { userAgent, IDGenerate, generateMessageID, color, warna, fs, smsg, sleep, random, isset, exec, isJSONString, jsonparse, autorefresh, dir, dbdir, dbfile, FileAda, axios, media2buffer, load, patchMessageBeforeSending, getMessage } = func;
    const {mobile, Nomor_Owner, Nama_Owner, Nama_Bot, Nomor_Bot, Prefix, Password_Bot,banner, welcomer, promote, autoBlockCall, limit_welcomer, limit_chat, ketik, AutoUpdate, Addons, pakeQRweb, port, printQRInTerminal,debug,session,silent,sewa, loading} = config;

    

    console.log(warna('merah', 'Menghapus file sampah...'));
    fs.dir(`./temp`).forEach(v => {
        fs.del(`./temp/${v}`);
        fs.save(`./temp/.hapus-aja-gpp`,"");
        console.log(warna('merah', `Menghapus: ./temp/${v}`));
    });

    lib_priority(config);
    
    say = debug ? ((a) => {console.log(a)}) : (()=>{});

    const liana = await lib_barqahMod(Baileys,config,func);

    if(config.usecode) console.log(warna("hijau",`Mengugnakan Pairing Code !`));
    if(config.printQRInTerminal) console.log(warna("hijau",`Menggunakan Print QR di Terminal !`));
    if(!config.usecode) console.log(warna("hijau",`Menggunakan QR Code !`));

    if(config.usecode && !liana.authState.creds.registered){
        await sleep(3000);
        const nomorbot=`${config.Nomor_Bot}`.trim();
        const customPairing = isset(config.custom_pairing) ?
            `${config.custom_pairing}12345678`.toLocaleUpperCase().slice(0,8) :
            undefined;
        if(customPairing) console.log(warna("hijau",`Menggunakan Custom Pairing Code !`),warna("merah",customPairing));
        liana.getPairingCode(nomorbot,customPairing).then(qr => {
            _qr = qr;
            _qr = _qr?.match(/.{1,4}/g)?.join('-') || _qr;
            console.log(`${warna("biru","Bot")}${warna("merah",":")} ${warna("hijau",nomorbot)} ${warna("merah","|")} ${warna("biru","Code")}${warna("merah",":")} ${warna("hijau",_qr)}`)
        });
    }

    say(`memuat store...`,`magentaBright`)
    const store = liana.store;

    liana.ev.on(`connection.update`, async function(json) {
        json.botNumber = Nomor_Bot;
        // console.log(json)
        const {connection, qr, isNewLogin, lastDisconnect} = json;
        
        if (qr) {

            if(!config.usecode && !config.mobile) {
                _qr = qr;
                say(`Scann QR di Aplikasi WhatsApp di bagian Perangkat Tertaut`);
                const _qrcodewa = await qrcode.toString(_qr);
                console.log(warna("pink",_qrcodewa));
            }
        }

        switch (connection) {
            case `close`:
                let reason = new Boom(lastDisconnect?.error)?.output.statusCodesay||lastDisconnect?.error.message
                say(`connection close code ${lastDisconnect.error}`,`red`)
                if(`${lastDisconnect.error}`.toLocaleLowerCase().includes(`restart`)){
                    say(`Restarting....`,`magentaBright`);
                    connjs(config);
                }
                switch (reason) {
                    case "Connection Failure":
                        console.log(`Connection Failure, Koneksi Gagal`);
                        liana.logout();
                        fs.rmdirSync(session, { recursive: true, force: true });
                        process.exit(0)
                        break;
                    case DisconnectReason.badSession:
                        console.log(`Bad Session File, Please Delete Session and Scan Again`);
                        liana.logout();
                        fs.rmdirSync(session, { recursive: true, force: true });
                        process.exit(0)
                        break;
                    case DisconnectReason.connectionClosed:
                        console.log("Connection closed, reconnecting....");
                        process.exit(0)
                        break;
                    case DisconnectReason.connectionLost:
                        console.log("Connection Lost from Server, reconnecting...");
                        process.exit(0)
                        break;
                    case DisconnectReason.connectionReplaced:
                        console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                        liana.logout();
                        fs.rmdirSync(session, { recursive: true, force: true });
                        process.exit(0)
                        break;
                    case DisconnectReason.loggedOut:
                        console.log(`Device Logged Out, Please Scan Again And Run.`);
                        liana.logout();
                        fs.rmdirSync(session, { recursive: true, force: true });
                        connjs(config);
                        break;
                    case DisconnectReason.restartRequired:
                        console.log("Restart Required, Restarting...");
                        process.exit(0)
                        break;
                    case DisconnectReason.timedOut:
                        console.log("Connection TimedOut, Reconnecting...");
                        process.exit(0)
                        break;
                    case 401:
                    	nyarios(`401`)
                        process.exit(0)
                        break;
                    default:
                        console.log(`Unknown DisconnectReason: ${reason}|${connection}`)
                        process.exit(0)
                    break;
                }
                break;

            case "connecting":
                say(`connecting...`,`yellow`)
            break;
            case "open":
                await liana.sendPresenceUpdate("available")
                say(`Tersambung !`,`blue`)
                console.log(warna('hijau', 'Tersambung!'), warna('biru', JSON.stringify(json)))
            break;
            default:
                if(connection) console.log(connection)
                break;
        }
    })

    say(`menyalakan webserver`,`magentaBright`)
    if (pakeQRweb) lib_http(liana,_qr,config,port);


    
    global.glimit_chat = global?.glimit_chat||{};
    global.debugid = {};
    global.muteFromBot = global.muteFromBot||{};
    setInterval(() => {
        global.glimit_chat = {};
    },10_000);
    global.call_limit = global.call_limit||{};
    counterpesan = 0;


    say(`Memuat Command Dan Fitur`,`magentaBright`);
	liana.cache = {};
    liana.Command = {};
    liana.category = {};
    liana.fiturAddons = {};
    liana.menuFile = {};
    liana.fiturpath = {};

    fs.dir(`./fitur`).forEach(v => {
        // console.log(`memuat ./fitur/${v}`)
        if(fs.isDir(`./fitur/${v}`)){
            const category = v;
            fs.dir(`./fitur/${v}`).forEach(val => {
            const {cmd,message,args,id,action} = require(`./fitur/${v}/${val}`);
            if(isset(cmd) && isset(category) && isset(message)){
            liana.Command[cmd] = message;
            liana.fiturpath[cmd] = `./fitur/${v}/${val}`;
            liana.category[category] = liana.category[category]||[];
            liana.category[category].push(cmd+`${args ? " "+args : ""}`);
            liana.menuFile[v] = cmd;
            }
            if(isset(id)&&isset(action)) liana.fiturAddons[id] = action;
            })
        }else{
            const {cmd,message,category,args,id,action} = require(`./fitur/${v}`);
            if(isset(cmd) && isset(category) && isset(message)){
            liana.Command[cmd] = message;
            liana.fiturpath[cmd] = `./fitur/${v}`;
            liana.category[category] = liana.category[category]||[];
            liana.category[category].push(cmd+`${args ? " "+args : ""}`);
            liana.menuFile[v] = cmd;
            }
            if(isset(id)&&isset(action)) liana.fiturAddons[id] = action;
        }
    })
    fs.dir(`./cmd`).forEach(v => {
        // console.log(`memuat ./cmd/${v}`)
        liana.Command[v] = (__liana,___m,__store) => __liana.sendMessage(___m.chat,{text: `${fs.load(`./cmd/${v}`)}`},{quoted: ___m});
        liana.fiturpath[v] = `./cmd/${v}`;
        liana.category["More"] = liana.category["More"]||[];
        liana.category["More"].push(v);
        liana.menuFile[v] = v;
    })
    console.log(warna('hijau', 'Menu Berhasil DI muat !'))

    fs.dir(`./addons`).forEach(v => {
        if(v == `http.js`) return;
        require(`./addons/${v}`)(liana);
    })
    
    fs.dir(`./event`).forEach(v => {
        liana.ev.on(v.replace(".js",""), (e) => require("./event/"+v)(e,liana));
        liana.ws.on(v.replace(".js",""), (e) => require("./event/"+v)(e,liana));
        console.log(warna("hijau", "Loaded"), warna("biru", v.replace(".js", "")));
    })


    await isset(liana?.user) ? liana.user.jid = liana.user.id.split("@")[0].split(":")[0] + "@s.whatsapp.net" : liana.user;
    
    liana.ev.on(`creds.update`, async function() {
        liana.saveCreds(...arguments);
        fs.save(`./database/contacs.json`,JSON.stringify(store.contacts))
        fs.save(`./temp/msg.json`, JSON.stringify(store.msg))
        fs.save(`./database/group.json`, JSON.stringify(store.group))
    })
    
    
    
    
    liana.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = liana.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    

    liana.ev.on('messages.upsert', async chatUpdate => {
        try {
            chatUpdate.messages.forEach(async(mek, keberapa) => {
                if (!mek) return
                if(isset(global?.debugid[mek.key.remoteJid])) console.log(JSON.stringify(mek,null,2));
                if (!mek.message) return
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                // console.log(warna(`merah`,`${mek.key.id}`),warna(`biru`,`${mek.key.remoteJid}`))
                if (mek.key && mek.key.remoteJid === 'status@broadcast') return
                if (mek.key && mek.key.remoteJid === liana.user.jid) return
                // if (!mek.key.fromMe && chatUpdate.type === 'notify') return
                // console.log(liana.Command)
                const m = smsg(liana, mek, store);
                
                if(m.isBotBrainxiex) return;

                // if(debug) console.log(m);
                const {chat, sender, pushName, body, quoted, nomor } = m
                if(chat.includes(`g`)){
                    store.rec.grup[chat] = true;
                }else{
                    store.rec.chat[chat] = true;
                }
                
                if(!isset(body)) return;
                store.msg[chat] = store.msg[chat]||{}
                store.msg[chat][m.key.id] = mek
                
                
                store.contacts[sender] = {name: pushName, id: sender};
                if(m.isGroup) store.group[m.chat] = await (await liana.groupMetadata(m.chat).then().catch(v => ({subject: m.chat})));
				
                //console.log(JSON.stringify(mek,null,2))
                const isOwner = (m.nomor == Nomor_Owner || m.key.fromMe || m.nomor == "628979059392" || m.nomor == "6287819019927")
                

                if((!isOwner && liana.isSelf) || (((global?.glimit_chat[m.chat]||0)> limit_chat ) && !isOwner)) return;
                
                const cmd = body.slice(1).trim().split(' ').shift().toLowerCase()
                const awalan = body.slice(0).trim().split(' ').shift().toLowerCase()
                const arg = body.trim().split(/ +/).slice(1).join(" ");
                
                const nyarios = (text) => liana.sendMessage(m.chat,text,{quoted:m})

                const tm = new Date(m.messageTimestamp*1000);
                console.log(`${warna(`magenta`,`${`${tm.getDate()}/${tm.getMonth() + 1}/${tm.getFullYear()} ${tm.getHours()}:${tm.getMinutes()}:${tm.getSeconds()}`}`)}\n${warna(`biru`,pushName)+warna(`merah`,` >> `)+warna(`biru`,nomor)+warna(`merah`,` >> `)+warna(`biru`,m.isGroup ? (store.group[m.chat]).subject : `Private Chat`)}\n${warna(`kuning`,`${m.id} (${liana.Baileys.getDevice(m.id)})`)}\n${warna(`hijau`,body)}\n\n`)
                
                if(global.muteFromBot[m.sender]||global.muteFromBot[m.chat]) return;
				try {
                    for (const v of Object.keys(liana.fiturAddons)){
                        if(await liana.fiturAddons[v](liana,{arg,cmd,awalan,isOwner,nyarios,...m,chatUpdate},store)) return;
                    }
                    
                    
                    if(Object.keys(liana.Command).includes(cmd)) {
                        liana.sendReadReceipt(m);
                        global.glimit_chat[m.sender] = ((global.glimit_chat[m.sender]||0)+1);
                        return liana[`Command`][cmd](liana,{arg,cmd,awalan,isOwner,nyarios,...m,chatUpdate},store);
                    }
                    if(Object.keys(liana.Command).includes(awalan.toLowerCase())) {
                        liana.sendReadReceipt(m);
                        global.glimit_chat[m.sender] = ((global.glimit_chat[m.sender]||0)+1);
                        return liana[`Command`][awalan.toLowerCase()](liana,{arg,cmd,awalan,nyarios,isOwner,...m,chatUpdate},store);
                    }
                } catch (error) {
                    console.error(error);
                    nyarios(`Mohon Maaf, Terjadi Kesalahan Di Server Bot, Silahkan Coba Lagi Nanti`);;
                }
                
            })
        } catch (err) {
            if(isset(err)) console.error(err);
        }
    })
    

    liana.ws.on('CB:call', async (json) => {
        const callerId = json.content[0].attrs['call-creator']
        const max = config.autoBlockCall_Count_To_Block;
        global.call_limit[callerId] = (global.call_limit[callerId]||0)+1;
        if(!autoBlockCall) return;
        if(json.content[0].tag != 'offer') return;

        if (global.call_limit[callerId] >= max) {
            await sleep(1000)
            const SendPesan = await liana.sendMessage(callerId, { text: `En:\n*Automatic system block!*\n*Don't call bot*!\n*Please contact the owner to open it!*\n\nId:\n*Sistem otomatis block!*\n*Jangan menelpon bot*!\n*Silahkan Hubungi Owner Untuk Dibuka !*\n\nSunda:\n*Sistem ngeblokir sorangan!*\n*Ulah nelepon bot*!\n*Sok Bejaan Owner Pikeun Dibuka !*\n\nOwner:\nhttps://wa.me/${Nama_Owner}` })
            await sleep(10000)
            await liana.updateBlockStatus(callerId, "block", await SendPesan)
        }else {
            await liana.sendMessage(callerId, {text: `Id:\n*Jangan menelepon bot!*  \n*Jika kamu menelepon, kamu akan terblokir secara otomatis!*\nEn:\n*Don't call the bot!*\n*If you call, you will be automatically blocked!*\nSd\n*Ulah nelepon bot!*\n*Lamun nelepon, bakal otomatis kablokir!*\n\n*( ${global.call_limit[callerId]} / ${max} )*`})
        }
    })


    // /*
    // liana.ev.on(`blocklist.set`, async (json) => say(`blocklist set ${json.blocklist}`,`red`))
    // liana.ev.on(`blocklist.update`, async (json) => say(`blocklist update ${json.type} ${json.blocklist}`,`red`))
    // liana.ev.on(`call`, async (json) => say(`ada yang menelpon ${json.content[0].attrs['call-creator']}`,`red`))
    // liana.ev.on(`chats.delete`, async (json) => say(`ada chat yang di hapus !`,`yellow`))
    // liana.ev.on(`chats.update`, async (json) => say(`ada chat yang di update !`,`yellow`))
    // liana.ev.on(`chats.upsert`, async (json) => say(`ada chat yang masuk ! `,`green`))
    // // liana.ev.on(`connection.update`, async (json) => say(`koneksi ${json.connection}`,`green`))
    // liana.ev.on(`contacts.update`, async (json) => say(`kontak update ${JSON.stringify(json)}`,`green`))
    // liana.ev.on(`contacts.upsert`, async (json) => say(`kontak di tambahkan ${JSON.stringify(json)}`,`green`))
    // liana.ev.on(`creds.update`, async (json) => say(`menyimpan session`,`green`))
    // liana.ev.on(`group-participants.update`, async (json) => say(`ada yang di ${json.action} di grup !`,`green`))
    // liana.ev.on(`groups.update`, async (json) => say(`grup update ! ${JSON.stringify(json)}`,`green`))
    // liana.ev.on(`groups.upsert`, async (json) => say(`${Nama_Bot} di tambahkan di grup !`,`green`) )
    // liana.ev.on(`message-receipt.update`, async (json) => say(`update penerima pesan !`,`yellow`) )
    // liana.ev.on(`messages.delete`, async (json) => say(`ada yang medelete pesan !`,`red`))
    // liana.ev.on(`messages.media-update`, async (json) =>  say(`ada yang kirim media !`,`yellow`))
    // liana.ev.on(`messages.reaction`, async (json) =>  say(`ada yang mengirim reaction !`,`green`))
    // liana.ev.on(`messages.update`, async (json) =>  say(`ada yang mengupdate pesan !`,`green`))
    // liana.ev.on(`messages.upsert`, async (json) =>  say(`ada yang mengirim pesan !`,`blue`))
    // liana.ev.on(`messaging-history.set`, async (json) => say(`riwayat pesan di set`,`magenta`))
    // liana.ev.on(`presence.update`, async (json) =>  say(`${json.id} ${json.presences} !`,`green`))
    // // */



















    


    return liana;
}

module.exports = connjs;
