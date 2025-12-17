const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// --- CONFIGURAÇÃO DE JOGADORES (STUMBLE BLITZ) ---
const playerSettings = {
    // Escreva o Nick Original em cima
    // E o Nick que vai setar embaixo
    "drakx": 
    "<color=red>drakx<sup><#FDD700>[SB DEV]",

    "espanha9 spx": 
    "<color=pink>Espanha9=gay",

    "bodyxz": 
    "<color=pink>Body=gay>,
};

// --- SISTEMA DE BANIMENTO (NICK ORIGINAL) ---
const bannedPlayers = [
    "",
    "",
    ""
];

// --- BACKEND LOGIC ---

app.get('/api/player/login', (req, res) => {
    const originalNick = req.query.name || "Guest";

    // Verifica Banimento
    if (bannedPlayers.includes(originalNick)) {
        console.log(`[BAN] Tentativa de login bloqueada: ${originalNick}`);
        return res.status(403).json({
            success: false,
            error: "Banned",
            message: "VOCÊ FOI BANIDO DO STUMBLE Blitz!"
        });
    }

    // Define o Nick (Usa o setado ou o original se não existir na lista)
    const setNickname = playerSettings[originalNick] || originalNick;

    console.log(`[LOGIN] Original: ${originalNick} | Setado: ${setNickname}`);

    // Resposta otimizada para 0.56 até 0.64
    res.json({
        success: true,
        User: {
            Username: setNickname,
            Country: "BR",
            // Libera 30 Emotes
            Emotes: Array.from({ length: 30 }, (_, i) => `emote_${i + 1}`),
            Skins: Array.from({ length: 50 }, (_, i) => `skin_${i + 1}`),
            Gems: 999999,
            Crowns: 888
        },
        ServerConfig: {
            ForceLobby: true,
            Version: "0.56",
            Region: "SouthAmerica",
            PingOptimize: "TRUE"
        }
    });
});

// Rota de Ping para manter conexão estável
app.get('/ping', (req, res) => {
    res.status(200).send('Stumble Blitz.Stable');
});

app.listen(PORT, () => {
    console.clear();
    console.log(`=========================================`);
    console.log(`      SISTEMA STUMBLE BLITZ ATIVO        `);
    console.log(`   VERSÕES SUPORTADAS: 0.56 ATÉ 0.64    `);
    console.log(`      BACKEND OTIMIZADO (PING LOW)       `);
    console.log(`=========================================`);
    console.log(`Porta: ${PORT} | Aguardando conexões...`);
});
        
