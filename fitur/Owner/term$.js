const { default: axios } = require("axios");

const cmd = `$`; 
const args = `[server cmd]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs,exec} = func

    if(!isOwner || config.isJadibot) return nyarios("kamu tidak dapat menggunakan command ini!");

    if(isOwner && !config.publicbot){
        if(!isset(arg)) nyarios(`masukan perintah`)
        const argu = arg.split(` `)
        const cmdnya = argu[0];
        const argumennya = argu.slice(1)

        let outlog = `output:\n`;
        let errlog = `error:\n`;

        const output = await nyarios(outlog);
        const errput = await nyarios(errlog);
        const nod = require(`child_process`).spawn(cmdnya,argumennya);

        nod.stdout.on('data', async(data) => {
            outlog = `${outlog}\n${data}`;
            await sock.editMessage(output,outlog);
        });
        nod.stderr.on('data', async(data) => {
            errlog = `${errlog}\n${data}`;
            await sock.editMessage(errput,errlog);
        });
        nod.stderr.on('close', async(data) => {
            await nyarios(`Error Close:\n${data}`)
        });
        nod.stderr.on('exit', async(data) => {
            await nyarios(`Error Exit:\n${data}`)
        });
        // exec(arg,(a,b,c) => nyarios(`${a}\n${b}`))
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};