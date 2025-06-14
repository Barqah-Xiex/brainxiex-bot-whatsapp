const isNumber = (str = "") => !isNaN(str) && !isNaN(parseFloat(str));
const isObject = (str = "") => {try{JSON.parse("{}");return true}catch{return false}};

module.exports = function (Barqah) {
    if(Barqah.config.usemysql) return;
    Barqah.store.cache = Barqah.store.cache||{};
    Barqah.store.cache.db = Barqah.store.cache.db||{};

    const {fs} = Barqah.func;

    Barqah.player = player;
    Barqah.grup = player;

    async function player(id){
        const akun = await accounts(id);
        
        akun.get = (key) => akun[key]||0;
        akun.put = (key,value) => {
            if(isNumber(value)) akun[key] = Number(value);
            if(isNumber(value)) akun[key] = JSON.parse(value);
            akun[key] = value;
            if(id.endsWith("@g.us")){
                fs.save(`./database/grup/${id}`,JSON.stringify(akun,null,2));
            }else{
                fs.save(`./database/accounts/${id}`,JSON.stringify(akun,null,2));
            }
            return akun;
        }
        akun.load = akun.get;
        akun.save = akun.put;
        akun.add = (key,value) => akun.put(key, (isNaN(Number(`${akun[key]}`)) ? 0 : Number(`${akun[key]}`)) + value);

        return akun;
    }

    async function accounts(id){
        if(id.endsWith("@g.us")){
          const gid = Number(id.split("@")[0].replace(/-/g,'').slice(-6));
          const path = `./database/grup/${id}`;
          if(!fs.cek(path)){
            const g = await Barqah.groupMetadata(id,true).catch(v => ({subject:id, participants}));
            const {subject,participants} = g;
            
            const data = {
                gid,
                id,
                subject
            }

            fs.save(path,JSON.stringify(data,null,2));
            return await accounts(id);
          }
          const raw = fs.load(path).toString();
          const akun = isObject(raw) ? JSON.parse(fs.load(path)) : (fs.del(path), await accounts(id));
          Barqah.store.cache.db[id] = akun;
          return akun;
        }else{
          const pID = Number(id.split("@")[0]);
          const path = `./database/accounts/${id}`;
          if(!fs.cek(path)){
            const data = {
                pCash: 0,
                pBank: 0,
                pID,
                WhatsApp: pID,
            }
            fs.save(path,JSON.stringify(data,null,2));
            return await accounts(id);
          }
          const raw = fs.load(path).toString();
          const akun = isObject(raw) ? JSON.parse(fs.load(path)) : (fs.del(path), await accounts(id));
          Barqah.store.cache.db[id] = akun;
          return akun;
        }
    }
}


