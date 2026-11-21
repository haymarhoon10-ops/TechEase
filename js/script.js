// =========================================================
// TechEase - JavaScript
// 1. Text size buttons (A+ / A-)
// 2. Registration form validation (home page)
// 3. "Spot the Scam" quiz (Stay Safe Online page)
// 4. Phone practice simulator (Smartphone Basics page)
// =========================================================


// ---------- 1. Text size ----------
// The size is saved in localStorage so it stays the same on every page.

function loadTextSize() {
  let size = localStorage.getItem("textSize");
  if (size != null) {
    document.body.style.fontSize = size + "px";
  }
}

function changeTextSize(amount) {
  let size = localStorage.getItem("textSize");
  if (size == null) {
    size = 20;
  }
  size = Number(size) + amount;

  if (size >= 18 && size <= 28) {
    localStorage.setItem("textSize", size);
    document.body.style.fontSize = size + "px";
  }
}


// ---------- 2. Registration form validation ----------

function validateForm() {
  // trim() removes spaces at the start and end, so "   " does not count as a name
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let email = document.getElementById("email").value.trim();

  let valid = true;

  // clear old messages
  document.getElementById("firstNameError").innerHTML = "";
  document.getElementById("lastNameError").innerHTML = "";
  document.getElementById("mobileError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("successMessage").style.display = "none";

  // First name: minimum 3 characters
  if (firstName.length < 3) {
    document.getElementById("firstNameError").innerHTML = "⚠ First name must be at least 3 characters.";
    valid = false;
  }

  // Last name: minimum 3 characters
  if (lastName.length < 3) {
    document.getElementById("lastNameError").innerHTML = "⚠ Last name must be at least 3 characters.";
    valid = false;
  }

  // Mobile: exactly 8 digits - check every character is a number from 0 to 9
  let onlyDigits = true;
  for (let i = 0; i < mobile.length; i++) {
    if (mobile.charAt(i) < "0" || mobile.charAt(i) > "9") {
      onlyDigits = false;
    }
  }
  if (mobile.length != 8 || onlyDigits == false) {
    document.getElementById("mobileError").innerHTML = "⚠ Mobile number must be exactly 8 digits.";
    valid = false;
  }

  // Email: one @ only, a dot after the @, and no spaces
  let at = email.indexOf("@");
  let dot = email.lastIndexOf(".");
  let oneAt = (at == email.lastIndexOf("@"));
  let noSpaces = (email.indexOf(" ") == -1);
  if (at < 1 || dot < at + 2 || dot == email.length - 1 || oneAt == false || noSpaces == false) {
    document.getElementById("emailError").innerHTML = "⚠ Please enter a valid email, for example name@example.com";
    valid = false;
  }

  // everything is correct
  if (valid == true) {
    document.getElementById("successMessage").innerHTML =
      "✓ Thank you, " + firstName + "! Your details are correct and your registration is complete.";
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("registerForm").reset();
  }

  // stop the page from reloading
  return false;
}


// ---------- 3. Spot the Scam quiz ----------

function checkAnswer(questionNumber, choice, correct) {
  let answerBox = document.getElementById("answer" + questionNumber);

  if (choice == correct) {
    answerBox.innerHTML = "✓ Correct! Well done.";
    answerBox.style.color = "green";
  } else {
    answerBox.innerHTML = "✗ Not quite. Read the tip below and try again.";
    answerBox.style.color = "red";
  }
}


// ---------- 4. Phone practice simulator ----------
// The pretend phone has 4 screens. Each function hides one screen and shows the next.

function hideAllScreens() {
  document.getElementById("screen1").style.display = "none";
  document.getElementById("screen2").style.display = "none";
  document.getElementById("screen3").style.display = "none";
  document.getElementById("screen4").style.display = "none";
  document.getElementById("simHint").innerHTML = "";
}

function openWhatsApp() {
  hideAllScreens();
  document.getElementById("screen2").style.display = "block";
  document.getElementById("simStep").innerHTML = "Step 2: Tap Fatima's name to open the chat.";
}

function openChat() {
  hideAllScreens();
  document.getElementById("screen3").style.display = "block";
  document.getElementById("simStep").innerHTML = "Step 3: Tap the message box to type your message.";
}

function typeMessage() {
  document.getElementById("messageBox").innerHTML = "Hello Fatima! 😊";
  document.getElementById("simStep").innerHTML = "Step 4: Tap the green send button ➤";
  document.getElementById("simHint").innerHTML = "";
}

function sendMessage() {
  if (document.getElementById("messageBox").innerHTML == "Type a message") {
    document.getElementById("simHint").innerHTML = "💡 First tap the message box to type.";
  } else {
    hideAllScreens();
    document.getElementById("screen4").style.display = "block";
    document.getElementById("simStep").innerHTML = "🎉 Well done! You sent your first WhatsApp message.";
    document.getElementById("restartButton").style.display = "inline-block";
  }
}

function wrongTap(message) {
  document.getElementById("simHint").innerHTML = "💡 " + message;
}

function restartSimulator() {
  hideAllScreens();
  document.getElementById("screen1").style.display = "block";
  document.getElementById("messageBox").innerHTML = "Type a message";
  document.getElementById("simStep").innerHTML = "Step 1: Tap the green WhatsApp icon.";
  document.getElementById("restartButton").style.display = "none";
}
