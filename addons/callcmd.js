// sock[`Command`][command](sock,{...m,chatUpdate,argumen,command,command,isOwner,nyarios},store);
module.exports = function(Barqah){
    Barqah.callcmd = (m = {},text = "") => {
        m.cmd = text.split(" ")[0];
        m.arg = text.replace(`${m.cmd} `,``).trim();
        Barqah[`Command`][m.cmd](Barqah,m,{});
    }
  return Barqah;  
}