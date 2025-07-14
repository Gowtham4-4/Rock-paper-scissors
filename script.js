let playerScore = 0;
let computerScore = 0;

function playRound(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const playerHand = document.getElementById("player-hand");
  const computerHand = document.getElementById("computer-hand");

  // Reset hands to "rock" as neutral for shake animation
  playerHand.src = "rock.png";
  computerHand.src = "rock.png";

  // Add shaking animation
  playerHand.style.transform = "rotate(-20deg)";
  computerHand.style.transform = "rotate(20deg)";

  setTimeout(() => {
    // Stop shaking
    playerHand.style.transform = "rotate(0deg)";
    computerHand.style.transform = "rotate(0deg)";

    // Update hand images to reflect choices
    playerHand.src = `${playerChoice}.png`;
    computerHand.src = `${computerChoice}.png`;

    let result = "";

    if (playerChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      playerScore++;
      result = `You win! ${playerChoice} beats ${computerChoice}`;
      animateResult("win");
    } else {
      computerScore++;
      result = `You lose! ${computerChoice} beats ${playerChoice}`;
      animateResult("lose");
    }

    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("result-message").textContent = result;

    if (playerScore === 5 || computerScore === 5) {
      const winner = playerScore === 5 ? "You won the game!" : "Computer wins the game!";
      document.getElementById("result-message").textContent = winner;
      disableButtons();
    }
  }, 500); // Delay to match the shake
}

function animateResult(type) {
  const message = document.getElementById("result-message");
  message.classList.remove("result-flash-win", "result-flash-lose");
  void message.offsetWidth; // Force reflow
  if (type === "win") {
    message.classList.add("result-flash-win");
  } else {
    message.classList.add("result-flash-lose");
  }
}

function disableButtons() {
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach(button => button.disabled = true);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("player-score").textContent = "0";
  document.getElementById("computer-score").textContent = "0";
  document.getElementById("result-message").textContent = "Make your move!";
  document.getElementById("player-hand").src = "rock.png";
  document.getElementById("computer-hand").src = "rock.png";
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach(button => button.disabled = false);
}
