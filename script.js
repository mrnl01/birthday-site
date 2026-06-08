function openEnvelope() {
  document.getElementById("envelope").classList.add("open");

  const title = document.getElementById("title");
  if (title) title.classList.add("open");

  setTimeout(() => {
    showLetter();
    playMusic();
  }, 800);
}

function playMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.5;
  music.play().catch((err) => console.log("Music blocked:", err));
}

function showLetter() {
  document.getElementById("letter").classList.remove("hidden");

  setTimeout(() => {
    const btn = document.getElementById("cameraBtn");
    btn.classList.remove("hidden");
    btn.onclick = () => {
      btn.classList.add("hidden");
      showPhotos();
    };
  }, 1000);
}

function showPhotos() {
  const collage = document.getElementById("collage");
  collage.classList.remove("hidden");

  const tiles = collage.querySelectorAll(".collage-tile");

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add("visible");

      if (i === tiles.length - 1) {
        // all tiles shown — wait then fade collage out
        setTimeout(() => {
          collage.classList.add("fade-out");

          setTimeout(() => {
            collage.classList.add("hidden");
            showFinalPhoto();
          }, 800);

        }, 1500);
      }

    }, i * 600);
  });
}

function showFinalPhoto() {
  const finalPhoto = document.getElementById("finalPhoto");
  finalPhoto.style.display = "block";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      finalPhoto.classList.add("visible");

      // start finale after bloom finishes (1.6s transition)
      setTimeout(() => {
        startFinale();
      }, 2200);
    });
  });
}

function startFinale() {
  const finale = document.getElementById("finale");
  const finalPhoto = document.getElementById("finalPhoto");

  // fade out big photo
  finalPhoto.style.transition = "opacity 1s ease";
  finalPhoto.style.opacity = "0";

  setTimeout(() => {
    finalPhoto.style.display = "none";

    // show finale
    finale.style.display = "flex";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        finale.classList.add("visible");
      });
    });

    // blow candles after 5 seconds
    setTimeout(() => {
      blowCandles();
    }, 5000);

  }, 1000);
}

function blowCandles() {
  const flames = document.querySelectorAll(".candle-flame");

  flames.forEach((flame, i) => {
    setTimeout(() => {
      flame.classList.add("blown");
      flame.textContent = "🕯️";
    }, i * 180);
  });

  // show message after all candles are out
  setTimeout(() => {
    showLastMessage();
  }, flames.length * 180 + 600);
}

function showLastMessage() {
  const msg = document.getElementById("lastMessage");
  msg.classList.add("visible");

  // floating hearts
  const finale = document.getElementById("finale");
  const emojis = ["💖", "🌸", "✨", "💕", "🎀", "💗"];

  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "heart";
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.left = Math.random() * 90 + 5 + "vw";
      heart.style.bottom = Math.random() * 30 + "vh";
      finale.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, i * 300);
  }
}