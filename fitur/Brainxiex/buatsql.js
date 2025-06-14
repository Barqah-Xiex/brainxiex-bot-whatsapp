const cmd = `buatsql`;
const args = `[nama] [password] [database]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai, mysql} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey} = config;
    const {isset,fs} = func

    const allowed = [628979059392,6285876596372];

    if(allowed.includes(m.nomor)){
        const [nama,password,database] = arg.split("");
        if(!nama) return nyarios("masukan "+Prefix+cmd+" "+args);
        if(!password) return nyarios("masukan "+Prefix+cmd+" "+args);
        if(!database) return nyarios("masukan "+Prefix+cmd+" "+args);
    
        await mysql.executeQuery(`CREATE DATABASE IF NOT EXISTS ${nama};`);
        await mysql.executeQuery(`CREATE USER '${nama}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${password}';`);
        await mysql.executeQuery(`GRANT ALL PRIVILEGES ON ${database}.* TO '${nama}'@'localhost';`);
        await mysql.executeQuery(`FLUSH PRIVILEGES;`)
/*
CREATE DATABASE IF NOT EXISTS ${nama};
CREATE USER '${nama}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${password}';
GRANT ALL PRIVILEGES ON ${database}.* TO '${nama}'@'localhost';
FLUSH PRIVILEGES;
*/
        await nyarios(`host: localhost
port: ${3306}
user: ${nama}
password: ${password}
database: ${database}`);
    }else{
        nyarios("gak bisa");
    }
}
module.exports = { cmd, args, category, message };