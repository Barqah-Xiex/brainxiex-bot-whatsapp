const id = `aiInChat`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs,sleep} = func

    const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
    const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
    const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;

    sock.NotVIPDetected = sock.NotVIPDetected || {};
    if(sock.NotVIPDetected[m.sender] && !isTempatUtama) return 1;

    if(m.key.fromMe) return 0;
    if(Object.keys(sock.Command).includes(cmd)) return 0;
    if(Object.keys(sock.Command).includes(awalan.toLowerCase())) return 0;


    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []));
    
    const istaagged = mentioned.includes(sock.user.jid) || body.toLowerCase().includes(`bot`) || body.toLowerCase().includes(`${Nama_Bot}`) || body.toLowerCase().includes(`cuy`);
    
    
    
    if(isGroup && !istaagged) return 0;
    if(sock.aidisable) return 1;
    
    await sock.sendMessage(id,{react: {
        text: "💬",
        key: m.key
    }});
    await sock.sendPresenceUpdate("composing",id);
    const ai_answer = await ai(body,m,sock);
    await sock.sendMessage(id, ai_answer, {quoted:m});
    await sleep(3000);
    await sock.sendPresenceUpdate("available",id);
    await sock.sendMessage(id,{react: {text: '✅', key: m.key}});

    

    // const ai_answer = await ai(body,m,sock);
    // const buttons = ai_answer.split(` ) ₊⁺₊⁺₊⁺₊⁺₊⁺*\n\n`).map(v => v.split(`\n\n*₊⁺₊⁺₊⁺₊⁺₊⁺ ( `)[0]).filter(v => !v.includes(`₊⁺₊⁺₊⁺₊⁺₊⁺ ( `)).map(v => ({
    //     name: "cta_copy",
    //     buttonParamsJson: JSON.stringify({
    //         display_text: `(copy) `+v.slice(0,10)+"...",
    //         id: `${new Date().getTime()}`,
    //         copy_code: v
    //     })
    // }));
    // buttons.shift();
    
    // nyarios(ai_answer);
    // console.log(ai_answer);
    // sock.sendMessage(id, ai_answer, {quoted:m});
    
}
module.exports = {id,action};