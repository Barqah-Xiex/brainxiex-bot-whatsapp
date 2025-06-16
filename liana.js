
const package = require("./package.json");
global["version"] = package.version.split(".")
_qr = ``
const File_System = require(`fs`);
const os = require("os");
const Baileys = require(`bx-baileys`);
const {
    default: conn,
    DisconnectReason,
    useSingleFileAuthState,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    // generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto,
    useMultiFileAuthState,
    downloadMediaMessage,
    downloadAndSaveMediaMessage,
    MessageRetryMap,
    generateWAMessage,
    delay,
    getContentType ,
    getBinaryNodeChild,
    Browsers
} = Baileys

const { randomBytes, createHash } = require('crypto')

function func(key) {
    return func[key];
}

func.userAgent = function ({Nama_Bot = "UNKNOWN BOT",Nomor_Bot = NaN,Nama_Owner = "UNKNOWN",Nomor_Owner=NaN}) {
    const platform = os.platform();      // 'linux', 'darwin', 'win32'
    const arch = os.arch();              // 'x64', 'arm64', dll
    const release = os.release();        // versi OS, misal '5.15.0-84-generic'
    const cpu = os.cpus()[0].model;      // model CPU pertama
    return `${func.IDGenerate()[0]}/${((Array.isArray(global.version) ? global.version.join(".") : global.version)||0)} (${platform}; ${arch}; ${release}; ${cpu})`;
}

func.IDGenerate = (userId) => {
    let e = "";
	const data = Buffer.alloc(8 + 20 + 16)
	data.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 1000)));


    const m = 0x1958ab96;
    const a = 0x37c8e5e;
    e += m.toString()
    e += 'e'
    e += a.toString()
    const mData = Buffer.from(e,"hex");

	if(userId) {
		const id = jidDecode(userId)
        console.log({id})
		if(id?.user) {
			data.write(id.user, 8)
			data.write('@c.us', 8 + id.user.length)
		}
	}

	const random = randomBytes(16)
	random.copy(data, 28)

	const hash = createHash('sha256').update(data).digest();
	return [mData.toString("utf-8"), hash.toString('hex').toUpperCase()]
}

func.generateMessageID = (userId) => {
	return func.IDGenerate(userId).join("").substring(0, 20)
}

func.userAgent = function ({Nama_Bot = "UNKNOWN BOT",Nomor_Bot = NaN,Nama_Owner = "UNKNOWN",Nomor_Owner=NaN}) {
    const platform = os.platform();      // 'linux', 'darwin', 'win32'
    const arch = os.arch();              // 'x64', 'arm64', dll
    const release = os.release();        // versi OS, misal '5.15.0-84-generic'
    const cpu = os.cpus()[0].model;      // model CPU pertama
    return `${func.IDGenerate(Nomor_Bot.toString()+"@s.whatsapp.net")[0]}/${((Array.isArray(global.version) ? global.version.join(".") : global.version)||0)} (${platform}; ${arch}; ${release}; ${cpu})`;
}

func["color"] = {
  // Kode Warna Teks
  reset: "\x1b[0m",
  putih: "\x1b[37m",
  hitam: "\x1b[30m",
  merah: "\x1b[31m",
  hijau: "\x1b[32m",
  kuning: "\x1b[33m",
  biru: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  ungu: "\x1b[35m",
  oranye: "\x1b[33m",
  pink: "\x1b[95m",
  biru_muda: "\x1b[94m",


  // Kode Warna Latar Belakang
  bg_reset: "\x1b[49m",
  bg_putih: "\x1b[47m",
  bg_hitam: "\x1b[40m",
  bg_merah: "\x1b[41m",
  bg_hijau: "\x1b[42m",
  bg_kuning: "\x1b[43m",
  bg_biru: "\x1b[44m",
  bg_magenta: "\x1b[45m",
  bg_cyan: "\x1b[46m",
  bg_biru_muda: "\x1b[104m",

  // Reset Warna Teks
  reset_text: "\x1b[39m",
  
  // Reset Warna Latar Belakang
  reset_bg: "\x1b[49m",
};

func["warna"] = (color,text) => `${func.color[color]}${text.split(`\n`).map(v => `${func.color[color]}${v}`).join(`\n`)}${func.color.reset_text}${func.color.reset_bg}`;

func["fs"] = {
    load: File_System.readFileSync,
    save: File_System.writeFileSync,
    cek: File_System.existsSync,
    dir: File_System.readdirSync,
    del: File_System.unlinkSync,
    delete: File_System.unlinkSync,
    isDir: (path_string) => File_System.lstatSync(path_string).isDirectory(),
    isFile: (path_string) => File_System.lstatSync(path_string).isFile(),
    ...File_System,
}

