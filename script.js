const gameBox = document.getElementById("game-box");
let currentStep = 0;
let score = 0;
let currentPhotoIndex = 0;
let currentTheme = 0; // 0: Hello Kitty, 1: Supernatural, 2: Harry Potter

// Data de quando começaram (ALTERE AQUI!)
const startDate = new Date('2025-05-15'); // Formato: YYYY-MM-DD

// Áudios (incluindo novos efeitos)
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const helloKittySound = document.getElementById('hello-kitty-sound');
const supernaturalSound = document.getElementById('supernatural-sound');
const harryPotterSound = document.getElementById('harry-potter-sound');
const heartbeatSound = document.getElementById('heartbeat-sound');
const echoSound = document.getElementById('echo-sound');
const magicSound = document.getElementById('magic-sound');

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
    },
    {
        question: "Se ele fosse um personagem de Harry Potter, qual seria?",
        options: ["Harry Potter ⚡", "Rony Weasley", "Hermione Granger", "Neville Longbottom"],
        correct: 0
    }
];

// Calcular dias juntos
function updateDaysCounter() {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysElement = document.getElementById('days-count');
    if (daysElement) {
        daysElement.textContent = diffDays;
    }
}

// Controle de volume (incluindo novos sons)
function setupVolumeControl() {
    const volumeSlider = document.getElementById('volume-slider');
    if (!volumeSlider) return;
    
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        
        // Aplica o volume a todos os sons
        if (correctSound) correctSound.volume = volume;
        if (wrongSound) wrongSound.volume = volume;
        if (helloKittySound) helloKittySound.volume = volume;
        if (supernaturalSound) supernaturalSound.volume = volume;
        if (harryPotterSound) harryPotterSound.volume = volume * 2.5; // Volume mais alto para Harry Potter
        if (heartbeatSound) heartbeatSound.volume = volume * 0.5;
        if (echoSound) echoSound.volume = volume * 0.7;
        if (magicSound) magicSound.volume = volume * 0.8;
    });
    
    // Define volume inicial
    const initialVolume = 0.3;
    if (correctSound) correctSound.volume = initialVolume;
    if (wrongSound) wrongSound.volume = initialVolume;
    if (helloKittySound) helloKittySound.volume = initialVolume;
    if (supernaturalSound) supernaturalSound.volume = initialVolume;
    if (harryPotterSound) harryPotterSound.volume = initialVolume * 2.5; // Volume mais alto para Harry Potter
    if (heartbeatSound) heartbeatSound.volume = initialVolume * 0.5;
    if (echoSound) echoSound.volume = initialVolume * 0.7;
    if (magicSound) magicSound.volume = initialVolume * 0.8;
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
    
    if (!gallery || !gameBox) return;
    
    if (gallery.style.display === 'none' || !gallery.style.display) {
        gallery.style.display = 'block';
        gameBox.style.display = 'none';
        updatePhotoCaption();
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
    if (!photoSlider) return;
    
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.textContent = photoLegends[currentPhotoIndex] || "💕 Um momento especial nosso 💕";
    photoSlider.appendChild(caption);
}

function nextPhoto() {
    const photos = document.querySelectorAll('.photo-slider img');
    if (photos.length === 0) return;
    
    photos[currentPhotoIndex].classList.remove('active');
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    photos[currentPhotoIndex].classList.add('active');
    updatePhotoCaption();
}

function prevPhoto() {
    const photos = document.querySelectorAll('.photo-slider img');
    if (photos.length === 0) return;
    
    photos[currentPhotoIndex].classList.remove('active');
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    photos[currentPhotoIndex].classList.add('active');
    updatePhotoCaption();
}

// Partículas flutuantes baseadas no tema
function createParticle() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    let symbols;
    switch(currentTheme) {
        case 0: // Hello Kitty
            symbols = ['💖', '🌸', '✨', '💫', '🎀', '💕'];
            break;
        case 1: // Supernatural
            symbols = ['👻', '🔥', '⚡', '🌙', '🗡️', '🚗'];
            break;
        case 2: // Harry Potter
            symbols = ['⚡', '🔮', '🪄', '🦉', '📚', '✨', '🏰'];
            break;
    }
    
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    particles.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 5000);
}

// Criar partículas periodicamente
setInterval(createParticle, 2000);

