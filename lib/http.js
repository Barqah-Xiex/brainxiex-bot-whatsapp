const http = require("http");
const url = require("url");
const querystring = require("querystring");
const util = require("util");

module.exports = (liana, _qr, config, port) => {

    const resSend = (res, code = 200, type = "text/plain", data = "") => {
        res.writeHead(code, { "Content-Type": type });
        res.end(data);
    };

    const parseBody = (req) => new Promise(resolve => {
        let body = "";
        req.on("data", c => body += c);
        req.on("end", () => {
            try {
                if (req.headers["content-type"]?.includes("application/json")) {
                    resolve(JSON.parse(body || "{}"));
                } else {
                    resolve(querystring.parse(body));
                }
            } catch {
                resolve({});
            }
        });
    });

    const normalize = (n) => {
        let a = n.startsWith("0") ? n.replace(/^0/, "62") : n;
        let b = a.startsWith("+") ? a.replace(/[^\d]/g, "") : a;
        return b.includes("@") ? b : b + "@s.whatsapp.net";
    };

    http.createServer(async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        const parsed = url.parse(req.url, true);
        const path = parsed.pathname.toLowerCase();
        const method = req.method;

        const body = method === "POST" ? await parseBody(req) : {};
        const params = { ...parsed.query, ...body };

        try {

            if (path === "/qr") {
                if (liana.func.isset(_qr) && !liana.authState.creds.registered) {
                    if (`${_qr}`.length === 9 && `${_qr}`.includes("-")) {
                        return resSend(res, 200, "text/plain", `${_qr}`);
                    } else {
                        res.writeHead(200, { "Content-Type": "image/png" });
                        return res.end(await qrcode.toBuffer(_qr));
                    }
                }
                return resSend(res, 200, "text/plain", "masih belom ada, tunggu beberapa saat dan refresh");
            }

            if (path === "/nomor") return resSend(res, 200, "text/plain", liana.user.id.split(":")[0]);
            if (path === "/isself") return resSend(res, 200, "text/plain", `${liana.isSelf}`);

            if (path === "/self") {
                liana.isSelf = !liana.isSelf;
                console.log(`mode: ${liana.isSelf}`);
                return resSend(res, 200, "text/plain", `${liana.isSelf}`);
            }

            if (path === "/serverrestart") {
                console.log("server restart by panel");
                resSend(res, 200, "text/plain", "restarting...");
                return process.exit(0);
            }

            if (path === "/gotowa") {
                const n = liana.user.id.split(":")[0];
                res.writeHead(301, { Location: `https://wa.me/${n}` });
                return res.end(n);
            }

            if (path === "/ping") return resSend(res, 200, "text/plain", "pong");

            if (path.startsWith("/search/")) {
                const key = path.replace("/search/", "");
                if (fs.cek(key)) {
                    return resSend(res, 200, "text/plain", fs.load(key).toString("base64"));
                }
                return resSend(res, 200, "text/plain", "false");
            }

            if (path === "/send") {
                const { nomor, type, url: mediaUrl, text, data } = params;

                if (!nomor || !type) {
                    return resSend(res, 200, "text/plain", "parameter nomor & type wajib");
                }

                const id = normalize(nomor);
                let content = { caption: text || "" };

                switch (type) {
                    case "video":
                    case "image":
                    case "audio":
                    case "sticker":
                        content[type] = { url: mediaUrl };
                        await liana.sendMessage(id, content);
                        break;

                    case "text":
                        await liana.sendMessage(id, { text: text || "" });
                        break;

                    case "custom":
                        await liana.sendMessage(id, data || {});
                        break;

                    default:
                        await liana.sendMessage(id, {
                            text: `http://${config.server}:${port}/send?nomor=${config.Nomor_Owner}&type=text&text=hallo`
                        });
                }

                return resSend(res, 200, "text/plain", "ok");
            }

            resSend(res, 404, "text/plain", "not found");

        } catch (e) {
            resSend(res, 500, "text/plain", util.format(e));
        }

    }).listen(port, () => {
        console.log("server running on port " + port);
        console.log(`qr: http://localhost:${port}/qr`);
    });

};