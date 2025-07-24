const gameBox = document.getElementById("game-box");
let currentStep = 0;
let score = 0;
let currentPhotoIndex = 0;
let isSupernaturalTheme = false;

// Data de quando começaram (ALTERE AQUI!)
const startDate = new Date('2025-05-15'); // Formato: YYYY-MM-DD

// Áudios (incluindo novos efeitos)
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const helloKittySound = document.getElementById('hello-kitty-sound');
const supernaturalSound = document.getElementById('supernatural-sound');
const heartbeatSound = document.getElementById('heartbeat-sound');
const echoSound = document.getElementById('echo-sound');

const questions = [
    {
        question: "Qual foi o primeiro lugar onde saímos juntos?",
        options: ["Lanchonete","Pizzaria 🍕", "Cafeteria", "Cinema", "Praça"],
        correct: 3 
    },
    {
        question: "O que ele mais gosta em você?",
        options: ["Seu jeito", "Seu sorriso", "Seu humor", "Tudo"],
        correct: 3
    },
    {
        question: "Se ele fosse um personagem da Hello Kitty, qual seria?",
        options: ["Pompompurin", "Keroppi 🐸", "Dear Daniel 💌"],
        correct: 2
    },
    {
        question: "Se ele fosse um personagem de Supernatural, qual seria?",
        options: ["Sam", "Dean", "Castiel"],
        correct: 0
    }
];

// Calcular dias juntos
function updateDaysCounter() {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('days-count').textContent = diffDays;
}

// Controle de volume (incluindo novos sons)
function setupVolumeControl() {
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        
        // Aplica o volume a todos os sons
        correctSound.volume = volume;
        wrongSound.volume = volume;
        helloKittySound.volume = volume;
        supernaturalSound.volume = volume;
        if (heartbeatSound) heartbeatSound.volume = volume * 0.5; // Heartbeat mais baixo
        if (echoSound) echoSound.volume = volume * 0.7; // Echo um pouco mais baixo
    });
    
    // Define volume inicial
    const initialVolume = 0.3;
    correctSound.volume = initialVolume;
    wrongSound.volume = initialVolume;
    helloKittySound.volume = initialVolume;
    supernaturalSound.volume = initialVolume;
    if (heartbeatSound) heartbeatSound.volume = initialVolume * 0.5;
    if (echoSound) echoSound.volume = initialVolume * 0.7;
}

// Galeria de fotos com legendas românticas
const photoLegends = [
    "💕 Esse momento especial que ficará para sempre em meu coração! 💕",
    "🎬 No cinema, assistindo ao filme... mas eu só conseguia olhar para você! 🍿",
    "✨ Esse momento especial que ficará para sempre em meu coração ✨",
    "💖 Juntos sempre, como dois corações que batem no mesmo ritmo 💖"
];

function toggleGallery() {
    const gallery = document.getElementById('photo-gallery');
    const gameBox = document.getElementById('game-box');
    
    if (gallery.style.display === 'none' || !gallery.style.display) {
        gallery.style.display = 'block';
        gameBox.style.display = 'none';
        updatePhotoCaption(); // Atualiza a legenda quando abre a galeria
    } else {
        gallery.style.display = 'none';
        gameBox.style.display = 'block';
    }
}

function updatePhotoCaption() {
    const existingCaption = document.querySelector('.photo-caption');
    if (existingCaption) {
        existingCaption.remove();
    }
    
    const photoSlider = document.querySelector('.photo-slider');
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.textContent = photoLegends[currentPhotoIndex] || "💕 Um momento especial nosso 💕";
    photoSlider.appendChild(caption);
}

function nextPhoto() {
    const photos = document.querySelectorAll('.photo-slider img');
    photos[currentPhotoIndex].classList.remove('active');
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    photos[currentPhotoIndex].classList.add('active');
    updatePhotoCaption();
}

