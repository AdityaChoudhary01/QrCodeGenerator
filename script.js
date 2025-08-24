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
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.checked = true;
}

const resetUI = () => {
    qr_box.classList.remove("active");
    preValue = "";
}

// QR Code generation logic
generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || generateBtn.classList.contains("loading")) return;

    // Do not regenerate if the value is the same
    if (preValue === qrValue) return;
    preValue = qrValue;

    // --- Start Loading State ---
    generateBtn.classList.add("loading");
    qr_box.classList.remove("active");

    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${qrValue}`;
    qrImg.src = qrApiUrl;

    qrImg.onload = () => {
        // --- End Loading State ---
        generateBtn.classList.remove("loading");
        qr_box.classList.add("active");

        fetch(qrApiUrl)
            .then(res => res.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                downloadBtn.href = objectURL;
                downloadBtn.setAttribute("download", `qr-code-${qrValue}.png`);
            })
            .catch(() => console.error("Failed to fetch QR code for download."));
    };

    qrImg.onerror = () => {
        // --- Handle API Errors ---
        generateBtn.classList.remove("loading");
        alert("Failed to generate QR Code. Please check the API or your connection.");
        resetUI();
    };
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        resetUI();
    }
});
