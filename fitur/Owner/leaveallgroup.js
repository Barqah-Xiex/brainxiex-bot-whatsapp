const cmd = `leaveallgroup`;
const args = ``;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs,sleep} = func

    if(!isOwner) nyarios("status: FAIL");
    
    let jumlahgrup = 0;

    const allgrup = Object.values(await sock.groupFetchAllParticipating());
    for await (const {participants, id, subject} of allgrup) {
        const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
        const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
        const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;

        if(isTempatUtama) continue;
        sock.sendMessage(id,{text: `[ GOOD BYE ALL ]`+(isset(arg) ? `\n\n${arg}`:"")},{}).then(mes => {
            sock.groupLeave(id).then(v => {
                sock.chatModify({
                    delete: true,
                    lastMessages: [{ key: mes.key, messageTimestamp: mes.messageTimestamp }]
                }, mes.key.remoteJid);
            })
        });
        jumlahgrup++;
        const sleepMs = Math.floor(Math.random() * 10_000);
        console.log("Delete",subject,{jumlahgrup, sleepMs})
        await sleep(sleepMs);
    }
    
}
module.exports = { cmd, args, category, message };