// Efeitos especiais baseados no tema
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Efeitos diferentes para cada tema
    switch(currentTheme) {
        case 0: // Hello Kitty - Sparkles
            if (Math.random() < 0.3) {
                createSparkle(mouseX, mouseY);
            }
            break;
        // Supernatural e Harry Potter não têm efeitos de mouse
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
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 1500);
}

function showIntro() {
    if (!gameBox) return;
    
    const themeEmojis = ['🎀', '👻', '⚡'];
    const themeNames = ['Quiz Dimensional', 'Quiz Sobrenatural', 'Quiz Mágico'];
    
    gameBox.innerHTML = `
        <div class="fade-in">
            <h1>${themeEmojis[currentTheme]} ${themeNames[currentTheme]} ${themeEmojis[currentTheme]}</h1>
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
    if (!gameBox) return;
    
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
    if (buttons.length === 0) return;
    
    const selectedButton = buttons[selected];
    const correct = questions[currentStep].correct;
    
    const acertos = [
        "A Hello Kitty ficou orgulhosa! 💖",
        "Isso aí, caçadora! – Dean",
        "10 pontos para Grifinória! ⚡"
    ];

    const erros = [
        "Oops! Tenta de novo, aprendiz de caçadora.",
        "O Dean te colocaria no banco da Baby!",
        "Você beberia a poção errada em Hogwarts..."
    ];

    if (selected === correct) {
        score++;
        selectedButton.classList.add('correct-answer');
        if (correctSound) {
            correctSound.currentTime = 0;
            correctSound.play().catch(() => {});
        }
        
        const msg = acertos[currentTheme];
        
        setTimeout(() => {
            alert(`✅ ${msg}`);
            proceedToNext();
        }, 800);
    } else {
        selectedButton.classList.add('wrong-answer');
        if (wrongSound) {
            wrongSound.currentTime = 0;
            wrongSound.play().catch(() => {});
        }
        
        const msg = erros[currentTheme];
        
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
    if (!gameBox) return;
    
    const scenes = [
        {
            title: "Hello kitty & Daniel 🐱💌",
            text: '"Quando a gente gosta de alguém de verdade... a gente quer ficar mais perto sempre."',
            subtext: '"Eu tenho um envelope especial para você...❤"'
        },
        {
            title: "Dean & Sam Winchester 🚗👻",
            text: '"Família não termina com sangue... e você faz parte da minha família."',
            subtext: '"Tenho algo importante para te dizer..."'
        },
        {
            title: "Hogwarts Express 🚂⚡",
            text: '"Depois de tudo isso, algo muito real vai acontecer."',
            subtext: '"Abra este pergaminho mágico..."'
        }
    ];
    
    const scene = scenes[currentTheme];
    
    gameBox.innerHTML = `
        <div class="fade-in">
            <h2>${scene.title}</h2>
            <p>${scene.text}</p>
            <p>${scene.subtext}</p>
            <button onclick="showFinal()">Abrir</button>
        </div>
    `;
}

function showFinal() {
    if (!gameBox) return;
    
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
    if (!gameBox) return;
    
    // Para o heartbeat
    if (heartbeatSound) {
        heartbeatSound.pause();
        heartbeatSound.currentTime = 0;
    }
    
    const frasesFinais = [
        [
            "Dear Daniel: Esse amor é mais doce que qualquer cookie! 🍪",
            "Hello Kitty: Vocês são o casal mais fofo do mundo! 💕",
            "Pompompurin: Esse amor merece todos os pudins do mundo! 🍮"
        ],
        [
            "Dean: Esse casal é aprovado pela Baby.",
            "Sam: Nunca vi um feitiço tão forte quanto esse amor.",
            "Dean & Sam: Caçadores também amam. Vocês são a prova disso."
        ],
        [
            "Dumbledore: O amor é a magia mais poderosa de todas.",
            "Hermione: Vocês passaram no teste mais difícil de todos!",
            "Harry: Esse amor é mais forte que qualquer feitiço das trevas!"
        ]
    ];
    
    const frasesDoTema = frasesFinais[currentTheme];
    const aleatoria = frasesDoTema[Math.floor(Math.random() * frasesDoTema.length)];

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
    if (correctSound) {
        correctSound.pause();
        correctSound.currentTime = 0;
    }
    if (wrongSound) {
        wrongSound.pause();
        wrongSound.currentTime = 0;
    }
    if (helloKittySound) {
        helloKittySound.pause();
        helloKittySound.currentTime = 0;
    }
    if (supernaturalSound) {
        supernaturalSound.pause();
        supernaturalSound.currentTime = 0;
    }
    if (harryPotterSound) {
        harryPotterSound.pause();
        harryPotterSound.currentTime = 0;
    }
    if (heartbeatSound) {
        heartbeatSound.pause();
        heartbeatSound.currentTime = 0;
    }
    if (echoSound) {
        echoSound.pause();
        echoSound.currentTime = 0;
    }
    if (magicSound) {
        magicSound.pause();
        magicSound.currentTime = 0;
    }
}

// CORRIGIDO: Função para alternar entre os três temas
function toggleTheme() {
    const themeBtn = document.getElementById("toggle-theme");
    const decorationLeft = document.getElementById('decoration-left');
    const decorationRight = document.getElementById('decoration-right');
    
    // Verifica se os elementos existem antes de tentar modificá-los
    if (!themeBtn) {
        console.warn('Elemento toggle-theme não encontrado');
        return;
    }
    
    // Para todos os sons antes de trocar
    stopAllAudios();
    
    // Remove todas as classes de tema do body
    document.body.classList.remove('tema-supernatural', 'tema-harry-potter', 'tema-hello-kitty');
    
    // Avança para o próximo tema
    currentTheme = (currentTheme + 1) % 3;
    
    // Aplica o novo tema
    switch(currentTheme) {
        case 0: // Hello Kitty
            document.body.classList.add('tema-hello-kitty');
            themeBtn.innerHTML = "🎭 Tema Supernatural";
            
            if (decorationLeft) {
                decorationLeft.className = 'hello-img top-left hello-kitty-decoration';
            }
            if (decorationRight) {
                decorationRight.className = 'hello-img bottom-right hello-kitty-decoration';
            }
            
            if (helloKittySound) {
                helloKittySound.play().catch(() => {});
            }
            break;
            
        case 1: // Supernatural
            document.body.classList.add('tema-supernatural');
            themeBtn.innerHTML = "⚡ Tema Harry Potter";
            
            if (decorationLeft) {
                decorationLeft.className = 'hello-img top-left supernatural-decoration';
            }
            if (decorationRight) {
                decorationRight.className = 'hello-img bottom-right supernatural-decoration';
            }
            
            if (supernaturalSound) {
                supernaturalSound.play().catch(() => {});
            }
            if (echoSound) {
                setTimeout(() => {
                    echoSound.play().catch(() => {});
                }, 500);
            }
            break;
            
        case 2: // Harry Potter
            document.body.classList.add('tema-harry-potter');
            themeBtn.innerHTML = "🌸 Tema Hello Kitty";
            
            if (decorationLeft) {
                decorationLeft.className = 'hello-img top-left harry-potter-decoration';
            }
            if (decorationRight) {
                decorationRight.className = 'hello-img bottom-right harry-potter-decoration';
            }
            
            if (harryPotterSound) {
                harryPotterSound.play().catch(() => {});
            }
            if (magicSound) {
                setTimeout(() => {
                    magicSound.play().catch(() => {});
                }, 700);
            }
            break;
    }
    
    // Atualiza a tela inicial
    showIntro();
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Aguarda um pouco para garantir que todos os elementos foram carregados
    setTimeout(() => {
        updateDaysCounter();
        setupVolumeControl();
        
        // Inicializar com tema Hello Kitty (currentTheme = 0)
        const decorationLeft = document.getElementById('decoration-left');
        const decorationRight = document.getElementById('decoration-right');
        
        if (decorationLeft) {
            decorationLeft.className = 'hello-img top-left hello-kitty-decoration';
        }
        if (decorationRight) {
            decorationRight.className = 'hello-img bottom-right hello-kitty-decoration';
        }
        
        const themeBtn = document.getElementById("toggle-theme");
        if (themeBtn) {
            themeBtn.innerHTML = "🎭 Tema Supernatural";
            themeBtn.addEventListener("click", toggleTheme);
        }
        
        // Iniciar o jogo
        showIntro();
    }, 100);
});

// Auto-advance na galeria de fotos
setInterval(() => {
    const gallery = document.getElementById('photo-gallery');
    if (gallery && gallery.style.display === 'block') {
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
console.log("💖 Hello Kitty manda beijinhos!");