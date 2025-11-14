// Tambahkan fungsi Loader
window.addEventListener("load", function () {
    const loaderWrapper = document.getElementById("loader-wrapper");

    if (loaderWrapper) {
        setTimeout(() => {
        loaderWrapper.classList.add("hidden-wrapper"); // Mulai transisi opacity 0.5s
        }, 1500); // Loader tetap tampil minimal 1.5 detik agar animasi terlihat

        setTimeout(() => {
        loaderWrapper.style.display = "none"; // Sembunyikan setelah transisi selesai
        }, 2000); // Sesuai dengan durasi transition CSS + jeda tampilan
    }
});

// Mencegah Inspect Element dan View Source
document.addEventListener("keydown", function (event) {
    if (
        (event.ctrlKey &&
        (event.key === "u" ||
            event.key === "i" ||
            event.key === "j" ||
            event.key === "s")) ||
        (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J" || event.key === "C")) ||
        event.key === "F12"
    ) {
        event.preventDefault();
        console.log("Inspect Element telah dinonaktifkan!"); // Debugging
    }
});
// Mencegah Klik Kanan
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
// Mencegah Drag & Drop pada Semua Gambar
document.addEventListener("dragstart", function (event) {
    event.preventDefault();
});
// Mencegah Klik Kanan pada Gambar Secara Spesifik
document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("contextmenu", (event) => event.preventDefault());
});

// Navbar Fixed
// window.onscroll = function() {
//     const header = document.querySelector('#navbar');
//     const fixedNav = header.offsetTop;
//     console.log(fixedNav);

//     if (window.pageYOffset > fixedNav) {
//         header.classList.add('navbar-fixed');
//         header.classList.remove('navbar-absolute');
//     } 
//     else {
//         header.classList.remove('navbar-fixed');
//         header.classList.add('navbar-absolute');
//     }
// }

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click' , function() {
    // hamburger.classList.toggle('hamburger-active');
    // navMenu.classList.toggle('hidden');
    const isMobile = window.innerWidth < 1024; // Tailwind 'lg' = 1024px

    if (navMenu.classList.contains("hidden")){
        document.body.classList.toggle('nav-open');
        navMenu.classList.remove("hidden");
        navMenu.classList.add('dropdown-appear');
        navMenu.style.transform = "translateY(-10px)";
        navMenu.style.opacity = "0";

        setTimeout(() => {
            navMenu.style.transform = "translateY(0)";
            navMenu.style.opacity = "1";
        }, 10);
    } else {
        if (isMobile) {
            navMenu.style.transform = "translateY(-10px)";
            navMenu.style.opacity = "0";
            document.body.classList.remove('nav-open');
            navMenu.classList.remove('dropdown-appear');
            setTimeout(() => {
                navMenu.classList.add("hidden");
            }, 300);
        }
    }
});

function updateNavMenuDisplay() {
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
        // Hanya tambahkan hidden jika menu belum dibuka (misalnya user belum klik hamburger)
        if (!document.body.classList.contains('nav-open')) {
            navMenu.classList.add("hidden");
        } else {
            navMenu.classList.remove('dropdown-appear');
            navMenu.classList.add("hidden");
            document.body.classList.remove('nav-open');
        }
    } else {
        navMenu.classList.remove('dropdown-appear');
        navMenu.classList.remove("hidden");
        navMenu.style.opacity = "1";
        navMenu.style.transform = "translateY(0)";
    }
}

// Jalankan saat halaman pertama kali dimuat
updateNavMenuDisplay();

// Jalankan juga saat ukuran layar berubah
window.addEventListener('resize', updateNavMenuDisplay);

// Menutup Navbar saat klik di luar kotak navbar
window.addEventListener("click", function (event) {
    const isMobile = window.innerWidth < 1024;

    // Cek: apakah klik di luar navMenu dan bukan pada hamburger
    if (
        isMobile &&
        !navMenu.contains(event.target) &&
        !hamburger.contains(event.target) &&
        !navMenu.classList.contains("hidden") // navbar sedang terbuka
    ) {
        // Tambahkan animasi keluar
        navMenu.style.transform = "translateY(-10px)";
        navMenu.style.opacity = "0";
        document.body.classList.remove('nav-open');
        navMenu.classList.remove('dropdown-appear');

        // Setelah animasi selesai (0.3 detik), sembunyikan menu
        setTimeout(() => {
            navMenu.classList.add("hidden");
        }, 300);
    }
});

// START NUMBER COUNTING ANIMATION
const angkaMhs = document.querySelectorAll("#jml-mahasiswa span");
const container = document.getElementById("home");

let activated = false;

function checkAndStartCounting() {
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (containerTop < windowHeight - 50 && !activated) {
        angkaMhs.forEach((angka) => {
        angka.innerText = 0;
        let count = 0;
        function updateCount() {
            const target = parseInt(angka.dataset.count);
            if (count < target) {
            count++;
            angka.innerText = count;
            setTimeout(updateCount, 20);
            } else {
            angka.innerText = target;
            }
        }
        updateCount();
        });
        activated = true;
    }

    // reset jika user scroll jauh ke atas
    if (containerTop > windowHeight) {
        angkaMhs.forEach((angka) => {
        angka.innerText = 0;
        });
        activated = false;
    }
}

// jalankan saat scroll
window.addEventListener("scroll", checkAndStartCounting);

// jalankan sekali saat halaman baru dimuat
document.addEventListener("DOMContentLoaded", checkAndStartCounting);
// END NUMBER COUNTING ANIMATION

//  FAQ SECTION - ACCORDION
document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion-toggle");
    accordions.forEach((accordion) => {
        accordion.addEventListener("change", function () {
        // Menutup accordion lainnya saat yang ini dibuka
        accordions.forEach((item) => {
            if (item !== this) item.checked = false;
        });
        });
    });
});
//  FAQ SECTION - ACCORDION

// POPUP CONTACT SECTION
document.addEventListener("DOMContentLoaded", function () {
    let contactBtn = document.querySelector(".button-with-icon-faq");
    let popup = document.getElementById("contact");
    let closeBtn = document.querySelector(".close-btn-contact");

    // Ketika tombol Contact Us diklik
    contactBtn.addEventListener("click", function () {
        popup.style.display = "flex"; // Tampilkan popup
        // popup.classList.add("flex-contact");
    });

    closeBtn.addEventListener("click", function () {
        let form = popup.querySelector(".form-contact");
        form.classList.add("slide-out");

        // Setelah animasi selesai, baru sembunyikan popup
        form.addEventListener(
            "animationend",
            function () {
                // popup.classList.remove("flex-contact");
                popup.style.display = "none";
                form.classList.remove("slide-out"); // reset agar bisa dipakai lagi nanti
            },
            { once: true }
        );
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            let form = popup.querySelector(".form-contact");
            form.classList.add("slide-out");
            form.addEventListener(
                "animationend",
                function () {
                    // popup.classList.remove("flex-contact");
                    popup.style.display = "none";
                    form.classList.remove("slide-out");
                },
                { once: true }
            );
        }
    });
});
// ## FAQ SECTION