func["smsg"] = (conn, messagena, store) => {
    var m = messagena;
    if (!m) return m
    m.Barqah = {};
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.isBotBrainxiex = m.key.id.startsWith('BarqahXiex') || m.key.id.startsWith('BRAINXIEX')
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = m.saha = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
        m.nomor = m.sender.split(`@`)[0]
        if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
        m.delete = () => conn.sendMessage(m.chat,{delete: m.key});
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.type = `${m.mtype}`.replace(`Message`,``)
        m.isDeleted = (m.mtype === 'protocolMessage');
        m.isEdited = (m.mtype === 'editedMessage');
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        m.body = (m.mtype === 'conversation') ? m.message.conversation : 
                    (m.mtype === 'reactionMessage') ? m.message.reactionMessage.text : 
                    m.isDeleted ? `${JSON.stringify({deletedMessage: m.message.protocolMessage},null,2)}` : 
                    m.isEdited ? m.message.editedMessage.message.protocolMessage.editedMessage.conversation : 
                    (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : 
                    (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : 
                    (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : 
                    (m.type == "interactiveResponse") ? (JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)||{id:m.message.interactiveResponseMessage.nativeFlowResponseMessage.name}).id : 
                    (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : 
                    (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : 
                    (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : 
                    (m.mtype === 'messageContextInfo') ? 
                    (m.message.buttonsResponseMessage?.selectedButtonId || 
                    m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : 
                    m.message.conversation || m.msg ? (m.msg?.caption || m.msg?.text || (m.mtype == 'listResponseMessage') && m.msg?.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg?.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg?.caption) : 
                    m.text || m.text;
        let quoted = m.quoted = !m.msg ? null : m.msg?.contextInfo ? m.msg?.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg ? m.msg?.contextInfo ? m.msg?.contextInfo.mentionedJid : [] : []
        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
				type = getContentType(m.quoted)
				m.quoted = m.quoted[type]
			}
            if (typeof m.quoted === 'string' || !isset(m.quoted)) m.quoted = {
				text: m.quoted
			}
            m.quoted.mtype = `${type}`||`undefinedMessage`
            m.quoted.type = `${m.quoted.mtype}`.replace(`Message`,``)
            m.quoted.id = m.msg?.contextInfo.stanzaId
			m.quoted.chat = m.msg?.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
            m.quoted.isBotBrainxiex = m.quoted.id ? m.quoted.id.startsWith('BarqahXiex') || m.quoted.id.startsWith('BRAINXIEX') : false
			m.quoted.sender = conn.decodeJid(m.msg?.contextInfo.participant)
            m.quoted.nomor = conn.decodeJid(m.msg?.contextInfo.participant).split("@")[0]
			m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.mentionedJid = m.msg?.contextInfo ? m.msg?.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
			if (!m.quoted.id) return false
			let q = await store.loadMessage(m.chat, m.quoted.id, conn)
 			return smsg(conn, q, store)
            }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })

            /**
             * 
             * @returns 
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })

	   /**
		* 
		* @param {*} jid 
		* @param {*} forceForward 
		* @param {*} options 
		* @returns 
	   */
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**+
              *
              * @returns
            */
            m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
        }
    }
    if (m.msg && m.msg?.url) m.download = () => conn.downloadMediaMessage(m.msg)
    m.text = m.msg?.text || m.msg?.caption || m.message.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || ''
    /**
	* Reply to this messagessh 
	* @param {String|Object} text 
	* @param {String|false} chatId 
	* @param {Object} options 
	*/
  // m.liana.proto = M;
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
    /**
	* Copy this message
	*/
	m.copy = () => smsg(conn, M.fromObject(M.toObject(m)))

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    return m
}

func["sleep"] = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

func["random"] = (arr) => arr[Math.floor(Math.random() * arr.length)];

func["isset"] = (ada) => ada == Error || ada == undefined || ada == null || ada == "" || ada == '""' ? false : true

func["exec"] = async(cmd,hasil) => {
    const commandExecutor = require("util")["promisify"](require('child_process').exec);
    const {stdout,stderr} = await commandExecutor(cmd);
    console.log(`executed:`,cmd,`\nOutput: ${isset(stdout) ? `yes`:`no`}\nError: ${isset(stderr) ? `yes`:`no`}`)
    return await (isset(hasil) ? hasil(stderr,stdout,``) : {stdout,stderr})
}

func["isJSONString"] = (json) => {
    try{
        JSON.parse(json);
    }catch(e){
        return false;
    }
    return true;
}

func["jsonparse"] = (json) => func.isJSONString(json) ? JSON.parse(json) : {}

func["autorefresh"] = (filename) => {
let file = require.resolve(filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.info(`Update'${filename}'`)
    delete require.cache[file]
    require(file)
})
return file
}

func["dir"] = function(nama) {
    if (!fs.existsSync(nama)) {
        fs.mkdirSync(nama);
    }
    return nama
}

func["useSingleFileAuthState"] = function (folderPath, logger) {
    const { readFileSync, writeFileSync, existsSync } = func.fs;
    const { initAuthCreds, BufferJSON, proto } = Baileys;

    

    const filename = func.dir(`./${folderPath}/`)+`xiex.json`;
    if(typeof(logger) == `function`) logger(`loading auth state ${filename}`);
    const KEY_MAP = {
        'pre-key': 'preKeys',
        'session': 'sessions',
        'sender-key': 'senderKeys',
        'app-state-sync-key': 'appStateSyncKeys',
        'app-state-sync-version': 'appStateVersions',
        'sender-key-memory': 'senderKeyMemory'
    }
    let creds, keys = {}, saveCount = 0
    // save the authentication state to a file
    const saveCreds = (forceSave) => {
        saveCount++
        if (forceSave || saveCount > 5) {
            if(typeof(logger) == `function`) logger(`saving auth state ${filename}`);
            writeFileSync(
                filename,
                // BufferJSON replacer utility saves buffers nicely
                JSON.stringify({ creds, keys }, BufferJSON.replacer, 2)
            )
            saveCount = 0
        }
    }

    if (existsSync(filename)) {
        const result = JSON.parse(
            readFileSync(filename, { encoding: 'utf-8' }),
            BufferJSON.reviver
        )
        creds = result.creds
        keys = result.keys
    } else {
        creds = initAuthCreds()
        keys = {}
    }

    return {
        state: {
            creds,
            keys: {
                get: (type, ids) => {
                    const key = KEY_MAP[type]
                    return ids.reduce(
                        (dict, id) => {
                            let value = keys[key]?.[id]
                            if (value) {
                                if (type === 'app-state-sync-key') {
                                    value = proto.AppStateSyncKeyData.fromObject(value)
                                }

                                dict[id] = value
                            }

                            return dict
                        }, {}
                    )
                },
                set: (data) => {
                    for (const _key in data) {
                        const key = KEY_MAP[_key]
                        keys[key] = keys[key] || {}
                        Object.assign(keys[key], data[_key])
                    }

                    saveCreds()
                }
            }
        },
        saveCreds
    }
}

