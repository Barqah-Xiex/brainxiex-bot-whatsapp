const { default: axios } = require("axios");

const cmd = `owner`; 
const args = ``;
const category = `Information`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot, Nama_Owner, Nomor_Owner ,apikey,baseURL} = config;
    const {isset,fs} = func

    const contacts= {
        displayName: `Owner`,
        contacts: [
            {
displayName: `${Nama_Owner} [Bot Owner]`,
vcard: `BEGIN:VCARD\nVERSION:3.0
N:${`${Nama_Owner} [owner]`}
FN:${`${Nama_Owner} [owner]`}
item1.TEL;waid=${Nomor_Owner}:${Nomor_Owner}
item1.X-ABLabel:Ponsel
item2.URL:http://xiex.my.id
item2.X-ABLabel:Brainxiex
END:VCARD`
            }
        ]
    }
    const sentMsg = await sock.sendMessage(
        id,
        {
            contacts
        },
        {
            quoted: m
        }
    )

    
}
module.exports = {cmd,args,category,message};