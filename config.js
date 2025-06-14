// REAL BOT CONFIG ADA DI BAWAH !!!

// INFO
/*
* Sekedar Info:

// Type String adalah Text Yang Di Awali Dan Di Akhiri Dengan Tanda Petik
String: "Ini Adalah Contoh String"

// Type Number adalah Nomor
Number: 1234567890

// Type Bolean adalah kondisi aktif atau nonaktif
Boolean: true (untuk nyala) dan false (untuk mati)
// bisa juga di ganti dengan
Boolean: 1 (untuk nyala) dan 0 (untuk mati)
*/


// Endpoint server API
const server = "xiex.my.id";

const config = {
    // OWNER
    Nomor_Owner: 628979059392, // Nomor Whatsapp Kamu
    Nama_Owner: `Barqah`, // Nama Kamu
    Nomor_Bot: 628979059392, // Nomor Botnya
    Nama_Bot: `Brainxiex`, // Nama Botnya
    Password_Bot: `brainxiex`, // Password Bot (Bebas)
    
    // AUTH SETTINGS
    pakeQRweb: false, // Untuk Open Socket Websitenya
    port: 13070, // Port Website Yang Akan Di Buka
    printQRInTerminal: true, // Tampilkan QR CODE
    usecode: false, // Tampilkan Pairing Code
    mobile: false, // Mobile Mode (Default: false)
    session: `session`, // Nama Folder Penyimpanan Sesi
    custom_pairing: "", // Wajib String 8 HURUF ATAU ANGKA 

    // DATABASE
    /*
    * Parameter usemysql ubah menjadi true atau false
    * * jika menggunakan mysql ubah menjadi true
    * * jika menggunakan json file ubah menjadi false
    //
    */
    usemysql: false, // Untuk Menggunakan Mysql
    mysql: {
        host: "", // Address Mysql
        port: 3306, // Port Mysql
        user: "", // Username Mysql
        password: "", // Password Mysql
        database: "" // Database Mysql
    },

    // BOT SETTINGS
    Prefix: `.`, // Prefix Bot
    banner: `./asset/banner.jpg`, // Lokasi Banner
    welcomer: true, // Tampilan Masuk Dan Keluar Grup
    promote: false, // Tampilan Dijadikan Admin Dan Di Turunkan Sebagai Admin
    autoBlockCall: false, // Otomatis Blockir Jika Ada Yang Menelepon Melebihi Total Telepon
    autoBlockCall_Count_To_Block: 3, // Total Telepon Jika Ada Yang Menelpon
    limit_welcomer: 5, // Total Limit Welcomer (Jika Lebih Dari Limit Maka Tidak Adak Di Tampilkan)
    limit_chat: 10, // Limit Chat (Jika Lebih Dari Limit Maka Tidak Adak Di Tampilkan)
    ketik: true, // Tampilan Bot Mengetik
    promosi_grup: true, // Promosikan Grup Di Dalam Chat
    silent: true, // Mode Diam Tidak Banyak Logs
    antispam: {
        // maximal chat
        grup: 3, // Maximal Chat Dalam Grup
        sender: 2, // Maximal Chat Pengirim

        // maximal chat all
        world: 5, // Maximal Chat Di Semua
        
        // reset chat in milisecond
        reset: 5000, // Reset Total Chat Dalam Mili Detik (Contoh: 1 Detik = 1000 Milidetik )
    },
    limit: 1000000000, // Limit Chat
    isThisBotVIP: false, // Untuk Set Apakah Bot Khusus VIP
    ChatToSelf: 1000, // Total Chat Untuk Langsung Jadi Mode Self
    privatechat: false, // Untuk Set Apakah Bot Bisa Untuk Private Chat
    debug: false, // Set Debug Mode
    
    // WEB API
    baseURL: `http://${server}`, // URL API
    apikey: `APIKEY`, // APIKEY
    server: server, // SERVER API

    // Process
    nice: "default", // palingtinggi = -20, paling rendah = 19, dafault = "default"
    
    // LOADING ANIMATION
    loading: {
        head: "*Loading...*",
        body: [
            "B̳̿͟͞",
            "B̳̿͟͞r̳̿͟͞a̳̿͟͞",
            "B̳̿͟͞r̳̿͟͞a̳̿͟͞i̳̿͟͞n̳̿͟͞",
            "B̳̿͟͞r̳̿͟͞a̳̿͟͞i̳̿͟͞n̳̿͟͞x̳̿͟͞i̳̿͟͞",
            "B̳̿͟͞r̳̿͟͞a̳̿͟͞i̳̿͟͞n̳̿͟͞x̳̿͟͞i̳̿͟͞e̳̿͟͞x̳̿͟͞"
        ],
        foot: "*✔ Success*"
    }
}
module.exports = config;
module.exports.multibot = [
    // Bot 1
    {
        ...config,
    }


    // Contoh Jika Mau 2 Bot Dalam 1 Module Ini
    // |
    // |
    // V

    // Bot 2
    // {
    //     ...config,
    //     Nomor_Bot: 6283871437856,
    //     Nama_Bot: `Brainxiex`,-
    //     usecode: false,
    // },


    // Contoh Jika Mau 3 Bot Dalam 1 Module Ini
    // |
    // |
    // V

    // Bot 3
    // {
    //     ...config,
    //     Nomor_Bot: 6283871437857,
    //     Nama_Bot: `Brainxiex`,-
    //     usecode: false,
    // },
];
