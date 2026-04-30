document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("email").value.trim(); // FIX
    const password = document.getElementById("password").value.trim();

    const alertBox = document.getElementById("alertBox");

    if (!username || !password) {
        showAlert("Email dan password wajib diisi");
        return;
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            localStorage.setItem("username", data.username);
            showAlert("Login berhasil!");

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);

        } else {
            showAlert("Username atau Password salah");
        }

    } catch (error) {
        showAlert("Server error / tidak bisa terhubung");
        console.error(error);
    }

    function showAlert(message) {
        alertBox.innerText = message;
        alertBox.style.display = "block";

        setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000);
    }
});
