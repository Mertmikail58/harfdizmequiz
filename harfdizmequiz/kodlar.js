// Veri havuzunu oluştur
const ogrenciler = [
    { ad: "Enes", ipucu: "Hiperaktif" },
    { ad: "Bilal", ipucu: "Kumarbaz"  },
    { ad: "Umut", ipucu: "Çalgıcı"  },
    { ad: "Tuğba", ipucu: "Sincap"  },
    { ad: "Erayinho", ipucu: "Okulu bıraktı"  }
];

// Değişkenler
let rastgeleOgrenci = {};
let harfler = [];
let dogruSiralanmisHarfler = [];

// DOM elementlerini seç
const kapsayici = document.getElementById("container");
const kapsayici2 = document.getElementById("container2");
const ipucuAlani = document.getElementById("hint");
const sonucAlani = document.getElementById("result");
const yenidenbaslat = document.getElementById("yenidenbaslat");

// Oyunu başlat
oyunuBaslat();

// Oyun başlatma fonksiyonu
function oyunuBaslat() {
    rastgeleOgrenci = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];
    ipucuAlani.innerHTML = "Acaba kim bu? " + rastgeleOgrenci.ipucu;
    kartlariOlustur();
    sonucAlani.textContent = "";
    kapsayici2.style.backgroundColor = ""; // Yeniden başlatıldığında kutunun rengini temizle
}

// Yeniden başlatma butonuna tıklama olayı
yenidenbaslat.addEventListener("click", oyunuBaslat);

// Kartları oluşturma fonksiyonu
function kartlariOlustur() {
    kapsayici.innerHTML = "";
    kapsayici2.innerHTML = "";

    // Harfleri al ve karıştır
    harfler = rastgeleOgrenci.ad.toUpperCase().split("");
    dogruSiralanmisHarfler = [...harfler];
    harfler.sort(() => Math.random() - 0.5);

    // Kartları oluştur
    harfler.forEach((harf) => {
        const kart = document.createElement("div");
        kart.innerHTML = harf;
        kart.className = "card";
        kart.dataset.value = harf;
        kapsayici.appendChild(kart);
        kart.addEventListener("click", kartAc);
    });
}

// Kart açma fonksiyonu
function kartAc() {
    if (!this.classList.contains("placed")) { // Eğer kart daha önce yerleştirilmediyse
        kapsayici2.appendChild(this);
        this.classList.add("placed"); // Kartı yerleştirildi olarak işaretle
        if (kapsayici2.children.length === harfler.length) { // Eğer tüm harfler yerleştirildiyse kontrol et
            const siralanmisKelime = Array.from(kapsayici2.children).map(kart => kart.innerHTML).join('');
            if (siralanmisKelime === rastgeleOgrenci.ad.toUpperCase()) {
                sonucAlani.textContent = "Tebrikler! Kelimeyi doğru sıraladınız!";
                sonucAlani.style.color = "green";
            } else {
                sonucAlani.textContent = "Üzgünüz! Kelimeyi yanlış sıraladınız.";
                sonucAlani.style.color = "red";
            }
        }
    }
}
