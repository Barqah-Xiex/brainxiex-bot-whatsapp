// dipindahkah
// ke folder ./event
module.exports = () => {};
















// module.exports = function(liana){
//     const {fs} = liana.func;
//     liana.ev.on(`group-participants.update`, async function({action,id,participants}) {
//       if(!(action == `add`||action ==`remove`)) return;
//       	  const {participants:alpsod} = await liana.groupMetadata(id)
    
//     	  const isAdmin = getGroupAdmins(alpsod).includes(liana.user.jid);
//       	//   if(!isAdmin) return;
//           const {config: {Nama_Bot}} = liana;
//           const Kondisi = action.replace(`add`,`Welcome`).replace(`remove`,`Good Bye`).replace(`promote`,`Prmote`).replace(`demote`,`Demote`);
//           console.log(action, isAdmin)
//           const {subject,participants:p,desc} = await liana.groupMetadata(id,true).catch(v => ({subject: id, participants}));
//           const KataKata = action == `add` ? `Welcome to *${subject}*\n\nJangan Lupa Untuk Mengecek Deskripsi Grup Yaa 😉` : action == `remove` ? `Good Bye from *${subject}* !\n\nSelamat Tinggal Saudaraku !`: ``
// 		try{
//         liana.groupMetadata(id).then(async ({subject,participants:p}) => {
//             liana.profilePictureUrl(participants[0], 'image').then(async (pp) => ppna(pp)).catch(async (v) => ppna(`http://xiex.my.id/media/1655612010102undefined.png`));
//             async function ppna(pp){
//                 const link = `http://xiex.my.id/api/image/welcome?apikey=${liana.config.apikey}&title=${encodeURIComponent(Kondisi)}&nama=${encodeURIComponent(`${liana.getName(`${participants[0]}`)}`)}&nomor=${participants[0].split("@")[0]}&ppimg=${encodeURIComponent(pp)}&grup=${encodeURIComponent(subject)}&membernya=${p.length}`;

//                 const thumblink = link;
//                 console.log(link)

//                 await liana.banner(id, {image: {url:link}, thumbnailUrl: thumblink, caption:`✧ *${Kondisi}* ✧\n@${participants[0].split("@")[0]}`},{quoted:fakereply(Kondisi+`\n${liana.getName(`${participants[0]}`)}`,undefined,{itemCount: p.length})})
//             }
//         });
//         }catch(e){
//         	console.error(`Welcommer`,e)
//         }
        
//     })
//     return liana;
// }
  
// function getGroupAdmins(participants) {
//     let admins = []
//     for (let i of participants) {
//         i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
//     }
//     return admins || []
// }
// function fakereply(message, thumbnail,options) {
//     return {
//         key: {
//             participant: '0@s.whatsapp.net'
//         },
//         message: {
//             orderMessage: {
//                 itemCount: 1,
//                 status: 1,
//                 surface: 1,
//                 message,
//                 orderTitle: message,
//                 thumbnail,
//                 sellerJid: '0@s.whatsapp.net',
//                 ...options

//             }
//         }
//     }
// }