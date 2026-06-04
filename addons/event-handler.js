const axios = require("axios");
module.exports = async function(Barqah){
    Barqah.ev.emit("script.start",new Date());
}