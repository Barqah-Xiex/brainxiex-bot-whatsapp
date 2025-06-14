const cmd = `freload`; 
const args = ``;
const category = `Fitur`;
async function message(liana, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = liana;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs,warna} = func;


    liana.Command = {};
    liana.category = {};
    liana.fiturAddons = {};

    
    liana.cache.fitur = {};
    liana.cache.fitur.delcache = 0;
    liana.cache.fitur.reload = 0;

    // async function outputJSON(json,cb) {
    //     if (json.length > 0) {
    //       await cb(json[0]);
    //       outputJSON(json.slice(1));
    //     }
    //   }
    
    await Object.keys(require.cache).forEach((v) => {
        if(!`${v}`.includes("fitur")) return;
        liana.cache.fitur.delcache += 1
        const filename = v;
        const file = require.resolve(filename)
        console.info(`${warna(`kuning`,`deleting cache`)} '${warna(`hijau`,filename)}'`)
        return delete require.cache[file]
    })
    console.log(`DELETING CACHE >> DONE !`)

    fs.dir(`./fitur`).forEach(v => {
        // console.log(`memuat ./fitur/${v}`)
        if(fs.isDir(`./fitur/${v}`)){
            const category = v;
            fs.dir(`./fitur/${v}`).forEach(val => {
            const {cmd,message,args,id,action} = require(`../${v}/${val}`);
            liana.cache.fitur.reload += 1
            console.log(`${warna(`hijau`,`memuat`)} '${warna(`kuning`,`./fitur/${v}/${val}`)}'`)
            if(isset(cmd) && isset(category) && isset(message)){
                liana.Command[cmd] = message;
                liana.fiturpath[cmd] = `./fitur/${v}/${val}`;
                liana.category[category] = liana.category[category]||[];
                liana.category[category].push(cmd+`${args ? " "+args : ""}`);
                liana.menuFile[v] = cmd;
            }
            if(isset(id)&&isset(action)) liana.fiturAddons[id] = action;
            })
        }else{
            const {cmd,message,category,args,id,action} = require(`../${v}`);
            liana.cache.fitur.reload += 1
            console.log(`${warna(`hijau`,`memuat`)} '${warna(`kuning`,`./fitur/${v}`)}'`)
            if(isset(cmd) && isset(category) && isset(message)){
                liana.Command[cmd] = message;
                liana.fiturpath[cmd] = `./fitur/${v}`;
                liana.category[category] = liana.category[category]||[];
                liana.category[category].push(cmd+`${args ? " "+args : ""}`);
                liana.menuFile[v] = cmd;
            }
            if(isset(id)&&isset(action)) liana.fiturAddons[id] = action;
        }
    })
    fs.dir(`./cmd`).forEach(v => {
        console.log(`${warna(`hijau`,`memuat`)} '${warna(`kuning`,`../../cmd/${v}`)}'`)
        const text = `${fs.load(`./cmd/${v}`)}`;
        liana.Command[v] = (__liana,___m,__store) => __liana.sendMessage(___m.chat,{text},{quoted: ___m});
        liana.fiturpath[v] = `./cmd/${v}`;
        liana.category["More"] = liana.category["More"]||[];
        liana.category["More"].push(v)
    })
    console.log(`UPDATING FITUR >> DONE !`);
    nyarios(`Deleting Cache: ${liana.cache.fitur.delcache}${arg == "debug" ? ` file\nReload Fitur: ${liana.cache.fitur.reload} file\n\n\nFile Uploaded:\n${Object.values(liana.fiturpath).join("\n")}`:""}`)
    delete liana.cache.fitur;
    return liana;
}
module.exports = {cmd,args,category,message};