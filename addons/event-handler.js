const axios = require("axios");
module.exports = async function(Barqah){
    setTimeout(_ => Barqah.ev.emit("script.start",new Date()),3000)
}