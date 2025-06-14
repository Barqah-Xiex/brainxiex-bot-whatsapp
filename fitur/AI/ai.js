const cmd = `ai`;
const args = `[prompt]`;
const category = `AI`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey} = config;
    const {isset,fs,sleep} = func

	if(!isset(arg)) return nyarios("apa yang mau di tanyakan ?");
    // const buttons = ai_answer.split(` ) ₊⁺₊⁺₊⁺₊⁺₊⁺*\n\n`).map(v => v.split(`\n\n*₊⁺₊⁺₊⁺₊⁺₊⁺ ( `)[0]).filter(v => !(v.includes(`₊⁺₊⁺₊⁺₊⁺₊⁺ (`)||v.includes(`) ₊⁺₊⁺₊⁺₊⁺₊⁺`))).map(v => ({
    //     name: "cta_copy",
    //     buttonParamsJson: JSON.stringify({
    //         display_text: `(copy) `+v.slice(0,10)+"...",
    //         id: `${new Date().getTime()}`,
    //         copy_code: v
    //     })
    // }));
    // buttons.shift();
    
    await sock.sendMessage(id,{react: {
        text: "💬",
        key: m.key
    }});
    await sock.sendPresenceUpdate("composing",id);
    const ai_answer = await ai(arg,m,sock);
    await sock.sendMessage(id, ai_answer, {quoted:m});
    await sleep(3000);
    await sock.sendPresenceUpdate("available",id);
    await sock.sendMessage(id,{react: {text: '✅', key: m.key}});
}
module.exports = { cmd, args, category, message };