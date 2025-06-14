const cmd = `gpt`;
const args = `[prompt]`;
const category = `AI`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs} = func

	if(!isset(arg)) return nyarios("apa yang mau di tanyakan ?");
    const ai_answer = await ai(arg,m,sock,"gpt");
    const buttons = ai_answer.split(` ) ₊⁺₊⁺₊⁺₊⁺₊⁺*\n\n`).map(v => v.split(`\n\n*₊⁺₊⁺₊⁺₊⁺₊⁺ ( `)[0]).filter(v => !(v.includes(`₊⁺₊⁺₊⁺₊⁺₊⁺ (`)||v.includes(`) ₊⁺₊⁺₊⁺₊⁺₊⁺`))).map(v => ({
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
            display_text: `(copy) `+v.slice(0,10)+"...",
            id: `${new Date().getTime()}`,
            copy_code: v
        })
    }));
    buttons.shift();
    
    buttons.shift();
    await sock.banner(id,{image:`${baseURL}/api/image/banner?font_size=200&apikey=${apikey}&text=GPT`,text:`\n${ai_answer}\n`},{quoted:m});
}
module.exports = { cmd, args, category, message };