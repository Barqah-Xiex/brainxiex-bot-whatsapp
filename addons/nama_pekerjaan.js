module.exports = function(Barqah){
  Barqah.jobName = (idjob) => {
    switch(idjob) {
      case 1: return "Pengiriman Makanan/Bahan Bakar";
      case 2: return "Sopir Bus";
      case 3: return "Pembersih Jalan";
      case 4: return "Pengemudi Truk Sampah";
      case 5: return "Kolektor";
      case 6: return "Supir Truk";
      case 7: return "Pilot";
      case 9: return "Mechanic";
      case 10: return "Petani";
      case 11: return "Miner";
      case 12: return "Pemburu";
      case 13: return "Penangan kontainer";
      case 14: return "Pengantar Pizza";
      case 15: return "Pemetik";
      case 16: return "Pengemudi Bulldozer";
      case 17: return "Nelayan";
      case 70:
      case 71:
      case 72: return "Supir taksi";
      case 73: return "Ojek";
      case 74: return "Penyihir";
      default: return "Tidak bekerja";
  }
  }

  Barqah.jobID = function (jobName) {
    switch(jobName) {
        case "Pengiriman Makanan/Bahan Bakar": return 1;
        case "Sopir Bus": return 2;
        case "Pembersih Jalan": return 3;
        case "Pengemudi Truk Sampah": return 4;
        case "Kolektor": return 5;
        case "Supir Truk": return 6;
        case "Pilot": return 7;
        case "Mechanic": return 9;
        case "Petani": return 10;
        case "Miner": return 11;
        case "Pemburu": return 12;
        case "Penangan kontainer": return 13;
        case "Pengantar Pizza": return 14;
        case "Pemetik": return 15;
        case "Pengemudi Bulldozer": return 16;
        case "Nelayan": return 17;
        case "Supir taksi": return 72; 
        case "Ojek": return 73; 
        case "Penyihir": return 74; 
        default: return -1; // Mengembalikan nilai -1 jika nama pekerjaan tidak ditemukan.
    }
}

return Barqah;

}