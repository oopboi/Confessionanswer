document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes');
    const noButton = document.getElementById('no');
    const responseDiv = document.getElementById('response');

    const webhookURL = "https://discord.com/api/webhooks/1446456962991788172/j4H35G5b6LZwRU0ScgMYrpPC0YhHBO7IIPcG8Dm-ggdeoqLmzdzgaxdS_NXzoxnVPcT-";

    // Check if she has already answered
    if(localStorage.getItem('answered') === 'true') {
        yesButton.disabled = true;
        noButton.disabled = true;
        yesButton.style.opacity = 0.5;
        noButton.style.opacity = 0.5;
        yesButton.style.cursor = "not-allowed";
        noButton.style.cursor = "not-allowed";
        responseDiv.style.display = "block";
        responseDiv.innerText = "You already answered ❤️";
        return; // Stop further execution
    }

    function answer(choice) {
        // Show thank you message
        responseDiv.style.display = "block";
        responseDiv.innerText = "Thx for answering ❤️";

        // Disable buttons
        yesButton.disabled = true;
        noButton.disabled = true;
        yesButton.style.opacity = 0.5;
        noButton.style.opacity = 0.5;
        yesButton.style.cursor = "not-allowed";
        noButton.style.cursor = "not-allowed";

        // Mark as answered in localStorage
        localStorage.setItem('answered', 'true');

        // Send answer to Discord webhook
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: "She answered: **" + choice + "**" })
        }).catch(err => console.log("Error sending to Discord:", err));
    }

    yesButton.addEventListener('click', () => answer('Yes'));
    noButton.addEventListener('click', () => answer('No'));
});
