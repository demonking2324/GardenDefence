// Game configuration
const GRID_ROWS = 5;
const GRID_COLS = 9;
const CELL_SIZE = 80;
const GRID_PADDING = 50;

// Plant types and costs
const PLANTS = {
    PEASHOOTER: { name: 'Peashooter', cost: 100, icon: '🌱', color: '#48bb78', health: 1 },
    SUNFLOWER: { name: 'Sunflower', cost: 50, icon: '🌻', color: '#fbbf24', health: 1 },
    WALLNUT: { name: 'Wallnut', cost: 50, icon: '🥜', color: '#d69e2e', health: 20 },
    CHERRY_BOMB: { name: 'Cherry Bomb', cost: 150, icon: '🍒', color: '#c53030', health: 1 }
};

// Zombie eating constants
const ZOMBIE_DAMAGE_INTERVAL = 5000; // 5 seconds to deal 1 damage
const ZOMBIE_DAMAGE = 1;

// Draw Peashooter plant
function drawPeashooter(ctx, x, y, size) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(centerX, y + size - 5, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Stem (green)
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(centerX - 8, centerY + 10, 16, size * 0.3);
    
    // Main body (light green)
    ctx.fillStyle = '#5a9f3f';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.25, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head (darker green)
    ctx.fillStyle = '#4a7c2f';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 8, size * 0.3, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth opening
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 5, size * 0.15, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight on head
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX - 8, centerY - 12, size * 0.1, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Outline for visibility
    ctx.strokeStyle = '#1a3d0a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 8, size * 0.3, size * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw Sunflower plant
function drawSunflower(ctx, x, y, size) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(centerX, y + size - 5, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Stem (green)
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(centerX - 6, centerY + 15, 12, size * 0.25);
    
    // Leaves
    ctx.fillStyle = '#4a7c2f';
    ctx.beginPath();
    ctx.ellipse(centerX - 15, centerY + 20, 12, 8, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 15, centerY + 20, 12, 8, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Petals (yellow)
    ctx.fillStyle = '#fbbf24';
    const petalCount = 12;
    for (let i = 0; i < petalCount; i++) {
        const angle = (Math.PI * 2 * i) / petalCount;
        const petalX = centerX + Math.cos(angle) * (size * 0.2);
        const petalY = centerY - 5 + Math.sin(angle) * (size * 0.2);
        
        ctx.save();
        ctx.translate(petalX, petalY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.08, size * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    // Center (dark brown)
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 5, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    // Center pattern
    ctx.fillStyle = '#654321';
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const dotX = centerX + Math.cos(angle) * (size * 0.08);
        const dotY = centerY - 5 + Math.sin(angle) * (size * 0.08);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Outline for visibility
    ctx.strokeStyle = '#d69e2e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 5, size * 0.32, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw Wallnut plant
function drawWallnut(ctx, x, y, size) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX, y + size - 3, size * 0.35, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Main nut body (brown)
    ctx.fillStyle = '#8b6914';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.35, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Top section (lighter brown)
    ctx.fillStyle = '#a67c1f';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 8, size * 0.3, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Texture lines
    ctx.strokeStyle = '#6b4f0a';
    ctx.lineWidth = 2;
    // Vertical lines
    for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 8, centerY - 15);
        ctx.lineTo(centerX + i * 8, centerY + 15);
        ctx.stroke();
    }
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(centerX - 15, centerY - 5);
    ctx.lineTo(centerX + 15, centerY - 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX - 12, centerY + 8);
    ctx.lineTo(centerX + 12, centerY + 8);
    ctx.stroke();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.ellipse(centerX - 5, centerY - 12, size * 0.1, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Dark outline for visibility
    ctx.strokeStyle = '#4a3a0a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.35, size * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw Cherry Bomb plant
function drawCherryBomb(ctx, x, y, size) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX, y + size - 3, size * 0.4, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Stem (green)
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(centerX - 3, centerY - size * 0.15, 6, size * 0.2);
    
    // Left cherry (red)
    ctx.fillStyle = '#c53030';
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.15, centerY, size * 0.2, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right cherry (red)
    ctx.beginPath();
    ctx.ellipse(centerX + size * 0.15, centerY, size * 0.2, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Left cherry highlight
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.15 - 3, centerY - 5, size * 0.08, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right cherry highlight
    ctx.beginPath();
    ctx.ellipse(centerX + size * 0.15 - 3, centerY - 5, size * 0.08, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Fuse (yellow/orange)
    ctx.fillStyle = '#f6ad55';
    ctx.fillRect(centerX - 2, centerY - size * 0.25, 4, size * 0.15);
    
    // Fuse tip (spark)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(centerX, centerY - size * 0.3, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Dark outline for visibility
    ctx.strokeStyle = '#9b1c1c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.15, centerY, size * 0.2, size * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(centerX + size * 0.15, centerY, size * 0.2, size * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw Pea
function drawPea(ctx, pea) {
    const centerX = pea.x;
    const centerY = pea.y;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 2, PEA_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Main pea body (green)
    ctx.fillStyle = '#48bb78';
    ctx.beginPath();
    ctx.arc(centerX, centerY, PEA_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = '#68d391';
    ctx.beginPath();
    ctx.arc(centerX - 2, centerY - 2, PEA_SIZE / 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Outline
    ctx.strokeStyle = '#2d5016';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, PEA_SIZE / 2, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw health bar above zombie
function drawZombieHealthBar(ctx, x, y, size, health, maxHealth) {
    const centerX = x + size / 2;
    const headTop = y - size * 0.25 - size * 0.12; // Position above head
    
    const barWidth = size * 0.8;
    const barHeight = 6;
    const barX = centerX - barWidth / 2;
    const barY = headTop - 12;
    
    // Draw health bar background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Draw health bar
    const healthPercent = health / maxHealth;
    ctx.fillStyle = healthPercent > 0.5 ? '#48bb78' : healthPercent > 0.25 ? '#fbbf24' : '#c53030';
    ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
    
    // Draw border
    ctx.strokeStyle = '#1a202c';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
}

// Draw Zombie (classic PvZ style)
function drawZombie(ctx, x, y, size, animationFrame = 0, isDead = false, deathProgress = 0, isEating = false, hasFlag = false) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    
    // Death animation: tumble 1 tile with rotation
    if (isDead) {
        ctx.save();
        ctx.globalAlpha = 1 - deathProgress;
        // Translate to center for rotation
        ctx.translate(centerX, centerY);
        // Rotate as tumbling (full rotation as it tumbles 1 tile)
        ctx.rotate(deathProgress * Math.PI * 2);
        // Translate back to draw from origin
        ctx.translate(-centerX, -centerY);
    }
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX, y + size - 5, size * 0.4, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Body (tattered suit - dark navy/blue)
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(centerX - size * 0.22, centerY - size * 0.08, size * 0.44, size * 0.5);
    
    // Suit jacket details
    ctx.strokeStyle = '#0f1f35';
    ctx.lineWidth = 2;
    // Vertical line down center
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - size * 0.08);
    ctx.lineTo(centerX, centerY + size * 0.35);
    ctx.stroke();
    
    // Tattered edges on suit
    ctx.fillStyle = '#0f1f35';
    // Left tatter
    ctx.beginPath();
    ctx.moveTo(centerX - size * 0.22, centerY + size * 0.15);
    ctx.lineTo(centerX - size * 0.28, centerY + size * 0.2);
    ctx.lineTo(centerX - size * 0.22, centerY + size * 0.25);
    ctx.fill();
    // Right tatter
    ctx.beginPath();
    ctx.moveTo(centerX + size * 0.22, centerY + size * 0.18);
    ctx.lineTo(centerX + size * 0.28, centerY + size * 0.23);
    ctx.lineTo(centerX + size * 0.22, centerY + size * 0.28);
    ctx.fill();
    
    // Tie (red)
    ctx.fillStyle = '#c53030';
    ctx.fillRect(centerX - 3, centerY - size * 0.03, 6, size * 0.35);
    // Tie knot
    ctx.fillStyle = '#9b1c1c';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.03, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head (grayish-green zombie skin - more muted)
    ctx.fillStyle = '#9ae6b4';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.25, size * 0.22, size * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head shading (darker areas)
    ctx.fillStyle = '#68d391';
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.05, centerY - size * 0.2, size * 0.08, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head outline (darker green)
    ctx.strokeStyle = '#48bb78';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.25, size * 0.22, size * 0.24, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Eyes (dark, sunken)
    ctx.fillStyle = '#1a202c';
    // Left eye
    ctx.beginPath();
    ctx.arc(centerX - size * 0.09, centerY - size * 0.28, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Right eye
    ctx.beginPath();
    ctx.arc(centerX + size * 0.09, centerY - size * 0.28, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shine (small white dot)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX - size * 0.09 + 2, centerY - size * 0.28 - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + size * 0.09 + 2, centerY - size * 0.28 - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth (open, showing teeth) - animated when eating
    const mouthOpen = isEating ? 1.5 + Math.sin(animationFrame * 0.3) * 0.3 : 1.0;
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.16, size * 0.1 * mouthOpen, size * 0.08 * mouthOpen, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Teeth (white, jagged) - more visible when eating
    ctx.fillStyle = '#ffffff';
    const toothCount = isEating ? 5 : 3;
    // Top teeth
    for (let i = -Math.floor(toothCount/2); i <= Math.floor(toothCount/2); i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 5 - 1, centerY - size * 0.18);
        ctx.lineTo(centerX + i * 5 + 1, centerY - size * 0.2);
        ctx.lineTo(centerX + i * 5 + 1, centerY - size * 0.14);
        ctx.closePath();
        ctx.fill();
    }
    // Bottom teeth
    for (let i = -Math.floor(toothCount/2); i <= Math.floor(toothCount/2); i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 5 - 1, centerY - size * 0.12);
        ctx.lineTo(centerX + i * 5 + 1, centerY - size * 0.14);
        ctx.lineTo(centerX + i * 5 + 1, centerY - size * 0.08);
        ctx.closePath();
        ctx.fill();
    }
    
    // Outstretched arm (animation based on frame) - different animation when eating
    let armSwing, handX, handY;
    if (isEating) {
        // Eating animation: arm moves forward and back in biting motion
        armSwing = Math.sin(animationFrame * 0.3) * 0.2 - 0.3; // More forward position
        handX = centerX + size * 0.38 + Math.sin(animationFrame * 0.3) * 8;
        handY = centerY + size * 0.12 + Math.cos(animationFrame * 0.3) * 3;
    } else {
        // Walking animation
        armSwing = Math.sin(animationFrame * 0.1) * 0.15;
        handX = centerX + size * 0.38 + Math.sin(animationFrame * 0.1) * 6;
        handY = centerY + size * 0.15 + Math.cos(animationFrame * 0.1) * 4;
    }
    
    ctx.fillStyle = '#1e3a5f';
    // Upper arm
    ctx.save();
    ctx.translate(centerX + size * 0.18, centerY - size * 0.03);
    ctx.rotate(armSwing);
    ctx.fillRect(0, 0, size * 0.18, size * 0.1);
    ctx.restore();
    
    // Lower arm
    ctx.save();
    ctx.translate(centerX + size * 0.3, centerY + size * 0.08);
    ctx.rotate(armSwing * 1.5);
    ctx.fillRect(0, 0, size * 0.15, size * 0.08);
    ctx.restore();
    
    // Hand (zombie skin color)
    ctx.fillStyle = '#9ae6b4';
    ctx.beginPath();
    ctx.arc(handX, handY, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    // Fingers
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(handX + Math.cos(i * 0.5) * 4, handY + Math.sin(i * 0.5) * 4, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Other arm (hanging down)
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(centerX - size * 0.25, centerY + size * 0.05, size * 0.14, size * 0.4);
    // Hand for other arm
    ctx.fillStyle = '#9ae6b4';
    ctx.beginPath();
    ctx.arc(centerX - size * 0.25, centerY + size * 0.45, size * 0.06, 0, Math.PI * 2);
    ctx.fill();
    
    // Legs (walking animation)
    const legOffset = Math.sin(animationFrame * 0.15) * 4;
    // Left leg (pants)
    ctx.fillStyle = '#0f1f35';
    ctx.fillRect(centerX - size * 0.15, centerY + size * 0.35 + legOffset, size * 0.1, size * 0.3);
    // Right leg (pants)
    ctx.fillStyle = '#0f1f35';
    ctx.fillRect(centerX + size * 0.05, centerY + size * 0.35 - legOffset, size * 0.1, size * 0.3);
    
    // Feet (shoes - black)
    ctx.fillStyle = '#1a202c';
    // Left foot
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.1, centerY + size * 0.58 + legOffset, size * 0.08, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right foot
    ctx.beginPath();
    ctx.ellipse(centerX + size * 0.1, centerY + size * 0.58 - legOffset, size * 0.08, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Dark outline for visibility
    ctx.strokeStyle = '#1a202c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.25, size * 0.22, size * 0.24, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw flag if zombie has one
    if (hasFlag && !isDead) {
        // Flag pole (wooden brown)
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(centerX + size * 0.25, centerY - size * 0.4, 4, size * 0.5);
        
        // Flag (red with white pattern)
        ctx.fillStyle = '#c53030';
        ctx.beginPath();
        ctx.moveTo(centerX + size * 0.29, centerY - size * 0.4);
        ctx.lineTo(centerX + size * 0.5, centerY - size * 0.35);
        ctx.lineTo(centerX + size * 0.29, centerY - size * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Flag border
        ctx.strokeStyle = '#1a202c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + size * 0.29, centerY - size * 0.4);
        ctx.lineTo(centerX + size * 0.5, centerY - size * 0.35);
        ctx.lineTo(centerX + size * 0.29, centerY - size * 0.3);
        ctx.closePath();
        ctx.stroke();
        
        // Flag pole top (metal)
        ctx.fillStyle = '#cbd5e0';
        ctx.beginPath();
        ctx.arc(centerX + size * 0.27, centerY - size * 0.4, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    if (isDead) {
        ctx.restore();
    }
}

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size based on grid
canvas.width = GRID_COLS * CELL_SIZE + GRID_PADDING * 2;
canvas.height = GRID_ROWS * CELL_SIZE + GRID_PADDING * 2;

// Game state
let sunCount = 50;
let selectedPlant = null;
let grid = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(null));
let plantLastShot = {}; // Track last shot time for each plant position
let suns = [];
let lastSunSpawn = 0;
const SUN_SPAWN_INTERVAL = 5000; // 5 seconds
const SUN_FALL_SPEED = 1;
const SUN_SIZE = 40;
let gameOver = false; // Track if game is over
let gameOverTime = null; // Track when game over occurred

// Zombie state
let zombies = [];
let lastZombieSpawn = 0;
let gameStartTime = Date.now(); // Track when game started
let zombieSpawnCount = 0; // Track number of zombies spawned
const ZOMBIE_SPEED = 0.3; // Slow movement speed
const ZOMBIE_SIZE = 60;
const ZOMBIE_MAX_HEALTH = 6;
const INITIAL_ZOMBIE_DELAY = 20000; // 20 seconds delay before first zombie
const FAST_SPAWN_COUNT = 5; // First 5 zombies spawn faster
const FAST_SPAWN_INTERVAL = 20000; // 20 seconds for first few zombies

// Wave state
let lastWaveTime = 0;
let waveMessageDisplayTime = 0;
const WAVE_INTERVAL = 180000; // 3 minutes in milliseconds
const WAVE_START_TIME = 180000; // 3 minutes in milliseconds (3rd minute)
const WAVE_MESSAGE_DURATION = 3000; // Show message for 3 seconds
const WAVE_ZOMBIE_COUNT = 8; // Number of zombies in a wave

// Get current zombie spawn interval based on elapsed game time and spawn count
// First few zombies spawn faster, then intervals increase
function getZombieSpawnInterval() {
    // First few zombies spawn faster
    if (zombieSpawnCount < FAST_SPAWN_COUNT) {
        return FAST_SPAWN_INTERVAL; // 6 seconds for first few zombies
    }
    
    const elapsedTime = Date.now() - gameStartTime;
    const elapsedSeconds = elapsedTime / 1000;
    
    // After fast spawn phase, intervals: 30s -> 15s -> 10s -> 5s
    // Change interval every 60 seconds
    if (elapsedSeconds < 60) {
        return 30000; // 30 seconds
    } else if (elapsedSeconds < 120) {
        return 15000; // 15 seconds
    } else if (elapsedSeconds < 180) {
        return 10000; // 10 seconds
    } else {
        return 5000; // 5 seconds
    }
}

// Pea state
let peas = [];
const PEA_SPEED = 5;
const PEA_SIZE = 10;
const PEA_SHOOT_INTERVAL = 1500; // 1.5 seconds

// Explosion state
let explosions = [];
const EXPLOSION_GROW_TIME = 200; // 0.2 seconds
const EXPLOSION_MAX_RADIUS = CELL_SIZE * 1.5; // 3x3 area = 1.5 cells radius

// Create canvas with plant texture for seed packet
function createPlantTextureCanvas(plantType, size = 60) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Draw the plant texture
    switch(plantType) {
        case 'PEASHOOTER':
            drawPeashooter(ctx, 0, 0, size);
            break;
        case 'SUNFLOWER':
            drawSunflower(ctx, 0, 0, size);
            break;
        case 'WALLNUT':
            drawWallnut(ctx, 0, 0, size);
            break;
        case 'CHERRY_BOMB':
            drawCherryBomb(ctx, 0, 0, size);
            break;
    }
    
    return canvas;
}

// Initialize seed packets
function initSeedPackets() {
    const seedPacketsContainer = document.getElementById('seedPackets');
    seedPacketsContainer.innerHTML = '';
    
    Object.entries(PLANTS).forEach(([key, plant]) => {
        const packet = document.createElement('div');
        packet.className = 'seed-packet';
        packet.dataset.plant = key;
        
        // Create canvas with plant texture
        const textureCanvas = createPlantTextureCanvas(key);
        textureCanvas.className = 'seed-packet-icon';
        
        packet.appendChild(textureCanvas);
        
        const costDiv = document.createElement('div');
        costDiv.className = 'seed-packet-cost';
        costDiv.textContent = plant.cost;
        packet.appendChild(costDiv);
        
        packet.addEventListener('click', () => {
            if (sunCount >= plant.cost) {
                // Remove selection from all packets
                document.querySelectorAll('.seed-packet').forEach(p => p.classList.remove('selected'));
                // Select this packet
                packet.classList.add('selected');
                selectedPlant = key;
                canvas.style.cursor = 'pointer';
            }
        });
        
        seedPacketsContainer.appendChild(packet);
    });
    
    updateSeedPackets();
}

// Update seed packet availability based on sun count
function updateSeedPackets() {
    document.querySelectorAll('.seed-packet').forEach(packet => {
        const plantKey = packet.dataset.plant;
        const plant = PLANTS[plantKey];
        
        if (sunCount >= plant.cost) {
            packet.classList.remove('disabled');
        } else {
            packet.classList.add('disabled');
            if (packet.classList.contains('selected')) {
                packet.classList.remove('selected');
                selectedPlant = null;
                canvas.style.cursor = 'crosshair';
            }
        }
    });
}

// Update sun counter display
function updateSunCounter() {
    document.getElementById('sunCount').textContent = sunCount;
    updateSeedPackets();
}

// Create a new sun
function spawnSun() {
    const x = GRID_PADDING + Math.random() * (GRID_COLS * CELL_SIZE);
    const y = -SUN_SIZE;
    suns.push({
        x: x,
        y: y,
        collected: false,
        size: SUN_SIZE,
        attachedTo: null // null for falling suns, {row, col} for sunflower suns
    });
}

// Create a sun attached to a sunflower
function spawnSunflowerSun(row, col) {
    const plantX = GRID_PADDING + col * CELL_SIZE + CELL_SIZE / 2;
    const plantY = GRID_PADDING + row * CELL_SIZE;
    suns.push({
        x: plantX,
        y: plantY - SUN_SIZE / 2 - 10, // Position above the sunflower
        collected: false,
        size: SUN_SIZE,
        attachedTo: { row: row, col: col } // Attached to this sunflower
    });
}

// Draw sun
function drawSun(sun) {
    if (sun.collected) return;
    
    // Draw sun circle
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw sun rays
    ctx.strokeStyle = '#f6ad55';
    ctx.lineWidth = 3;
    const rayLength = sun.size / 3;
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const startX = sun.x + Math.cos(angle) * (sun.size / 2);
        const startY = sun.y + Math.sin(angle) * (sun.size / 2);
        const endX = sun.x + Math.cos(angle) * (sun.size / 2 + rayLength);
        const endY = sun.y + Math.sin(angle) * (sun.size / 2 + rayLength);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    
    // Draw sun emoji
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☀️', sun.x, sun.y);
}

// Check if point is inside sun
function isPointInSun(x, y, sun) {
    const dx = x - sun.x;
    const dy = y - sun.y;
    return dx * dx + dy * dy <= (sun.size / 2) * (sun.size / 2);
}

// Collect sun
function collectSun(sun) {
    if (!sun.collected) {
        sun.collected = true;
        sunCount += 25;
        updateSunCounter();
    }
}

// Spawn a zombie on a random row from the right side
function spawnZombie(hasFlag = false, specificRow = null) {
    const row = specificRow !== null ? specificRow : Math.floor(Math.random() * GRID_ROWS);
    const y = GRID_PADDING + row * CELL_SIZE + (CELL_SIZE - ZOMBIE_SIZE) / 2;
    const x = canvas.width - GRID_PADDING; // Start from right side
    
    zombies.push({
        x: x,
        y: y,
        row: row,
        health: ZOMBIE_MAX_HEALTH,
        animationFrame: Math.floor(Math.random() * 100), // Random starting animation frame
        isDead: false,
        deathStartTime: null,
        isEating: false,
        eatingPlant: null, // Reference to the plant being eaten
        lastDamageTime: null, // Track when last damage was dealt
        hasFlag: hasFlag // Whether this zombie carries a flag
    });
}

// Spawn a huge wave of zombies
function spawnZombieWave() {
    // Create array of all row indices
    const allRows = Array.from({ length: GRID_ROWS }, (_, i) => i);
    
    // Shuffle rows for random distribution
    for (let i = allRows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRows[i], allRows[j]] = [allRows[j], allRows[i]];
    }
    
    // Spawn flag zombie on first row
    spawnZombie(true, allRows[0]);
    
    // Spawn remaining zombies (WAVE_ZOMBIE_COUNT - 1 more)
    const remainingZombies = WAVE_ZOMBIE_COUNT - 1;
    
    // Spawn zombies on remaining shuffled rows first
    for (let i = 1; i < Math.min(remainingZombies + 1, allRows.length); i++) {
        spawnZombie(false, allRows[i]);
    }
    
    // If we need more zombies than available rows, spawn extra on random rows
    for (let i = allRows.length; i <= remainingZombies; i++) {
        const randomRow = Math.floor(Math.random() * GRID_ROWS);
        spawnZombie(false, randomRow);
    }
}

// Shoot a pea from a peashooter
function shootPea(row, col) {
    const plantX = GRID_PADDING + col * CELL_SIZE + CELL_SIZE / 2;
    const plantY = GRID_PADDING + row * CELL_SIZE + CELL_SIZE / 2;
    
    // Find target zombie in this row that is in front of (to the right of) the peashooter
    const targetZombie = getClosestZombieInRow(row, col);
    
    if (targetZombie) {
        peas.push({
            x: plantX,
            y: plantY,
            row: row,
            targetZombie: targetZombie
        });
    }
}

// Check if there's a zombie in a row and return the closest one that is in front of the plant
function getClosestZombieInRow(row, plantCol) {
    const plantX = GRID_PADDING + plantCol * CELL_SIZE + CELL_SIZE / 2;
    let closestZombie = null;
    let closestDistance = Infinity;
    
    zombies.forEach(zombie => {
        if (zombie.row === row && !zombie.isDead) {
            const zombieCenterX = zombie.x + ZOMBIE_SIZE / 2;
            // Only consider zombies that are to the right (forward) of the plant
            if (zombieCenterX > plantX) {
                const distance = zombieCenterX - plantX;
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestZombie = zombie;
                }
            }
        }
    });
    
    return closestZombie;
}

// Update peashooters - check if they should shoot
function updatePeashooters() {
    const currentTime = Date.now();
    
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const plant = grid[row][col];
            if (plant && plant.type === 'PEASHOOTER' && plant.health > 0) {
                const plantKey = `${row}-${col}`;
                const lastShot = plantLastShot[plantKey] || 0;
                
                // Check if there's a zombie in this row that is in front of the peashooter
                const zombie = getClosestZombieInRow(row, col);
                
                if (zombie && (currentTime - lastShot >= PEA_SHOOT_INTERVAL)) {
                    shootPea(row, col);
                    plantLastShot[plantKey] = currentTime;
                }
            }
        }
    }
}

// Update pea positions and handle collisions
function updatePeas() {
    peas = peas.filter(pea => {
        // If target zombie is dead or doesn't exist, remove pea
        if (!pea.targetZombie || pea.targetZombie.isDead) {
            return false;
        }
        
        // Move pea towards zombie
        const targetX = pea.targetZombie.x + ZOMBIE_SIZE / 2;
        const targetY = pea.targetZombie.y + ZOMBIE_SIZE / 2;
        
        const dx = targetX - pea.x;
        const dy = targetY - pea.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < PEA_SPEED) {
            // Pea hit zombie
            pea.targetZombie.health -= 1;
            
            // Check if zombie is dead
            if (pea.targetZombie.health <= 0) {
                pea.targetZombie.isDead = true;
                pea.targetZombie.deathStartTime = Date.now();
                pea.targetZombie.deathStartX = pea.targetZombie.x; // Store starting position for tumbling
            }
            
            return false; // Remove pea
        }
        
        // Move pea
        pea.x += (dx / distance) * PEA_SPEED;
        pea.y += (dy / distance) * PEA_SPEED;
        
        // Remove if pea goes off screen
        if (pea.x < 0 || pea.x > canvas.width || pea.y < 0 || pea.y > canvas.height) {
            return false;
        }
        
        return true;
    });
}

// Check if zombie is at or about to reach a plant position
function getPlantAtZombiePosition(zombie) {
    // Calculate which grid cell the zombie would be in after moving
    const zombieCenterX = zombie.x + ZOMBIE_SIZE / 2;
    const zombieCenterY = zombie.y + ZOMBIE_SIZE / 2;
    
    // Check current position and slightly ahead (where zombie will be)
    const checkX = zombieCenterX - ZOMBIE_SPEED;
    
    const col = Math.floor((checkX - GRID_PADDING) / CELL_SIZE);
    const row = Math.floor((zombieCenterY - GRID_PADDING) / CELL_SIZE);
    
    if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
        const plant = grid[row][col];
        if (plant && plant.health > 0) {
            // Align zombie to the right edge of the plant cell
            const plantCellX = GRID_PADDING + col * CELL_SIZE;
            const targetX = plantCellX + CELL_SIZE;
            
            return { plant, row, col, targetX };
        }
    }
    return null;
}

// Update explosions - trigger explosion after 0.2 seconds and remove after animation
function updateExplosions() {
    const currentTime = Date.now();
    
    explosions = explosions.filter(explosion => {
        const elapsed = currentTime - explosion.startTime;
        
        // Trigger explosion after 0.2 seconds (if not already triggered)
        if (elapsed >= EXPLOSION_GROW_TIME && !explosion.hasExploded) {
            explodeCherryBomb(explosion.row, explosion.col);
            explosion.hasExploded = true;
        }
        
        // Remove explosion after animation completes (let it fade out a bit more)
        const totalDuration = EXPLOSION_GROW_TIME + 100; // 0.2s grow + 0.1s fade
        if (elapsed >= totalDuration) {
            return false;
        }
        
        return true;
    });
}

// Update zombie positions (move left)
function updateZombies() {
    const currentTime = Date.now();
    
    zombies = zombies.filter(zombie => {
        // Handle death animation
        if (zombie.isDead) {
            if (!zombie.deathStartTime) {
                zombie.deathStartTime = currentTime;
                zombie.deathStartX = zombie.x; // Store starting position for tumbling
            }
            
            const deathDuration = 1000; // 1 second death animation
            const deathProgress = Math.min((currentTime - zombie.deathStartTime) / deathDuration, 1);
            
            // Tumble 1 tile (CELL_SIZE) to the left during death animation
            const tumbleDistance = CELL_SIZE * deathProgress;
            zombie.x = zombie.deathStartX - tumbleDistance;
            
            // Remove zombie after death animation completes
            if (deathProgress >= 1) {
                return false;
            }
            
            // Update animation frame even when dead
            zombie.animationFrame += 1;
            return true;
        }
        
        // Check if zombie has reached a plant
        const plantInfo = getPlantAtZombiePosition(zombie);
        
        if (plantInfo) {
            // Align zombie to the plant position if not already aligned
            if (zombie.x > plantInfo.targetX) {
                zombie.x = Math.max(plantInfo.targetX, zombie.x - ZOMBIE_SPEED);
            } else {
                zombie.x = plantInfo.targetX;
            }
            
            // Zombie is eating a plant
            zombie.isEating = true;
            zombie.eatingPlant = plantInfo.plant;
            
            // Deal damage every 5 seconds
            if (!zombie.lastDamageTime || (currentTime - zombie.lastDamageTime >= ZOMBIE_DAMAGE_INTERVAL)) {
                plantInfo.plant.health -= ZOMBIE_DAMAGE;
                zombie.lastDamageTime = currentTime;
                
                // Remove plant if health reaches 0
                if (plantInfo.plant.health <= 0) {
                    grid[plantInfo.row][plantInfo.col] = null;
                    zombie.isEating = false;
                    zombie.eatingPlant = null;
                    zombie.lastDamageTime = null;
                }
            }
        } else {
            // No plant, continue moving
            zombie.isEating = false;
            zombie.eatingPlant = null;
            zombie.lastDamageTime = null;
            zombie.x -= ZOMBIE_SPEED;
        }
        
        // Update animation frame
        zombie.animationFrame += 1;
        
        // Check if zombie has reached the left side (game over condition)
        if (zombie.x + ZOMBIE_SIZE <= 0 && !gameOver) {
            gameOver = true;
            gameOverTime = Date.now();
        }
        
        // Remove zombies that have moved off the left side
        if (zombie.x + ZOMBIE_SIZE < 0) {
            return false;
        }
        
        return true;
    });
}

// Draw the grid
function drawGrid() {
    // Draw background
    ctx.fillStyle = '#68d391';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid cells
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const x = GRID_PADDING + col * CELL_SIZE;
            const y = GRID_PADDING + row * CELL_SIZE;
            
            // Draw cell border
            ctx.strokeStyle = '#48bb78';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
            
            // Alternate cell colors for better visibility
            if ((row + col) % 2 === 0) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            }
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            
            // Draw plant if exists
            if (grid[row][col]) {
                const plant = grid[row][col];
                const plantX = x;
                const plantY = y;
                
                // Draw health bar for Sunflower and Peashooter (always visible)
                // or for Wallnut when damaged
                const shouldShowHealthBar = 
                    plant.type === 'SUNFLOWER' || 
                    plant.type === 'PEASHOOTER' || 
                    (plant.type === 'WALLNUT' && plant.health < PLANTS[plant.type].health);
                
                if (shouldShowHealthBar) {
                    // Draw health bar background
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(plantX, plantY - 10, CELL_SIZE, 6);
                    
                    // Draw health bar
                    const healthPercent = plant.health / PLANTS[plant.type].health;
                    ctx.fillStyle = healthPercent > 0.5 ? '#48bb78' : healthPercent > 0.25 ? '#fbbf24' : '#c53030';
                    ctx.fillRect(plantX, plantY - 10, CELL_SIZE * healthPercent, 6);
                }
                
                switch(plant.type) {
                    case 'PEASHOOTER':
                        drawPeashooter(ctx, plantX, plantY, CELL_SIZE);
                        break;
                    case 'SUNFLOWER':
                        drawSunflower(ctx, plantX, plantY, CELL_SIZE);
                        break;
                    case 'WALLNUT':
                        drawWallnut(ctx, plantX, plantY, CELL_SIZE);
                        break;
                    case 'CHERRY_BOMB':
                        drawCherryBomb(ctx, plantX, plantY, CELL_SIZE);
                        break;
                }
            }
        }
    }
}

// Start cherry bomb explosion animation
function startCherryBombExplosion(row, col) {
    const centerX = GRID_PADDING + col * CELL_SIZE + CELL_SIZE / 2;
    const centerY = GRID_PADDING + row * CELL_SIZE + CELL_SIZE / 2;
    
    explosions.push({
        row: row,
        col: col,
        centerX: centerX,
        centerY: centerY,
        startTime: Date.now(),
        hasExploded: false // Track if we've already triggered the zombie killing
    });
}

// Explode cherry bomb - kills all zombies in 3x3 area
function explodeCherryBomb(row, col) {
    // Check all cells in 3x3 area around the cherry bomb
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const checkRow = row + dr;
            const checkCol = col + dc;
            
            // Check if cell is within grid bounds
            if (checkRow >= 0 && checkRow < GRID_ROWS && checkCol >= 0 && checkCol < GRID_COLS) {
                // Calculate the area covered by this cell
                const cellX = GRID_PADDING + checkCol * CELL_SIZE;
                const cellY = GRID_PADDING + checkRow * CELL_SIZE;
                const cellRight = cellX + CELL_SIZE;
                const cellBottom = cellY + CELL_SIZE;
                
                // Kill all zombies that overlap with this cell
                zombies.forEach(zombie => {
                    if (zombie.isDead) return;
                    
                    const zombieLeft = zombie.x;
                    const zombieRight = zombie.x + ZOMBIE_SIZE;
                    const zombieTop = zombie.y;
                    const zombieBottom = zombie.y + ZOMBIE_SIZE;
                    
                    // Check if zombie overlaps with this cell
                    if (zombieRight > cellX && zombieLeft < cellRight &&
                        zombieBottom > cellY && zombieTop < cellBottom) {
                        // Kill the zombie
                        zombie.isDead = true;
                        zombie.deathStartTime = Date.now();
                        zombie.deathStartX = zombie.x;
                    }
                });
            }
        }
    }
}

