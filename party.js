(function() {
  const animalOverlay = document.querySelector('.animal-overlay');
  const confettiOverlay = document.querySelector('.confetti-overlay');
  if (!animalOverlay || !confettiOverlay) return;
  const chanceBadger = 0.01;
  const confettiColors = ['#ff4d4d', '#ffb229', '#72d6ff', '#76ff8c', '#d288ff'];
  const secret = 'party';
  let enabled = false;
  let typed = '';

  function spawnAnimal() {
    if (!enabled) return;
    const img = document.createElement('img');
    img.src = Math.random() < chanceBadger ? 'badger.png' : 'dog.png';
    img.className = 'animal-float';
    img.style.left = `${10 + Math.random() * 80}%`;
    img.style.top = `${10 + Math.random() * 70}%`;
    const lifetime = 3200 + Math.random() * 2600;
    img.style.width = `${180 + Math.random() * 260}px`;
    img.style.setProperty('--rotation', `${Math.random() * 360}deg`);
    img.style.animationDuration = `${lifetime}ms`;
    animalOverlay.appendChild(img);
    setTimeout(() => img.remove(), lifetime + 250);
  }

  function spawnConfetti() {
    if (!enabled) return;
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.width = `${6 + Math.random() * 12}px`;
    piece.style.height = `${14 + Math.random() * 18}px`;
    piece.style.transform = `translateX(-50%) rotate(${Math.random() * 360}deg)`;
    confettiOverlay.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }

  function scheduleAnimals() {
    spawnAnimal();
    setTimeout(scheduleAnimals, 2200 + Math.random() * 2600);
  }

  function scheduleConfetti() {
    spawnConfetti();
    setTimeout(scheduleConfetti, 120 + Math.random() * 180);
  }

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key.length !== 1 || !/^[a-z]$/.test(key)) return;
    typed += key;
    if (typed.length > secret.length) {
      typed = typed.slice(-secret.length);
    }
    if (!enabled && typed === secret) {
      enabled = true;
      spawnAnimal();
      spawnConfetti();
    }
  });

  setTimeout(scheduleAnimals, 800);
  setTimeout(scheduleConfetti, 400);
})();