func.dbdir = (a) => {
    return func.dir("./database/" + a + "/")
}

func.dbfile = (a,b) => {
    return func.dbdir(a) + b
}

func.dir = (nama) => {
    if (!func.fs.existsSync(nama)) {
        func.fs.mkdirSync(nama);
    }
    return nama
}

func.FileAda = (a, b) => {
    if (func.fs.existsSync(a)) {
        return `${func.fs.load(a)}`
    } else {
        return b
    }
}

func.useMultiFileAuthState = (folder,logger) => {
    const { initAuthCreds, BufferJSON, proto } = Baileys;
    const fs = File_System;
    const { readFileSync, writeFileSync, existsSync, del:hapus, isDir, mkdirSync, promises:{writeFile},} = func.fs;
    const fixFileName = (file) => { var _a; return (_a = file === null || file === void 0 ? void 0 : file.replace(/\//g, '__')) === null || _a === void 0 ? void 0 : _a.replace(/:/g, '-'); };
    const path = (file) => file ? `${folder}/${fixFileName(file)}` : folder;
    const save = async(file,isi) => await writeFile(path(file),isi);
    const load = (file,option) => readFileSync(path(file),option);
    const del = (file,option) => hapus(path(file),option);
    
    const writeData = (data, file) => writeFileSync(file, JSON.stringify(data, BufferJSON.replacer));
    const readData = (file) => JSON.parse(load(file, { encoding: 'utf-8' }), BufferJSON.reviver)||{};
    const removeData = (file) => del(file);

    let saveCount = 0;
    func.dir(folder);
    
    if(typeof(logger) == `function`) logger(`loading auth state ${path()}`);

    if (!isDir(folder)) {
        throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`);
    }
    else {
        mkdirSync(folder, { recursive: true });
    }
    const creds = existsSync(path(`creds.json`)) ? readData(`creds.json`) : initAuthCreds()
    return {
        state: {
            creds,
            keys: {
                get: function(type, ids) {
                    try{
                        const data = {};
                        ids.map(function(id) {
                            let value = readData(`${type}-${id}.json`);
                            if(typeof(logger) == `function`) logger(`get auth state ${path(`${type}-${id}.json`)}`);
                            if (type === 'app-state-sync-key' && value) {
                                value = proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            data[id] = value;
                        })
                        return data;
                    }catch(e){
                        console.error(e);
                    }
                },
                set: async function(data) {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            try{
                                const value = data[category][id];
                                const file = `${category}-${id}.json`;
                                if(typeof(logger) == `function`) logger(`set auth state ${path(file)}`);
                                tasks.push(value ? await writeFile(path(file), JSON.stringify(value, BufferJSON.replacer)) : removeData(file));
                            }catch(e){
                                console.error(e);
                            }
                        }
                    }
                    return tasks;
                }
            }
        },
        saveCreds: (forceSave) => {
            saveCount++
            if (forceSave || saveCount > 5) {
                if (typeof(logger) == `function`) logger(`saving auth state ${path(`creds.json`)}`);
                saveCount = 0
                return writeData(creds, 'creds.json');
            }
        }
    };
};

const pino = require('pino')
const {
    Boom
} = require('@hapi/boom')

const qrcode = require(`qrcode`);


const FileType = require('file-type')
const _ = require('lodash');
const axios = require('axios');
const i2b64 = require("image-to-base64");
const PhoneNumber = require('awesome-phonenumber');
const f = require(`util`).format

const { sleep, fs, smsg ,autorefresh, isset, exec, isJSONString, jsonparse, color, warna, generateMessageID, IDGenerate, userAgent } = func;

const console_info = console.info;
console.info = function(){
    if(!require("util").format(...arguments).includes("Closing session: SessionEntry")){
        console_info(...arguments)
    }else{
        // console_info(`${arguments[0]}`)
    }
}

console.log(warna('merah', 'Menghapus file sampah...'));
fs.dir(`./temp`).forEach(v => {
    fs.del(`./temp/${v}`);
    console.log(warna('merah', `Menghapus: ./temp/${v}`));
})


async function connjs(config) {
    const {Nomor_Bot} = config;
    // setPriority
    try {
        if(typeof config.nice == "number" && config.nice >= -20 && config.nice <= 20) {
            setPriority(config.nice);
            console.log(warna(`cyan`,`${config.Nama_Bot} (${config.Nomor_Bot}) Set Priority ke ${getPriority()}`));
        }else{
            console.log(warna(`cyan`,`${config.Nama_Bot} (${config.Nomor_Bot}) Set Priority ke default`));
        }
    } catch (error) {
        console.error("Set Priority Error:",error)
    }

    config.usecode = config.usecode && !config.mobile;
    config.printQRInTerminal = config.printQRInTerminal && !config.usecode;
    const {mobile, Nomor_Owner, Nama_Owner, Nama_Bot, Prefix, Password_Bot,banner, welcomer, promote, autoBlockCall, limit_welcomer, limit_chat, ketik, AutoUpdate, Addons, pakeQRweb, port, printQRInTerminal,debug,session,silent,sewa, loading} = config;
    say = debug ? ((a) => {console.log(a)}) : (()=>{}) 
    // 
    // Colongan dari Brainxiex utama
    // webserver?
    // 
    // if(debug) console.table(config)


    say(`memuat store...`,`magentaBright`)
    const store = {}
    store.contacts = fs.cek(`./database/contacs.json`) ? jsonparse(`${fs.load(`./database/contacs.json`)}`) : {};
    store.group = fs.cek(`./database/group.json`) ? jsonparse(`${fs.load(`./database/group.json`)}`) : {};
    store.msg = fs.cek(`./temp/msg.json`) ? jsonparse(`${fs.load(`./temp/msg.json`)}`) : {};
    store.rec = {grup:{},chat:{}};
    store.loadMessage = function(chat,id,lin) {
        return store["msg"][chat][id]
    }


    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(`${session||`session`}`)//,(info) => console.info(warna(`biru_muda`,info)))

    let logger = pino({ level: "silent" });
    // let browser = ['Barqah Ganteng', 'Android', '12.12.20'];
    let browser = config.usecode ? ["Windows", "Chrome", "Chrome 114.0.5735.198"]||['Ubuntu', 'Chrome', '22.0.04'] : ['Barqah Ganteng', 'Android', '12.12.20'];
    browser = Browsers.windows("Desktop")
    let auth = state;
    let patchMessageBeforeSending = (message) => {
        const requiresPatch = !!(
            message.buttonsMessage ||
            message.listMessage
        );

        if (requiresPatch) {
            message = {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadataVersion: 2,
                            deviceListMetadata: {},
                        },
                        ...message,
                    },
                },
            };
        }
        return message;
    }
    let keepAliveIntervalMs = 30 * 1000;
    let markOnlineOnConnect =  false;
    let connectTimeoutMs = 60_000;
    let syncFullHistory = false;
    let defaultQueryTimeoutMs = 0;
    let generateHighQualityLinkPreview = true;

    async function getMessage(key)  {
        if(store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message || undefined
        }
        // only if store is present
        return proto.Message.fromObject({})
    }

    const configConnect = {
        logger,
        printQRInTerminal,
        mobile,
        browser,
        auth,
        patchMessageBeforeSending,
        syncFullHistory,
        keepAliveIntervalMs,
        markOnlineOnConnect,
        connectTimeoutMs,
        defaultQueryTimeoutMs,
        generateHighQualityLinkPreview,
        getMessage,
        version: (await fetchLatestBaileysVersion()).version
    }
    const liana = conn(configConnect);
    
    liana.getPairingCode = (...arg) => new Promise(async (acc,rej) => {
        for (;true;) {
            await new Promise(resolve => setTimeout(resolve, 100));
            if(!liana.ws.isOpen) continue;
            const pairing = await liana.requestPairingCode(...arg).catch(console.error);
            acc(pairing);
            break;
            return;
        }
    })

    

    

    
    
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
        _qr = await liana.requestPairingCode(nomorbot,customPairing);
        _qr = _qr?.match(/.{1,4}/g)?.join('-') || _qr;
        console.log(`${warna("biru","Bot")}${warna("merah",":")} ${warna("hijau",nomorbot)} ${warna("merah","|")} ${warna("biru","Code")}${warna("merah",":")} ${warna("hijau",_qr)}`)
    }
    
    liana.ev.on(`connection.update`, async function(json) {
        json.botNumber = Nomor_Bot;
        // console.log(json)
        const {connection, qr, isNewLogin, lastDisconnect} = json;
        
        if (qr) {

            if(!config.usecode && !config.mobile) {
                _qr = qr;
                say(`Scann QR di Aplikasi WhatsApp di bagian Perangkat Tertaut`)
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
    if (pakeQRweb) {
        const http = require("http");
        http.createServer(async (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            fs.cek(`./addons/http.js`) ? (await require(`./addons/http.js`)(liana, req, res)) : ``;
            if (req.url.toLowerCase() == "/qr") {
                if (isset(_qr) && !liana.authState.creds.registered) {
                    if(`${_qr}`.length == 9 && `${_qr}`.includes("-")){
                        
                        res.end(`${_qr}`)
                    }else{
                        res.writeHead(200, {
                            'Content-Type': 'image/png'
                        });
                        res.end(await qrcode.toBuffer(_qr));
                    }
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/text'
                    });
                    res.end(`masih belom ada, tunggu beberapa saat dan terus refresh. ohya qr restart setiap 10 detik sekali`);
                }
            } else if (req.url.toLowerCase() == "/nomor") {
                res.writeHead(200, {
                    'Content-Type': 'text/text'
                });
                res.end(liana.user.id.split(":")[0]);
            } else if (req.url.toLowerCase() == "/isself") {
                res.writeHead(200, {
                    'Content-Type': 'text/text'
                });
                // console.log(`mode: ${liana.isSelf}`);
                res.end(`${liana.isSelf}`);
            } else if (req.url.toLowerCase() == "/self") {
                res.writeHead(200, {
                    'Content-Type': 'text/text'
                });
                if(liana.isSelf){
                    liana.isSelf = false;
                }else{
                    liana.isSelf = true;
                }
                console.log(`mode: ${liana.isSelf}`);
                res.end(`${liana.isSelf}`);
            } else if (req.url.toLowerCase() == "/serverrestart") {
                res.writeHead(200, {
                    'Content-Type': 'text/text'
                });
                console.log(`server restart by panel`);
                process.exit(0);
                res.end(`restartting...`);
            } else if (req.url.toLowerCase() == "/gotowa") {
                res.writeHead(301, { "Location": `https://wa.me/${liana.user.id.split(":")[0]}` });
                res.end(`${liana.user.id.split(":")[0]}`);
            } else if (req.url.toLowerCase() == "/ping") {
                res.writeHead(200, {
                    'Content-Type': 'text/text'
                });
                res.end(`pong`);
            } else if (req.url.toLowerCase().startsWith("/search/")) {
                if (fs.cek(req.url.replace(`/search/`, ``))) {
                    res.writeHead(200, {
                        'Content-Type': 'text/text'
                    });
                    res.end(`${fs.load(req.url.replace(`/search/`, ``)).toString(`base64`)}`);
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/text'
                    });
                    res.end(`false`);
                }
            } else if (req.url.startsWith(`/send`)) {
                try {
                    const path = req.url.split("/").slice(1).join("/")
                    const GET = path.includes("?") && path.includes("=") ? JSON.parse(`{${path.split("?").slice(1).join("?").split("&").map(c => { const [a, b] = c.split("="); return `${JSON.stringify(a)}: ${JSON.stringify(decodeURIComponent(b))}` }).join(",")}}`) || {} : {}
                    const { nomor, type, url, text, data } = GET;
                    if (!isset(nomor) || !isset(type)) {
                        res.writeHead(200, {
                            'Content-Type': 'text/text'
                        });
                        res.end(`hadeuh pasti salah masukin parameter nomor sama typenya, cek dulu sapa tau typo`);
                    }
                    const number = nomor.startsWith("0") ? nomor.replace("0", "62") : nomor;
                    const wanumber = number.startsWith("+") ? number.replace(/[ +-]/g, "") : number;
                    const id = wanumber.includes("@") ? wanumber : wanumber + "@s.whatsapp.net";
                    let content = {};
                    if (type == "video") {
                        content[type] = { url };
                        content.caption = `${text}`;

                        liana.sendMessage(id, content)
                    } else if (type == "image") {
                        content[type] = { url };
                        content.caption = `${text}`;

                        liana.sendMessage(id, content)
                    } else if (type == "audio") {
                        content[type] = { url };

                        liana.sendMessage(id, content)
                    } else if (type == "sticker") {
                        content[type] = { url };

                        liana.sendMessage(id, content)
                    } else if (type == "text") {
                        content[type] = text;

                        liana.sendMessage(id, content)
                    } else if (type == "custom") {
                        liana.sendMessage(id, data)
                    } else {
                        liana.sendMessage(id, {
                            text: `Untuk mengirim pesan lihat di bawah ini
*VIDEO*
http://${config.server}:${port}/send?nomor=${Nomor_Owner}&type=viode&text=hallo&url=urlvideo.mp4

*GAMBAR*
http://${config.server}:${port}/send?nomor=${Nomor_Owner}&type=image&text=hallo&url=urlvideo.png

*AUDIO*
http://${config.server}:${port}/send?nomor=${Nomor_Owner}&type=audio&url=urlaudio.mp3

*STICKER*
http://${config.server}:${port}/send?nomor=${Nomor_Owner}&type=sticker&text=hallo&url=urlsticker.webp

*TEXT*
http://${config.server}:${port}/send?nomor=${Nomor_Owner}&type=text&text=hallo

`})

                    }
                    res.writeHead(200, {
                        'Content-Type': 'text/text'
                    });
                    res.end(`jika ada error langsung masuk kok ke nomor tujuannya`);
                } catch (e) {
                    res.writeHead(200, {
                        'Content-Type': 'text/text'
                    });
                    res.end(`${require("util").format(e)}`);
                }
            } else {
                /*try {
                    var id = decodeURIComponent(req.url.split("/")[1])
                    const jid = id;
                    id.startsWith("0") ? id = id.replace("0", "62") : id = id;
                    id.startsWith("+") ? id = id.replace(/[ +-]/g, "") : id = id;
                    id.endsWith("@s.whatsapp.net") ? id = id : id = id.split("@")[0] + "@s.whatsapp.net";
                    var pesan = {
                        text: decodeURIComponent(req.url.replace(`/${jid}/`, ""))
                    };
                    if (isset(port) && limitsend_Port < 10) {
                        const webhock_kirim = liana.sendMessage(id, pesan);
                        limitsend_Port = limitsend_Port + 1;
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            status: 200,
                            Pesan: webhock_kirim
                        }, null, 2));
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({
                            status: 403,
                            Pesan: '"limit habis tunggu beberapa saat"'
                        }, null, 2));
                    }
                } catch (e) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({
                        status: 500,
                        Pesan: `"${e}"`
                    }, null, 2));
                }*/
            }
        }).listen(port, () => {
            console.log("server running on port " + port);
            console.log(`qr ada di http://localhost:${port}/qr`)
        })
    }

    liana.Baileys = liana.baileys = Baileys;

    liana.store = store;

    

    liana.getName = (jid, withoutContact = false) => {
        const id = jid.split("@")[0]+"@s.whatsapp.net";
        return store.contacts[id]?.name||PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    liana.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    const Barqah_relayPesan = liana.relayMessage;
    liana.relayMessage = function() {
        return Barqah_relayPesan(...arguments);
    }
    Barqah_profilePictureUrl = liana.profilePictureUrl;
    liana.profilePictureUrl = function(orang,type="preview",timeout = 10000) {

        return new Promise(async(ok,no) => {
            if(store.contacts[orang]?.ppimg && store.contacts[orang]?.ppimg != `http://xiex.my.id/media/1655612010102undefined.png`)  ok(store.contacts[orang].ppimg);
            const res = await liana.query({
                tag: 'iq',
                attrs: {
                    target: orang,
                    to: '@s.whatsapp.net',
                    type: 'get',
                    xmlns: 'w:profile:picture'
                },
                content: [
                    { tag: 'picture', attrs: { type, query: 'url' } }
                ]
            },timeout+1000).catch(v => ok(store.contacts[orang]?.ppimg||`http://xiex.my.id/media/1655612010102undefined.png`));

            const child = (0, Baileys.getBinaryNodeChild)(res, 'picture');
            const ppimg = (_a = child === null || child === void 0 ? void 0 : child.attrs) === null || _a === void 0 ? void 0 : _a.url;
			
            store.contacts = store.contacts||{};
            store.contacts[orang] = store.contacts[orang]||{};
            store.contacts[orang].ppimg = ppimg;
            ok(ppimg);
            
            setTimeout(v => ok(store.contacts[orang]?.ppimg||`http://xiex.my.id/media/1655612010102undefined.png`),timeout);
        });
    }


    const Barqah_groupMetadata = liana.groupMetadata;
    var countreq_metadatagrup = 0;
    liana.groupMetadata = async function(id, paksain = false) {
        if(func.isset(store.group[id]) && countreq_metadatagrup < 5 && !paksain){
            countreq_metadatagrup++;
            return store.group[id];
        }
        countreq_metadatagrup = 0;
        store.group[id] = await (await Barqah_groupMetadata(id).catch(v => ({
            id,
            subject: id,
            desc: ``,
            participants:[],
            ...store.group[id],
        })))
        return store.group[id]
    }
    
    
    const KIRIMPESAN = liana.sendMessage;
    /**
     * 
     * @param {*} jid 
     * @param {*} content 
     * @param {*} options 
     * @returns 
    */
    liana.sendMessage = (jid,konten,options) => {
        try {
            if(isset(konten?.text)) konten.text = konten.text;
            if(isset(konten?.caption)) konten.caption = konten.caption;
            const content = Object.keys(konten).includes("audio") ? {...konten, ptt: true, mimetype: liana.Baileys.getDevice(options?.quoted?.id) == 'ios' ? 'audio/mpeg' : 'audio/mp4',...konten} : typeof konten == "string" ? {text: konten} : konten;
        	return KIRIMPESAN(jid,{mentions: liana.parseMention(`${content?.caption} ${content?.text}`),...content},{messageId: generateMessageID(),...options}).catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }

    liana.deleteMessage = (m) => {
        const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.id,
            participant: m.sender,
            ...m.key
        }
        return liana.sendMessage(m.chat, {delete: key})
    }

    liana.editMessage = (m,message) => {
        const editedMessage = typeof message == `string` ? {conversation: message} : message;
        return liana.relayMessage(m.key.remoteJid, {
            protocolMessage: {
              key: m.key,
              type: 14,
              editedMessage
            }
          }, {
            messageId: generateMessageID()
        })
    }

    liana.loadingMessage = async(id,text,wait = 0) => {
        const {head,body,foot} = loading;
        const m = await liana.sendMessage(id,{text: head});
        for(const texloading of body){
            await liana.editMessage(m, texloading);
            await sleep(wait/body.length);
        }
        await liana.editMessage(m, text||foot);
        const editLoading = (t) => liana.editMessage(m,t); 
        return {...m,editLoading};
    }

    liana.groupRemove = (id, orang) => {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], "remove")
    }

    liana.groupMakeAdmin = (id, orang) => {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], "promote")
    }

    liana.groupDemoteAdmin = (id, orang) => {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], "demote")
    }

    liana.isVIP = (id) => Number(func.FileAda(`${func.dbfile(`vip`,id)}`,`${new Date().getTime()}`)) > new Date().getTime();
    liana.addVIP = (id,hari = 7) => {
        fs.save(func.dbfile(`vip`,id), (Number(func.FileAda(`${func.dbfile(`vip`,id)}`,`${new Date().getTime()}`))+(Number(`${hari}`)*24*60*60*1000)));
    }
    liana.setVIP = (id,hari = 7) => {
        fs.save(func.dbfile(`vip`,id), (new Date().getTime()+(Number(`${hari}`)*24*60*60*1000)));
    }

    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    liana.downloadMediaMessage = async (mek) => {
        const message = isset(mek.msg) ? mek.msg : mek;
        const m = message.mtype == "documentWithCaptionMessage" ? message.message.documentMessage : message;
        // console.log(m)
        // console.log(JSON.stringify(m,null,2))
        let mime = (m.msg || m).mimetype || ''
        let messageType = m.mtype ? m.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(m, messageType);
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    liana.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    	try{
        const buffer = await liana.downloadMediaMessage(message)
        const dtype = await FileType.fromBuffer(buffer);
        const ecxtensi = await dtype;
        trueFileName = "./temp/"+(attachExtension ? filename + '.' + (ecxtensi && ecxtensi.ext || "xiex") : filename)
        await fs.writeFileSync("./" + trueFileName, buffer)
        return trueFileName
        }catch(e){
        	console.error(e)
        }
    }
    
    liana.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        console.log(message)
        if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        message.message.viewOnceMessage = {...message.message.viewOnceMessage, ...message.message.viewOnceMessageV2}
        vtype = Object.keys(message.message.viewOnceMessage.message)[0]
        delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
        ...message.message.viewOnceMessage.message
        }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo ? {
        contextInfo: {
        ...content[ctype].contextInfo,
        ...options.contextInfo
        }
        } : {})
        } : {})
        await liana.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
        }

    /**
     * 
     * @param {*} jid 
     * @param {*} content profilePictureUrl
     * @param {*} options 
     * @returns 
     */
    liana.send5ButImage = async (jid, content, options = {}) => {
        let message = await prepareWAMessageMedia(content, {
            upload: liana.waUploadToServer
        })
        const {text, caption, footer, templateButtons} = content;
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    imageMessage: message.imageMessage,
                    "hydratedContentText": text||caption,
                    "hydratedFooterText": footer,
                    "hydratedButtons": templateButtons||button||but
                }
            }
        }), options)

        liana.relayMessage(jid, template.message, {
            messageId: generateMessageID()
        })
    }
    

    liana.button = async(m, a,b,c) => {
        var buttons = []
        a.forEach((i, n) => {
            buttons.push({
                buttonId: `${a[n]}`,
                buttonText: {
                    displayText: `${b[n]}`
                },
                type: 1
            })
        })
        const messagena = typeof c == "string" ? {
            text: c,
            buttons
        } : {
            ...c,
            buttons
        };
        return liana.sendMessage(m.chat, messagena,{quoted: m})
    }
    
