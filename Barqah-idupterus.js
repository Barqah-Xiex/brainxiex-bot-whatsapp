var bin_npm = "npm";
var bin_node =  process.argv[0]||"node";
if (process.argv.includes("--dalam-docker")){
  process.argv[0] = `/usr/local/bin/node`;
  process.argv = process.argv.filter(v => (v != "--dalam-docker"));
  bin_npm = "/usr/local/bin/npm";
  bin_node = process.argv[0];
}
const [binnya,fileini,filenya,...argnya] = process.argv;
process.argv = [binnya, filenya, ...argnya];
async function run() {
    if(process.argv[2] == `y`){
        global.require = require;
        try {
            require(`./${filenya}`);
        } catch (error) {
            const { exec } = require('child_process');
            if(error.code === 'MODULE_NOT_FOUND'){
                const MODULE = `${error}`.split("\n")[0].replace("Error: Cannot find module '","").replace("\'","");
                console.log("BARQAH-IDUPTERUS:","ERROR","Gak ada module",MODULE);
                console.log("BARQAH-IDUPTERUS:","PROSES","Installing",MODULE);
                exec(`${bin_npm} i ${MODULE}`,(err,stdout,stderr) => {
                    if(!(err || stderr)) run();
                    else console.log(stderr)
                });
            }else{
                console.error(error);
            }
        }
    }else{
        // ini agar idup terus
        function idupterus(){
            const nod = require(`child_process`).spawn(binnya, [fileini,filenya,...argnya,`y`], {
                stdio: 'inherit',
                shell: true
              });
            nod.on(`close`, (code) => idupterus());
            nod.on(`exit`, (code) => {})
            nod.on('error', (error) => {
                console.error("BARQAH-IDUPTERUS:",`${error.message}`);
            });
    
            nod.on('exit', (code, signal) => {
                console.log("BARQAH-IDUPTERUS:",`Bot terhenti dengan code ${code} dan sinyal ${signal}`);
            });
        }
        idupterus()
    }
}
run();
