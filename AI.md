# AI.md

## Tujuan Dokumen

Dokumen ini mendefinisikan **aturan, format, dan kontrak kerja AI** agar AI dapat:

1. Membuat file fitur baru secara otomatis.
2. Mengedit file fitur yang sudah ada.
3. Memastikan semua kode yang dihasilkan **konsisten dengan standar Brainxiex Bot WhatsApp**.

AI **tidak boleh** membuat struktur, nama file, atau pola kode di luar spesifikasi dokumen ini.

---

## Ruang Lingkup AI

AI diperbolehkan melakukan hal berikut:

* Membuat **file JavaScript baru** di:

  * `fitur/(kategori)/(command).js` **(command biasa)**
  * `fitur/_<nama>.js` **(preload)**
  * `addons/<nama>.js` **(addons startup)**
* Mengedit isi file JavaScript yang **ditentukan user secara eksplisit**
* Menjaga kompatibilitas penuh dengan sistem bot

AI **DILARANG**:

* Membuat file di luar folder `fitur/` dan `addons/`
* Mengubah file core (index, loader, handler utama) kecuali diminta eksplisit
* Mengubah gaya export atau signature function
* Menghapus komentar dokumentasi penting

---

## Struktur Folder

### `/addons`

Digunakan untuk memodifikasi / menambahkan method atau properti ke objek `sock` **saat startup**.

### `/fitur`

Berisi command/fitur bot berdasarkan kategori.

### Database Helper (`sock.func.db`)

Untuk operasi file sebagai database sederhana, tersedia helper berikut.

**Catatan penting (WAJIB DIPAHAMI AI):**

* `lokasi` adalah **path string**, boleh relatif atau absolut.
* Jika path **tidak diawali `/`**, maka dianggap **relatif terhadap root project bot**.
* Folder tujuan **HARUS sudah ada**, helper ini **tidak membuat folder otomatis**.

Helper tersedia:

* `sock.func.db.read(lokasi)` atau `sock.func.db.load(lokasi)`

  * Fungsi: membaca file
  * Parameter: `lokasi` (string path)
  * Return:

    * `Buffer` untuk file biner (image, video, audio)
    * `string` untuk file teks

* `sock.func.db.write(lokasi, value)` atau `sock.func.db.save(lokasi, value)`

  * Fungsi: menulis / overwrite file
  * Parameter:

    * `lokasi`: string path
    * `value`: `string | Buffer`

> `read` = `load` dan `write` = `save` hanyalah **alias**, **BUKAN fungsi berbeda**.

Contoh:

```js
const buffer = sock.func.db.read("/download/ikan.mp4")
sock.func.db.save("/download/ikan_copy.mp4", buffer)

const buffer = sock.func.db.read("/download/ikan.mp4")
sock.func.db.save("/download/ikan_copy.mp4", buffer)
```

Sistem memiliki **3 jenis modul**:
1. Command (fitur biasa)
2. Preload / Load-sebelum-command
3. Addons (load saat script pertama kali jalan)

Setiap jenis modul memiliki aturan berbeda dan **tidak boleh tertukar fungsinya**.

Semua fitur **HARUS** mengikuti struktur berikut:
```
fitur/
└─ <Category>/
└─ <command>.js
```
Contoh:
```

fitur/Example/contoh.js
fitur/Information/ping.js
fitur/Owner/updatebot.js
fitur/_anti.js
addons/myos.js

````

AI **WAJIB** memastikan folder kategori sudah sesuai nama `category` di dalam file.

---

## Kontrak File Fitur (WAJIB)

Dokumen ini membagi kontrak file menjadi **3 kategori**:
- Command
- Preload
- Addons


Setiap file fitur **HARUS** memiliki struktur berikut dan **TIDAK BOLEH DIUBAH**:

```js
const cmd = `<command>`;
const args = `<args>`;
const category = `<Category>`;

async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, isOwner, nyarios } = m;
    const { Prefix, banner, Nama_Bot, apikey, baseURL } = config;
    const { isset, axios, fs, sleep } = func;
    const AxiosDenganHandler = sock.sendRequest(m);

    // logic di sini
}

module.exports = { cmd, args, category, message };
```

Jika AI membuat file command baru, **template ini wajib digunakan tanpa modifikasi struktur**.

---

## Kontrak File Preload (Load-Sebelum-Command)

File preload:

* Berada di folder `fitur/`
* Nama diawali `_`
* Dieksekusi **setiap pesan masuk** sebelum command

Struktur wajib:

```js
const id = `_anti`;

