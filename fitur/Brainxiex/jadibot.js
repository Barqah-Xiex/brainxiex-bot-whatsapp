const cmd = `jadibot`;
const args = `{config.json}`;
const category = `jadibot`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai, mysql, jadibot} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey} = config;
    const {isset,fs} = func
    return;

    if(isOwner){
        try {
            const configurasi = JSON.parse(arg);
            if(!(configurasi.Nomor_Owner || configurasi.Nomor_Bot)) return nyarios("masukan dengan benar");
            await jadibot.save(m.sender,configurasi);
            await nyarios("Mencoba Menjalankan Bot....")
            await jadibot.load(m.sender);
        } catch (err) {
            console.error(err)
            nyarios(`*Mohon Untuk Menggunakan Format Configurasi Seperti Ini:*
${Prefix}${cmd} ${JSON.stringify({
    Nomor_Owner: 628979059392,
    Nama_Owner: `Barqah`,
    Nomor_Bot: 6283871437857,
    Nama_Bot: `Brainxiex`,
    Password_Bot: `brainxiex`,

    welcomer: true,
    promote: false,
    autoBlockCall: true,
    autoBlockCall_Count_To_Block: 3,
    limit_welcomer: 5,
    limit_chat: 10,
},null,2)}`);
        }
    }else{
        nyarios("gak bisa, masih tahap pengembangan soalnya");
    }
}
module.exports = { cmd, args, category, message };