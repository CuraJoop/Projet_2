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

    // Handle avatar input change
    avatarInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (validateAvatar(file)) {
            avatarFile = file;
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImg.src = event.target.result; // Display the image
            };
            reader.readAsDataURL(file);
            clearError();
        } else {
            avatarInput.value = ""; // Clear input if invalid file
            previewImg.src = "assets/images/icon-upload.svg"; // Reset preview
        }
    });

    // Handle file input click via custom link
    document.getElementById("choose-link").addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        avatarInput.click(); // Trigger file input
    });

    // Handle form submit
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

    // Generate ticket content
    function generateTicket() {
        const ticketContainer = document.createElement("div");
        ticketContainer.classList.add("ticket-container");

        ticketContainer.innerHTML = `
<style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg,rgb(227, 217, 233),rgb(105, 81, 244));
          background-size: cover;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          position: relative;
        }

        body::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('abstract-pattern.svg') repeat;
          opacity: 0.3;
          pointer-events: none;
        }

        .ticket-container {
          background: rgba(12, 5, 92, 0.7);
        background: url('assets/images/background-mobile.png') repeat;

          border-radius: 15px;
          padding: 20px;
          width: 350px;
          text-align: center;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }

        .ticket-message h2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }

        .highlight {
          color: orange;
        }

        .ticket-message p {
          font-size: 1rem;
          color: white;
        }

        .ticket {
          margin-top: 20px;
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          color: #333;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .ticket-header {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #6a1b9a;
          color: white;
        }

        .ticket-logo {
          width: 30px;
          height: 30px;
        }

        .ticket-date {
          font-size: 1rem;
          text-align: center;
          padding: 10px 0;
        }

        .ticket-user {
          display: flex;
          justify-content: center;
          padding: 10px;
        }

        .ticket-avatar {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        .ticket-name {
          font-weight: bold;
        }

        .ticket-github {
          font-style: italic;
          color: gray;
        }
      </style>

      <div class="ticket-message">
        <h2>🎉 Congrats, <span class="highlight">${fullName.value}</span>!</h2>
        <p>Your ticket is ready.</p>
        <p>We've emailed your ticket to <span class="highlight">${email.value}</span> and will send updates before the event.</p>
      </div>

      <div class="ticket">
        <div class="ticket-header">
          <img src="assets/images/logo-mark.svg" alt="Coding Conf Logo" class="ticket-logo">
          <span>Coding Conf</span>
        </div>
        <p class="ticket-date">Feb 11, 2025 / Austin, TX</p>
        <div class="ticket-user">
          ${avatarFile ? `<img src="${URL.createObjectURL(avatarFile)}" alt="User Avatar" class="ticket-avatar">` : ''}
          <div>
            <p class="ticket-name">${fullName.value}</p>
            <p class="ticket-github">${github.value || "N/A"}</p>
          </div>
        </div>
      </div>
        `;

        document.body.innerHTML = ""; // Clear the body
        document.body.appendChild(ticketContainer); // Append the ticket
    }
});
