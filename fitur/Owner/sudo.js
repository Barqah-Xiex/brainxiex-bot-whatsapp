
const cmd = `sudo`; 
const args = `[tag] [cmd]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner, chatUpdate} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []))

    
    
    
    

    if(!isOwner||config.publicbot) return nyarios(`kamu bukan Owner`);
    if(!isset(arg)) return nyarios(`mana argumennya ?`);
    if(mentioned[0] == m.sender) return nyarios(`tag orangnya`);
    const argsplit = arg.split(` `);
    const target = argsplit[0];
    const command = arg.replace(`${target} `,``);
    
    let messages = await sock.Baileys.generateWAMessage(m.chat, {
        text: command,
        mentions: mentioned
    }, {
        userJid: sock.user.id,
        quoted: sock.Baileys.proto.WebMessageInfo.fromObject({
            key: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.id
            },
            message: m.message,
            ...(m.isGroup ? {
                participant: mentioned[0]
            } : {})
        })
    })
    messages.key.fromMe = false
    messages.key.id = id
    messages.pushName = `sudoers`
    if (m.isGroup) messages.participant = mentioned[0]
    let msg = {
        ...chatUpdate,
        messages: [sock.Baileys.proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
    }
    sock.ev.emit('messages.upsert', msg)


    
}
module.exports = {cmd,args,category,message};

