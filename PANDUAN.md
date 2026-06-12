# Pintar Ria — PWA (GitHub Pages)

Hub permainan boleh-install, jalan offline, semua data dalam peranti. Tiada server, tiada GAS.

## Isi folder

| Fail | Fungsi |
|------|--------|
| `index.html` | Seluruh app — login, profil, hub permainan |
| `permainan.json` | **Senarai permainan — edit fail ini untuk tambah game** |
| `manifest.webmanifest` | Identiti PWA (nama, ikon, warna) |
| `sw.js` | Service worker — offline + install |
| `icon-192/512`, `icon-maskable-512`, `apple-touch-icon` | Ikon app |

## Deploy ke GitHub Pages (cara biasa Cikgu)

1. Cipta repo baharu, muat naik **semua** fail dalam folder ini ke root repo.
2. **Settings → Pages →** Source: `main` / root → Save.
3. Tunggu seminit, app hidup di `https://USERNAME.github.io/NAMA-REPO/`.
4. Buka di telefon → menu pelayar → **Add to Home Screen** (atau tekan butang **⬇️ Pasang App**).

> PWA wajib HTTPS — GitHub Pages dah sedia HTTPS, jadi tiada masalah.

## Tambah permainan (tanpa sentuh kod)

Edit `permainan.json`, tambah satu objek:

```json
{ "nama": "Sains Heroes", "emoji": "🔬", "url": "https://anda.github.io/sains-heroes/", "kategori": "Sains", "aktif": true }
```

- `aktif: false` untuk sembunyi sementara.
- `kategori` mengumpulkan tile (Matematik, Bahasa, Sains…).
- Commit → tile muncul automatik. **Jangan lupa** ganti `USERNAME.github.io` pada 3 game sedia ada dengan URL sebenar.

## Bila kemas kini app

Naikkan nombor versi dalam `sw.js`:

```js
const VERSI = 'pintar-ria-v1';   // → 'pintar-ria-v2'
```

Tanpa ini, peranti yang dah install mungkin guna simpanan lama. (Jika baru edit `permainan.json` sahaja, tak perlu — ia network-first, sentiasa cuba versi terkini.)

## Aliran pengguna

1. **Kali pertama** — ibu bapa/guru cipta **PIN ibu bapa** (4 digit), kemudian tambah profil anak.
2. **Harian** — app buka terus ke **pemilih profil anak**. Anak tap profil → masukkan **PIN sendiri** → main.
3. **Ruang Ibu Bapa** — tekan butang di skrin pemilih → masukkan PIN ibu bapa → tambah/edit/padam profil & tukar PIN.

## Perlu tahu (jujur)

- **Data per-peranti.** Profil & kemajuan duduk dalam peranti ini sahaja — tak merentas peranti. Padam data pelayar = padam semua. Sesuai untuk tablet keluarga / kelas.
- **Gerbang ringan, bukan benteng.** PIN ibu bapa & PIN anak di-hash SHA-256 dalam pelayar — cukup untuk halang anak masuk ruang urus, tetapi bukan keselamatan sebenar (boleh dipintas oleh sesiapa yang mahir devtools). Jangan simpan rahsia sebenar.
- **Lupa PIN ibu bapa?** Tiada pemulihan automatik (app peranti-sahaja). Jalan terakhir: kosongkan data tapak dalam tetapan pelayar — ini reset app sepenuhnya.
- **Game offline?** Hub ini cache untuk offline, tetapi setiap game (Misi Sifir dll.) ialah PWA berasingan — perlu di-cache/install sendiri untuk jalan offline.
- **Kemajuan belum direkod lagi.** Slot `pr_kemajuan` sedia ada dalam kod; bila game hantar markah balik, kita boleh papar di dashboard ibu bapa nanti.
