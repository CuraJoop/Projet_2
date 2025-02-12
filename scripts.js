document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const github = document.getElementById("github");
  const avatarInput = document.getElementById("avatar");
  const removeBtn = document.getElementById("remove-btn");
  const errorMessage = document.getElementById("error-message");
  const previewImg = document.getElementById("preview-img");

  let avatarFile = null;

  function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.color = "red";
      errorMessage.setAttribute("role", "alert");
  }

  function clearError() {
      errorMessage.textContent = "";
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }

  function validateAvatar(file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!file) return true;
      if (!validTypes.includes(file.type)) {
          showError("Invalid image format. Only JPG and PNG are allowed.");
          return false;
      }
      if (file.size > 500000) {
          showError("File size too large. Maximum allowed is 500KB.");
          return false;
      }
      return true;
  }

  avatarInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (validateAvatar(file)) {
          avatarFile = file;
          const reader = new FileReader();
          reader.onload = function(event) {
              previewImg.src = event.target.result;
          };
          reader.readAsDataURL(file);
          clearError();
      } else {
          avatarInput.value = "";
          previewImg.src = "assets/images/icon-upload.svg";
      }
  });

  document.getElementById("choose-link").addEventListener("click", (e) => {
      e.preventDefault();
      avatarInput.click();
  });

  form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearError();

      if (!fullName.value.trim()) {
          showError("Full name is required.");
          return;
      }
      if (!email.value.trim() || !validateEmail(email.value)) {
          showError("Valid email is required.");
          return;
      }
      if (!validateAvatar(avatarFile)) {
          return;
      }

      generateTicket();
  });

  function generateTicket() {
      document.body.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:ital,wght@0,400;1,700&display=swap');

/* Style global */
body {
  font-family: 'Inter', sans-serif;
  background: url('assets/images/background-desktop.png') no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  position: relative;
  text-align: center;
}

/* Conteneur du ticket */
.ticket-container {
  border-radius: 20px;
  padding: 30px;
  width: 400px;
  text-align: center;
}

/* Titre principal du ticket (plus grand texte) */
.ticket-message h2 {
  font-family: 'Inconsolata', monospace;
  font-size: 2.2rem; /* Texte plus grand */
  font-weight: bold;
  color: white;
}

/* Texte de mise en surbrillance */
.highlight {
  color: #ff7f50;
}

/* Message du ticket */
.ticket-message p {
  font-family: 'Inconsolata', monospace;
  font-size: 1.2rem; /* Texte légèrement plus grand */
  color: white;
}

/* Ticket */
.ticket {
  margin-top: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, rgb(104, 104, 107) 0%, rgb(130, 131, 132) 100%);
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Décoration après le ticket */
.ticket::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  width: 20px;
  height: 40px;
  background: rgb(188, 189, 193);
  border-radius: 10px;
  transform: translateY(-50%);
}

/* Header du ticket */
.ticket-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inconsolata', monospace;
  font-size: 1.5rem; /* Texte plus grand pour le header */
  font-weight: bold;
  color: #ff7f50;
}

/* Logo du ticket */
.ticket-logo {
  width: 25px;
  height: 25px;
}

/* Date du ticket */
.ticket-date {
  font-family: 'Inconsolata', monospace;
  font-size: 1rem; /* Taille moyenne */
  color: #ccc;
}

/* Section utilisateur */
.ticket-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Avatar de l'utilisateur */
.ticket-avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

/* Informations sur l'utilisateur */
.ticket-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Nom de l'utilisateur */
.ticket-name {
  font-family: 'Inconsolata', monospace;
  font-weight: bold;
  font-size: 1.1rem; /* Texte un peu plus petit */
}

/* GitHub de l'utilisateur */
.ticket-github {
  font-family: 'Inconsolata', monospace;
  font-size: 0.9rem; /* Texte plus petit */
  color: #bbb;
}
p {
  font-family: 'Inconsolata', monospace; /* Appliquer Inconsolata Regular à tous les <p> */
  font-size: 1rem; /* Ajuster la taille si nécessaire */
  color: white; /* S'assurer que le texte reste blanc */
}
      </style>

      <div class="ticket-container">
          <div class="ticket-message">
              <h2>🎉 Congrats, <span class="highlight">${fullName.value}</span>!</h2>
              <p>Your ticket is ready.</p>
              <p>We've emailed your ticket to <span class="highlight">${email.value}</span>.</p>
          </div>
          <div class="ticket">
              <div class="ticket-header">
                  <img src="assets/images/logo-mark.svg" alt="Coding Conf Logo" width="30">
                  <span>Coding Conf</span>
              </div>
              <p>Feb 11, 2025 / Austin, TX</p>
              <div class="ticket-user">
                  ${avatarFile ? `<img src="${URL.createObjectURL(avatarFile)}" class="ticket-avatar">` : ''}
                  <div>
                      <p>${fullName.value}</p>
                      <p>${github.value || "N/A"}</p>
                  </div>
              </div>
          </div>
      </div>
      `;
  }
});
