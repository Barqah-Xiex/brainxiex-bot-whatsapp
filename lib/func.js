const File_System = require(`fs`);
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
    
    func.userAgent = function ({Nama_Bot = "UNKNOWN BOT",Nomor_Bot = NaN,Nama_Owner = "UNKNOWN",Nomor_Owner=NaN}) {
        const platform = os.platform();      // 'linux', 'darwin', 'win32'
        const arch = os.arch();              // 'x64', 'arm64', dll
        const release = os.release();        // versi OS, misal '5.15.0-84-generic'
        const cpu = MyCPU[0].model;      // model CPU pertama
        const totalCores = MyCPU.length; // Mendapatkan jumlah core CPU
        return `${func.IDGenerate(Nomor_Bot.toString()+"@s.whatsapp.net")[0]}/${((Array.isArray(global.version) ? global.version.join(".") : global.version)||0)} (${platform}; ${arch}; ${release}; ${cpu} ${totalCores} Core)`;
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
        let M = proto.WebMessageInfo
        if (m.key) {
            m.id = m.key.id
            m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
            m.isBotBrainxiex = m.key.id.startsWith('BarqahXiex') || m.key.id.startsWith('BRAINXIEX')
            m.chat = m.key.remoteJid
            m.fromMe = m.key.fromMe
            m.isGroup = m.chat.endsWith('@g.us')
            m.senderLid = conn.decodeJid(m.fromMe && conn.user.id || m.participantAlt|| m.participant || m.key.participant || m.chat || '')
            m.senderJid = conn.decodeJid(m.fromMe && conn.user.id || m.participantAlt || m.key.participantAlt || m.chat || '')
            m.sender = m.senderJid || m.senderLid
            m.saha = m.senderLid || m.senderJid
            m.nomor = m.saha.split(`@`)[0]
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
                if (typeof m.quoted === 'string' || !func.isset(m.quoted)) m.quoted = {
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
                let vM = m.quoted.fakeObj = M.create({
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
        m.copy = () => smsg(conn, M.create(M.toObject(m)))
    
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
    
    func["dir"] = function(nama) {
        if (!fs.existsSync(nama)) {
            fs.mkdirSync(nama);
        }
        return nama
    }
    
    
    func.dbdir = (a) => {
        return func.dir("./database/" + a + "/")
    }
    
    func.dbfile = (a,b) => {
        return func.dbdir(a) + b
    }
    
    func.dir = (nama) => {
        if (!func.fs.existsSync(nama)) {
            func.fs.mkdirSync(nama,{recursive:true});
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
    
    func.axios = Axios.create({
        headers: {
            "User-Agent": func.userAgent(config),
        }
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
        const e = (a) => error.toLowerCase().includes(a);
        if(e("apikey salah")) return `Apikey tidak valid. Silakan hubungi admin melalui *${config.Prefix}owener* untuk verifikasi Apikey`;
        if(e("apikey") && (e("kurang")||e("habis"))) return `Kuota Apikey telah habis. Silakan hubungi admin melalui *${config.Prefix}owener* untuk pembaruan APIKEY`;

        if(func.errorCode[error]) return func.errorCode[error];
        if(func.errorMessage[error]) return func.errorMessage[error];

        return error;
    }

    return func;
}
