module.exports = function(Barqah){
    Barqah.achivment = (json = []) => `=====> *Mendapatkan* <====\n${json.map(v => `✧ *${v}* ✧`).join("\n")}`;
  
  return Barqah;
  
  }