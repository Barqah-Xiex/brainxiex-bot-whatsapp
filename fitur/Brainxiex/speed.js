const cmd = `speed`;
const args = ``;
const category = `Brainxiex`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, ai, mysql} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs} = func


    const list_server = {
        "BotApi": `${baseURL}/api/test`,
        "Server1": `http://server1.xiex.my.id:1109`,
        "Server2": `http://server2.xiex.my.id:1109`,
        "Server3": `http://server3.xiex.my.id:1109`,
        "192.168.1.8": `http://192.168.1.8/api/test`,
        "192.168.1.9": `http://192.168.1.9:1109`
    }

    

    if(isset(arg)){
        if(list_server[arg]){
            const server = list_server[arg]
            const start = Date.now();
            sock.sendRequest(m).get(server,{
                headers
            })
            .then(({data,status}) => data != "ok" ? status : data)
            .then(data => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                nyarios(`Server: ${arg}\nStatus: ${data}\nSpeed: ${speed} ms`);
            }).catch((e) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                nyarios(`Server: ${arg}\nStatus: Down\nSpeed: ${speed} ms`);
            })
        } else if(arg == "all"){
            const start = Date.now();
            let result = `*ALL SERVER TEST*\n\n`;
            for await (const [server, url] of Object.entries(list_server)) {
                const start = Date.now();
                await sock.sendRequest(m).get(url)
                .then(({data}) => {
                    const end = Date.now();
                    const time = end - start;
                    const speed = time;
                    result += `Server: ${server}\nStatus: ${data}\nSpeed: ${speed} ms\n\n`;
                }).catch((e) => {
                    const end = Date.now();
                    const time = end - start;
                    const speed = time;
                    result += `Server: ${server}\nStatus: Down\nSpeed: ${speed} ms\n\n`;
                })
            }
            const end = Date.now();
            const time = end - start;
            result += `\n\n*Total Time: ${time} ms*`
            nyarios(result);
        } else if(`${arg}`.startsWith("http")){
            const start = Date.now();
            sock.sendRequest(m).get(arg)
            .then(({data,status}) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                nyarios(`Server: ${arg}\nStatus: ${data.status||status}\nSpeed: ${speed} ms`);
            }).catch((e) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                nyarios(`Server: ${arg}\nStatus: Down\nSpeed: ${speed} ms`);
            })
        } else {
            const server = `http://${arg}`
            const start = Date.now();
            sock.sendRequest(m).get(server)
            .then(({data}) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                nyarios(`Server: ${arg}\nStatus: ${data}\nSpeed: ${speed} ms`);
            }).catch((e) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                nyarios(`Server: ${arg}\nStatus: Down\nSpeed: ${speed} ms`);
            })
        }
    } else {
        const start = Date.now();
        let result = `*ALL SERVER TEST*\n\n`;
        for await (const [server, url] of Object.entries(list_server)) {
            const start = Date.now();
            await sock.sendRequest(m).get(url)
            .then(({data}) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                result += `Server: ${server}\nStatus: ${data}\nSpeed: ${speed} ms\n\n`;
            }).catch((e) => {
                const end = Date.now();
                const time = end - start;
                const speed = time;
                result += `Server: ${server}\nStatus: Down\nSpeed: ${speed} ms\n\n`;
            })
        }
        const end = Date.now();
        const time = end - start;
        const speed = time;
        result += `\n\n*Total Time: ${time} ms*`
        nyarios(result);
    }
}
module.exports = { cmd, args, category, message };
