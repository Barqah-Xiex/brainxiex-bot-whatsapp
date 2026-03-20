const pino = require('pino');
const {Boom} = require('@hapi/boom');
const qrcode = require(`qrcode`);


const PhoneNumber = require('awesome-phonenumber');
const path = require('path');
const f = require(`util`).format

module.exports = async (Baileys, config, func) => {
    const {
        default: conn,
        DisconnectReason,
        useSingleFileAuthState,
        fetchLatestBaileysVersion,
        generateForwardMessageContent,
        prepareWAMessageMedia,
        generateWAMessageFromContent,
        downloadContentFromMessage,
        makeInMemoryStore,
        jidDecode,
        proto,
        BufferJSON,
        initAuthCreds,
        useMultiFileAuthState,
        downloadMediaMessage,
        downloadAndSaveMediaMessage,
        MessageRetryMap,
        generateWAMessage,
        delay,
        getContentType,
        getBinaryNodeChild,
        Browsers
    } = Baileys

    const {
        userAgent,
        IDGenerate,
        generateMessageID,
        color,
        warna,
        fs,
        smsg,
        sleep,
        random,
        isset,
        exec,
        isJSONString,
        jsonparse,
        autorefresh,
        dir,
        dbdir,
        dbfile,
        FileAda,
        axios,
        media2buffer,
        load,
        patchMessageBeforeSending,
        getMessage,
        resize,
        error,
        errorCode,
        errorMessage,
    } = func

    const {
        mobile,
        Nomor_Owner,
        Nama_Owner,
        Nama_Bot,
        Nomor_Bot,
        Prefix,
        Password_Bot,
        banner,
        welcomer,
        promote,
        autoBlockCall,
        limit_welcomer,
        limit_chat,
        ketik,
        AutoUpdate,
        Addons,
        pakeQRweb,
        port,
        printQRInTerminal,
        debug,
        session,
        silent,
        sewa,
        loading
    } = config


    

    const {
        state,
        saveCreds,
        // store: _store
    } = await useMultiFileAuthState(`${session||`session`}`);

    let logger = pino({ level: "silent" })
    let browser = config.browser || ["Windows", "Chrome", "Chrome 114.0.5735.198"]
    let auth = state
    let keepAliveIntervalMs = 30 * 1000
    let markOnlineOnConnect = false
    let connectTimeoutMs = 60_000
    let syncFullHistory = false
    let defaultQueryTimeoutMs = 0
    let generateHighQualityLinkPreview = true
    

    const configConnect = {
        logger,
        printQRInTerminal:false,
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
    if(config.proxy){
        if(func.hasModule('https-proxy-agent')) {
            const { HttpsProxyAgent } = require('https-proxy-agent');
            configConnect.agent = new HttpsProxyAgent(config.proxy);
        } else {
            console.warn(`proxy for agent canceled becaus https-proxy-agent not installed. "npm i https-proxy-agent"`)
        }

        if(func.hasModule('undici')) {
            const { ProxyAgent } = require('undici');
            configConnect.options = {
                dispatcher: new ProxyAgent(config.proxy),
                ...(configConnect.options || {})
            }
        }
    }
    const liana = conn(configConnect);

    const store = liana.signalRepository.lidMapping
    store.contacts = fs.cek(`./database/contacs.json`) ? jsonparse(`${fs.load(`./database/contacs.json`)}`) : {}
    store.group = fs.cek(`./database/group.json`) ? jsonparse(`${fs.load(`./database/group.json`)}`) : {}
    store.lid = fs.cek(`./database/lid.json`) ? jsonparse(`${fs.load(`./database/lid.json`)}`) : {}
    store.msg = {}
    store.rec = { grup: {}, chat: {} }
    /**
     * Load a cached message from store
     * @param {string} chat - chat id
     * @param {string} id - message id
     * @param {*} lin - optional unused param
     * @returns {object} stored message
     */
    store.loadMessage = function (chat, id, lin) {
        const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-');
        const path = func.pathResolve(func.pathJoin(`./database/msg/`,fixFileName(chat),fixFileName(id)));
        if(fs.cek(path)) {
            try {
                return JSON.parse(fs.load(path));
            } catch (e) {
                null;
            }
        }
        return store["msg"][chat][id]
    }
    store.saveMessage = async function () {
        const dbdir = func.pathResolve(`./database/msg/`);
        if(!fs.cek(dbdir)) fs.mkdirSync(dbdir, {recursive: true});
        
        const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-');

        for (const chat in store.msg) {
            const dir = func.pathJoin(dbdir,fixFileName(chat));
            if(!fs.cek(dir)) fs.mkdirSync(dir, {recursive: true});

            for (const id in store.msg[chat]) {
                const file = func.pathJoin(dir,fixFileName(id));
                await fs.asave(file,JSON.stringify(store.msg[chat][id]));
            }            
        }
    }

    store.save = async () => {
        await fs.asave(`./database/contacs.json`,JSON.stringify(store.contacts));
        await fs.asave(`./database/group.json`, JSON.stringify(store.group));
        await fs.asave(`./database/lid.json`, JSON.stringify(store.lid));
        
        await store.saveMessage();
    }

    store.getLid = function (sender, type = 'lid') {
        const mapped = store.lid[sender];
        if (!mapped) return;
        
        const senderIsLid = func.isLid(sender);
        const mappedIsLid = func.isLid(mapped);
        
        if (type === 'lid') return senderIsLid ? sender : (mappedIsLid ? mapped : undefined);
        return !senderIsLid ? sender : (!mappedIsLid ? mapped : undefined);
    };

    liana.store = store;
    liana.Baileys = liana.baileys = Baileys;
    liana.config = config;
    liana.func = func;
    liana.isSelf = false;
    liana.state = state;
    liana.saveCreds = saveCreds;
    liana.error = func.error;
    liana.errorCode = func.errorCode;
    liana.errorMessage = func.errorMessage;

    liana.saveCreds = async (...args) => {
        // _store.save(store);
        await store.save();
        return await saveCreds(...args);
    }

    liana.getPairingCode = (...arg) => new Promise(async (acc, rej) => {
        for (; true;) {
            await new Promise(resolve => setTimeout(resolve, 1500))
            if (!liana.ws.isOpen) continue
            const pairing = await liana.requestPairingCode(...arg).catch(console.error)
            acc(pairing)
            break
            return
        }
    })

    const Barqah_relayPesan = liana.relayMessage
    const Barqah_profilePictureUrl = liana.profilePictureUrl
    const Barqah_groupMetadata = liana.groupMetadata
    const Barqah_sendMessage = liana.sendMessage

    var countreq_metadatagrup = 0

    /**
     * Get a human-friendly name for a jid (from store or phone number formatting).
     * @param {string} jid - the jid to resolve
     * @param {boolean} [withoutContact=false] - unused flag kept for compatibility
     * @returns {string} display name or formatted phone number
     */
    liana.getName = (jid, withoutContact = false) => {
        const id = jid.split("@")[0] + "@s.whatsapp.net"
        return store.contacts[id]?.name || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    /**
     * Decode an encoded jid produced by Baileys (handles device/server parts).
     * @param {string} jid
     * @returns {string} decoded jid or original
     */
    liana.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return (decode.user && decode.server && decode.user + '@' + decode.server) || jid
        } else return jid
    }

    /**
     * Relay a message via the original relay implementation.
     * @returns {Promise<any>} result of underlying relayMessage
     */
    liana.relayMessage = function () {
        return Barqah_relayPesan(...arguments)
    }

    /**
     * Get profile picture URL for a jid. Caches result in store.contacts.
     * @param {string} orang - jid to query
     * @param {string} [type="preview"] - picture type
     * @param {number} [timeout=10000] - timeout in ms
     * @returns {Promise<string>} url of the profile picture
     */
    liana.profilePictureUrl = function (orang, type = "preview", timeout = 10000) {
        return new Promise(async (ok, no) => {
            if (store.contacts[orang]?.ppimg && store.contacts[orang]?.ppimg != `http://xiex.my.id/media/1655612010102undefined.png`) ok(store.contacts[orang].ppimg)
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
            }, timeout + 1000).catch(v => ok(store.contacts[orang]?.ppimg || `http://xiex.my.id/media/1655612010102undefined.png`))

            const child = (0, Baileys.getBinaryNodeChild)(res, 'picture')
            const ppimg = (_a = child === null || child === void 0 ? void 0 : child.attrs) === null || _a === void 0 ? void 0 : _a.url

            store.contacts = store.contacts || {}
            store.contacts[orang] = store.contacts[orang] || {}
            store.contacts[orang].ppimg = ppimg
            ok(ppimg)

            setTimeout(v => ok(store.contacts[orang]?.ppimg || `http://xiex.my.id/media/1655612010102undefined.png`), timeout)
        })
    }

    /**
     * Get group metadata, with local cache and simple throttle control.
     * @param {string} id - group jid
     * @param {boolean} [paksain=false] - force refresh
     * @returns {Promise<object>} group metadata
     */
    liana.groupMetadata = async function (id, paksain = false) {
        if (func.isset(store.group[id]) && countreq_metadatagrup < 5 && !paksain) {
            countreq_metadatagrup++
            return store.group[id]
        }
        countreq_metadatagrup = 0
        store.group[id] = await (await Barqah_groupMetadata(id).catch(v => ({
            id,
            subject: id,
            desc: ``,
            participants: [],
            ...store.group[id]
        })))
        return store.group[id]
    }

    /**
     * Send a message to a jid. Normalizes content shapes and adds mentions.
     * @param {string} jid - destination jid
     * @param {string|object} konten - text or message content object
     * @param {object} [options] - send options
     * @returns {Promise<any>} underlying sendMessage result
     */
    liana.sendMessage = (jid, konten, options) => {
        try {
            if (isset(konten?.text)) konten.text = konten.text
            if (isset(konten?.caption)) konten.caption = konten.caption
            const content = Object.keys(konten).includes("audio")
                ? { ...konten, ptt: true, mimetype: liana.Baileys.getDevice(options?.quoted?.id) == 'ios' ? 'audio/mpeg' : 'audio/mp4', ...konten }
                : typeof konten == "string" ? { text: konten } : konten
            return Barqah_sendMessage(jid, { mentions: liana.parseMention(`${content?.caption} ${content?.text}`), ...content }, { messageId: generateMessageID(), ...options }).catch(e => console.error(e))
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Delete a message by sending a delete protocol message.
     * @param {object} m - message object (must include chat, id, sender)
     * @returns {Promise<any>} result of sendMessage(delete)
     */
    liana.deleteMessage = (m) => {
        const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.id,
            participant: m.sender,
            ...m.key
        }
        return liana.sendMessage(m.chat, { delete: key })
    }

    /**
     * Edit a previously sent message (sends protocol edit message).
     * @param {object} m - original message object
     * @param {string|object} message - new message content or conversation text
     * @returns {Promise<any>} result of relayMessage
     */
    liana.editMessage = (m, message) => {
        const editedMessage = typeof message == `string` ? { conversation: message } : message
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

    /**
     * Send a loading sequence message: head, body frames, then final text. Returns an edit handler.
     * @param {string} id - destination jid
     * @param {string} text - final text
     * @param {number} [wait=0] - total wait time in ms distributed across frames
     * @returns {Promise<object>} a message object extended with editLoading function
     */
    liana.loadingMessage = async (id, text, wait = 0) => {
        const { head, body, foot } = loading
        const m = await liana.sendMessage(id, { text: head })
        for (const texloading of body) {
            await liana.editMessage(m, texloading)
            await sleep(wait / body.length)
        }
        await liana.editMessage(m, text || foot)
        const editLoading = (t) => liana.editMessage(m, t)
        return { ...m, editLoading }
    }

    /**
     * Remove participant(s) from a group.
     * @param {string} id - group jid
     * @param {string|string[]} orang - participant(s) to remove
     * @returns {Promise<any>} groupParticipantsUpdate result
     */
    liana.groupRemove = (id, orang) => {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], "remove")
    }

    /**
     * Promote participant(s) to admin in a group.
     * @param {string} id - group jid
     * @param {string|string[]} orang - participant(s) to promote
     * @returns {Promise<any>} groupParticipantsUpdate result
     */
    liana.groupMakeAdmin = (id, orang) => {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], "promote")
    }

    /**
     * Demote participant(s) from admin in a group.
     * @param {string} id - group jid
     * @param {string|string[]} orang - participant(s) to demote
     * @returns {Promise<any>} groupParticipantsUpdate result
     */
    liana.groupDemoteAdmin = (id, orang) => {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], "demote")
    }

    /**
     * Check if an id is a VIP (based on stored expiry timestamp).
     * @param {string} id
     * @returns {boolean}
     */
    liana.isVIP = (id) => Number(func.FileAda(`${func.dbfile(`vip`, id)}`, `${new Date().getTime()}`)) > new Date().getTime()
    /**
     * Add days to VIP expiration for id.
     * @param {string} id
     * @param {number} [hari=7]
     */
    liana.addVIP = (id, hari = 7) => {
        fs.save(func.dbfile(`vip`, id), (Number(func.FileAda(`${func.dbfile(`vip`, id)}`, `${new Date().getTime()}`)) + (Number(`${hari}`) * 24 * 60 * 60 * 1000)))
    }
    /**
     * Set VIP expiration to now + days for id.
     * @param {string} id
     * @param {number} [hari=7]
     */
    liana.setVIP = (id, hari = 7) => {
        fs.save(func.dbfile(`vip`, id), (new Date().getTime() + (Number(`${hari}`) * 24 * 60 * 60 * 1000)))
    }

    /**
     * Download media content from a message and return as Buffer.
     * @param {object} mek - message or wrapper object containing media
     * @returns {Promise<Buffer>} downloaded buffer
     */
    liana.downloadMediaMessage = async (mek) => {
        const message = isset(mek.msg) ? mek.msg : mek
        const m = message.mtype == "documentWithCaptionMessage" ? message.message.documentMessage : message
        // console.log(m)
        // console.log(JSON.stringify(m,null,2))
        let mime = (m.msg || m).mimetype || ''
        let messageType = m.mtype ? m.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(m, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    /**
     * Download a media message and save it to ./temp with proper extension.
     * @param {object} message - message to download
     * @param {string} filename - base filename without extension
     * @param {boolean} [attachExtension=true] - whether to append detected extension
     * @returns {Promise<string|undefined>} saved filepath or undefined on error
     */
    liana.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        try {
            const buffer = await liana.downloadMediaMessage(message)
            const dtype = func.detectFileType(buffer);
            const ecxtensi = await dtype
            trueFileName = "./temp/" + (attachExtension ? filename + '.' + (ecxtensi && ecxtensi.ext || "xiex") : filename)
            await fs.writeFileSync("./" + trueFileName, buffer)
            return trueFileName
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Copy and forward a message to another jid. Supports view-once handling.
     * @param {string} jid - destination jid
     * @param {object} message - original message to forward
     * @param {boolean} [forceForward=false]
     * @param {object} [options={}] - additional options for generateWAMessageFromContent
     * @returns {Promise<object>} generated WA message
     */
    liana.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            message.message.viewOnceMessage = { ...message.message.viewOnceMessage, ...message.message.viewOnceMessageV2 }
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
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
        await liana.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
        return waMessage
    }

    /**
     * Send an image with hydrated template buttons (up to 5 buttons).
     * @param {string} jid - destination jid
     * @param {object} content - content object containing image and optional templateButtons
     * @param {object} [options={}] - options forwarded to generateWAMessageFromContent
     */
    liana.send5ButImage = async (jid, content, options = {}) => {
        let message = await prepareWAMessageMedia(content, {
            upload: liana.waUploadToServer
        })
        const { text, caption, footer, templateButtons } = content
        var template = generateWAMessageFromContent(jid, proto.Message.create({
            templateMessage: {
                hydratedTemplate: {
                    imageMessage: message.imageMessage,
                    "hydratedContentText": text || caption,
                    "hydratedFooterText": footer,
                    "hydratedButtons": templateButtons || button || but
                }
            }
        }), options)

        liana.relayMessage(jid, template.message, {
            messageId: generateMessageID()
        })
    }

    /**
     * Send a buttons message constructed from arrays of ids and labels.
     * @param {object} m - original message (for quoted)
     * @param {string[]} a - array of button ids
     * @param {string[]} b - array of button display texts
     * @param {string|object} c - message text or object
     * @returns {Promise<any>} sendMessage result
     */
    liana.button = async (m, a, b, c) => {
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
        }
        return liana.sendMessage(m.chat, messagena, { quoted: m })
    }

    /**
     * Extract mention jids from text like @12345.
     * @param {string} [text='']
     * @returns {string[]} array of mention jids
     */
    liana.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + v[1].length > 12 ? '@lid' : '@s.whatsapp.net')
    }
    /**
     * Send read receipt for a message or message key.
     * @param {string|object} id - remoteJid or message key
     * @param {string} sender - participant jid (for groups)
     * @param {string} MessageID - id of the message to mark as read
     * @param {string} [type='read'] - type of receipt
     * @returns {Promise<any>} result of readMessages
     */
    liana.sendReadReceipt = function (id, sender, MessageID, type = `read`) {
        const key = {
            remoteJid: id,
            id: MessageID, // id of the message you want to read
            participant: sender // the ID of the user that sent the  message (undefined for individual chats)
        }
        return isset(sender) ? liana.readMessages([key]) : liana.readMessages([id.key])
    }

    /**
     * Relay a message and swallow errors (wrapper around original relay).
     * @param {string} id - target jid
     * @param {object} message - message payload
     * @param {object} [option]
     * @returns {Promise<any>} result or error object
     */
    liana.relayPesan = async function (id, message, option) {
        return await Barqah_relayPesan(...arguments).catch(v => v)
    }

    /**
     * Build a full WA message object without sending. Handles ephemeral and delete messages.
     * @param {string} jid - target jid
     * @param {object} content - message content
     * @param {object} [options={}] generation options
     * @returns {Promise<object>} generated full message
     */
    liana.bikinPesan = async function (jid, content, options = {}) {
        var _a, _b
        const userJid = liana.user.id
        if (typeof content === 'object' &&
            'disappearingMessagesInChat' in content &&
            typeof content['disappearingMessagesInChat'] !== 'undefined' && jid.endsWith("@g.us")) {
            const { disappearingMessagesInChat } = content
            const value = typeof disappearingMessagesInChat === 'boolean' ?
                (disappearingMessagesInChat ? Baileys.WA_DEFAULT_EPHEMERAL : 0) :
                disappearingMessagesInChat
            await liana.groupToggleEphemeral(jid, value)
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
                ...options
            })
            const isDeleteMsg = 'delete' in content && !!content.delete
            const additionalAttributes = {}
            // required for delete
            if (isDeleteMsg) {
                // if the chat is a group, and I am not the author, then delete the message as an admin
                if (((_a = content.delete) === null || _a === void 0 ? void 0 : _a.remoteJid).endsWith("@g.us") && !((_b = content.delete) === null || _b === void 0 ? void 0 : _b.fromMe)) {
                    additionalAttributes.edit = '8'
                } else {
                    additionalAttributes.edit = '7'
                }
            }
            fullMsg.key.id = generateMessageID()
            fullMsg.message = (0, Baileys.patchMessageForMdIfRequired)(fullMsg.message)
            fullMsg.option = { messageId: fullMsg.key.id, cachedGroupMetadata: options.cachedGroupMetadata, additionalAttributes }
            return fullMsg
        }
    }

    /**
     * (Duplicate) Extract mention jids from text like @12345.
     * @param {string} [text='']
     * @returns {string[]}
     */
    liana.parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')

    /**
     * My external IP address resolved at startup.
     * @type {string}
     */
    liana.MyIP = (await axios.get(`http://ip-api.com/json/`)).data.query

    /**
     * Send read receipt (duplicate definition for compatibility).
     * @param {string|object} id
     * @param {string} sender
     * @param {string} MessageID
     * @param {string} [type='read']
     * @returns {Promise<any>}
     */
    liana.sendReadReceipt = function (id, sender, MessageID, type = `read`) {
        const key = {
            remoteJid: id,
            id: MessageID, // id of the message you want to read
            participant: sender // the ID of the user that sent the  message (undefined for individual chats)
        }
        return isset(sender) ? liana.readMessages([key]) : liana.readMessages([id.key])
    }

    /**
     * Send a template (hydrated) message constructed from provided content and options.
     * @param {string} id - destination jid
     * @param {object} content - message content (text/caption and templateButtons)
     * @param {object} [option] - extra fields to merge into template
     * @param {object} [msgoption] - message options like mentions/contextInfo
     */
    liana.templateMessage = async function (id, content, option, msgoption) {
        const templateButtons = [
        ]
        const buttons = [
        ]
        const kirimke = id
        const msg = content.text || content.caption
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
        msgoption.contextInfo = {}
        msgoption.contextInfo.mentionedJid = msgoption.userJid || []

        let apanyacontent = {}
        apanyacontent[Object.keys(content)[0] + `Message`] = content[Object.keys(content)[0]]

        const pesannyaini = proto.Message.create({
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
        })

        const template = generateWAMessageFromContent(kirimke, pesannyaini, { userJid: liana.user.id.split("@")[0] + `@s.whatsapp.net`, ephemeralExpiration: 86400, ...msgoption })
        liana.relayMessage(kirimke, template.message, {
            messageId: generateMessageID()
        })
    }

    /**
     * Generate quoted contextInfo for a message so it can be used as a quoted message.
     * @param {object} m - message to quote
     * @param {boolean} [ctxInfo=true] - return {contextInfo} wrapper or raw contextInfo
     * @returns {object}
     */
    liana.generateQuoted = function (m, ctxInfo = true) {
        const key = Object.keys(m)[0]
        const participant = m.key.fromMe ? liana.user.jid : (m.participant || m.key.participant || m.key.remoteJid)
        let quotedMsg = Baileys.normalizeMessageContent(m.message)
        const msgType = (0, Baileys.getContentType)(quotedMsg)
        // strip any redundant properties
        quotedMsg = Baileys.proto.Message.create({ [msgType]: quotedMsg[msgType] })
        const quotedContent = quotedMsg[msgType]
        if (typeof quotedContent === 'object' && quotedContent && 'contextInfo' in quotedContent) {
            delete quotedContent.contextInfo
        }
        const contextInfo = m[key].contextInfo || {}
        contextInfo.participant = participant
        contextInfo.stanzaId = m.key.id
        contextInfo.quotedMessage = quotedMsg
        // if a participant is quoted, then it must be a group
        // hence, remoteJid of group must also be entered
        if (m.key.participant || m.participant) {
            contextInfo.remoteJid = m.key.remoteJid
        }
        // console.log(contextInfo)
        return ctxInfo ? { contextInfo } : contextInfo
    }

    /**
     * Send a banner/extended text message with externalAdReply and thumbnail.
     * @param {string} id - destination jid
     * @param {object|string} [content={}] - content object or text
     * @param {object} [options={}] - options forwarded into the extendedTextMessage
     * @param {boolean} [kirim=true] - whether to actually send the message
     * @returns {Promise<object>} constructed message
     */
    liana.banner = async function (id, content = {}, options = {}, kirim = true) {
        content = typeof content === 'string' ? { text: content } : content
        const { image, caption, text } = content
        const theLink = (image?.url || image || banner)
        const link = Buffer.isBuffer(theLink) ? thelink : theLink.replace('192.168.1.8', 'xiex.my.id').replace('192.168.1.9', 'xiex.my.id').trim()
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
        if (kirim) await liana.relayMessage(id, message, { messageId: generateMessageID() })
        return message
    }

    /**
     * Kick participant(s) from a group (alias for groupParticipantsUpdate remove)
     * @param {string} id - group jid
     * @param {string|string[]} orang
     * @returns {Promise<any>}
     */
    liana.kick = function (id, orang) {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], `remove`)
    }
    /**
     * Add participant(s) to a group (alias for groupParticipantsUpdate add)
     * @param {string} id - group jid
     * @param {string|string[]} orang
     * @returns {Promise<any>}
     */
    liana.add = function (id, orang) {
        return liana.groupParticipantsUpdate(id, (typeof orang == `object` && typeof orang !== `string`) ? orang : [orang], `add`)
    }

    /**
     * Convert a URL/path/Buffer to a Buffer. Supports http urls and local paths.
     * @param {string|Buffer} a - source to convert
     * @returns {Promise<Buffer>} buffer
     */
    liana.media2buffer = media2buffer;

    /**
     * Load content from a link or buffer and coerce into requested type.
     * @param {string|Buffer} link - source to load
     * @param {string} [type='string'] - 'json'|'number'|'buffer'|'string'
     * @returns {Promise<any>} parsed data
     */
    liana.load = load;

    /**
     * Resize an image via external API and return resized Buffer.
     * @param {Buffer|string} buffer - image buffer or link
     * @param {number} [x=300] - width
     * @param {number} [y=300] - height
     * @returns {Promise<Buffer>} resized image buffer
     */
    liana.resize = resize;

    /**
     * Send a request to a given URL with the specified method.
     * This function allows for both GET and POST requests.
     * @param {object} m - message object containing message details (like chat).
     * @returns {{get: function, post: function}} - object with get and post methods for making requests.
     */
    liana.sendRequest = function(m){
        if(!(liana.errorCode && liana.errorMessage && liana.error)) return axios;
        const base_config = {};
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
                liana.sendMessage(m.chat,{text: liana.error(err.status||err.message)});
                // liana.sendMessage(m.chat,{react: { text: "",key: m.key}});
                return reject(err)
            });
        });

        return ({get,post})
    }


    liana.ev.on('messages.upsert', async chatUpdate => {
        try {
            chatUpdate.messages.forEach(async(mek, keberapa) => {
                if (!mek) return
                if (!mek.message) return
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                const m = smsg(liana, mek, store);
                const {chat, sender, pushName, body, quoted, nomor } = m;

                if(!store.msg[chat]) return null;
                if(!store.msg[chat][id]) return null;
                

                if(!(pushName && `${pushName}`.trim())) return 0;
                
                if(chat.includes(`g`)){
                    store.rec.grup[chat] = true;
                }else{
                    store.rec.chat[chat] = true;
                }
                store.msg[chat] = store.msg[chat]||{}
                store.msg[chat][m.key.id] = m
                
                store.contacts[sender] = {...(store.contacts[sender]||{}), name: pushName, id: sender};
                // store.contacts[sender] = 

                
                const isNewLid = store.lid[sender];
                if(m.senderLid && m.senderJid && func.isLid(m.senderLid)) {
                    store.lid[m.senderLid] = m.senderJid;
                    store.lid[m.senderJid] = m.senderLid;

                    if(isNewLid) store.save();
                }
                if(m.isGroup) store.group[m.chat] = await (await liana.groupMetadata(m.chat).then().catch(v => ({subject: m.chat})));
            })
        } catch (err) {
            if(isset(err)) console.error(err);
        }
    })

    return liana
}

