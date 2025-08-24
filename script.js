const qr_box = document.querySelector(".qr_box"),
qrInput = qr_box.querySelector(".form input"),
generateBtn = qr_box.querySelector(".form .generate-btn"),
qrImg = qr_box.querySelector(".qr-code img"),
downloadBtn = qr_box.querySelector(".download-btn");

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
let preValue;

// Theme switcher logic
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.checked = true;
}

// QR Code generation logic
generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        qr_box.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        // Set the href for the download button
        downloadBtn.href = qrImg.src;
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        qr_box.classList.remove("active");
        preValue = "";
    }
});
