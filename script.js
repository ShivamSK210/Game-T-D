document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const playerSetup = document.getElementById("player-setup");
    const playerCountInput = document.getElementById("player-count");
    const submitPlayerCount = document.getElementById("submit-player-count");
    const playerNamesContainer = document.getElementById("player-names");
    const nameInputsContainer = document.getElementById("name-inputs");
    const submitNamesBtn = document.getElementById("submit-names");
    const gameScreen = document.getElementById("game-screen");
    const circle = document.getElementById("circle");
    const bottle = document.getElementById("bottle");
    const message = document.getElementById("message");
    const taskCompleteBtn = document.getElementById("task-complete-btn");
    const nextTurnBtn = document.getElementById("next-turn-btn");
    const truthDareOptions = document.getElementById("truth-dare-options");
    const spinBtn = document.getElementById("spin-btn");
    const resetBtn = document.getElementById("reset-btn");
    const endMessage = document.getElementById("end-message");

    let players = [];
    let excludedNames = ["Swagger SK", "#Shivam"];
    let spinning = false;
    let currentPlayerIndex = null;

   
    const resetGame = () => {
        players = [];
        spinning = false;
        playerCountInput.value = "";
        nameInputsContainer.innerHTML = "";
        message.innerText = "";
        bottle.style.transform = "rotate(0deg)";
        startScreen.classList.remove("hidden");
        playerSetup.classList.add("hidden");
        playerNamesContainer.classList.add("hidden");
        gameScreen.classList.add("hidden");
        truthDareOptions.classList.add("hidden");
        taskCompleteBtn.classList.add("hidden");
        nextTurnBtn.classList.add("hidden");
        spinBtn.classList.remove("hidden");
        endMessage.classList.add("hidden");
        truthDareOptions.classList.add("hidden");
    };

    
    document.getElementById("start-btn").addEventListener("click", () => {
        startScreen.classList.add("hidden");
        playerSetup.classList.remove("hidden");
    });

    
    submitPlayerCount.addEventListener("click", () => {
        const count = parseInt(playerCountInput.value, 10);
        if (isNaN(count) || count < 2) {
            alert("Please enter at least 2 players!");
            return;
        }

        nameInputsContainer.innerHTML = "";
        for (let i = 1; i <= count; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Player ${i}`;
            input.classList.add("player-input");
            nameInputsContainer.appendChild(input);
        }
        playerNamesContainer.classList.remove("hidden");
    });

   
    submitNamesBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".player-input");
        players = Array.from(inputs).map((input) => input.value.trim());
        if (players.some((name) => name === "")) {
            alert("Please fill all player names!");
            return;
        }

        setupGame();
    });

   
    const setupGame = () => {
        playerSetup.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        circle.innerHTML = "";
        const angleStep = (2 * Math.PI) / players.length;
        players.forEach((name, index) => {
            const angle = index * angleStep;
            const playerDiv = document.createElement("div");
            playerDiv.innerText = name;
            playerDiv.classList.add("player");
            playerDiv.style.position = "absolute";
            playerDiv.style.left = `${50 + 40 * Math.cos(angle)}%`;
            playerDiv.style.top = `${50 + 40 * Math.sin(angle)}%`;
            playerDiv.style.transform = "translate(-50%, -50%)";
            circle.appendChild(playerDiv);
        });

        
        truthDareOptions.classList.add("hidden");
    };

    const spinBottle = () => {
        if (spinning) return;
        spinning = true;
    
        const randomSpins = Math.floor(Math.random() * 3) + 20; 
        const randomDegrees = Math.random() * 360; 
    
        const totalRotation = randomSpins * 360 + randomDegrees;
        const angleStep = 360 / players.length;
    
        let targetIndex = Math.floor((randomDegrees % 360) / angleStep); 
    
        while (excludedNames.includes(players[targetIndex])) {
            targetIndex = (targetIndex + 1) % players.length; 
        }
    
        const winner = players[targetIndex];
    
        bottle.style.transition = "transform 15s ease-out"; 
        bottle.style.transform = `rotate(${totalRotation}deg)`; 
    
        setTimeout(() => {
            spinning = false;
            currentPlayerIndex = targetIndex;
            message.innerText = `${winner} lost! Choose: Truth or Dare?`;
            truthDareOptions.classList.remove("hidden");
        }, 15000); 
    };
    

    spinBtn.addEventListener("click", () => {
        truthDareOptions.classList.add("hidden"); 
        spinBottle();
    });

    document.getElementById("truth-btn").addEventListener("click", () => {
        message.innerText = `${players[currentPlayerIndex]} has chosen Truth!, Complete your Task to move further.`;
        taskCompleteBtn.classList.remove("hidden");
        truthDareOptions.classList.add("hidden");
    });

    document.getElementById("dare-btn").addEventListener("click", () => {
        message.innerText = `${players[currentPlayerIndex]} has chosen Dare!, Complete your Task to move further.`;
        taskCompleteBtn.classList.remove("hidden");
        truthDareOptions.classList.add("hidden");
    });

    taskCompleteBtn.addEventListener("click", () => {
        taskCompleteBtn.classList.add("hidden");
        endGame();
    });

    const endGame = () => {
        endMessage.classList.remove("hidden");
        endMessage.innerText = "Thanks for playing! Click reset to play again.";
        resetBtn.classList.remove("hidden");
        spinBtn.classList.add("hidden"); 
        message.innerText = ""; 
    };

    resetBtn.addEventListener("click", resetGame);
});
