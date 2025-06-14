const axios = require("axios");
module.exports = async function(liana,req,res) {
	if(req.url.startsWith("/daffa/")){
		const [nomor,user,password,panel,exp,lic,reseller,URL] = (req.url.split('/daffa/')[1]).split("/").map(decodeURIComponent);

        const id = (nomor.startsWith("0") ? nomor.replace("0", "62") : nomor).replace(/\D/g, '')+"@s.whatsapp.net";
        const text = `
BERIKUT DATA LOGIN PANEL WELXWOLF


> 🔐 Username : ${user}
> 👤 Password : ${password}
> 🈸 Panel : ${panel}
> 🗓️ Expired : ${exp}
> 👤 Type : USERS
> 🔐 Lisensi : ${lic}
> 📲 Send To WhatsApp : ${nomor}
> 👤 Created : ${reseller}


ℹ️💁 INFORMASI :
HARAP SIMPAN BAIK-BAIK DATA ANDA UNTUK LOGIN... KAMI HANYA KIRIM 1X SAJA, JIKA KEHILANGAN DATA LOGIN BUKAN TANGGUNG JAWAB KAMI LAGI KARENA KITA SUDAH MEMBERI TAHU. Sekian Trimakasih 

🌐 KUNJUNGI WEBSITE KAMI :
https://bwf-dapzx.xiex.my.id/

~WELXWOLF🐺
`
        // const apk = await axios.get(URL, { responseType: 'arraybuffer' }).then(({data}) =>  data);
        console.log("daffa", URL, "OK")
        // liana.sendMessage(id,{document: {url:URL}, mimetype: "application/apk" , fileName: `${panel}.apk`, caption: text});
        liana.sendInteractiveMessage(id, text, 'By https://bwf-dapzx.xiex.my.id/', `[ ${panel} ]`, ``, {type:"image",data:{url:`https://bwf-dapzx.xiex.my.id/assets/icon.jpg`}}, liana.InteractiveButton([{name: "cta_url",buttonParamsJson: JSON.stringify({ display_text: "Download", url: `${URL}`, merchant_url: "https://xiex.my.id"})}])).then(console.log).catch(console.error);
        res.end("udah")
    }
}