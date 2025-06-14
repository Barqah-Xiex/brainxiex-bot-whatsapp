module.exports = function(Barqah){
  Barqah.store.cache = Barqah.store.cache||{};
  Barqah.store.cache.db = Barqah.store.cache.db||{};
  if(!Barqah.config.usemysql) return;
  const { executeQuery, getOne, getAll, insertData, updateData, deleteData, dbConfig } = Barqah.mysql;
  async function player(id, dbbaru = true) {
    async function accounts(id){
      // console.log("koneksi",id)
      if(id.endsWith("@g.us")){
        const gid = Number(id.split("@")[0].replace(/-/g,'').slice(-6));
        const akun = await getOne("SELECT * FROM `grup` WHERE gid = ?;",[(gid)]);
        if(akun == undefined){
          const g = await Barqah.groupMetadata(id,true).catch(v => ({subject:id, participants}));
          const {subject,participants} = g;
          
          await executeQuery('INSERT INTO `grup` (`gid`,`id`,`subject`) VALUES (?, ?, ?)', [(gid),id, subject],console.log).then(console.log).catch(console.error);
          return await accounts(id);
        }
        Barqah.store.cache.db[id] = akun;
        return akun;
      }else{
        const akun = await getOne("SELECT * FROM `accounts` WHERE WhatsApp = ?;",[`${id}`.split("@")[0]]);
        if(akun == undefined){
          const i = pencarislotkosong(await getAll("SELECT pID FROM `accounts` WHERE 1",[]),"pID");
          await executeQuery('INSERT INTO \`accounts\` (`pID`,`WhatsApp`) VALUES (?, ?)', [i, id.split("@")[0]],console.log).then(console.log).catch(console.error);
          return await accounts(id);
        }
        Barqah.store.cache.db[id] = akun;
        return akun;
      }
    }


    const akun = await ((dbbaru || !Barqah.store.cache.db[id]) ? accounts(id) : Barqah.store.cache.db[id]);
    for await (const akunkey of Object.keys(akun)) {
      const value = akun[akunkey];
      if(value == "NaN") akun[akunkey] = 0;
      if(typeof value == "number" && isNaN(value)) akun[akunkey] = 0;
      if(typeof value == "undefined") akun[akunkey] = "";
      if (`${value}`.toLocaleLowerCase() == "null") akun[akunkey] = "[]";
    }
    
    function get(kolom) {
      return akun[kolom];
    }
    async function put(kolom, value){
      const valueEx = value >= 2147483647 ? 2147483647 : value;
      if(typeof value == "number" && isNaN(value)) value = 0;
      if(typeof value == "number") value = valueEx;
      if(typeof value == "object") value = JSON.stringify(value,null).replace(/null/g,"[]");
      if(typeof value == "string") value = Buffer.from(value).toString("utf-8");
      // console.log(value);
      return await (id.endsWith("@g.us") ? updateData(`grup`,[kolom,`${valueEx}`.replace(/\'/g,"-")],["id",id]) : updateData(`accounts`,[kolom,valueEx],["WhatsApp",`${`${id}`.split("@")[0]}`]));
    }

    async function add(kolom,value){
      const jumlah = Number(`${get(kolom)}`) + value;
      return await put(kolom, jumlah);
    }

    const load = get;
    const save = put;

    return {...akun, get, put, load, save, add};
  } 
  
  Barqah.player = player;
  Barqah.grup = player;

  
  getOne("SELECT * FROM `accounts` WHERE 1;").then(v => {
    if(v) {
      console.log("Koneksi database ada");
      setTimeout(() => {
        getOne("DELETE a FROM accounts a JOIN ( SELECT WhatsApp FROM accounts WHERE pName IS NULL OR pName = '' GROUP BY WhatsApp HAVING COUNT(*) > 1 ) dup ON a.WhatsApp = dup.WhatsApp WHERE a.pName IS NULL OR a.pName = '';")
        .catch(e => console.log(`Tidak Ada Yang Akan Di Hapus`));
      }, 5*60*1000);
    }else{
      console.log("koneksi database buruk");
    }
  });
  function pencarislotkosong(list = [],params = ""){
	const list_id = list.map(v => v[params]);
    let slotkosong = 0;
    for (let i = 0; i <= list_id.length*100; i++) {
      if(!list_id.includes(i)){
        slotkosong = i;
        return i;
        break;
      }
    }
  }
  return Barqah;
}