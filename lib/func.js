const File_System = require(`fs`);
const path = require('path');
const os = require("os");
const crypto = require('crypto');
const Axios = require("axios");
const util = require("util");
const child_process = require("child_process");

const { randomBytes, createHash } = crypto;
const { exec, spawn } = child_process;
const { promisify, format } = util;

const MyCPU = os.cpus();

module.exports = config => {
    function func(key) {
        return func[key];
    }

    func.os = os;
    func.crypto = crypto;
    
    func.userAgent = function ({Nama_Bot = "UNKNOWN BOT",Nomor_Bot = NaN,Nama_Owner = "UNKNOWN",Nomor_Owner=NaN}) {
        const platform = os.platform();          // 'linux', 'darwin', 'win32'
        const arch = os.arch();                 // 'x64', 'arm64', dll
        const release = os.release();          // versi OS, misal '5.15.0-84-generic'
        const cpu = MyCPU[0].model;           // model CPU pertama
        const totalCores = MyCPU.length;     // Mendapatkan jumlah core CPU
        return `${func.IDGenerate(Nomor_Bot.toString()+"@s.whatsapp.net")[0]}/${((Array.isArray(global.version) ? global.version.join(".") : global.version)||0)} (${platform}; ${arch}; ${release}; ${Nama_Owner}; ${Nama_Bot} ${cpu} ${totalCores} Core)`;
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
            const id = userId.split(":")[0].split("@")[0];
            if(id) {
                data.write(id, 8)
                data.write('@c.us', 8 + id.length)
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
    
    func["warna"] = (color="reset_text",text = "") => `${func.color[color]||func.color.reset_text}${(format(text)).split(`\n`).map(v => `${func.color[color]}${v}`).join(`\n`)}${func.color.reset_text}${func.color.reset_bg}`;
    
    func["fs"] = {
        load: File_System.readFileSync,
        aload: File_System.promises.readFile,
        save: File_System.writeFileSync,
        asave: File_System.promises.writeFile,
        cek: File_System.existsSync,
        dir: File_System.readdirSync,
        del: File_System.unlinkSync,
        delete: File_System.unlinkSync,
        isDir: (path_string) => File_System.lstatSync(path_string).isDirectory(),
        isFile: (path_string) => File_System.lstatSync(path_string).isFile(),
        ...File_System,
    }

    func.isLid = (str) => str.includes('@lid');
    func.isGroup = (str) => str.includes('@g.us');
    func.isWhatsapp = (str) => str.includes('@s.whatsapp.net');
    func.isJid = (str) => !func.isLid(str) && (func.isGroup(str)||func.isWhatsapp(str));

    func.searchIsLidOrNot = function (remoteid1='',remoteid2='',type = 'lid') {
        switch (type.toLocaleLowerCase()) {
            case 'lid':
                if(func.isLid(remoteid1)) return remoteid1;
                if(func.isLid(remoteid2)) return remoteid2;
                break;
            case 'g.us':
            case 'g':
            case 'group':
            case 'grup':
                if(func.isGroup(remoteid1)) return remoteid1;
                if(func.isGroup(remoteid2)) return remoteid2;
                break;
            case 's.whatsapp.com':
            case 'pm':
            case 'chat':
                if(func.isWhatsapp(remoteid1)) return remoteid1;
                if(func.isWhatsapp(remoteid2)) return remoteid2;
                break;
            case 'pn':
            case 'jid':
                if(func.isJid(remoteid1)) return remoteid1;
                if(func.isJid(remoteid2)) return remoteid2;
                break;

        
                break;
        }
        if(type == 'lid') {
            if(func.isLid(remoteid1)) return remoteid1;
            if(func.isLid(remoteid2)) return remoteid2;
        } else if (type == 'g.us') {

        } else {
            if(!func.isLid(remoteid1)) return remoteid1;
            if(!func.isLid(remoteid2)) return remoteid2;
        }
    }

    func.tolink = async function (buffer,fileName = `undefined.xiex`) {
        const fileBase64 = Buffer.from(buffer).toString("base64")
        const {data} =  await func.axios.post(`http://upload.xiex.my.id/`, {file: {data: fileBase64, name: fileName}})
        return data;
    }
    
    func.smsg = (conn, messagena, store) => {
        const {
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
        } = conn.Baileys

        
    
    
        var m = messagena;
        if (!m) return m
        m.Barqah = {};
        m.summarize = {};
        let M = proto.WebMessageInfo
        if (m.key) {
            m.id = m.key.id
            m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
            m.isBotBrainxiex = m.key.id.startsWith('BarqahXiex') || m.key.id.startsWith('BRAINXIEX')
            m.chat = func.searchIsLidOrNot(m.key.remoteJidAlt, m.key.remoteJid, 'pn');
            m.fromMe = m.key.fromMe
            m.isGroup = m.chat.endsWith('@g.us')
            m.isLid = m.key.addressingMode == 'lid';
            m.isPn = m.key.addressingMode == 'pn';
            m.senderLid = conn.decodeJid(m.fromMe && conn.user.lid || func.searchIsLidOrNot((m.participant || m.key.participant || m.key.remoteJid),(m.participantAlt || m.key.participantAlt || m.key.remoteJidAlt), 'lid') || m.chat || '')
            m.senderJid = conn.decodeJid(m.fromMe && conn.user.id  || func.searchIsLidOrNot((m.participant || m.key.participant || m.key.remoteJid),(m.participantAlt || m.key.participantAlt || m.key.remoteJidAlt), 'pn' ) || m.chat || '')
            m.senderLid = store.getLid(m.senderLid,'lid') || store.getLid(m.senderJid,'lid') || m.senderLid;
            m.senderJid = store.getLid(m.senderLid,'pn') || store.getLid(m.senderJid,'pn') || m.senderJid;
            m.sender = m.senderJid || m.senderLid;
            m.saha = m.sender;
            m.nomor = m.saha.split(`@`)[0]
            // m.chat = m.isGroup ? m.chat : m.sender;
            if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
            m.delete = () => conn.sendMessage(m.chat,{delete: m.key});
            m.pushName = m.pushName || store?.contacts?.[m.senderJid]?.name || (m.fromMe && m.user?.name) || m.nomor;
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
                if (typeof m.quoted === 'string' || !func.isset(m.quoted)) m.quoted = {
                    text: m.quoted
                }
                m.quoted.mtype = `${type}`||`undefinedMessage`
                m.quoted.type = `${m.quoted.mtype}`.replace(`Message`,``)
                m.quoted.id = m.msg?.contextInfo.stanzaId
                m.quoted.chat = m.msg?.contextInfo.remoteJid || m.chat 
                m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')                
                m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
                m.quoted.isBotBrainxiex = m.quoted.id ? m.quoted.id.startsWith('BarqahXiex') || m.quoted.id.startsWith('BRAINXIEX') : false
                m.quoted.participant = conn.decodeJid(m.msg?.contextInfo.participant);
                m.quoted.fromMe = store.getLid(m.quoted.participant,'pn') === conn.decodeJid(conn.user && conn.user.id)
                m.quoted.isLid = func.isLid(m.quoted.participant)
                m.quoted.isPn =  !func.isLid(m.quoted.participant)
                m.quoted.senderLid = conn.decodeJid(m.quoted.fromMe && conn.user.lid) || store.getLid(m.quoted.participant,'lid')
                m.quoted.senderJid = conn.decodeJid(m.quoted.fromMe && conn.user.id)  || store.getLid(m.quoted.participant,'pn')
                m.quoted.sender = m.quoted.senderJid || m.quoted.senderLid;
                m.quoted.nomor = m.quoted.sender?.split("@")[0]
                m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
                m.quoted.mentionedJid = m.msg?.contextInfo ? m.msg?.contextInfo.mentionedJid : []
                m.getQuotedObj = m.quoted.fetchSmsg = m.getQuotedMessage = async () => {
                    if (!m.quoted.id) return false
                    let q = store.loadMessage(m.chat, m.quoted.id, conn)
                    return func.smsg(conn, q, store)
                }
                if(m.quoted.id){
                    const q = store.loadMessage(m.chat, m.quoted.id, conn);
                    if(q && q.id)  m.quoted = {...m.quoted, ...q};
                }
                let vM = m.quoted.fakeObj = M.create({
                    key: {
                        remoteJid: m.quoted.chat,
                        fromMe: m.quoted.fromMe,
                        id: m.quoted.id,
                        ...(m.quoted.isGroup ? {participant: m.quoted.senderLid} : {})
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
        * Copy this message
        */
        m.copy = () => func.smsg(conn, M.create(M.toObject(m)))
    
        /**
         * 
         * @param {*} jid 
         * @param {*} forceForward 
         * @param {*} options 
         * @returns 
         */
        m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)
    
        
        if(typeof m.body == "string") {
            m.cmd = m.body.slice(1).trim().split(' ').shift().toLowerCase();
            m.awalan = m.body.slice(0).trim().split(' ').shift().toLowerCase();
            m.arg = m.body.trim().split(/ +/).slice(1).join(" ");
        }

        
        m.nyarios = (text) => conn.sendMessage(m.chat,text,{quoted:m});


        m.summarize = async (msg = func.smsg(conn, messagena, store)) => {
            if (!msg) return null;

            const pickMediaContent = (src, preferQuoted = true) => {
                const pickFrom = (obj) => {
                    if (!obj) return null;
                    if (obj.msg) return obj.msg;
                    if (obj.message && conn?.Baileys?.getContentType) {
                        const type = conn.Baileys.getContentType(obj.message);
                        return obj.message?.[type];
                    }
                    return obj;
                };
                if (preferQuoted && src?.quoted) return pickFrom(src.quoted) || pickFrom(src);
                return pickFrom(src);
            };

            const buildSummary = async (src, includeQuoted = true) => {
                if (!src) return null;
                const isGroup = src.isGroup ?? (src.chat ? src.chat.endsWith('@g.us') : false);
                const chatId = src.chat || src.remoteJid || msg.chat;
                const groupMeta = store?.group?.[chatId] || {};
                const groupName = isGroup
                    ? (typeof groupMeta === "string" ? groupMeta : (groupMeta.subject || groupMeta.name || chatId))
                    : undefined;

                const key = {
                    id: src.id || src.key?.id,
                    remoteJid: chatId,
                    fromMe: src.fromMe ?? src.key?.fromMe,
                    isGroup,
                    senderLid: src.senderLid,
                    senderJid: src.senderJid,
                    pushName: src.pushName || store?.contacts?.[src.senderJid]?.name || store?.contacts?.[src.senderLid]?.name || src.nomor,
                    groupName,
                    groupDesc: isGroup && includeQuoted ? (groupMeta.desc || groupMeta.description || '') : undefined
                };

                const body = src.body || src.text || src.caption || src.conversation || src.contentText || src.selectedDisplayText || src.title || '';
                const message = { body };

                const mediaMessage = pickMediaContent(src, includeQuoted);
                const mime = mediaMessage?.mimetype || '';
                const isMedia = /image|video|sticker|audio|application|text/.test(mime);
                if (isMedia && conn.downloadAndSaveMediaMessage) {
                    const filePath = await conn.downloadAndSaveMediaMessage(mediaMessage).catch(() => false);
                    if (filePath) {
                        const fileName = filePath.split(`/temp/`)[1] || path.basename(filePath);
                        const fileData = func.fs.load(filePath);
                        const url = conn.tolink ? await conn.tolink(fileData, fileName) : await func.tolink(fileData, fileName);

                        const type =
                            /webp/.test(mime)  ? 'sticker'  :
                            /image/.test(mime) ? 'image'    :
                            /video/.test(mime) ? 'video'    :
                            /audio/.test(mime) ? 'audio'    :
                                                 'document';

                        message.mimetype = mime;
                        message[type] = { url };
                        message.caption = body;
                    } else {
                        message.text = body;
                    }
                } else {
                    message.text = body;
                }

                if (includeQuoted && src.quoted) {
                    message.quoted = await buildSummary(src.quoted, false);
                }

                return { key, message };
            };

            return buildSummary(msg, true);
        }

        return m
    }
    
    func["sleep"] = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    func["random"] = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    func.isset = (ada) => ada == Error || ada == undefined || ada == null || ada == "" || ada == '""' ? false : true
    
    func.parseArgv = (str) => {
      const out = [];
      let buf = "", quote = null, esc = false;

      for (const c of str) {
        if (esc) { buf += c; esc = false; continue; }
        if (c === "\\") { esc = true; continue; }

        if ((c === '"' || c === "'")) {
          if (!quote) quote = c;
          else if (quote === c) quote = null;
          continue;
        }

        if (c === " " && !quote) {
          if (buf) out.push(buf), buf = "";
          continue;
        }

        buf += c;
      }

      if (buf) out.push(buf);
      return out;
    }


    func.exec = async (cmd, hasil) => {
      const commandExecutor = promisify(exec);
      const { stdout, stderr } = await commandExecutor(cmd);

      console.log(
        `executed: ${cmd}\n` +
        `Output: ${stdout ? "yes" : "no"}\n` +
        `Error: ${stderr ? "yes" : "no"}`
      );

      return hasil ? hasil(stderr, stdout, "") : { stdout, stderr };
    };


    func.spawn = (cmd, onData = () => {}) => {
      return new Promise((resolve, reject) => {
        const [CMD, ...ARGS] = func.parseArgv(cmd);

        const child = spawn(CMD, ARGS, {
          shell: false,
          stdio: ["inherit", "pipe", "pipe"]
        });

        child.stdout.on("data", onData);
        child.stderr.on("data", onData);

        child.on("error", reject);
        child.on("close", code => resolve(code));
      });
    };
    
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
        func.fs.watchFile(file, () => {
            func.fs.unwatchFile(file)
            console.info(`Update'${filename}'`)
            delete require.cache[file]
            require(file)
        })
        return file
    }
    
    
    func.dir = (nama) => {
        if (!func.fs.existsSync(nama)) func.fs.mkdirSync(nama,{recursive:true});
        return nama
    }
    
    func.dbdir = (a) => {
        return func.dir("./database/" + a + "/")
    }
    
    func.dbfile = (a,b) => {
        return func.dbdir(a) + b
    }

    func.db = {};

    func.db.write = func.db.save = (lokasi,value) => {
        if(typeof lokasi != "string") {
            console.error("lokasi wajib string !");
            return false
        }

        if(!(typeof lokasi == "string" || Buffer.isBuffer(value))) {
            console.error("value wajib string atau buffer !");
            return false
        }

        const fs = func.fs;

        let file = path.join(func.dbdir(),lokasi);
        file = path.resolve(file);

        let dir = path.dirname(dir);
        dir = func.dir(dir);

        if(!fs.cek(dir)) {
            console.error("File Directory",JSON.stringify(dir),"Not Found");
            return false
        }


        fs.save(file,value)

        return fs.cek(file)
    }

    func.db.read = func.db.load = (lokasi) => {
        if(typeof lokasi != "string") {
            console.error("lokasi wajib string !");
            return false
        }
        const fs = func.fs;

        let file = path.join(func.dbdir(),lokasi);
        file = path.resolve(file);

        let dir = path.dirname(dir);
        dir = func.dir(dir);

        if(!fs.cek(dir)) {
            console.error("File Directory",JSON.stringify(dir),"Not Found");
            return false
        }

        return fs.load(file)
    }
    
    func.FileAda = (a, b) => {
        if (func.fs.existsSync(a)) {
            return `${func.fs.load(a)}`
        } else {
            return b
        }
    }
    
    const Axios = require('axios');

    func.axios = Axios.create({
        headers: {
            "User-Agent": func.userAgent(config),
        },
    
        ...(config.proxy ? (() => {
            const u = new URL(config.proxy);
            return {
                proxy: {
                    protocol: u.protocol.replace(':',''),
                    host: u.hostname,
                    port: Number(u.port),
                    ...(u.username && {
                        auth: {
                            username: decodeURIComponent(u.username),
                            password: decodeURIComponent(u.password)
                        }
                    })
                }
            };
        })() : {})
    });

    func.media2buffer = async (a) => {
        if (!a.startsWith(`http`) && typeof a == `string`) {
            return func.fs.load(a);
        } else if (a.startsWith(`http`) && typeof a == `string`) {
            try {
                const response = await func.axios.get(a, { responseType: 'arraybuffer' });
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

    func.load = async(link, type = "string") => {
        const Buffer = await func.media2buffer(link);
        const data = `${Buffer}`;

        const tp = type.toLocaleLowerCase();
        if(tp == `json`){
            return jsonparse(data);
        } else if(tp == `number`){
            return Number.isNaN(Number(data))? 0 : Number(data);
        } else if(tp == `buffer`){
            return Buffer;
        } else {
            return data
        }
    }

    func.patchMessageBeforeSending = (message) => {
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

    func.getMessage = async(key) => {
        if(store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message || undefined
        }
        // only if store is present
        return proto.Message.create({})
    }

    func.resize = async(buffer,x=300,y=300) => {
        const {data} = await func.axios.post(`${config.baseURL}/api/image/resize?apikey=${config.apikey}`,{buffer,x,y},{ responseType: 'arraybuffer' });
        const result = await Buffer.from(data, "utf-8");
        return result;
    }

    func.errorCode = {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        200: "OK",
        201: "Created",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Moved Temporarily",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Time-out",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Large",
        415: "Unsupported Media Type",
        416: "Requested Range Not Satisfiable",
        417: "Expectation Failed",
        418: "I'm a teapot",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Too Early",
        426: "Upgrade Required",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Time-out",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        509: "Bandwidth Limit Exceeded",
        510: "Not Extended",
        511: "Network Authentication Required"
    }
    func.errorMessage = {
        econnreset: "Koneksi terputus secara mendadak.",
        etimedout: "Waktu koneksi ke server telah habis.",
        enotfound: "Server tujuan tidak ditemukan.",
        eai_again: "Terjadi kesalahan DNS, server tidak dapat dijangkau.",
        econnrefused: "Koneksi ditolak oleh server.",
        404: "Halaman yang diminta tidak ditemukan.",
        500: "Kesalahan internal server.",
        403: "Akses ditolak untuk sumber daya yang diminta.",
        401: "Autentikasi diperlukan, namun kredensial yang sah tidak tersedia.",
        canceled: "Permintaan dibatalkan sebelum respons diterima."
      }
      
    func.error = function(error){
        const e = (a) => `${error}`.toLocaleLowerCase().includes(a);
        if(e("apikey salah")) return `Apikey tidak valid. Silakan hubungi admin melalui *${config.Prefix}owener* untuk verifikasi Apikey`;
        if(e("apikey") && (e("kurang")||e("habis"))) return `Kuota Apikey telah habis. Silakan hubungi admin melalui *${config.Prefix}owener* untuk pembaruan APIKEY`;

        if(func.errorCode[error]) return func.errorCode[error];
        if(func.errorMessage[error]) return func.errorMessage[error];

        return error;
    }

    func.detectFileType = function (buffer) {
        if (!(Buffer.isBuffer(buffer)||typeof buffer == 'string') || buffer.length < 4) {
            return { ext: 'unknown', mime: 'application/octet-stream' };
        }

        const hex = buffer.toString('hex', 0, 32);
        const text = buffer.toString('utf8', 0, Math.min(buffer.length, 4096));

        // =====================================================
        // IMAGE
        // =====================================================
        if (hex.startsWith('89504e47')) return { ext: 'png', mime: 'image/png' };
        if (hex.startsWith('ffd8ff'))   return { ext: 'jpg', mime: 'image/jpeg' };
        if (hex.startsWith('47494638')) return { ext: 'gif', mime: 'image/gif' };
        if (hex.startsWith('424d'))     return { ext: 'bmp', mime: 'image/bmp' };
        if (hex.startsWith('52494646') && text.includes('WEBP')) return { ext: 'webp', mime: 'image/webp' };

        // =====================================================
        // VIDEO
        // =====================================================
        if (hex.includes('66747970'))   return { ext: 'mp4', mime: 'video/mp4' };
        if (hex.startsWith('1a45dfa3')) return { ext: 'mkv', mime: 'video/x-matroska' };
        if (hex.startsWith('52494646') && text.includes('AVI')) return { ext: 'avi', mime: 'video/x-msvideo' };

        // =====================================================
        // AUDIO
        // =====================================================
        if (hex.startsWith('494433')) return { ext: 'mp3', mime: 'audio/mpeg' };
        if (hex.startsWith('fff1') || hex.startsWith('fff9')) return { ext: 'aac', mime: 'audio/aac' };
        if (hex.startsWith('4f676753')) return { ext: 'ogg', mime: 'audio/ogg' };
        if (hex.startsWith('52494646') && text.includes('WAVE')) return { ext: 'wav', mime: 'audio/wav' };
        if (hex.startsWith('664c6143')) return { ext: 'flac', mime: 'audio/flac' };

        // =====================================================
        // DOCUMENT
        // =====================================================
        if (hex.startsWith('25504446')) return { ext: 'pdf', mime: 'application/pdf' };

        // =====================================================
        // ARCHIVE & OFFICE (ZIP BASED)
        // =====================================================
        if (hex.startsWith('504b0304')) {
            if (text.includes('word/')) return { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
            if (text.includes('ppt/')) return { ext: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };
            if (text.includes('xl/')) return { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
            return { ext: 'zip', mime: 'application/zip' };
        }

        if (hex.startsWith('52617221')) return { ext: 'rar', mime: 'application/x-rar-compressed' };
        if (hex.startsWith('377abcaf271c')) return { ext: '7z', mime: 'application/x-7z-compressed' };
        if (hex.startsWith('1f8b08')) return { ext: 'gz', mime: 'application/gzip' };

        // =====================================================
        // SCRIPT / TEMPLATE / BXML
        // =====================================================
        if (/\bimport\s+.*?from\s+['"]/i.test(text)) return { ext: 'js', mime: 'application/javascript', dangerous: false };
        if (/^\s*export\s+.*$/m.test(text)) return { ext: 'js', mime: 'application/javascript', dangerous: false };
        
        if (/\bimport\s+.*?from\s+['"]/i.test(text)) return { ext: 'esm.js', mime: 'application/javascript', dangerous: false };
        
        if (/^\s*(export\s+default|export\s+\{)/.test(text)) return { ext: 'esm.js', mime: 'application/javascript', dangerous: false };
        
        if (/^\s*import\s+.*?;\s*\n/.test(text)) return { ext: 'typescript', mime: 'application/typescript', dangerous: false };
        if (/^\s*export\s+.*?;\s*\n/.test(text)) return { ext: 'typescript', mime: 'application/typescript', dangerous: false };

        if (/<\?(php|=)/i.test(text)) return { ext: 'php', mime: 'application/x-php', dangerous: true };

        if (/<script\s+nodejs\s*>[\s\S]*?<\/script>/i.test(text)) return {
            ext: 'bxml',
            mime: 'application/x-bxml',
            dangerous: true,
            reason: 'nodejs script tag'
        };

        if (/\({3,}[\s\S]*?\){3,}/.test(text)) return {
            ext: 'bxml',
            mime: 'application/x-bxml',
            dangerous: true,
            reason: 'expression parentheses injection'
        };

        if (/\{\{\s*get\s+[^}]+\}\}/i.test(text)) return {
            ext: 'bxml',
            mime: 'application/x-bxml',
            dangerous: true,
            reason: 'template get injection'
        };

        if (/\{\{[^}]{1,200}\}\}/.test(text)) return {
            ext: 'bxml',
            mime: 'application/x-bxml',
            dangerous: true,
            reason: 'generic template injection'
        };

        // =====================================================
        // FALLBACK
        // =====================================================
        return { ext: 'unknown', mime: 'application/octet-stream' };
    }

    func.hasModule = (name) => {
        try {
            require.resolve(name);
            return true;
        } catch (e) {
            return false;
        }
    }

    func.pathJoin = path.join;
    func.pathResolve = path.resolve;


    

    return func;
}
