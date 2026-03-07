const { spawn } = require('child_process');
const { platform } = require("os");

if(typeof process.env.pm_id !== "undefined") console.log("[PM2]","pm2 terdeteksi di ID",process.env.pm_id)

async function run() {
    if(process.argv[2] == `y`){
        global.require = require;
        try {
            const configPathInArgv = process.argv.find(v => `${v}`.startsWith("--config="));
            const config = configPathInArgv ? require(configPathInArgv.split("--config=")[1]||"./config") : require("./config");
            if(config.multibot && config.multibot[0]){
                config.multibot.forEach((v,i) => {
                    console.log("LOADED",v.Nama_Bot,v.Nomor_Bot)

                    if(typeof v.autoRestart == "undefined") v.autoRestart = 24*60*60*1000;
                    if(v.autoRestart){
                      console.log("[Config]","autoRestart dalam", v.autoRestart/(60*1000),"menit")
                      setTimeout(() => {
                        console.log("[config.autoRestart]","Bot Restart !");
                        process.exit(1);
                      }, v.autoRestart);
                    }
                    
                    require("./liana")(v);
                })
            }else{
                require("./liana")(config);
            }
            
        } catch (error) {
                console.error(error);

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
                    const installer = spawn(CMD, ARGS, {
                        stdio: 'inherit',
                        shell: true
                    });
                
                    installer.on('close', r);
                    installer.on('exit', r);
                    installer.on('error', e => console.error(`INSTALL ERROR:`, e));
                });
            
                return;
            }
        }
    }else{
        // ini agar idup terus
        function idupterus(){
            const nod = spawn(process.argv[0], [process.argv[1],`y`], {
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
            });
        }

        idupterus()
    }
}
run();




function parseArgv(input) {
  const args = [];
  let current = "";
  let inQuote = false;
  let quoteChar = null;
  let escape = false;

  for (const ch of input) {
    if (escape) {
      current += ch;
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if ((ch === '"' || ch === "'")) {
      if (!inQuote) {
        inQuote = true;
        quoteChar = ch;
      } else if (quoteChar === ch) {
        inQuote = false;
        quoteChar = null;
      }
      continue;
    }

    if (ch === " " && !inQuote) {
      if (current) {
        args.push(current);
        current = "";
      }
      continue;
    }

    current += ch;
  }

  if (current) args.push(current);
  return args;
}


process.stdin.on("data", (input) => {
  const text = input.toString().trim();

  const executeFile = platform() == "win32" ? "./windows.bat" : "./linux";
  
  const execFile = spawn(executeFile, parseArgv(text), {
      windowsHide: true,
      stdio: 'inherit',
      shell: true
    });
  execFile.on(`exit`, (code) => {});
  execFile.on('error', (error) => {
      console.error(`${error.message}`);
  });
});