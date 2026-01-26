# AI.md

## Tujuan Dokumen

Dokumen ini mendefinisikan **aturan, format, dan kontrak kerja AI** agar AI dapat:

1. Membuat file fitur baru secara otomatis.
2. Mengedit file fitur yang sudah ada.
3. Memastikan semua kode yang dihasilkan **konsisten dengan standar Brainxiex Bot WhatsApp**.

AI **tidak boleh** membuat struktur, nama file, atau pola kode di luar spesifikasi dokumen ini.

---

## Ruang Lingkup AI

AI **DIPERBOLEHKAN**:

* Membuat **file JavaScript baru** di:

  * `fitur/<Category>/<command>.js` (**command biasa**)
  * `fitur/_<nama>.js` (**preload**)
  * `addons/<nama>.js` (**addons startup**)
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
  * Return:

    * `Buffer` untuk file biner
    * `string` untuk file teks

* `sock.func.db.write(lokasi, value)` atau `sock.func.db.save(lokasi, value)`

  * Fungsi: menulis / overwrite file
  * Parameter:

    * `lokasi`: string path
    * `value`: `string | Buffer`

> `read` = `load` dan `write` = `save` adalah **alias**, **BUKAN fungsi berbeda**.

Contoh:

```js
const buffer = sock.func.db.read('/download/ikan.mp4');
sock.func.db.save('/download/ikan_copy.mp4', buffer);
```

---

## Jenis Modul

Sistem memiliki **3 jenis modul**:

1. **Command** (fitur biasa)
2. **Preload** (load sebelum command)
3. **Addons** (load saat startup)

Setiap jenis modul memiliki aturan berbeda dan **TIDAK BOLEH tertukar**.

Struktur folder:

```
fitur/
├─ <Category>/
│  └─ <command>.js
├─ _anti.js
addons/
└─ myos.js
```

AI **WAJIB** memastikan nama folder kategori **SAMA PERSIS** dengan nilai `category` di dalam file.

---

## Kontrak File Command (WAJIB)

Setiap file command **HARUS** menggunakan template berikut **TANPA MODIFIKASI STRUKTUR**:

```js
const cmd = '<command>';
const args = '<args>';
const category = '<Category>';

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

---

## Kontrak File Preload (Load-Sebelum-Command)

Ciri preload:

* Berada di folder `fitur/`
* Nama file diawali `_`
* Dieksekusi **setiap pesan masuk** sebelum command

Struktur wajib:

```js
const id = '_anti';

async function action(sock, m, store) {
    // logic preload
    // return boolean
}

module.exports = { id, action };
```

### Aturan Return Preload

| Return | Arti                  |
| -----: | --------------------- |
|  false | Lanjut ke command     |
|   true | Stop eksekusi command |

AI **WAJIB** mengembalikan `true` atau `false`.

---

## Kontrak File Addons (Load Saat Startup)

Addons dieksekusi **SATU KALI** saat bot pertama kali berjalan.

Tujuan addons:

* Extend `sock`
* Menambahkan utility global
* Menyimpan state global

Struktur wajib addons:

```js
module.exports = function (sock) {
    // extend sock
    return sock;
};
```

### Contoh Addons

**Addons (value):**

```js
// addons/myos.js
const os = require('os');

module.exports = function (sock) {
    sock.myos = os.platform();
    return sock;
};
```

**Addons (function):**

```js
// addons/myos.js
const os = require('os');

module.exports = function (sock) {
    sock.myos = () => os.platform();
    return sock;
};
```

### Aturan Keras Addons

Addons **DILARANG**:

* Mengirim pesan
* Mengakses `m`
* Meng-handle logic chat
* Mengubah flow command

---

## Definisi Variabel Penting

| Variabel           | Fungsi                    |
| ------------------ | ------------------------- |
| cmd                | Nama command tanpa prefix |
| args               | Tipe argumen command      |
| category           | Nama folder kategori      |
| sock               | Instance utama bot        |
| m                  | Data pesan                |
| nyarios            | Shortcut reply            |
| AxiosDenganHandler | Axios auto error handler  |

---

## Aturan Penulisan Logic

### Validasi Argumen

AI **DIPERBOLEHKAN** menggunakan salah satu dari pola berikut:

```js
if (!isset(arg)) return nyarios(`Masukan sesuatu. Contoh: ${Prefix}${cmd} contoh`);
```

atau

```js
if (!arg) return nyarios(`Masukan sesuatu. Contoh: ${Prefix}${cmd} contoh`);
```

Keduanya **VALID** selama tidak merusak flow logic command.

---

## Standar Pengiriman Pesan (Baileys – WAJIB)

Semua pengiriman pesan **HARUS** menggunakan:

```js
sock.sendMessage(jid, content, options);
```

Prioritas:

* `nyarios()` untuk reply
* `sock.sendMessage()` untuk non-reply

---

## Mode Operasi AI

### MODE: CREATE_FILE

Jenis file valid:

1. `COMMAND` → `fitur/<Category>/<command>.js`
2. `PRELOAD` → `fitur/_<nama>.js`
3. `ADDONS` → `addons/<nama>.js`

Jika jenis tidak disebutkan, AI **HARUS menyimpulkan dari konteks**.

---

### MODE: EDIT_FILE

* Tidak mengubah struktur dasar
* Hanya logic di dalam function terkait

---

### MODE: EXPLAIN_FILE

* Hanya menjelaskan
* **TIDAK BOLEH** mengubah kode

---

## Kontrak Output AI (WAJIB)

Saat AI membuat atau mengedit file, output **HARUS** persis dalam format berikut:

Path: <path>
code:
```js
// full code
```

- `Path` **case-sensitive** (huruf P besar)
- **TIDAK BOLEH** ada `ACTION`, `CREATE`, `EDIT`, atau teks lain di luar format
- Output di luar format ini dianggap **INVALID**

---

## Larangan Keras

AI **DILARANG**:

- Mengubah `module.exports`
- Mengganti destructuring `sock` dan `m`
- Menambah library tanpa izin
- Mengubah gaya CommonJS

---

## Catatan Developer

Dokumen ini adalah **KONTRAK KERAS**.

Jika satu aturan saja dilanggar, output AI **TIDAK VALID** dan **TIDAK BOLEH DIGUNAKAN**.

```
