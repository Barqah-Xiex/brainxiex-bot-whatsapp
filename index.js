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
            const { spawn } = require('child_process');
                
            // Detect bun / node
            const IS_BUN = Boolean(process.versions.bun);
            const IS_NODE = Boolean(process.versions.node);
                
            if (error.code === 'MODULE_NOT_FOUND') {
            let msg = String(error);
                    
            // Ambil modul dengan regex multi opsi
            let MODULE =
                msg.match(/Cannot find module ['"]([^'"]+)['"]/)?.[1] ||   // Node.js
                msg.match(/Cannot find package ['"]([^'"]+)['"]/)?.[1] ||  // Bun
                null;
                    
            if (!MODULE) {
                console.error("Tidak dapat mengidentifikasi nama modul dari error:");
                console.error(msg);
                return;
            }
        
            console.log("ERROR","Gak ada module",MODULE);
            console.log("PROSES","Installing",MODULE);
        
            const IS_BUN = Boolean(process.versions.bun);
            const CMD  = IS_BUN ? "bun" : "npm";
            const ARGS = IS_BUN ? ["add", MODULE] : ["i", MODULE];
        
            await new Promise(r => {
                const installer = require('child_process').spawn(CMD, ARGS, {
                    stdio: 'inherit',
                    shell: true
                });
            
                installer.on('close', r);
                installer.on('exit', r);
                installer.on('error', e => console.error(`INSTALL ERROR:`, e));
            });
        
            return;
        }

        
            console.error(error);

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