const { default: axios } = require("axios");

const cmd = `slot`; 
const args = `[nominal]`;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func
    
    if(!isset(arg)) return nyarios(`masukin nominalnya`);
    const input_nominal = `${arg.split(` `)[0]}`.replace(/[^0-9]/g, '');
    const nominal = Number(input_nominal); 
    if(isNaN(nominal)||nominal == NaN) return nyarios(`masukan nominal dengan benar !!!`);
    if(nominal <= 0) return nyarios(`gak bisa kurang dari sama dengan 0`);
    if(nominal > 100_000) return nyarios(`gak bisa lebih dari 100k`);

    global.muteFromBot[m.sender] = true;

    const Akun = await player(m.sender);
    if(nominal > Akun.pCash) return nyarios(`uang kurang`);
    
    const items = ['🍊', '🍇', '🍒', '7️⃣', '🍐', '🍎', '🍋', '🍑'];
    const kali = (await player(m.sender)).pVip >= 1 ? [0,0.25,0.5,0.75,1.25,1.5,1.75,2,4]: [0,0.25,0.3,0.35,0.4,0.45,0.5,0.75,1,1.25,1.5,1.75,2,4];
    
    const mek = await nyarios(`Anda memasukan *${nominal}bx*`);
    const send = (a) => sock.editMessage(mek,a);

    let result = [];
    for(let i = 0; i < 3; i++) {
        result.push([]);
        for(let j = 0; j < 3; j++) {
            result[i].push(items[Math.floor(Math.random() * items.length)]);
        }
    }

    for(let i = 0; i < 10; i++) {
        let display = `🎰 SLOT GAME 🎰\n`;
        display += `${result[0].join(' | ')}\n`;
        display += `${result[1].join(' | ')} ⬅️\n`;
        display += `${result[2].join(' | ')}\n`;
        await send(display);
        
        // Shuffle for animation effect
        result.forEach(row => {
            for(let j = 0; j < 3; j++) {
                row[j] = items[Math.floor(Math.random() * items.length)];
            }
        });
    }

    const dapat = random(kali);
    const pendapatan = Math.floor(nominal*dapat);

    let finalDisplay = `🎰 SLOT GAME 🎰\n`;
    finalDisplay += `${result[0].join(' | ')}\n`;
    finalDisplay += `${result[1].join(' | ')} ⬅️\n`;
    finalDisplay += `${result[2].join(' | ')}\n\n`;
    
    // Check if middle row matches
    const isWin = result[1][0] === result[1][1] && result[1][1] === result[1][2];
    finalDisplay += isWin ? '🎉 Kamu Menang!\n' : '😔 Kamu Kalah!\n';
    finalDisplay += `Multiplier: x${dapat}\n`;
    finalDisplay += `Hasil: +${pendapatan}bx`;
    
    await send(finalDisplay);
    
    await Akun.add("pCash",-nominal);
    await Akun.add("pCash",pendapatan);
    global.muteFromBot[m.sender] = false;
}

module.exports = {cmd,args,category,message};