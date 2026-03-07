# AI.md

## Tujuan Dokumen

Dokumen ini adalah kontrak kerja AI untuk project Brainxiex Bot WhatsApp.

Tujuan utama:

1. AI bisa membuat fitur baru dengan struktur yang benar.
2. AI bisa mengedit fitur yang sudah ada tanpa merusak sistem.
3. AI konsisten terhadap style, flow, dan standar error handling project ini.

Jika ada konflik, prioritaskan urutan ini:

1. Jangan merusak bot.
2. Ikuti kontrak file.
3. Jaga kompatibilitas.
4. Baru optimasi dan perapihan.

---

## Ruang Lingkup AI

AI dipersilakan:

- Membuat file JavaScript baru di:
- `fitur/<Category>/<command>.js` (command biasa)
- `fitur/_<nama>.js` (preload)
- `addons/<nama>.js` (startup addons)
- Mengedit file JavaScript yang diminta user secara eksplisit.
- Memperbaiki bug logic di dalam function tanpa mengubah kontrak struktur.

AI dilarang:

- Membuat file di luar `fitur/` dan `addons/` kecuali user minta eksplisit.
- Mengubah file core (`index.js`, loader, handler utama) tanpa perintah user.
- Mengubah gaya CommonJS ke ESM.
- Mengubah signature function wajib.
- Menghapus komentar penting milik developer.

---

## Referensi Wajib: Dokumentasi Baileys

Jika task menyentuh WhatsApp transport, event, media, auth, atau message payload, AI wajib merujuk dokumentasi Baileys.

Prioritas sumber:

1. Dokumentasi resmi Baileys (utama): `https://github.com/WhiskeySockets/Baileys`
2. Referensi NPM package Baileys: `https://www.npmjs.com/package/baileys`
3. Tipe/kontrak API dari package yang terpasang di project (misalnya `node_modules/baileys`).
4. Implementasi existing project ini sebagai referensi kompatibilitas.

Aturan kerja wajib:

- Jangan mengarang nama event, method, atau struktur payload.
- Jangan pakai API Baileys yang belum diverifikasi.
- Jika menemukan perbedaan antara contoh internet dan versi package lokal, prioritaskan versi package lokal project.
- Jika fitur Baileys tidak pasti/deprecated, AI wajib beri catatan asumsi dan fallback aman.

Alur minimum saat menyentuh Baileys:

1. Cek pola existing di codebase.
2. Cek versi package yang dipakai project (`package.json` + package lokal).
3. Cek kontrak method/event pada package Baileys lokal.
4. Jika masih ragu, rujuk dokumentasi resmi Baileys dan referensi NPM.
5. Baru menulis atau mengubah kode.

---

## Struktur Folder

### `/fitur`

Berisi command bot berdasarkan kategori.

### `/addons`

Berisi extender untuk objek `sock`, dieksekusi satu kali saat startup.

### Database Helper (`sock.func.db`)

Helper ini dipakai untuk file-based database sederhana.

Catatan:

- `lokasi` adalah string path (relatif atau absolut).
- Path yang tidak diawali `/` dianggap relatif ke root project.
- Folder tujuan harus sudah ada (helper tidak membuat folder).

API helper:

- `sock.func.db.read(lokasi)` alias `sock.func.db.load(lokasi)`
- Return `Buffer` untuk file biner, `string` untuk file teks.
- `sock.func.db.write(lokasi, value)` alias `sock.func.db.save(lokasi, value)`
- `value` wajib `string | Buffer`.

Contoh:

```js
const buffer = sock.func.db.read("/download/ikan.mp4");
sock.func.db.save("/download/ikan_copy.mp4", buffer);
```

---

## Jenis Modul

Sistem hanya mengenal 3 jenis modul:

1. Command
2. Preload
3. Addons

Ketiganya tidak boleh tertukar.

Struktur dasar:

```txt
fitur/
|- <Category>/
|  |- <command>.js
|- _anti.js
addons/
|- myos.js
```

Nilai `category` di file command wajib sama persis dengan nama folder kategori.

---

## Kontrak File Command (WAJIB)

Template command wajib:

```js
const cmd = "<command>";
const args = "<args>";
const category = "<Category>";

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

Aturan keras command:

- Jangan ubah nama export: `cmd`, `args`, `category`, `message`.
- Jangan ubah nama function: `message`.
- Jangan ubah destructuring wajib `sock` dan `m`.
- Tidak boleh mengganti CommonJS.

---

## Kontrak File Preload (WAJIB)

Preload:

- Berada di folder `fitur/`
- Nama file diawali `_`
- Dieksekusi sebelum command handler utama

Template preload:

```js
const id = "_anti";

async function action(sock, m, store) {
    // logic preload
    // wajib return boolean
}

