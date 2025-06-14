module.exports = function(Barqah){
    const b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    function numbertohurufdanangka(a, urutan_hurufdanangka = b) {
        let b = "";
        if (isNaN(a)) return a;
        const nda = urutan_hurufdanangka.length;
        const tohurufnya = (val, tail = '') => {
            if (val <= nda) {
                return `${urutan_hurufdanangka[val - 1]}${tail}`;
            }

            const remainder = val % nda || nda;
            const division = Math.trunc(val / nda) - (remainder === nda ? 1 : 0);

            return tohurufnya(division, `${urutan_hurufdanangka[remainder - 1]}${tail}`);
        };
        return `${tohurufnya(a)}`.replace(/undefined/g, ` `);
    }
    Barqah.number2string = numbertohurufdanangka;
    Barqah.random = (a = []) => a[Math.floor(Math.random() * a.length)];
    return Barqah;
}