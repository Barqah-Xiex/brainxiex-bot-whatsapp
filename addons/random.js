module.exports = function(Barqah){
  Barqah.random = (json = []) => json[Math.floor(Math.random()*json.length)];

return Barqah;

}