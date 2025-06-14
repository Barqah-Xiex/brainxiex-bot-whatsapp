const {get} = require("axios");

module.exports = function(Barqah){
    async function Ikan(){
        const {data} = await get("https://raw.githubusercontent.com/Barqah-Xiex/json/main/ikan.json")
        return data;
    }
    async function Buah(){
        const {data} = await get("https://raw.githubusercontent.com/Barqah-Xiex/json/main/buah.json")
        return data;
    }
    async function Sayuran(){
        const {data} = await get("https://raw.githubusercontent.com/Barqah-Xiex/json/main/sayuran.json")
        return data;
    }
    async function Ore(){
        const {data} = await get("https://raw.githubusercontent.com/Barqah-Xiex/json/main/ore.json")
        return data;
    }
    async function Special(){
        const {data} = await get("https://raw.githubusercontent.com/Barqah-Xiex/json/main/special.json")
        return data;
    }
    async function All(){
        const data = {"undefined": 0, undefined: 0,...(await Ikan()), ...(await Buah()), ...(await Sayuran()), ...(await Ore()), ...(await Special())}
        return data; 
    }
    global.rpgitem = { Ikan, Buah, Sayuran, Ore, Special, All};
    Barqah.rpg = {...Barqah.rpg, item: global.rpgitem};
    return {rpgitem}
}

