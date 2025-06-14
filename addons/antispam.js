module.exports = async function (Barqah) {
    const {antispam: {reset, grup, sender, world}} = Barqah.config
    Barqah.antispam = {};
    Barqah.antispam_listpesan = {};
    
    const BARQAH_SENDMESSAGE = Barqah.sendMessage;
    Barqah.sendMessage = function (id, text, options) {
        const textString = text.caption || text.text || text.body || text;

        const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
        const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
        const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;

        if(isTempatUtama) return BARQAH_SENDMESSAGE(id, text, options);

        if(Barqah.antispam[id] > ((id.includes("@g.us") ? grup : sender))+2) return;
        if(Barqah.antispam_listpesan[textString] > world+2) return;

        Barqah.antispam_listpesan[textString] = Barqah.antispam_listpesan[textString] ? Barqah.antispam_listpesan[textString]+1 : 1 ;

        return BARQAH_SENDMESSAGE(id, text, options);
    }

    setInterval(() => {
        for (const pesan of Object.keys(Barqah.antispam_listpesan)) {
            Barqah.antispam_listpesan[pesan] -= 1;
            if (Barqah.antispam_listpesan[pesan] <= 0) {
                delete Barqah.antispam_listpesan[pesan];
            }
        }
        Barqah.antispam = {};
    }, reset);
}