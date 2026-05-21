// SHOW / HIDE PASSWORD
const passwordToggle = document.getElementById("passwordToggle");
const passwordInput = document.getElementById("password");

passwordToggle.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
        passwordToggle.innerText = "🙈";

    }else{

        passwordInput.type = "password";
        passwordToggle.innerText = "👁";

    }

});


// LOGIN
document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const alertBox = document.getElementById("alertBox");

    // VALIDASI
    if(!username || !password){

        showAlert("Username dan password wajib diisi");
        return;

    }

    try{

        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {

            method: "POST",

            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },

            body:
            `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`

        });

        const data = await res.json();

        console.log(data);

        if(data.status === "success"){

            localStorage.setItem("username", data.username);

            showAlert("Login berhasil!");

            setTimeout(() => {

                window.location.href = "../index.html";

            }, 1000);

        }else{

            showAlert("Username atau password salah");

        }

    }catch(error){

        console.error(error);

        showAlert("Server error / gagal terhubung");

    }

});


// ALERT FUNCTION
function showAlert(message){

    const alertBox = document.getElementById("alertBox");

    alertBox.innerText = message;

    alertBox.style.display = "block";

    setTimeout(() => {

        alertBox.style.display = "none";

    }, 3000);

}