function prevPhoto() {
    const photos = document.querySelectorAll('.photo-slider img');
    photos[currentPhotoIndex].classList.remove('active');
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    photos[currentPhotoIndex].classList.add('active');
    updatePhotoCaption();
}

// Partículas flutuantes
function createParticle() {
    const particles = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const symbols = isSupernaturalTheme ? ['👻', '🔥', '⚡', '🌙'] : ['💖', '🌸', '✨', '💫'];
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    particles.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Criar partículas periodicamente
setInterval(createParticle, 2000);

// Sparkles seguindo o mouse (apenas no tema Hello Kitty)
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Só cria sparkles no tema Hello Kitty
    if (!isSupernaturalTheme && Math.random() < 0.3) {
        createSparkle(mouseX, mouseY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    const sparkleSymbols = ['✨', '💫', '⭐', '🌟', '💖'];
    sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

function showIntro() {
    gameBox.innerHTML = `
        <div class="fade-in">
            <h1>🎀 Quiz Dimensional 🎀</h1>
            <p>Hoje é um dia muito especial, e você vai descobrir por quê!</p>
            <button onclick="startGame()">Começar</button>
            <button onclick="toggleGallery()">📸 Ver Fotos</button>
        </div>
    `;
}

function startGame() {
    currentStep = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentStep];
    let html = `<div class="slide-in"><h2>${q.question}</h2>`;
    q.options.forEach((opt, i) => {
        html += `<button onclick="handleAnswer(${i})">${opt}</button>`;
    });
    html += '</div>';
    gameBox.innerHTML = html;
}

function handleAnswer(selected) {
    const buttons = document.querySelectorAll('#game-box button');
    const selectedButton = buttons[selected];
    const correct = questions[currentStep].correct;
    
    const acertos = [
        "Isso aí, caçadora! – Dean",
        "Você dominaria até as Relíquias da Morte!",
        "A Hello Kitty ficou orgulhosa! 💖"
    ];

    const erros = [
        "Você beberia a poção errada em Hogwarts...",
        "O Dean te colocaria no banco da Baby!",
        "Oops! Tenta de novo, aprendiz de caçadora."
    ];

    if (selected === correct) {
        score++;
        selectedButton.classList.add('correct-answer');
        correctSound.currentTime = 0;
        correctSound.play().catch(() => {});
        
        const msg = acertos[Math.floor(Math.random() * acertos.length)];
        
        setTimeout(() => {
            alert(`✅ ${msg}`);
            proceedToNext();
        }, 800);
    } else {
        selectedButton.classList.add('wrong-answer');
        wrongSound.currentTime = 0;
        wrongSound.play().catch(() => {});
        
        const msg = erros[Math.floor(Math.random() * erros.length)];
        
        setTimeout(() => {
            alert(`❌ ${msg}`);
            proceedToNext();
        }, 800);
    }
}

function proceedToNext() {
    currentStep++;
    if (currentStep < questions.length) {
        showQuestion();
    } else {
        showScene();
    }
}

function showScene() {
    gameBox.innerHTML = `
        <div class="fade-in">
            <h2>Hello kitty & Daniel 🐱💌</h2>
            <p>"Quando a gente gosta de alguém de verdade... a gente quer ficar mais perto sempre."</p>
            <p>"Eu tenho um envelope especial para você...❤"</p>
            <button onclick="showFinal()">Abrir Envelope</button>
        </div>
    `;
}

function showFinal() {
    // Inicia o heartbeat
    if (heartbeatSound) {
        heartbeatSound.loop = true;
        heartbeatSound.play().catch(() => {});
    }
    
    gameBox.innerHTML = `
        <div class="slide-in">
            <h1 class="heartbeat">💍 Você aceita namorar comigo? 💍</h1>
            <button class="heartbeat" onclick="answerYes()">Sim, claro! 💖</button>
            <button class="heartbeat" onclick="answerYes()">Mil vezes sim! 😍</button>
        </div>
    `;
}

function answerYes() {
    // Para o heartbeat
    if (heartbeatSound) {
        heartbeatSound.pause();
        heartbeatSound.currentTime = 0;
    }
    
    const frasesFinais = [
        "Dean: Esse casal é aprovado pela Baby.",
        "Sam: Nunca vi um feitiço tão forte quanto esse amor.",
        "Dean & Sam: Caçadores também amam. Vocês são a prova disso."
    ];
    const aleatoria = frasesFinais[Math.floor(Math.random() * frasesFinais.length)];

    gameBox.innerHTML = `
        <div class="fade-in">
            <h2>Você aceitou! 💗💗</h2>
            <p>Ele está te esperando com uma surpresa...🌹</p>
            <p><strong>${aleatoria}</strong></p>
            <button onclick="showIntro()">🎮 Jogar Novamente</button>
            <button onclick="toggleGallery()">📸 Ver Nossas Fotos</button>
        </div>
    `;

    // Confetti effect
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 60,
                origin: { y: 0.7 }
            });
        }, 1000);
    }
}

