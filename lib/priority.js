const {setPriority,getPriority} = require("os");
module.exports = (config) => {
    const {warna} = require("./func")(config);
    try {
        if(typeof config.nice == "number" && config.nice >= -20 && config.nice <= 20) {
            setPriority(config.nice);
            console.log(warna(`cyan`,`${config.Nama_Bot} (${config.Nomor_Bot}) Set Priority ke ${getPriority()}`));
        }else{
            console.log(warna(`cyan`,`${config.Nama_Bot} (${config.Nomor_Bot}) Set Priority ke default`));
        }
    } catch (error) {
        console.error("Set Priority Error:",error)
    }
}