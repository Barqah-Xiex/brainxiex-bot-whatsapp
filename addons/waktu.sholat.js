const axios = require("axios");
module.exports = async function(Barqah){
    return "di hentikan sementara !!!";
    const {apikey} = Barqah.config;

    const kota = "Kota Tasikmalaya";

    global.jadwalsholat = global.jadwalsholat || {};

    await axios.post(`${Barqah.config.baseURL}/api/islami/jadwalsholat`,{apikey,kota}).then(res => {
        const adzan = res.data.Barqah;
        global.jadwalsholat = adzan;
    });

    setInterval(() => {
        axios.post(`${Barqah.config.baseURL}/api/islami/jadwalsholat`,{apikey,kota}).then(res => {
            const adzan = res.data.Barqah;
            global.jadwalsholat = adzan;
        });
    },60*60*1000);
    
	function setIntervalAndExecute(fn, t) {
    	fn();
    	return(setInterval(fn, t));
	}
    setIntervalAndExecute(() => {
        let sekarang = {};
        const {subuh,dzuhur,ashar,maghrib,isya,audio} = global.jadwalsholat;

        const date = new Date();
        const {jam,menit} = {jam: date.getHours()-1,menit: date.getMinutes()};

        const [jam_subuh,menit_subuh] = subuh.split(":").map(Number);
        const [jam_dzuhur,menit_dzuhur] = dzuhur.split(":").map(Number);
        const [jam_ashar,menit_ashar] = ashar.split(":").map(Number);
        const [jam_maghrib,menit_maghrib] = maghrib.split(":").map(Number);
        const [jam_isya,menit_isya] = isya.split(":").map(Number);

        if(jam_subuh == jam && menit_subuh == menit) sekarang.adzan = "subuh";
        if(jam_dzuhur == jam && menit_dzuhur == menit) sekarang.adzan = "dzuhur";
        if(jam_ashar == jam && menit_ashar == menit) sekarang.adzan = "ashar";
        if(jam_maghrib == jam && menit_maghrib == menit) sekarang.adzan = "maghrib";
        if(jam_isya == jam && menit_isya == menit) sekarang.adzan = "isya";

        
        sekarang.jadwalsholat = global.jadwalsholat;
        
        sekarang.jam = [jam,menit];

        sekarang.audio = audio.adzan_sunni[7].url;
        if(sekarang.adzan) Barqah.ev.emit("waktu.sholat",sekarang);
    },60*1000)
}