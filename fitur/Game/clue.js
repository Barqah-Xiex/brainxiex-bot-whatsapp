const { default: axios } = require("axios");

const cmd = `clue`; 
const args = ``;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset, fs} = func

    const p = await player(m.sender);
    const isVIP = p.pVip > 0;

    // if(!isVIP) return nyarios(`kamu bukan vip !`)
    sock.game = sock.game||{};

    
    
    if(!isset(sock.game[id])) return nyarios(`tidak ada game`);
    if(!(isset(sock.game[id].jawaban) || isset(sock.game[id].money) ) ) return nyarios(`game telah berakhir`);

    function concealWord(word) {
        if (word.length <= 2) return word;  // Jika panjang kata kurang dari atau sama dengan 2, tidak perlu menyembunyikan
      
        let result = '';
        for (let i = 0; i < word.length; i++) {
          if (i % 2 === 0) {
            result += word[i];
          } else {
            result += '_';
          }
        }
        return result;
      }

    function shuffleWord(word) {
        const array = word.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    nyarios(`clue:\n${sock.game[id].jawaban.map((v,i) => `${i+1}. *${concealWord(v)}*`).join(`\n`)}`)
    // nyarios({text: `*Benar !*\n${sock.game[id].jawaban}\n${sock.game[id].alasan||``}\n\n*+${sock.game[id].money}bx*`});
    
    // p.add("pCash",Number(`${sock.game[id].money}`));
    
    // delete sock.game[id];
}
module.exports = {cmd,args,category,message};