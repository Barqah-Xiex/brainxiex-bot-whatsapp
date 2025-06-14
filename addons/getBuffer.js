const axios = require(`axios`);
module.exports = function (Barqah){
    const {isset} = Barqah.func;
    async function getBuffer (url,post){
        if(isset(post)){
            const {data} = await axios.post(url,post,{ responseType: 'arraybuffer' });
            return Buffer.from(data,`utf-8`);
        }else{
            return await Barqah.media2buffer(url);
        }
    }
    Barqah.getBuffer = getBuffer;
    return Barqah
}

