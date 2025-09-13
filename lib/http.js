const http = require("http");
module.exports = (liana,_qr,config,port) => {
    http.createServer(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        if (req.url.toLowerCase() === "/qr") {
            if (isset(_qr) && !liana.authState.creds.registered) {
                if (`${_qr}`.length === 9 && `${_qr}`.includes("-")) {
                    res.end(`${_qr}`);
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(await qrcode.toBuffer(_qr));
                }
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`masih belom ada, tunggu beberapa saat dan terus refresh. ohya qr restart setiap 10 detik sekali`);
            }
        } else if (req.url.toLowerCase() === "/nomor") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(liana.user.id.split(":")[0]);
        } else if (req.url.toLowerCase() === "/isself") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`${liana.isSelf}`);
        } else if (req.url.toLowerCase() === "/self") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            liana.isSelf = !liana.isSelf;
            console.log(`mode: ${liana.isSelf}`);
            res.end(`${liana.isSelf}`);
        } else if (req.url.toLowerCase() === "/serverrestart") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            console.log(`server restart by panel`);
            process.exit(0);
            res.end(`restartting...`);
        } else if (req.url.toLowerCase() === "/gotowa") {
            res.writeHead(301, { "Location": `https://wa.me/${liana.user.id.split(":")[0]}` });
            res.end(`${liana.user.id.split(":")[0]}`);
        } else if (req.url.toLowerCase() === "/ping") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`pong`);
        } else if (req.url.toLowerCase().startsWith("/search/")) {
            if (fs.cek(req.url.replace(`/search/`, ``))) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`${fs.load(req.url.replace(`/search/`, ``)).toString(`base64`)}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`false`);
            }
        } else if (req.url.startsWith(`/send`)) {
            try {
                const path = req.url.split("/").slice(1).join("/");
                const GET = path.includes("?") && path.includes("=") ? JSON.parse(`{${path.split("?").slice(1).join("?").split("&").map(c => { 
                    const [a, b] = c.split("="); 
                    return `${JSON.stringify(a)}: ${JSON.stringify(decodeURIComponent(b))}`; 
                }).join(",")}}`) || {} : {};
                const { nomor, type, url, text, data } = GET;
    
                if (!isset(nomor) || !isset(type)) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(`hadeuh pasti salah masukin parameter nomor sama typenya, cek dulu s`);
                    return;
                }
    
                const number = nomor.startsWith("0") ? nomor.replace("0", "62") : nomor;
                const wanumber = number.startsWith("+") ? number.replace(/[ +-]/g, "") : number;
                const id = wanumber.includes("@") ? wanumber : wanumber + "@s.whatsapp.net";
                
                let content = {};
                content[type] = { url };
                content.caption = `${text}`;
    
                switch (type) {
                    case "video":
                    case "image":
                    case "audio":
                    case "sticker":
                        liana.sendMessage(id, content);
                        break;
                    case "text":
                        content[type] = text;
                        liana.sendMessage(id, content);
                        break;
                    case "custom":
                        liana.sendMessage(id, data);
                        break;
                    default:
                        liana.sendMessage(id, {
                            text: `Untuk mengirim pesan lihat di bawah ini
    *VIDEO*
    http://${config.server}:${port}/send?nomor=${config.Nomor_Owner}&type=video&text=hallo&url=urlvideo.mp4
    
    *GAMBAR*
    http://${config.server}:${port}/send?nomor=${config.Nomor_Owner}&type=image&text=hallo&url=urlvideo.png
    
    *AUDIO*
    http://${config.server}:${port}/send?nomor=${config.Nomor_Owner}&type=audio&url=urlaudio.mp3
    
    *STICKER*
    http://${config.server}:${port}/send?nomor=${config.Nomor_Owner}&type=sticker&text=hallo&url=urlsticker.webp
    
    *TEXT*
    http://${config.server}:${port}/send?nomor=${config.Nomor_Owner}&type=text&text=hallo`
                        });
                }
    
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`jika ada error langsung masuk kok ke nomor tujuannya`);
            } catch (e) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`${require("util").format(e)}`);
            }
        } else {
            // Your commented code can be placed here if needed
        }
    }).listen(port, () => {
        console.log("server running on port " + port);
        console.log(`qr ada di http://localhost:${port}/qr`);
    });

}
