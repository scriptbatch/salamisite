// Function to get cookies
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Get logged-in username
let username = getCookie("loggedInUser");
if (!username) {
    window.location.href = "login.html"; // Redirect if not logged in
}

let users = JSON.parse(localStorage.getItem("users")) || {};

// Ensure user has an account
if (!users[username]) {
    users[username] = { password: "", applePoints: 10 }; // Default 10 Apple Points
    localStorage.setItem("users", JSON.stringify(users));
}

let applePoints = users[username].applePoints;

// Update Apple Points Display
function updateApplePoints() {
    document.getElementById("apple-points").innerText = `Apple Points: ${applePoints}`;
}

// Set initial Apple Points display
updateApplePoints();

// Spin Button Logic
document.getElementById("spin-button").addEventListener("click", function () {
    if (applePoints > 0) {
        applePoints--; // Deduct 1 point for spinning
        
        // Random chance for rewards
        let chance = Math.random(); // Generates a number between 0 and 1
        let winnings = 0;

        if (chance < 0.05) {
            winnings = 5; // Jackpot (5%)
        } else if (chance < 0.15) {
            winnings = 3; // Small Bonus (10%)
        } else if (chance < 0.35) {
            winnings = 1; // Normal Win (20%)
        } else {
            winnings = 0; // Most Common Outcome (65%)
        }

        applePoints += winnings;

        // Prevent the user from going broke
        if (applePoints <= 0) {
            applePoints = 1; // Give them 1 free Apple Point
            alert("You went broke! Here’s 1 free Apple Point to keep playing.");
        }

        // Update user data
        users[username].applePoints = applePoints;
        localStorage.setItem("users", JSON.stringify(users));

        // Update UI
        updateApplePoints();
        alert(`You won ${winnings} Apple Points!`);
    }
});