async function action(sock, m, store) {
    // logic preload
    // return boolean
}

module.exports = { id, action };
```

### Aturan Return Preload

| Return | Arti                  |
| ------ | --------------------- |
| false  | Lanjut ke command     |
| true   | Stop eksekusi command |

AI **WAJIB** menggunakan `true / false`.

---

## Kontrak File Addons (Load Saat Startup)

Addons dieksekusi **SATU KALI** saat script bot pertama kali berjalan.

Tujuan addons:

* Menambahkan helper ke `sock`
* Menambah method global (misal `sock.myos()`)
* Inject dependency ke runtime

Addons **BUKAN** command dan **BUKAN** preload.

### Struktur Wajib Addons

```js
module.exports = function (sock) {
    // extend sock
    return sock;
};
```

### Contoh Resmi

**PERHATIAN PENTING UNTUK AI:**

* Properti addons **BOLEH berupa function ATAU value**.
* Jika dipanggil dengan tanda `()`, maka **WAJIB berupa function**.
* Jika hanya diakses tanpa `()`, maka **boleh berupa value**.

Contoh addons (value):

```js
// addons/myos.js
const os = require('os');

module.exports = function (sock) {
    sock.myos = os.platform(); // value (string)
    return sock;
};
```

Contoh addons (function):

````js
// addons/myos.js
const os = require('os');

module.exports = function (sock) {
    sock.myos = () => os.platform(); // function
    return sock;
};
```js
// addons/myos.js
const os = require('os');

module.exports = function (sock) {
    sock.myos = os.platform;
    return sock;
};
````

### Aturan Keras Addons

Addons **DILARANG**:

* Mengirim pesan
* Mengakses `m` (message)
* Meng-handle logic chat
* Mengubah flow command

Addons **HANYA BOLEH**:

* Extend `sock`
* Menambahkan utility global
* Menyimpan state global

---

## Definisi Variabel Penting

AI harus memahami arti variabel berikut:

| Variabel           | Fungsi                                |
| ------------------ | ------------------------------------- |
| cmd                | Nama command tanpa prefix             |
| args               | Tipe argumen (text, number, url, dll) |
| category           | Nama folder kategori                  |
| sock               | Instance utama bot                    |
| m                  | Data pesan                            |
| nyarios            | Shortcut balasan pesan                |
| AxiosDenganHandler | Axios dengan auto error handler       |

---

## Aturan Penulisan Logic

### 1. Validasi Argumen

Jika command membutuhkan input, AI **WAJIB** menggunakan pola:

```js
if (!isset(arg)) return nyarios(`Masukan sesuatu misal: ${Prefix}${cmd} contoh`);
```

Tidak boleh menggunakan `if(!arg)` langsung.

---

### 2. Mengirim Pesan

AI **HARUS** memprioritaskan:

* `nyarios()` untuk reply
* `sock.sendMessage()` untuk non-reply

Contoh benar:

```js
const reply = await nyarios(arg);
sock.sendMessage(id, { text: 'Contoh' }, { quoted: reply });
```

---

## Standar Pengiriman Pesan (Baileys – WAJIB DIIKUTI)

Semua pengiriman pesan **HARUS** menggunakan satu fungsi utama:

```js
sock.sendMessage(jid, content, options)
```

Di mana:

* `jid` = ID chat (`nomor@s.whatsapp.net`, `idgrup@g.us`, atau `lid@lid`)
* `content` = isi pesan (object)
* `options` = opsi tambahan (quote, dll)

AI **DILARANG** membuat wrapper sendiri di luar `nyarios()`.

---

### Non-Media Messages

#### Text Message

```js
await sock.sendMessage(id, { text: 'hello world' })
```

#### Quote Message (semua tipe mendukung)

```js
await sock.sendMessage(id, { text: 'hello world' }, { quoted: m })
```

#### Mention User

```js
await sock.sendMessage(id, {
    text: '@6281234567890 halo',
    mentions: ['6281234567890@s.whatsapp.net']
})
```

#### Forward Message

```js
const msg = store.loadMessage(id, m.key.id)
await sock.sendMessage(id, { forward: msg })
```

#### Location Message

```js
await sock.sendMessage(id, {
    location: {
        degreesLatitude: -6.200000,
        degreesLongitude: 106.816666
    }
})
```

#### Contact Message

```js
const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Contoh User
TEL;type=CELL;waid=6281234567890:+62 812-3456-7890
END:VCARD`

