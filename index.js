const { on } = require("events");

async function run() {
    if(process.argv[2] == `y`){
        global.require = require;
        try {
            const configPathInArgv = process.argv.find(v => `${v}`.startsWith("--config="));
            const config = configPathInArgv ? require(configPathInArgv.split("--config=")[1]||"./config") : require("./config");
            if(config.multibot && config.multibot[0]){
                config.multibot.forEach((v,i) => {
                    console.log("LOADED",v.Nama_Bot,v.Nomor_Bot)
                    require("./liana")(v);
                })
            }else{
                require("./liana")(config);
            }
            
        } catch (error) {
            console.error(error);
            const { exec, spawn } = require('child_process');
            if(error.code === 'MODULE_NOT_FOUND'){
                const MODULE = `${error}`.split("\n")[0].replace("Error: Cannot find module '","").replace("\'","");
                console.log("ERROR","Gak ada module",MODULE);
                console.log("PROSES","Installing",MODULE);

                await new Promise(r => {
                    const installer = spawn("npm",['i',MODULE], {
                        stdio: 'inherit',
                        shell: true
                    });

                    installer.on('close', r);
                    installer.on('exit', r);
                    installer.on('error', e => console.error(`INSTALL ERRROR:`,e))
                    installer.stdout.on('data', (data) => {
                        process.stdout.write(data);
                    });
                    
                    installer.stderr.on('data', (data) => {
                        process.stderr.write(data);
                    });
                    
                });
            }else{
                console.error(error);
            }
        }
    }else{
        // ini agar idup terus
        
        function idupterus(){
            const nod = require(`child_process`).spawn(process.argv[0], [process.argv[1],`y`], {
                windowsHide: true,
                stdio: 'inherit',
                shell: true
              });
            nod.on(`close`, (code) => idupterus());
            nod.on(`exit`, (code) => {});
            nod.on('error', (error) => {
                console.error(`${error.message}`);
            });
    
            nod.on('exit', (code, signal) => {
                console.log(`Bot terhenti dengan code ${code} dan sinyal ${signal}`);
                //idupterus()
            });
        }
        idupterus()
    }
}
run();