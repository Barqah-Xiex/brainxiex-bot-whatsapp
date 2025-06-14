module.exports = function (Barqah){
    Barqah.errorCode = {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        200: "OK",
        201: "Created",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Moved Temporarily",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Time-out",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Large",
        415: "Unsupported Media Type",
        416: "Requested Range Not Satisfiable",
        417: "Expectation Failed",
        418: "I'm a teapot",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Too Early",
        426: "Upgrade Required",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Time-out",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        509: "Bandwidth Limit Exceeded",
        510: "Not Extended",
        511: "Network Authentication Required"
    }
    Barqah.errorMessage = {
        econnreset: "Koneksi terputus secara mendadak.",
        etimedout: "Waktu koneksi ke server telah habis.",
        enotfound: "Server tujuan tidak ditemukan.",
        eai_again: "Terjadi kesalahan DNS, server tidak dapat dijangkau.",
        econnrefused: "Koneksi ditolak oleh server.",
        404: "Halaman yang diminta tidak ditemukan.",
        500: "Kesalahan internal server.",
        403: "Akses ditolak untuk sumber daya yang diminta.",
        401: "Autentikasi diperlukan, namun kredensial yang sah tidak tersedia.",
        canceled: "Permintaan dibatalkan sebelum respons diterima."
      }
      
    Barqah.error = function(error){
        const e = (a) => error.toLowerCase().includes(a);
        if(e("apikey salah")) return `Apikey tidak valid. Silakan hubungi admin melalui *${Barqah.config.Prefix}owener* untuk verifikasi Apikey`;
        if(e("apikey") && (e("kurang")||e("habis"))) return `Kuota Apikey telah habis. Silakan hubungi admin melalui *${Barqah.config.Prefix}owener* untuk pembaruan APIKEY`;

        if(Barqah.errorCode[error]) return Barqah.errorCode[error];
        if(Barqah.errorMessage[error]) return Barqah.errorMessage[error];

        return error;
    }
}