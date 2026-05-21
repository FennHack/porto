document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message");

    // Validasi sederhana
    if (!username || !email || !password) {
        messageEl.style.color = "red";
        messageEl.innerText = "Semua field harus diisi!";
        return;
    }

    if (password.length < 6) {
        messageEl.style.color = "red";
        messageEl.innerText = "Password minimal 6 karakter!";
        return;
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=register&username=\( {encodeURIComponent(username)}&email= \){encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            messageEl.style.color = "green";
            messageEl.innerText = "Registrasi berhasil! Mengalihkan...";
            setTimeout(() => {
                window.location.href = "index.html"; // atau halaman login
            }, 1500);
        } else {
            messageEl.style.color = "red";
            messageEl.innerText = data.message || "Gagal registrasi. Coba lagi.";
        }
    } catch (error) {
        console.error(error);
        messageEl.style.color = "red";
        messageEl.innerText = "Terjadi kesalahan koneksi. Cek internet kamu.";
    }
});
