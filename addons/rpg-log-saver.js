module.exports = function(sock) {
    const { func: { isset, fs }, config:{session} } = sock;

    if(!fs.existsSync(`./${session}`)) {
        fs.unlinkSync("./temp/logs.log");
        fs.unlinkSync("./temp/msg.json");
    }
    
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    
    const writeStream = fs.createWriteStream("./temp/logs.log", { flags: "a" });
    
    return sock.logs = function(text) {
        writeStream.write(`${day}-${month}-${year} ${hour}:${minute}:${second}\n${text}\n\n`);
    };
};