// Draw dancing zombie for game over screen
function drawDancingZombie(ctx, x, y, size, animationFrame) {
    const centerX = x;
    const centerY = y;
    
    // Dancing animation: bobbing up and down, arms swinging more
    const danceBounce = Math.sin(animationFrame * 0.2) * 10;
    const armSwing = Math.sin(animationFrame * 0.3) * 0.4; // More exaggerated arm swing
    const legSwing = Math.sin(animationFrame * 0.25) * 8;
    
    ctx.save();
    ctx.translate(0, danceBounce);
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + size - 5, size * 0.4, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Body (tattered suit - dark navy/blue)
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(centerX - size * 0.22, centerY - size * 0.08, size * 0.44, size * 0.5);
    
    // Suit jacket details
    ctx.strokeStyle = '#0f1f35';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - size * 0.08);
    ctx.lineTo(centerX, centerY + size * 0.35);
    ctx.stroke();
    
    // Tie (red)
    ctx.fillStyle = '#c53030';
    ctx.fillRect(centerX - 3, centerY - size * 0.03, 6, size * 0.35);
    ctx.fillStyle = '#9b1c1c';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.03, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head (grayish-green zombie skin)
    ctx.fillStyle = '#9ae6b4';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.25, size * 0.22, size * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head outline
    ctx.strokeStyle = '#48bb78';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.25, size * 0.22, size * 0.24, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Eyes (dark, sunken)
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.arc(centerX - size * 0.09, centerY - size * 0.28, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + size * 0.09, centerY - size * 0.28, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shine
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX - size * 0.09 + 2, centerY - size * 0.28 - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + size * 0.09 + 2, centerY - size * 0.28 - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth (open, happy/celebrating)
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - size * 0.16, size * 0.12, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Teeth (white, jagged)
    ctx.fillStyle = '#ffffff';
    const toothCount = 5;
    for (let i = -Math.floor(toothCount/2); i <= Math.floor(toothCount/2); i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 5 - 1, centerY - size * 0.18);
        ctx.lineTo(centerX + i * 5 + 1, centerY - size * 0.2);
        ctx.lineTo(centerX + i * 5 + 1, centerY - size * 0.14);
        ctx.closePath();
        ctx.fill();
    }
    
    // Dancing arms (both arms up and swinging)
    ctx.fillStyle = '#1e3a5f';
    // Left arm (up and swinging)
    ctx.save();
    ctx.translate(centerX - size * 0.18, centerY - size * 0.1);
    ctx.rotate(-Math.PI / 3 + armSwing);
    ctx.fillRect(0, 0, size * 0.18, size * 0.1);
    ctx.restore();
    
    // Right arm (up and swinging)
    ctx.save();
    ctx.translate(centerX + size * 0.18, centerY - size * 0.1);
    ctx.rotate(Math.PI / 3 - armSwing);
    ctx.fillRect(0, 0, size * 0.18, size * 0.1);
    ctx.restore();
    
    // Hands
    ctx.fillStyle = '#9ae6b4';
    const leftHandX = centerX - size * 0.35 + Math.cos(-Math.PI / 3 + armSwing) * size * 0.18;
    const leftHandY = centerY - size * 0.1 + Math.sin(-Math.PI / 3 + armSwing) * size * 0.18;
    ctx.beginPath();
    ctx.arc(leftHandX, leftHandY, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    const rightHandX = centerX + size * 0.35 + Math.cos(Math.PI / 3 - armSwing) * size * 0.18;
    const rightHandY = centerY - size * 0.1 + Math.sin(Math.PI / 3 - armSwing) * size * 0.18;
    ctx.beginPath();
    ctx.arc(rightHandX, rightHandY, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Dancing legs (alternating)
    ctx.fillStyle = '#0f1f35';
    // Left leg
    ctx.fillRect(centerX - size * 0.15, centerY + size * 0.35 + legSwing, size * 0.1, size * 0.3);
    // Right leg
    ctx.fillRect(centerX + size * 0.05, centerY + size * 0.35 - legSwing, size * 0.1, size * 0.3);
    
    // Feet (shoes - black)
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.1, centerY + size * 0.58 + legSwing, size * 0.08, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + size * 0.1, centerY + size * 0.58 - legSwing, size * 0.08, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Draw game over screen
function drawGameOverScreen() {
    if (!gameOver) {
        // Hide HTML overlay if game is not over
        const gameOverScreen = document.getElementById('gameOverScreen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'none';
        }
        return;
    }
    
    // Show HTML overlay
    const gameOverScreen = document.getElementById('gameOverScreen');
    if (gameOverScreen) {
        gameOverScreen.style.display = 'flex';
    }
    
    const currentTime = Date.now();
    const animationFrame = Math.floor((currentTime - gameOverTime) / 16); // ~60fps animation
    
    // Draw semi-transparent overlay on canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw "YOU LOSE" text on canvas
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#c53030';
    ctx.lineWidth = 6;
    
    const textY = canvas.height / 2 - 100;
    ctx.strokeText('YOU LOSE', canvas.width / 2, textY);
    ctx.fillText('YOU LOSE', canvas.width / 2, textY);
    
    // Draw dancing zombie on canvas
    const zombieX = canvas.width / 2;
    const zombieY = canvas.height / 2 + 50;
    drawDancingZombie(ctx, zombieX, zombieY, 100, animationFrame);
}

// Restart game function
function restartGame() {
    // Reset all game state
    sunCount = 50;
    selectedPlant = null;
    grid = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(null));
    plantLastShot = {};
    suns = [];
    lastSunSpawn = 0;
    zombies = [];
    lastZombieSpawn = 0;
    gameStartTime = Date.now();
    zombieSpawnCount = 0;
    peas = [];
    explosions = [];
    gameOver = false;
    gameOverTime = null;
    lastWaveTime = 0;
    waveMessageDisplayTime = 0;
    
    // Reset UI
    document.querySelectorAll('.seed-packet').forEach(p => p.classList.remove('selected'));
    updateSunCounter();
    canvas.style.cursor = 'crosshair';
}

// Draw explosion animation
function drawExplosion(ctx, explosion) {
    const currentTime = Date.now();
    const elapsed = currentTime - explosion.startTime;
    const progress = Math.min(elapsed / EXPLOSION_GROW_TIME, 1);
    
    // Calculate current radius (grows from 0 to max radius)
    const radius = EXPLOSION_MAX_RADIUS * progress;
    
    // Draw multiple expanding circles for explosion effect
    ctx.save();
    
    // Outer explosion ring (orange/red)
    const outerAlpha = 1 - progress * 0.7;
    ctx.globalAlpha = outerAlpha;
    ctx.fillStyle = '#f6ad55';
    ctx.beginPath();
    ctx.arc(explosion.centerX, explosion.centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Middle ring (red)
    const middleRadius = radius * 0.7;
    const middleAlpha = 1 - progress * 0.5;
    ctx.globalAlpha = middleAlpha;
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.arc(explosion.centerX, explosion.centerY, middleRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner core (bright yellow/white)
    const innerRadius = radius * 0.4;
    const innerAlpha = 1 - progress * 0.3;
    ctx.globalAlpha = innerAlpha;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(explosion.centerX, explosion.centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // White hot center
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(explosion.centerX, explosion.centerY, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw explosion particles/sparks
    ctx.globalAlpha = 1 - progress;
    ctx.fillStyle = '#fbbf24';
    const particleCount = 16;
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const particleDistance = radius * 0.8;
        const particleX = explosion.centerX + Math.cos(angle) * particleDistance;
        const particleY = explosion.centerY + Math.sin(angle) * particleDistance;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

// Get grid position from mouse coordinates
function getGridPosition(mouseX, mouseY) {
    const x = mouseX - GRID_PADDING;
    const y = mouseY - GRID_PADDING;
    
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    
    if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
        return { row, col };
    }
    return null;
}

// Highlight cell on hover
let hoveredCell = null;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check if hovering over a sun
    let hoveringSun = false;
    for (let sun of suns) {
        if (!sun.collected && isPointInSun(mouseX, mouseY, sun)) {
            hoveringSun = true;
            canvas.style.cursor = 'pointer';
            break;
        }
    }
    
    if (!hoveringSun) {
        const cell = getGridPosition(mouseX, mouseY);
        if (cell !== null) {
            hoveredCell = cell;
            canvas.style.cursor = selectedPlant ? 'pointer' : 'crosshair';
        } else {
            hoveredCell = null;
            canvas.style.cursor = selectedPlant ? 'pointer' : 'crosshair';
        }
    }
});

// Draw wave warning message
function drawWaveMessage() {
    if (waveMessageDisplayTime > 0) {
        const currentTime = Date.now();
        const elapsed = currentTime - waveMessageDisplayTime;
        
        if (elapsed < WAVE_MESSAGE_DURATION) {
            // Fade in/out effect
            const fadeProgress = elapsed < 500 ? elapsed / 500 : 
                                 elapsed > WAVE_MESSAGE_DURATION - 500 ? 
                                 (WAVE_MESSAGE_DURATION - elapsed) / 500 : 1;
            
            ctx.save();
            ctx.globalAlpha = fadeProgress;
            
            // Draw semi-transparent background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw message text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            
            const message = 'A huge wave of Zombies are approaching';
            const centerY = canvas.height / 2;
            
            // Draw text with outline
            ctx.strokeText(message, canvas.width / 2, centerY);
            ctx.fillText(message, canvas.width / 2, centerY);
            
            ctx.restore();
        } else {
            waveMessageDisplayTime = 0;
        }
    }
}

// Draw hover effect
function drawHoverEffect(cell) {
    if (!cell) return;
    
    const x = GRID_PADDING + cell.col * CELL_SIZE;
    const y = GRID_PADDING + cell.row * CELL_SIZE;
    
        if (selectedPlant && !grid[cell.row][cell.col]) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            
            // Show plant preview with transparency
            ctx.save();
            ctx.globalAlpha = 0.6;
            switch(selectedPlant) {
                case 'PEASHOOTER':
                    drawPeashooter(ctx, x, y, CELL_SIZE);
                    break;
                case 'SUNFLOWER':
                    drawSunflower(ctx, x, y, CELL_SIZE);
                    break;
                case 'WALLNUT':
                    drawWallnut(ctx, x, y, CELL_SIZE);
                    break;
                case 'CHERRY_BOMB':
                    drawCherryBomb(ctx, x, y, CELL_SIZE);
                    break;
            }
            ctx.restore();
            
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        } else if (grid[cell.row][cell.col] && grid[cell.row][cell.col].health <= 0) {
            // Show that plant is dead/destroyed
            ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    }
}

// Handle canvas clicks
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check if clicking on a sun
    for (let sun of suns) {
        if (!sun.collected && isPointInSun(mouseX, mouseY, sun)) {
            collectSun(sun);
            return;
        }
    }
    
    // Check if clicking on grid cell
    const cell = getGridPosition(mouseX, mouseY);
    if (cell && selectedPlant) {
        const plant = PLANTS[selectedPlant];
        
        // Check if cell is empty and player has enough sun
        if (!grid[cell.row][cell.col] && sunCount >= plant.cost) {
            // Handle cherry bomb - it starts an explosion animation
            if (selectedPlant === 'CHERRY_BOMB') {
                sunCount -= plant.cost;
                updateSunCounter();
                
                // Start explosion animation (will explode after 0.2 seconds)
                startCherryBombExplosion(cell.row, cell.col);
                
                // Deselect plant after placement
                document.querySelectorAll('.seed-packet').forEach(p => p.classList.remove('selected'));
                selectedPlant = null;
                canvas.style.cursor = 'crosshair';
            } else {
                // Store plant as object with type and health
                grid[cell.row][cell.col] = {
                    type: selectedPlant,
                    health: plant.health,
                    plantTime: Date.now(), // Track when plant was placed
                    lastSunProducedTime: null, // Track when last sun was produced (null = hasn't produced yet)
                    nextSunInterval: null // Random interval for next sun production (in milliseconds)
                };
                sunCount -= plant.cost;
                updateSunCounter();
                
                // Initialize last shot time for peashooters
                if (selectedPlant === 'PEASHOOTER') {
                    const plantKey = `${cell.row}-${cell.col}`;
                    plantLastShot[plantKey] = 0;
                }
                
                // Deselect plant after placement
                document.querySelectorAll('.seed-packet').forEach(p => p.classList.remove('selected'));
                selectedPlant = null;
                canvas.style.cursor = 'crosshair';
            }
        }
    }
});

