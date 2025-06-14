module.exports.cmd = `sc`;
module.exports.args = ``;
module.exports.category = `Information`;
module.exports.message = async (sock, m, store) => {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func;

    const axios = sock.sendRequest(m);
    
    sock.banner(id,`Script Masih Dalam Tahap Pengembangan
Jika Ingin Tetap Menggunakan Script Ini, Silahkan Hubungi Nomor Yang Tersedia Di Bawah.

Pacakage Name: *Brainxiex Vbot*
Nama Pembuat: *Liana*
Pengembang: *Barqah Xiex, Trito*

*Nomor Yang Dapat Dihubungi*
+62 897-9059-392
https://wa.me/628979059392
`);

}