const mysql = require('mysql');

const dbConfig = require(`../config`).mysql;

const pool = mysql.createPool(dbConfig);

function mysql_exec(query = ``, params = [], fullquery = () => {}) {
  const mysqlcode = hapushurufaneh(mysql.format(query,params.map(v => `${v}`.replace(/'/g,"-").replace(/`/g,"~").replace(/"/g,`=`))));
  fullquery(mysqlcode);

  return new Promise((resolve, reject) => {
    pool.query(mysqlcode, params, (err, results) => {
      if (err) reject([err,mysqlcode]);
      else resolve([results,mysqlcode]);
      

    });
  });
}

async function executeQuery(query = ``, params = [], fullquery = () => {}) {
    try {
        const [result, executedQuery] = await mysql_exec(query, params, fullquery);
        return result;
    } catch ([error, executedQuery]) {
        console.error('Query:', executedQuery); // Debugging log
        console.error('Error:', error); // Debugging log
        
        // Penanganan error handshake
        if (`${error}`.toLowerCase().includes("handshake")) {
            return await executeQuery(query, params, fullquery); // Pastikan argumen benar
        }
        
        // Penanganan error kolom tanpa default
        if (`${error}`.includes("ER_NO_DEFAULT_FOR_FIELD")) {
            const field = `${error}`.split("Field '")[1].split("'")[0];
            const table = "accounts";
            await executeQuery(`ALTER TABLE ${table} MODIFY COLUMN ${field} VARCHAR(255) DEFAULT '';`);
            return await executeQuery(query, params, fullquery); // Pastikan argumen benar
        }
        
        // Penanganan error nilai salah
        if (`${error}`.includes("ER_TRUNCATED_WRONG_VALUE_FOR_FIELD")) {
            const table = "accounts";
            const field = `${error}`.split("for column '")[1].split("'")[0];
            await executeQuery(`ALTER TABLE ${table} MODIFY COLUMN ${field} VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
            return []; // Mengembalikan array kosong atau sesuai kebutuhan Anda
        }
        
        // Penanganan error tabel tidak ada
        if (`${error}`.includes("ER_NO_SUCH_TABLE")) {
            const table = `${error}`.split("'")[1].split(".")[1];
            console.log('Missing table:', table); // Debugging log
            
            if (table) {
                console.error(`Table ${table} does not exist. Creating table...`);
                
                if (table === 'accounts') {
                    await executeQuery(`
                        CREATE TABLE ${table} (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            username VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        );
                    `);
                } else if (table === 'grup') {
                    await executeQuery(`
                        CREATE TABLE ${table} (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            groupName VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        );
                    `);
                } else {
                    console.error(`No creation logic defined for table ${table}.`);
                }
            } else {
                console.error('No table name found in the query.');
            }
            
            return await executeQuery(query, params, fullquery); // Pastikan argumen benar
        }
        
        // Penanganan error kolom tidak ada
        if (`${error}`.includes("ER_BAD_FIELD_ERROR")) {
            const column = `${error}`.split("Unknown column '")[1].split("'")[0];
            const table = "accounts";
            console.error(`Column ${column} does not exist in table ${table}. Adding column...`);
            await executeQuery(`ALTER TABLE ${table} ADD COLUMN ${column} VARCHAR(255);`);
            return await executeQuery(query, params, fullquery); // Pastikan argumen benar
        }
        console.log("Error skipped!");
        return []; // atau sesuai kebutuhan Anda
    }
}





const getOne = async (query, params = [], finalQuery) => (await executeQuery(query, params, finalQuery))[0];

const getAll = async (query, params = [], finalQuery) => await executeQuery(query, params, finalQuery);

const insertData = async (table, data, finalQuery) => await executeQuery(`INSERT INTO \`${table}\` SET ${data}`, finalQuery);

const updateData = async (table, data = [], condition = [], finalQuery) => await executeQuery(`UPDATE \`${table}\` SET \`${data[0]}\` = '${`${data[1]}`.replace(/'/g,"-")}' WHERE \`${condition[0]}\` = '${condition[1]}'`,[], finalQuery);

const deleteData = async (table, condition = [], finalQuery) => await executeQuery(`DELETE FROM \`${table}\` WHERE \`${condition[0]}\` = '${condition[1]}'`,[], finalQuery);

function DB() {
  function table(NamaTable){
    return {
      insert: (...args) => insert(NamaTable,...args),
      update: (...args) => update(NamaTable,...args),
      delete: (...args) => deletek(NamaTable,...args),
      select: (...args) => select(NamaTable,...args),
    }
  }
  function insert(table,data,value) {
    const q = `INSERT INTO \`${table}\`(\`${data}\`) VALUES ('${value}')`;
    function result() {
      return executeQuery(q);
    }
    
    return result();
  }
  function update(table,setKolom,setValue) {
    const q = `UPDATE ${table} SET ${setKolom} = '${setValue}'`;

    function result(){
      return where(q, 1);
    }
    result.where = (kondisi) => where(q, kondisi);

    return result;
  }
  function select(table,kolom) {
    
    const q = `SELECT ${kolom} FROM \`${table}\``;

    function result(){
      return kolom != "*" ? where(q, 1).then(v => v[kolom]) : where(q,1);
    }
    result.where = (kondisi) => where(q, kondisi);

    return result;
  }
  
  function deletek(table) {
    
    const q = `DELETE FROM \`${table}\``;

    function result(){
      return where(q,0);
    }
    result.where = (kondisi) => where(q, kondisi);

    return result;
  }

  async function where(q, data=[]){
    const WHERE = typeof data == "string" || typeof data == "number" ? data : data.length == 1 ? data[0] : data.length == 2 ? `${data[0]} = ${data[1]}`: 1;

    return data.length == 0 ? executeQuery(`${q}`) : executeQuery(`${q} WHERE ${WHERE}`);
  }


  function result(){
    return DB();
  }
  result.table = table;
  result.Query = executeQuery;
  return result;
}

function hapushurufaneh(str) {
  // Regular expression to match all the allowed characters
  const allowedChars = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 \n@#$_&\-+()/*":;,.!?~\'\"`|•√π÷×§∆£¢€^°={}\[\]%©®™✓]/g;

  // Replace all characters that do not match the allowed characters with an empty string
  return `${str}`.replace(allowedChars, '');
}
module.exports = function(Barqah){
  return Barqah.mysql = { executeQuery, getOne, getAll, insertData, updateData, deleteData, pool, dbConfig, mysql, DB };
}