// Função para parar todos os áudios
function stopAllAudios() {
    correctSound.pause();
    wrongSound.pause();
    helloKittySound.pause();
    supernaturalSound.pause();
    if (heartbeatSound) heartbeatSound.pause();
    if (echoSound) echoSound.pause();
    
    // Reset para o início
    correctSound.currentTime = 0;
    wrongSound.currentTime = 0;
    helloKittySound.currentTime = 0;
    supernaturalSound.currentTime = 0;
    if (heartbeatSound) heartbeatSound.currentTime = 0;
    if (echoSound) echoSound.currentTime = 0;
}

// MODIFICAÇÃO: Função para alternar tema usando classes CSS
function toggleTheme() {
    document.body.classList.toggle("tema-supernatural");
    const themeBtn = document.getElementById("toggle-theme");
    const decorationLeft = document.getElementById('decoration-left');
    const decorationRight = document.getElementById('decoration-right');
    
    isSupernaturalTheme = document.body.classList.contains("tema-supernatural");
    
    // Para todos os sons antes de tocar o novo
    stopAllAudios();
    
    if (isSupernaturalTheme) {
        themeBtn.innerHTML = "🌸 Tema Hello Kitty";
        
        // Remove classe anterior e adiciona nova
        decorationLeft.className = 'hello-img top-left supernatural-decoration';
        decorationRight.className = 'hello-img bottom-right supernatural-decoration';
        
        // Efeito sonoro com eco no tema Supernatural
        if (echoSound) {
            echoSound.play().catch(() => {});
        }
        supernaturalSound.play().catch(() => {});
        
    } else {
        themeBtn.innerHTML = "🎭 Tema Supernatural";
        
        // Remove classe anterior e adiciona nova
        decorationLeft.className = 'hello-img top-left hello-kitty-decoration';
        decorationRight.className = 'hello-img bottom-right hello-kitty-decoration';
        
        helloKittySound.play().catch(() => {});
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    updateDaysCounter();
    setupVolumeControl();
    
    // Inicializar com tema Hello Kitty
    const decorationLeft = document.getElementById('decoration-left');
    const decorationRight = document.getElementById('decoration-right');
    decorationLeft.className = 'hello-img top-left hello-kitty-decoration';
    decorationRight.className = 'hello-img bottom-right hello-kitty-decoration';
    
    const themeBtn = document.getElementById("toggle-theme");
    themeBtn.addEventListener("click", toggleTheme);
    
    // Iniciar o jogo
    showIntro();
});

// Auto-advance na galeria de fotos
setInterval(() => {
    if (document.getElementById('photo-gallery').style.display === 'block') {
        nextPhoto();
    }
}, 4000);

// Carregar confetti
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/canvas-confetti/1.5.1/confetti.browser.min.js';
document.head.appendChild(script);

// Easter eggs no console
console.log("⚡ Expelliarmus! Bem-vinda ao seu quiz mágico!");
console.log("👻 Dean e Sam aprovariam esse quiz!");