// Game loop
function gameLoop() {
    const currentTime = Date.now();
    
    // If game is over, only draw the game over screen
    if (gameOver) {
        drawGrid();
        drawGameOverScreen();
        requestAnimationFrame(gameLoop);
        return;
    }
    
    const elapsedTime = currentTime - gameStartTime;
    const elapsedMinutes = elapsedTime / 60000;
    
    // Check for zombie waves (every 5 minutes starting at WAVE_START_TIME)
    if (elapsedTime >= WAVE_START_TIME) {
        const timeSinceLastWave = lastWaveTime === 0 ? elapsedTime - WAVE_START_TIME : currentTime - lastWaveTime;
        
        // Trigger wave if it's been at least 5 minutes since last wave (or first wave at WAVE_START_TIME)
        if (timeSinceLastWave >= WAVE_INTERVAL || (lastWaveTime === 0 && elapsedTime >= WAVE_START_TIME)) {
            // Show warning message
            waveMessageDisplayTime = currentTime;
            // Spawn the wave
            spawnZombieWave();
            lastWaveTime = currentTime;
        }
    }
    
    // Spawn sun periodically
    if (currentTime - lastSunSpawn > SUN_SPAWN_INTERVAL) {
        spawnSun();
        lastSunSpawn = currentTime;
    }
    
    // Spawn zombie periodically (with dynamic interval) - but not during wave spawn
    // Wait 20 seconds before spawning the first zombie
    const timeSinceStart = currentTime - gameStartTime;
    if (timeSinceStart >= INITIAL_ZOMBIE_DELAY) {
        const zombieSpawnInterval = getZombieSpawnInterval();
        if (currentTime - lastZombieSpawn > zombieSpawnInterval) {
            spawnZombie();
            zombieSpawnCount++;
            lastZombieSpawn = currentTime;
        }
    }
    
    // Update sun positions (only for falling suns, not attached ones)
    suns = suns.filter(sun => {
        if (sun.collected) return false;
        
        // If sun is attached to a sunflower, don't move it
        if (sun.attachedTo) {
            // Check if the sunflower still exists
            const row = sun.attachedTo.row;
            const col = sun.attachedTo.col;
            const plant = grid[row] && grid[row][col] ? grid[row][col] : null;
            if (!plant || plant.type !== 'SUNFLOWER' || plant.health <= 0) {
                // Sunflower is gone, remove the sun
                return false;
            }
            
            // Attached suns stay until collected (no time limit)
            
            // Update position to stay on top of sunflower
            const plantX = GRID_PADDING + col * CELL_SIZE + CELL_SIZE / 2;
            const plantY = GRID_PADDING + row * CELL_SIZE;
            sun.x = plantX;
            sun.y = plantY - SUN_SIZE / 2 - 10;
        } else {
            // Falling sun - move it down
            sun.y += SUN_FALL_SPEED;
            
            // Remove suns that fall off screen
            if (sun.y > canvas.height + SUN_SIZE) {
                return false;
            }
        }
        
        return true;
    });
    
    // Check sunflowers and produce suns repeatedly with random intervals (4-15 seconds)
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const plant = grid[row][col];
            if (plant && plant.type === 'SUNFLOWER' && plant.health > 0) {
                if (plant.plantTime) {
                    // Check if there's already a sun attached to this sunflower
                    const hasAttachedSun = suns.some(sun => 
                        sun.attachedTo && 
                        sun.attachedTo.row === row && 
                        sun.attachedTo.col === col && 
                        !sun.collected
                    );
                    
                    // Don't produce a new sun if one is already attached
                    if (hasAttachedSun) {
                        continue;
                    }
                    
                    // Determine the time to check against
                    const timeToCheck = plant.lastSunProducedTime || plant.plantTime;
                    const timeSinceLastProduction = currentTime - timeToCheck;
                    
                    // For first sun, wait at least 8 seconds after planting
                    // For subsequent suns, wait for the random interval
                    const requiredWaitTime = plant.lastSunProducedTime 
                        ? (plant.nextSunInterval || 0) 
                        : 8000; // 8 seconds for first sun
                    
                    if (timeSinceLastProduction >= requiredWaitTime) {
                        // Produce a sun
                        spawnSunflowerSun(row, col);
                        plant.lastSunProducedTime = currentTime;
                        // Generate random interval for next sun (10-20 seconds in milliseconds)
                        plant.nextSunInterval = 10000 + Math.random() * 10000; // 10000-20000 ms
                    }
                }
            }
        }
    }
    
    // Update peashooters (check if they should shoot)
    updatePeashooters();
    
    // Update pea positions
    updatePeas();
    
    // Update zombie positions
    updateZombies();
    
    // Update explosions
    updateExplosions();
    
    // Draw everything
    drawGrid();
    
    // Draw peas
    peas.forEach(pea => {
        drawPea(ctx, pea);
    });
    
    // Draw zombies (on top of grid)
    zombies.forEach(zombie => {
        let deathProgress = 0;
        if (zombie.isDead && zombie.deathStartTime) {
            const deathDuration = 1000;
            deathProgress = Math.min((Date.now() - zombie.deathStartTime) / deathDuration, 1);
        }
        // Draw health bar above zombie (only if not dead)
        if (!zombie.isDead) {
            drawZombieHealthBar(ctx, zombie.x, zombie.y, ZOMBIE_SIZE, zombie.health, ZOMBIE_MAX_HEALTH);
        }
        drawZombie(ctx, zombie.x, zombie.y, ZOMBIE_SIZE, zombie.animationFrame, zombie.isDead, deathProgress, zombie.isEating || false, zombie.hasFlag || false);
    });
    
    // Draw explosions (on top of zombies)
    explosions.forEach(explosion => {
        drawExplosion(ctx, explosion);
    });
    
    // Draw hover effect
    if (hoveredCell) {
        drawHoverEffect(hoveredCell);
    }
    
    // Draw wave warning message (on top of everything)
    drawWaveMessage();
    
    // Draw suns (draw attached suns after plants so they appear on top)
    suns.forEach(sun => {
        if (sun.attachedTo) {
            // Draw attached suns on top of everything
            drawSun(sun);
        }
    });
    
    // Draw falling suns
    suns.forEach(sun => {
        if (!sun.attachedTo) {
            drawSun(sun);
        }
    });
    
    // Draw game over screen (on top of everything)
    drawGameOverScreen();
    
    requestAnimationFrame(gameLoop);
}

// Initialize the game
initSeedPackets();
updateSunCounter();

// Set up try again button
const tryAgainButton = document.getElementById('tryAgainButton');
if (tryAgainButton) {
    tryAgainButton.addEventListener('click', () => {
        restartGame();
    });
}

gameLoop();
