const { default: axios } = require("axios");

const cmd = `term`; 
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
        // const argu = arg.split(` `)
        // const cmdnya = argu[0];
        // const argumennya = argu.slice(1)
        // const nod = require(`child_process`).spawn(cmdnya,argumennya);
        // nod.stdout.on('data', (data) => {
        //  nyarios(`Output:\n${data}`);
        // });
        // nod.stderr.on('data', (data) => {
        //     nyarios(`Error:\n${data}`)
        // });
        // nod.stderr.on('close', (data) => {
        //  nyarios(`Error Close:\n${data}`)
        // });
        // nod.stderr.on('exit', (data) => {
        //     nyarios(`Error Exit:\n${data}`)
        // });
        try {
            const { stdout, stderr } = await exec(arg);
            if(stdout){
                nyarios(stdout)
            }else{
                nyarios(stderr)
            }
        } catch (error) {
            nyarios(error)
        }
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};