liana.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
liana.sendReadReceipt = function (id, sender, MessageID, type = `read`) {
    const key = {
        remoteJid: id,
        id: MessageID, // id of the message you want to read
        participant: sender // the ID of the user that sent the  message (undefined for individual chats)
    }
    return isset(sender) ? liana.readMessages([key]) : liana.readMessages([id.key])
}

liana.relayPesan = async function(id,message,option){
    return await Barqah_relayPesan(...arguments).catch(v => v);
}

liana.bikinPesan = async function (jid, content, options = {}) {
    var _a, _b;
    const userJid = liana.user.id;
    if (typeof content === 'object' &&
        'disappearingMessagesInChat' in content &&
        typeof content['disappearingMessagesInChat'] !== 'undefined' && jid.endsWith("@g.us")) {
        const { disappearingMessagesInChat } = content;
        const value = typeof disappearingMessagesInChat === 'boolean' ?
            (disappearingMessagesInChat ? Baileys.WA_DEFAULT_EPHEMERAL : 0) :
            disappearingMessagesInChat;
        await liana.groupToggleEphemeral(jid, value);
    }
    else {
        const fullMsg = await (0, Baileys.generateWAMessage)(jid, content, {
            logger,
            userJid,
            getUrlInfo: text => (0, Baileys.getUrlInfo)(text, {
                thumbnailWidth: configConnect.linkPreviewImageThumbnailWidth,
                timeoutMs: 3000,
                uploadImage: liana.waUploadToServer
            }, logger),
            upload: liana.waUploadToServer,
            mediaCache: configConnect.mediaCache,
            ...options,
        });
        const isDeleteMsg = 'delete' in content && !!content.delete;
        const additionalAttributes = {};
        // required for delete
        if (isDeleteMsg) {
            // if the chat is a group, and I am not the author, then delete the message as an admin
            if (((_a = content.delete) === null || _a === void 0 ? void 0 : _a.remoteJid).endsWith("@g.us") && !((_b = content.delete) === null || _b === void 0 ? void 0 : _b.fromMe)) {
                additionalAttributes.edit = '8';
            }
            else {
                additionalAttributes.edit = '7';
            }
        }
        fullMsg.key.id = generateMessageID();
        fullMsg.message = (0,Baileys.patchMessageForMdIfRequired)(fullMsg.message);
        fullMsg.option = { messageId: fullMsg.key.id, cachedGroupMetadata: options.cachedGroupMetadata, additionalAttributes }
        return fullMsg;
    }
}

    liana.parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')

    liana.MyIP = (await axios.get(`http://ip-api.com/json/`)).data.query;

    


    liana.sendReadReceipt = function (id, sender, MessageID, type = `read`) {
        const key = {
            remoteJid: id,
            id: MessageID, // id of the message you want to read
            participant: sender // the ID of the user that sent the  message (undefined for individual chats)
        }
        return isset(sender) ? liana.readMessages([key]) : liana.readMessages([id.key])
    }

    
    
    liana.templateMessage = async function(id, content, option, msgoption) {
    const templateButtons = [
    ]
    const buttons = [
    ]
    const kirimke = id;
    const msg = content.text||content.caption;
    const tombol = content.templateButtons || templateButtons
    templateMessage = {
        caption: msg,
        footer: `Brainxiex || xiex.my.id`,
        templateButtons: tombol,
        ...content
    }
    templateMessage.body = templateMessage.caption || templateMessage.text || ""
    if (isset(option)) {
        jsonIn(option).forEach(a => {
            templateMessage[a] = option[a]
        })
    } else {
    }
    

    if (isset(msgoption)) {
        msgoption.userJid = msgoption.userJid || templateMessage.mentions || liana.parseMention(templateMessage.body) || []
    } else {
        msgoption = {}
        msgoption.userJid = msgoption.userJid || templateMessage.mentions || liana.parseMention(templateMessage.body) || []
    }
    msgoption.contextInfo = {};
    msgoption.contextInfo.mentionedJid = msgoption.userJid||[];

    let apanyacontent = {};
    apanyacontent[Object.keys(content)[0]+`Message`] = content[Object.keys(content)[0]];
    // console.log(apanyacontent)
    
    const pesannyaini = proto.Message.fromObject({
        templateMessage: {
                    hydratedTemplate: {
                        ...apanyacontent,
                        hydratedContentText: templateMessage.body,
                        hydratedFooterText: templateMessage.footer,
                        hydratedButtons: templateMessage.templateButtons,
                        ...msgoption
                    },
                    ...msgoption
                },
        ...msgoption
    },)

    const template = generateWAMessageFromContent(kirimke, pesannyaini, { userJid: liana.user.id.split("@")[0]+`@s.whatsapp.net`, ephemeralExpiration: 86400, ...msgoption })
    liana.relayMessage(kirimke, template.message, {
        messageId: generateMessageID()
    })
}
    
    liana.generateQuoted = function(m,ctxInfo = true) {
        const key = Object.keys(m)[0]
        const participant = m.key.fromMe ? liana.user.jid : (m.participant || m.key.participant || m.key.remoteJid);
        let quotedMsg = Baileys.normalizeMessageContent(m.message);
        const msgType = (0, Baileys.getContentType)(quotedMsg);
        // strip any redundant properties
        quotedMsg = Baileys.proto.Message.fromObject({ [msgType]: quotedMsg[msgType] });
        const quotedContent = quotedMsg[msgType];
        if (typeof quotedContent === 'object' && quotedContent && 'contextInfo' in quotedContent) {
            delete quotedContent.contextInfo;
        }
        const contextInfo = m[key].contextInfo || {};
        contextInfo.participant = participant;
        contextInfo.stanzaId = m.key.id;
        contextInfo.quotedMessage = quotedMsg;
        // if a participant is quoted, then it must be a group
        // hence, remoteJid of group must also be entered
        if (m.key.participant || m.participant) {
            contextInfo.remoteJid = m.key.remoteJid;
        }
        // console.log(contextInfo)
        return ctxInfo ? {contextInfo} : contextInfo;
    }

    liana.banner = async function (id, content = {}, options = {}, kirim = true) {
        content = typeof content === 'string' ? { text: content } : content;
        const { image, caption, text } = content;
        const theLink = (image?.url || image || banner)
        const link = Buffer.isBuffer(theLink) ? thelink : theLink.replace('192.168.1.8','xiex.my.id').replace('192.168.1.9','xiex.my.id').trim();
        const message = {
            extendedTextMessage: {
                text: (caption || text || ``),
                contextInfo: {
                    mentionedJid: liana.parseMention((caption || text || ``)),
                    groupMentions: [],
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363288123942600@newsletter',
                        newsletterName: `${config.Nama_Bot}`,
                        serverMessageId: -1
                    },
                    businessMessageForwardInfo: {
                        businessOwnerJid: liana.user.jid
                    },
                    forwardingScore: 1,
                    externalAdReply: {
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAtrribution: true,
                        title: Nama_Bot,
                        body: `Powered By xiex.my.id`,
                        previewType: 0,
                        thumbnail: await liana.media2buffer(link),
                        thumbnailUrl: link.startsWith(`http`) ? link : undefined,
                        sourceUrl: `http://xiex.my.id`,
                        ...content
                    },
                    ...(options.quoted ? liana.generateQuoted(options.quoted, false) : {})
                }, mentions: [options.sender],
                ...options
            }
        }
        if (kirim) await liana.relayMessage(id, message, { messageId: generateMessageID() });
        return message;
    }


    
    
    liana.kick = function(id,orang){
        return liana.groupParticipantsUpdate(id,(typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], `remove` )
    }
    liana.add = function(id,orang){
        return liana.groupParticipantsUpdate(id,(typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], `add` )
    }
    
    liana.config = config;
    liana.func = func;
    
    liana.isSelf = false;


    
    liana.media2buffer = async (a) => {
        if (!a.startsWith(`http`) && typeof a == `string`) {
            return fs.load(a);
        } else if (a.startsWith(`http`) && typeof a == `string`) {
            try {
                const response = await axios.get(a, { responseType: 'arraybuffer' });
                return Buffer.from(response.data);
            } catch (error) {
                console.error(error);
                throw new Error(`Gagal mengambil data dari URL: ${error.message}`);
            }
        } else if (require(`util`).isBuffer(a)) {
            return a;
        } else {
            return Buffer.from(a);
        }
    };
    

    liana.load = async(link, type = "string") => {
        const Buffer = await liana.meida2buffer(link);
        const data = `${Buffer}`;

        const tp = type.toLocaleLowerCase();
        if(type == `json`){
            return jsonparse(data);
        } else if(type == `number`){
            return Number(data) == NaN ? 0 : Number(data);
        } else if(type == `buffer`){
            return Buffer;
        } else {
            return data
        }
    }

    liana.resize = async(buffer,x=300,y=300) => {
        const {data} = await axios.post(`${config.baseURL}/api/image/resize?apikey=${config.apikey}`,{buffer,x,y},{ responseType: 'arraybuffer' });
        const result = await Buffer.from(data, "utf-8");
        return result;
    }
    
    global.glimit_chat = global?.glimit_chat||{};


	liana.cache = {};

    say(`Memuat Command Dan Fitur`,`magentaBright`);
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
    // console.log(liana.category)
    console.log(warna('hijau', 'Menu Berhasil DI muat !'))

    fs.dir(`./addons`).forEach(v => {
        // console.log(`memuat ./addons/${v}`);
        if(v == "jadibot.js" && config.isJadibot) return;
        if(v == `http.js`) return;
        require(`./addons/${v}`)(liana);
    })
    
    fs.dir(`./event`).forEach(v => {
        liana.ev.on(v.replace(".js",""), (e) => require("./event/"+v)(e,liana));
        liana.ws.on(v.replace(".js",""), (e) => require("./event/"+v)(e,liana));
        console.log(warna("hijau", "Loaded"), warna("biru", v.replace(".js", "")));
    })

    liana.sendRequest = function(m){
        if(!(liana.errorCode && liana.errorMessage && liana.error)) return axios;
        const base_config = {
            'User-Agent': userAgent(config)
        }
        const get = (url,conf) => new Promise((resolve,reject) => {
            liana.sendMessage(m.chat,{react: {
                text: "⏳",
                key: m.key
            }});
            axios.get(url,{...conf,...base_config}).then(r => {
                const data = r.data;
                if(data.error){
                    liana.sendMessage(m.chat,{text: liana.error(data.error)});
                    // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                    return resolve({status: r.status,data: data})
                }else{
                    // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                    return resolve({status: r.status,data: data})
                }
            }).catch(err => {
                liana.sendMessage(m.chat,{text: liana.error(err.status||err.message)});
                // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                return reject(err)
            });
        });
        const post = (url,data,conf) => new Promise((resolve,reject) => {
            liana.sendMessage(m.chat,{react: {
                text: "⏳",
                key: m.key
            }});
            axios.post(url,data,{...conf,...base_config}).then(r => {
                const data = r.data;
                if(data.error){
                    // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                    liana.sendMessage(m.chat,{text: liana.error(data.error)});
                    return resolve({status: r.status,data: data})
                }else{
                    // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                    return resolve({status: r.status,data: data})
                }
            }).catch(err => {
                liana.sendMessage(m.chat,{text: liana.errorMessage(err.status||err.message)});
                // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                return reject(err)
            });
        });

        return ({get,post})
    }

    await isset(liana?.user) ? liana.user.jid = liana.user.id.split("@")[0].split(":")[0] + "@s.whatsapp.net" : liana.user;
    
    liana.ev.on(`creds.update`, async function() {
        saveCreds(...arguments);
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

    global.debugid = {};
    global.muteFromBot = global.muteFromBot||{};
    
    counterpesan = 0;

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
    setInterval(() => {
        global.glimit_chat = {};
    },10_000)
    // console.log(liana.user)

    
    


    





    

    global.call_limit = global.call_limit||{};

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
