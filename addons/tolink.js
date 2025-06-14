const axios = require("axios");
const {post} = axios;
const FormData = require('form-data');
const fs = require(`fs`);
module.exports = function(Barqah){
    async function tolink(buffer,fileName = `undefined.xiex`) {
        const fileBase64 = Buffer.from(buffer).toString("base64")
        const {data} =  await post(`http://upload.xiex.my.id/`, {file: {data: fileBase64, name: fileName}})
        return data;
    }
    async function tolinkliana(buffer,fileName = `undefined.xiex`) {
        // lagi error
        // const fileBase64 = Buffer.from(buffer).toString("base64")
        // const {data} =  await post(`https://lianaputri.000webhostapp.com/post.php`, {file: {data: fileBase64, name: fileName}})
        // return data;
        TelegraPh(...arguments);
    }
    function TelegraPh (buffer,filename=`undefined.xiex`) {
        let BodyForm = FormData;
        const ifno = `./temp/${new Date().getTime()}.jpeg`;
        return new Promise (async (resolve, reject) => {
            const ada = fs.existsSync(filename);
            if (!ada){
                await fs.promises.writeFile(ifno,buffer);
                //  return reject(new Error("File not Found"));
                }
            try {
                const form = new BodyForm();
                form.append("file", fs.createReadStream(ada ? filename : ifno))
                const data = await  axios({
                    url: "https://telegra.ph/upload",
                    method: "POST",
                    headers: {
                        ...form.getHeaders()
                    },
                    data: form
                })
                if(!ada) fs.unlinkSync(ifno);
                return resolve("https://telegra.ph" + data.data[0].src)
            } catch (err) {
                return reject(new Error(String(err)))
            }
        })
    }
    Barqah.tolink = tolink;
    Barqah.tolinkliana = tolinkliana;
    Barqah.tolinktelegraph = Barqah.upload = Barqah.tourl = TelegraPh;
}

function TelegraPh (buffer,filename) {
    let BodyForm = FormData;
    const ifno = `..temp/${new Date().getTime()}.jpeg`;
    return new Promise (async (resolve, reject) => {
        if (!fs.existsSync(filename)){
            await fs.promises.writeFile(ifno,buffer);
            //  return reject(new Error("File not Found"));
            }
        try {
            const form = new BodyForm();
            form.append("file", fs.createReadStream(filename||ifno))
            const data = await  axios({
                url: "https://telegra.ph/upload",
                method: "POST",
                headers: {
                    ...form.getHeaders()
                },
                data: form
            })
            fs.unlinkSync(ifno);
            return resolve("https://telegra.ph" + data.data[0].src)
        } catch (err) {
            return reject(new Error(String(err)))
        }
    })
}