module.exports = { id, action };
```

Nilai return preload:

- `false` -> lanjut ke command
- `true` -> stop eksekusi command

Preload wajib selalu return boolean.

---

## Kontrak File Addons (WAJIB)

Template addons:

```js
module.exports = function (sock) {
    // extend sock
    return sock;
};
```

Addons dilarang:

- Mengirim pesan chat.
- Mengakses objek `m`.
- Menangani flow command/chat.
- Mengubah flow handler pesan.

---

## Definisi Variabel Penting

| Variabel | Fungsi |
| --- | --- |
| `cmd` | Nama command tanpa prefix |
| `args` | Deskripsi argumen command |
| `category` | Nama kategori menu |
| `sock` | Instance utama bot |
| `m` | Objek pesan |
| `nyarios` | Shortcut reply |
| `AxiosDenganHandler` | HTTP client dengan handler internal |

---

## Standar Penulisan Logic Command

### 1) Validasi Argumen

Gunakan salah satu pola ini:

```js
if (!isset(arg)) return nyarios(`Masukan sesuatu. Contoh: ${Prefix}${cmd} contoh`);
```

atau

```js
if (!arg) return nyarios(`Masukan sesuatu. Contoh: ${Prefix}${cmd} contoh`);
```

Tambahan batas aman:

- Gunakan `String(arg || "").trim()` untuk normalisasi input.
- Batasi panjang input bila command memproses teks panjang (rekomendasi max 200 karakter).

### 2) Error Handling Wajib

Semua command yang memanggil API eksternal wajib pakai `try/catch`.

Pola minimal:

```js
try {
    // request API
} catch (err) {
    return nyarios("Terjadi gangguan server. Coba lagi nanti.");
}
```

Jangan kirim stack trace mentah ke user.

### 3) Parsing Response API Harus Aman

Dilarang destructuring nested langsung dari hasil `await` karena rawan crash.

Pola dilarang:

```js
const { data: { Barqah: { audio } } } = await AxiosDenganHandler.post(...);
```

Gunakan pola aman:

```js
const res = await AxiosDenganHandler.post(url, payload, { timeout: 15000 });
const root = res?.data || {};
const api = root?.Barqah || {};
const {
    error = false,
    message = "",
    audio = "",
    title = "",
    thumb = "",
    link = ""
} = api;
```

Jika response tidak sesuai shape, wajib fallback:

```js
if (error) return nyarios(message || "Server mengembalikan error.");
```

### 4) Timeout dan Retry

Standar request eksternal:

- Timeout default: 15 detik.
- Retry maksimal: 1 kali (hanya untuk error jaringan sementara seperti timeout).
- Setelah retry gagal, kirim pesan gagal yang ringkas.

### 5) Presence State

Jika command mengubah presence (`recording`, `composing`, dll), kembalikan lagi ke `available` pada semua jalur akhir (sukses maupun gagal).

---

## Standar Pengiriman Pesan

Gunakan:

```js
sock.sendMessage(jid, content, options);
```

Prioritas:

- `nyarios()` untuk reply langsung ke command user.
- `sock.sendMessage()` untuk pesan non-reply/format khusus.

---

## Mode Operasi AI

### MODE: CREATE_FILE

Jenis file valid:

1. `COMMAND` -> `fitur/<Category>/<command>.js`
2. `PRELOAD` -> `fitur/_<nama>.js`
3. `ADDONS` -> `addons/<nama>.js`

Jika jenis tidak disebutkan user, AI wajib menyimpulkan dari konteks.

### MODE: EDIT_FILE

- Hanya ubah logic yang dibutuhkan.
- Jangan ubah struktur wajib file.
- Pertahankan kompatibilitas dengan loader existing.

### MODE: EXPLAIN_FILE

- Hanya menjelaskan file.
- Tidak mengubah kode.

---

## Kontrak Output AI (WAJIB)

Saat AI membuat atau mengedit file, output wajib:

Path: `<path>`
code:
```js
// full code
```

Ketentuan:

- `Path` harus huruf besar di awal (case-sensitive).
- Tidak boleh ada kata `ACTION`, `CREATE`, `EDIT`, atau metadata lain.
- Output di luar format dianggap invalid.

Catatan:

- Untuk MODE `EXPLAIN_FILE`, AI tidak perlu format `Path/code`.

---

## Checklist Validasi Sebelum Kirim Jawaban

Sebelum final output, AI wajib cek:

1. Path file sesuai aturan folder.
2. `category` sama persis dengan nama folder.
3. `module.exports` tidak berubah.
4. Signature function wajib tidak berubah.
5. Tidak ada variabel undefined.
6. Semua jalur error mengirim respon aman ke user.
7. API call memakai parsing response yang aman.
8. Tidak ada nested destructuring berisiko pada hasil `await`.
9. Jika ada presence update, status dikembalikan ke `available`.
10. Tidak menambah dependency/library tanpa izin user.
11. Method/event Baileys yang dipakai sudah terverifikasi di docs atau tipe package lokal.
12. Tidak menggunakan API Baileys deprecated tanpa fallback atau catatan kompatibilitas.

---

## Larangan Keras

AI dilarang:

- Mengubah `module.exports` wajib.
- Mengganti destructuring wajib `sock` dan `m`.
- Menambah library baru tanpa izin user.
- Mengubah gaya CommonJS.
- Menyimpan kredensial/API key baru ke hardcoded file tanpa perintah user.

---

## Catatan Developer

Dokumen ini adalah kontrak keras.
Satu pelanggaran aturan membuat output dianggap tidak valid.
