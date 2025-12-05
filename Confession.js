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

        // Display the previous answer
        const prevAnswer = localStorage.getItem('choice');
        if(prevAnswer === 'Yes') {
            responseDiv.innerText = "Thank you! :)";
        } else if(prevAnswer === 'No') {
            responseDiv.innerText = "Awww :(";
        } else {
            responseDiv.innerText = "You already answered ❤️";
        }

        return; // Stop further execution
    }

    function answer(choice) {
        // Show response depending on the choice
        responseDiv.style.display = "block";
        if(choice === 'Yes') {
            responseDiv.innerText = "Thank you! :)";
        } else if(choice === 'No') {
            responseDiv.innerText = "Awww :(";
        }

        // Disable buttons
        yesButton.disabled = true;
        noButton.disabled = true;
        yesButton.style.opacity = 0.5;
        noButton.style.opacity = 0.5;
        yesButton.style.cursor = "not-allowed";
        noButton.style.cursor = "not-allowed";

        // Mark as answered in localStorage
        localStorage.setItem('answered', 'true');
        localStorage.setItem('choice', choice); // store the choice

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