await sock.sendMessage(id, {
    contacts: {
        displayName: 'Contoh User',
        contacts: [{ vcard }]
    }
})
```

#### Reaction Message

```js
await sock.sendMessage(id, {
    react: {
        text: '👍',
        key: m.key
    }
})
```

#### Pin Message

```js
await sock.sendMessage(id, {
    pin: {
        type: 1, // 0 = unpin
        time: 86400,
        key: m.key
    }
})
```

#### Poll Message

```js
await sock.sendMessage(id, {
    poll: {
        name: 'Pilih salah satu',
        values: ['A', 'B'],
        selectableCount: 1
    }
})
```

---

### Media Messages

> Media **BOLEH** berupa `Buffer`, `{ url }`, atau `Stream`.

#### Image

```js
await sock.sendMessage(id, {
    image: buffer,
    caption: 'contoh gambar'
})
```

#### Video

```js
await sock.sendMessage(id, {
    video: { url: './video.mp4' },
    caption: 'contoh video'
})
```

#### GIF (MP4 dengan flag)

```js
await sock.sendMessage(id, {
    video: buffer,
    gifPlayback: true
})
```

#### Audio

```js
await sock.sendMessage(id, {
    audio: { url: './audio.ogg' },
    mimetype: 'audio/mp4'
})
```

#### Voice Note (VN)

```js
await sock.sendMessage(id, {
    audio: buffer,
    ptt: true
})
```

#### Sticker

```js
await sock.sendMessage(id, {
    sticker: buffer
})
```

---

### View Once Message

Semua tipe media bisa dibuat `viewOnce`:

```js
await sock.sendMessage(id, {
    image: buffer,
    viewOnce: true
})
```

---

### Modify Messages

#### Delete Message (for everyone)

```js
const sent = await sock.sendMessage(id, { text: 'hapus saya' })
await sock.sendMessage(id, { delete: sent.key })
```

#### Edit Message

```js
await sock.sendMessage(id, {
    text: 'teks baru',
    edit: m.key
})
```

---

Referensi resmi Baileys:
[https://www.npmjs.com/package/baileys#sending-messages](https://www.npmjs.com/package/baileys#sending-messages)

---

## Mode Operasi AI

AI memiliki 3 mode kerja:

### MODE: CREATE_FILE

AI **WAJIB** menentukan **jenis file** sebelum membuat kode.

Jenis file yang valid:

1. `COMMAND` → `fitur/<Category>/<command>.js`
2. `PRELOAD` → `fitur/_<nama>.js`
3. `ADDONS` → `addons/<nama>.js`

Jika user **tidak menyebutkan jenis**, AI **HARUS menyimpulkan dari konteks**:

* Kata "fitur", "command" → COMMAND
* Kata "preload", "anti", "sebelum command" → PRELOAD
* Kata "addons", "startup", "sock." → ADDONS

Contoh input:

```
Buatkan addons myos
```

Output AI:

* Path file: `addons/myos.js`
* Struktur sesuai kontrak addons

---

### MODE: EDIT_FILE

Input user:

```
Edit fitur Example/contoh.js tambahkan axios request
```

Aturan:

* Tidak mengubah struktur dasar
* Hanya logic di dalam function `message`

---

### MODE: EXPLAIN_FILE

AI hanya menjelaskan isi file, **tidak mengubah apa pun**.

---

## Kontrak Output AI

Saat AI membuat atau mengedit file, output **HARUS** dalam format:

PATH: fitur/Example/contoh.js
ACTION: CREATE | EDIT
CODE:
```js
// full code
```

Tanpa teks tambahan di luar format tersebut.

---

## Larangan Keras

AI **DILARANG**:
- Mengubah `module.exports`
- Mengganti destructuring `sock` dan `m`
- Menggunakan library baru tanpa izin
- Menghapus komentar dokumentasi
- Mengubah gaya CommonJS

---

## Contoh Prompt System untuk AI

```

Kamu adalah AI code generator untuk Brainxiex WhatsApp Bot.
Ikuti sepenuhnya aturan di AI.md.
Jangan membuat struktur di luar spesifikasi.
Jika melanggar, output dianggap INVALID.

```

---

## Catatan untuk Developer

AI.md ini **bersifat kontrak keras**.
Jika AI tidak mengikuti satu saja aturan di atas, hasilnya **tidak boleh digunakan**.

Dokumen ini wajib dibaca sebelum menambahkan fitur berbasis AI.

```
