const { default: axios } = require("axios");
module.exports = function (Barqah){
    async function ai(prompt,m, sock,model = "brainxiex") {
        const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai, downloadAndSaveMediaMessage} = sock;
        const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
        const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,Nama_Owner,baseURL} = config;
        const {isset,fs} = func;
        
		let legacy = true;
        
        global.cache = global.cache||{};
        global.cache[m.chat] = global.cache[m.chat]||{};
        if(prompt == "reset") {
            delete global.cache[m.chat].ai;
            return "Mereset cache ...";
        }
        const quoted = {...m.msg, ...m.quoted, ...(m.quoted ? m.quoted : m||m.msg)?.message?.documentMessage}||(m.quoted ? m.quoted : m||m.msg)
    	const mime = quoted.mimetype || ''
    	const isMedia = /image/.test(mime)
        if (isMedia) {
        	const filePath = await downloadAndSaveMediaMessage(quoted).catch(e => false);
            if(filePath){
                legacy = false;
                const fileName = filePath.split(`/temp/`)[1];
        		const fileData = fs.readFileSync(filePath);
        		prompt += "\n\n[IMAGE]\n"+await sock.tolink(fileData,fileName);
            }
        }
        
        // const menu = `${Object.keys(sock.category).map(v => `*₊⁺${v}⁺₊*\n${sock.category[v].map(v => `✧${Prefix}${v}`).join(`\n`)}`).join(`\n\n`)}`
        global.cache[m.chat].ai = global.cache[m.chat].ai||[];
        const messages = global.cache[m.chat].ai;
        try{
            messages.push({role:'user',content:prompt});
            const data = await axios.post(baseURL+"/api/ai/chat/completions",{
                yourname: `${m.pushName||m.nomor}`,
                messages,
                model,
                legacy
            },{
                headers: {
                    authorization: 'Bearer '+apikey,
                }
            }).then(v => v.data);
            global.cache[m.chat].ai = data.messages;
            const answer = data.answer;
            const error = data?.error;
            if(error){
                console.log({answer});
                return `error code *500*\n*${Nama_Owner}* Server Cannot Connect To *Brainxiex Main* and *Kamar Barqah* Ai Server`;
            }
            if(!data.jsonAnswer) return {text:answer};
            if(data.jsonAnswer.text) data.jsonAnswer.text = data.jsonAnswer.text.replace(/```([^`]+)```/g, function(match, group1, offset) {
                const artext = group1.split("\n")
                const bahasa = artext.shift();
                const text = artext.join("\n");
                const bahasaEx = bahasa.toLocaleLowerCase();
                const garis = `*₊⁺₊⁺₊⁺₊⁺₊⁺ ( ${bahasa} ) ₊⁺₊⁺₊⁺₊⁺₊⁺*`;
                  return `${garis}\n\n${text}\n\n${garis}`;
              });
            
            if(data.jsonAnswer.caption) data.jsonAnswer.caption = data.jsonAnswer.caption.replace(/```([^`]+)```/g, function(match, group1, offset) {
                const artext = group1.split("\n")
                const bahasa = artext.shift();
                const text = artext.join("\n");
                const bahasaEx = bahasa.toLocaleLowerCase();
                const garis = `*₊⁺₊⁺₊⁺₊⁺₊⁺ ( ${bahasa} ) ₊⁺₊⁺₊⁺₊⁺₊⁺*`;
                  return `${garis}\n\n${text}\n\n${garis}`;
              });
              return data.jsonAnswer;
        }catch(e){
            console.log(e);
            delete global.cache[m.chat].ai;
            return "Terjadi Error. Mereset cache ...";
        }

    }
    Barqah.ai = ai;
    return Barqah;
}

