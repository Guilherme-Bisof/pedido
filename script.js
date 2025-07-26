const gameBox = document.getElementById("game-box");
let currentStep = 0;
let score = 0;
let currentPhotoIndex = 0;
let currentTheme = 0;

// Armazenamento completo das respostas
let userResponses = [];
let totalQuestions = 0;

// Data de quando começaram (ALTERE AQUI!)
const startDate = new Date('2025-05-15'); // Formato: YYYY-MM-DD

// Áudios
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const helloKittySound = document.getElementById('hello-kitty-sound');
const supernaturalSound = document.getElementById('supernatural-sound');
const harryPotterSound = document.getElementById('harry-potter-sound');
const heartbeatSound = document.getElementById('heartbeat-sound');
const echoSound = document.getElementById('echo-sound');
const magicSound = document.getElementById('magic-sound');

// PERGUNTAS EXPANDIDAS - Mais múltipla escolha e texto
const questions = [
    {
        question: "Qual foi o primeiro lugar onde saímos juntos?",
        options: ["Lanchonete", "Pizzaria 🍕", "Cafeteria", "Cinema", "Praça"],
        correct: 3,
        type: "multiple"
    },
    {
        question: "Escreva uma palavra que descreve como você se sente quando está comigo:",
        type: "text",
        placeholder: "Digite aqui como você se sente..."
    },
    {
        question: "O que ele mais gosta em você?",
        options: ["Seu jeito", "Seu sorriso", "Seu humor", "Tudo"],
        correct: 3,
        type: "multiple"
    },
    {
        question: "Complete a frase: 'Você é...'",
        type: "text",
        placeholder: "Você é..."
    },
    {
        question: "Qual sua comida favorita que vocês já comeram juntos?",
        options: ["Pizza", "Hambúrguer", "Açaí", "Pipoca do cinema"],
        correct: 1,
        type: "multiple"
    },
    {
        question: "Escreva o que você mais ama nele:",
        type: "text",
        placeholder: "O que você mais ama nele..."
    },
    {
        question: "O que ele faria por você sem pensar duas vezes?",
        options: ["Te dar um presente", "Viajar quilômetros só pra te ver", "Ficar até tarde ouvindo você", "Todas as anteriores"],
        correct: 3,
        type: "multiple"
    },
    {
        question: "Descreva o primeiro beijo de vocês em uma palavra:",
        type: "text",
        placeholder: "Uma palavra sobre o primeiro beijo..."
    },
    {
        question: "Qual apelido carinhoso ele mais usa com você?",
        options: ["Amor", "Vida", "Linda", "Minha Gata"],
        correct: 3,
        type: "multiple"
    },
    {
        question: "Se vocês fossem viajar juntos, para onde iriam?",
        type: "text",
        placeholder: "Qual lugar?..."
    },
    {
        question: "Escreva uma mensagem fofa para ele:",
        type: "text",
        placeholder: "Sua mensagem especial aqui..."
    },
    {
        question: "Qual filme vocês mais gostaram de assistir juntos?",
        options: ["Romance", "Terror", "Comédia", "Ação"],
        correct: 2,
        type: "multiple"
    },
    {
        question: "Conte o que mais te faz sorrir nele:",
        type: "text",
        placeholder: "O que te faz sorrir nele..."
    },
    {
        question: "Se ele fosse um personagem da Marvel, qual seria?",
        options: ["Homem de Ferro 🤖", "Homem-Aranha 🕸️", "Capitão América 🇺🇸", "Thor 🔨"],
        correct: 1,
        type: "multiple"
    },
    {
        question: "Escreva como você imagina o futuro de vocês:",
        type: "text",
        placeholder: "Como você imagina nosso futuro..."
    },
    {
        question: "Qual a coisa mais romântica que ele já fez por você?",
        options: ["Me surpreendeu", "Lembrou de algo importante", "Foi carinhoso quando eu precisava", "Todas as anteriores"],
        correct: 3,
        type: "multiple"
    },
    {
        question: "Se você pudesse dizer algo para ele agora, o que seria?",
        type: "text",
        placeholder: "O que você diria para ele agora..."
    },
    {
        question: "Se ele fosse um personagem de Supernatural, qual seria?",
        options: ["Sam Winchester", "Dean Winchester", "Castiel"],
        correct: 0,
        type: "multiple"
    },
    {
        question: "Descreva em uma frase por que você gosta dele:",
        type: "text",
        placeholder: "Por que você gosta dele..."
    },
    {
        question: "Se ele fosse um personagem de Harry Potter, qual seria?",
        options: ["Harry Potter ⚡", "Rony Weasley", "Hermione Granger", "Neville Longbottom"],
        correct: 0,
        type: "multiple"
    },
    {
        question: "Escreva a coisa mais engraçada que ele já fez:",
        type: "text",
        placeholder: "A coisa mais engraçada que ele fez..."
    },
    {
        question: "Qual seria o encontro perfeito para vocês?",
        type: "text",
        placeholder: "Escreva..."
    },
    {
        question: "Complete: ' porque...'",
        type: "text",
        placeholder: "Amo você porque..."
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

// Controle de volume
function setupVolumeControl() {
    const volumeSlider = document.getElementById('volume-slider');
    if (!volumeSlider) return;
    
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        
        if (correctSound) correctSound.volume = volume;
        if (wrongSound) wrongSound.volume = volume;
        if (helloKittySound) helloKittySound.volume = volume;
        if (supernaturalSound) supernaturalSound.volume = volume;
        if (harryPotterSound) harryPotterSound.volume = volume * 2.5;
        if (heartbeatSound) heartbeatSound.volume = volume * 0.5;
        if (echoSound) echoSound.volume = volume * 0.7;
        if (magicSound) magicSound.volume = volume * 0.8;
    });
    
    // Volume inicial
    const initialVolume = 0.3;
    if (correctSound) correctSound.volume = initialVolume;
    if (wrongSound) wrongSound.volume = initialVolume;
    if (helloKittySound) helloKittySound.volume = initialVolume;
    if (supernaturalSound) supernaturalSound.volume = initialVolume;
    if (harryPotterSound) harryPotterSound.volume = initialVolume * 2.5;
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
    const responsesHistory = document.getElementById('responses-history');
    
    if (!gallery || !gameBox) return;
    
    if (gallery.style.display === 'none' || !gallery.style.display) {
        gallery.style.display = 'block';
        gameBox.style.display = 'none';
        responsesHistory.style.display = 'none';
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

// Função para mostrar/esconder histórico COMPLETO de respostas
function showResponses() {
    const responsesHistory = document.getElementById('responses-history');
    const gameBox = document.getElementById('game-box');
    const gallery = document.getElementById('photo-gallery');
    
    if (!responsesHistory || !gameBox) return;
    
    responsesHistory.style.display = 'block';
    gameBox.style.display = 'none';
    gallery.style.display = 'none';
    
    updateResponsesList();
}

function hideResponses() {
    const responsesHistory = document.getElementById('responses-history');
    const gameBox = document.getElementById('game-box');
    
    if (!responsesHistory || !gameBox) return;
    
    responsesHistory.style.display = 'none';
    gameBox.style.display = 'block';
}

function updateResponsesList() {
    const responsesList = document.getElementById('responses-list');
    const scoreSummary = document.getElementById('score-summary');
    
    if (!responsesList || !scoreSummary) return;
    
    if (userResponses.length === 0) {
        responsesList.innerHTML = '<p style="text-align: center; color: #666;">Ainda não há respostas para mostrar 💕</p>';
        scoreSummary.innerHTML = '';
        return;
    }
    
    // Calcular estatísticas
    const multipleChoiceResponses = userResponses.filter(r => r.type === 'multiple');
    const textResponses = userResponses.filter(r => r.type === 'text');
    const correctAnswers = multipleChoiceResponses.filter(r => r.isCorrect).length;
    const totalMultiple = multipleChoiceResponses.length;
    
    // Mostrar resumo da pontuação
    if (totalMultiple > 0) {
        scoreSummary.innerHTML = `
            <h4>📊 Resumo da Performance</h4>
            <p>✅ Acertos: ${correctAnswers}/${totalMultiple} perguntas de múltipla escolha</p>
            <p>💬 Respostas escritas: ${textResponses.length}</p>
            <p>📝 Total de respostas: ${userResponses.length}</p>
            <p>🎯 Taxa de acerto: ${totalMultiple > 0 ? Math.round((correctAnswers/totalMultiple)*100) : 0}%</p>
        `;
    } else {
        scoreSummary.innerHTML = `
            <h4>📊 Resumo</h4>
            <p>💬 Respostas escritas: ${textResponses.length}</p>
            <p>📝 Total de respostas: ${userResponses.length}</p>
        `;
    }
    
    // Listar todas as respostas
    let html = '';
    userResponses.forEach((response, index) => {
        const themeEmoji = ['🎀', '👻', '⚡'][response.theme];
        const questionNumber = response.questionNumber;
        
        html += `
            <div class="response-display">
                <h4>
                    <span class="question-number">${questionNumber}</span>
                    ${themeEmoji} ${response.question}
                </h4>
        `;
        
        if (response.type === 'text') {
            html += `
                <div class="response-text">
                    "${response.answer}"
                </div>
            `;
        } else if (response.type === 'multiple') {
            const choiceClass = response.isCorrect ? 'correct-choice' : 'wrong-choice';
            const resultClass = response.isCorrect ? 'correct' : 'wrong';
            const resultText = response.isCorrect ? 'ACERTOU! ✅' : 'ERROU ❌';
            
            html += `
                <div class="multiple-choice-response ${choiceClass}">
                    <span>Ela escolheu: "<strong>${response.answer}</strong>"</span>
                    <span class="choice-result ${resultClass}">${resultText}</span>
                </div>
                <small style="color: #888;">Resposta correta era: "${response.correctAnswer}"</small>
            `;
        }
        
        html += `
                <small style="color: #888; display: block; margin-top: 5px;">
                    Tema ${['Hello Kitty', 'Supernatural', 'Harry Potter'][response.theme]} • ${response.timestamp}
                </small>
            </div>
        `;
    });
    
    responsesList.innerHTML = html;
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
    if (currentTheme === 0 && Math.random() < 0.3) {
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
            <p><small>📝 ${questions.length} perguntas te esperam...</small></p>
            <button onclick="startGame()">Começar</button>
            <button onclick="toggleGallery()">📸 Ver Fotos</button>
            ${userResponses.length > 0 ? '<button onclick="showResponses()">💌 Ver Todas as Respostas</button>' : ''}
        </div>
        <button onclick="showConfessionMode()">💌 Modo Confissão</button>
    `;
}

function startGame() {
    currentStep = 0;
    score = 0;
    userResponses = []; // Reset das respostas
    totalQuestions = questions.length;
    showQuestion();
}

function showQuestion() {
    if (!gameBox) return;
    
    const q = questions[currentStep];
    const questionNumber = currentStep + 1;
    
    let html = `
        <div class="slide-in">
            <h2>
                <span class="question-number">${questionNumber}</span>
                ${q.question}
            </h2>
            <p><small>Pergunta ${questionNumber} de ${questions.length}</small></p>
    `;
    
    if (q.type === "text") {
        html += `
            <div class="text-input-container">
                <textarea 
                    class="text-input" 
                    id="text-answer" 
                    placeholder="${q.placeholder}"
                    maxlength="300"
                ></textarea>
                <button onclick="handleTextAnswer()">💖 Enviar Resposta</button>
            </div>
        `;
    } else {
        q.options.forEach((opt, i) => {
            html += `<button onclick="handleAnswer(${i})">${opt}</button>`;
        });
    }
    
    html += '</div>';
    gameBox.innerHTML = html;
    
    // Foco no campo de texto se for pergunta de texto
    if (q.type === "text") {
        setTimeout(() => {
            const textInput = document.getElementById('text-answer');
            if (textInput) {
                textInput.focus();
            }
        }, 100);
    }
}

function handleTextAnswer() {
    const textInput = document.getElementById('text-answer');
    if (!textInput) return;
    
    const answer = textInput.value.trim();
    if (answer === '') {
        alert('Por favor, escreva sua resposta! 💕');
        return;
    }
    
    // Salvar a resposta de texto
    userResponses.push({
        questionNumber: currentStep + 1,
        question: questions[currentStep].question,
        answer: answer,
        type: 'text',
        theme: currentTheme,
        timestamp: new Date().toLocaleString()
    });
    
    // Efeito visual
    const button = document.querySelector('#game-box button');
    if (button) {
        button.classList.add('correct-answer');
    }
    
    if (correctSound) {
        correctSound.currentTime = 0;
        correctSound.play().catch(() => {});
    }
    
    const responses = [
        `Hello Kitty adorou sua resposta! 💖`,
        `Dean e Sam aprovaram essa resposta! 👻`,
        `Resposta digna de Hogwarts! ⚡`
    ];
    
    setTimeout(() => {
        alert(`✨ ${responses[currentTheme]}`);
        proceedToNext();
    }, 800);
}

function handleAnswer(selected) {
    const buttons = document.querySelectorAll('#game-box button');
    if (buttons.length === 0) return;
    
    const selectedButton = buttons[selected];
    const q = questions[currentStep];
    const correct = q.correct;
    const isCorrect = selected === correct;
    
    // Salvar a resposta de múltipla escolha
    userResponses.push({
        questionNumber: currentStep + 1,
        question: q.question,
        answer: q.options[selected],
        correctAnswer: q.options[correct],
        type: 'multiple',
        isCorrect: isCorrect,
        theme: currentTheme,
        timestamp: new Date().toLocaleString()
    });
    
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

    if (isCorrect) {
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
            alert(`❌ ${msg}\nResposta correta: ${q.options[correct]}`);
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
            <div class="text-input-container">
                <textarea 
                    class="text-input" 
                    id="final-answer" 
                    placeholder="Escreva sua resposta do coração..."
                    maxlength="500"
                ></textarea>
                <button class="heartbeat" onclick="answerFinal()">💖 Responder</button>
            </div>
            <button class="heartbeat" onclick="answerYes()">Sim, claro! 💖</button>
            <button class="heartbeat" onclick="answerYes()">Mil vezes sim! 😍</button>
        </div>
    `;
    
    setTimeout(() => {
        const finalInput = document.getElementById('final-answer');
        if (finalInput) {
            finalInput.focus();
        }
    }, 100);
}

function answerFinal() {
    const finalInput = document.getElementById('final-answer');
    if (!finalInput) return;
    
    const answer = finalInput.value.trim();
    if (answer === '') {
        alert('Por favor, escreva sua resposta do coração! 💕');
        return;
    }
    
    // Salvar a resposta final
    userResponses.push({
        questionNumber: questions.length + 1,
        question: "💍 Você aceita namorar comigo?",
        answer: answer,
        type: 'text',
        theme: currentTheme,
        timestamp: new Date().toLocaleString(),
        isFinal: true
    });
    
    proceedToFinalResponse();
}

function answerYes() {
    // Resposta rápida
    userResponses.push({
        questionNumber: questions.length + 1,
        question: "💍 Você aceita namorar comigo?",
        answer: "Sim! 💖",
        type: 'text',
        theme: currentTheme,
        timestamp: new Date().toLocaleString(),
        isFinal: true
    });
    
    proceedToFinalResponse();
}

function proceedToFinalResponse() {
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
            <button onclick="showResponses()">📋 Ver TODAS as Respostas</button>
        </div>
    `;

    // Confetti effect
    createConfetti();
}

function createConfetti() {
    // Simula efeito de confete
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.fontSize = '20px';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            const symbols = ['🎉', '💖', '✨', '🌸', '💕', '🎊'];
            confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            confetti.style.animation = 'floatUp 4s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 4000);
        }, i * 50);
    }
}

// Função para parar todos os áudios
function stopAllAudios() {
    [correctSound, wrongSound, helloKittySound, supernaturalSound, 
     harryPotterSound, heartbeatSound, echoSound, magicSound].forEach(audio => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// Função para alternar entre os três temas
function toggleTheme() {
    const themeBtn = document.getElementById("toggle-theme");
    const decorationLeft = document.getElementById('decoration-left');
    const decorationRight = document.getElementById('decoration-right');
    
    if (!themeBtn) {
        console.warn('Elemento toggle-theme não encontrado');
        return;
    }
    
    stopAllAudios();
    
    document.body.classList.remove('tema-supernatural', 'tema-harry-potter', 'tema-hello-kitty');
    
    currentTheme = (currentTheme + 1) % 3;
    
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
    
    showIntro();
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        updateDaysCounter();
        setupVolumeControl();
        
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

// Enter para enviar respostas de texto
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        const textAnswer = document.getElementById('text-answer');
        const finalAnswer = document.getElementById('final-answer');
        
        if (textAnswer && textAnswer === document.activeElement) {
            handleTextAnswer();
        } else if (finalAnswer && finalAnswer === document.activeElement) {
            answerFinal();
        }
    }
});

function showConfessionMode() {
    if (!gameBox) return;

    gameBox.innerHTML = `
        <div class="slide-in">
            <h2>💌 Modo Confissão</h2>
            <p>Tem algo que você nunca me contou, mas quer me dizer agora?</p>
            <div class="text-input-container">
                <textarea 
                    class="text-input" 
                    id="confession-input" 
                    placeholder="Escreva aqui com carinho..."
                    maxlength="500"
                ></textarea>
                <button onclick="submitConfession()">Enviar Confissão 💖</button>
                <button onclick="showIntro()">Voltar ao Início</button>
            </div>
        </div>
    `;
}

function submitConfession() {
    const input = document.getElementById('confession-input');
    if (!input || input.value.trim() === "") {
        alert("Escreva algo para enviar a confissão 💌");
        return;
    }

    userResponses.push({
        questionNumber: "💌",
        question: "Confissão secreta",
        answer: input.value.trim(),
        type: "text",
        theme: currentTheme,
        timestamp: new Date().toLocaleString(),
        isConfession: true
    });

    alert("💖 Sua confissão foi enviada com sucesso! Agora ele poderá ler depois com carinho.");
    showIntro();
}

// Easter eggs no console
console.log("⚡ Expelliarmus! Bem-vinda ao seu quiz mágico!");
console.log("👻 Dean e Sam aprovariam esse quiz!");
console.log("💖 Hello Kitty manda beijinhos!");
console.log("📋 Agora você pode ver TODAS as respostas dela!");
console.log("🎯 Total de perguntas: " + questions.length);