import { coreLines } from "./compile/core.js";
import { haloLines } from "./compile/halo.js";
import { massEffectLines } from "./compile/massEffect.js";
import { devLifeLines } from "./compile/devLife.js";
import { hobbyLines } from "./compile/hobbies.js";
import { easterEggLines } from "./compile/easterEggs.js";

// Create canvas for background
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lines that simulate compiling output
const compileLines = [
  ...coreLines,
  ...devLifeLines,
  ...hobbyLines,
  ...haloLines,
  ...massEffectLines,
  ...easterEggLines
];

// Array of visible lines
let visibleLines = [];
const maxLines = Math.floor(canvas.height / 18);
const lineHeight = 18;

// Control speed of adding lines
let frameCounter = 0;
const frameDelay = 30; // higher = slower

function drawCompileBackground() {
    frameCounter++;

    // Clear old content completely
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw each line
    ctx.fillStyle = "#0f5f13";
    ctx.font = `${lineHeight}px monospace`;
    visibleLines.forEach((line, i) => {
        ctx.fillText(line, 20, i * lineHeight + lineHeight);
    });

    // Add new line at controlled speed
    if (frameCounter >= frameDelay) {
        frameCounter = 0;
        const randomLine = compileLines[Math.floor(Math.random() * compileLines.length)];
        visibleLines.push(randomLine);

        // Keep only maxLines lines
        if (visibleLines.length > maxLines) visibleLines.shift();
    }

    requestAnimationFrame(drawCompileBackground);
}

// Handle resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

drawCompileBackground();