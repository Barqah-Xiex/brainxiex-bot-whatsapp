module.exports = function(Barqah){
    function calculateTimeRemaining(timeDiff,json = false) {
        const timeDifference = timeDiff < 0 ? -timeDiff : timeDiff;
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        return !json ? `${days ? `${days}Hari ` :`` }${hours ? `${hours}Jam ` :`` }${minutes ? `${minutes}Menit ` :`` }${seconds ? `${seconds}Detik` :`` }` : {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    Barqah.countdown = calculateTimeRemaining;
}