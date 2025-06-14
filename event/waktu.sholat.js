module.exports = async function(eventValue,sock){
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs,exec, sleep} = func
    
    let allgrup;
    let jumlahgrup = 0;
    let isFromMysql = true;
    
    try { allgrup = await (await getAll("SELECT `id`,`member` FROM `grup` WHERE 1", [])); }
    catch (e) { allgrup = Object.values(await sock.groupFetchAllParticipating()); isFromMysql = false; }



    const thumb = `${sock.config.baseURL}/api/image/banner?font_size=150&apikey=${apikey}&text=ADZAN%20${eventValue.adzan.toLocaleUpperCase()}`;
    const Message = {
        audio: { url: eventValue.audio },
        ptt: true,
        contextInfo: {
            externalAdReply: {
                mediaType: 2,
                renderLargerThumbnail: true,
                showAdAtrribution: true,
                title: `ADZAN ${eventValue.adzan.toLocaleUpperCase()}`,
                body: `Powered By xiex.my.id`,
                previewType: 0,
                thumbnail: await sock.media2buffer(thumb),
                thumbnailUrl: thumb.startsWith(`http`) ? thumb : undefined,
                sourceUrl: `http://xiex.my.id`,
            }
        },
    }
    
    function fakereply(message, thumbnail, options) {
  return {
    key: {
      participant: '0@s.whatsapp.net'
    },
    message: {
      orderMessage: {
        itemCount: 1,
        status: 1,
        surface: 1,
        message,
        orderTitle: message,
        thumbnail,
        sellerJid: '0@s.whatsapp.net',
        ...options
      }
    }
  };
}


	//return await sock.sendMessage("628979059392@s.whatsapp.net", Message);

    for await(const v of allgrup){
        const i = v.id;
        const member = JSON.parse(v.member).map(v => v.split("@")[0]);
        if((!isFromMysql)||member.includes(sock.user.jid.split("@")[0])){
            console.log("Adzan",v.id,true);
            const tidur = Math.floor(Math.random()*10) * 1000;
            console.log("tidur sebentar selama",tidur,"ms")
            await sleep(tidur);
            await sock.sendMessage(i, Message,{quoted: fakereply(`ADZAN ${eventValue.adzan.toLocaleUpperCase()}`,undefined,{ itemCount: member.length||9 })});
            
            jumlahgrup++;
        } else {
            console.log(v.id,false);
        }

    }
    
}