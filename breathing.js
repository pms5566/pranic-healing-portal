/**
 * PRANIC HEALING PORTAL — BREATHING CYCLE ENGINE
 * Rhythm Cadence: 6s Inhale -> 3s Hold -> 6s Exhale -> 3s Hold
 */
class BreathingEngine {
    constructor() {
        this.inner = document.getElementById('breathing-inner');
        this.innerText = document.getElementById('breathing-inner-text');
        this.stateText = document.getElementById('breathing-state');
        this.timerText = document.getElementById('breathing-timer');
        this.btnStart = document.getElementById('btn-breathing-start');
        this.btnReset = document.getElementById('btn-breathing-reset');

        this.interval = null;
        this.isActive = false;
        this.counter = 0;
        this.phase = 'idle';

        this.phases = {
            inhale: { text: 'Inhale Energy', duration: 6, scale: 2.0, glow: 'glow-inhale' },
            hold1: { text: 'Hold & Circulate', duration: 3, scale: 2.0, glow: 'glow-hold' },
            exhale: { text: 'Exhale Impurities', duration: 6, scale: 1.0, glow: 'glow-exhale' },
            hold2: { text: 'Hold & Ground', duration: 3, scale: 1.0, glow: 'glow-hold' }
        };

        this.init();
    }

    init() {
        if (!this.btnStart || !this.inner) return;
        this.btnStart.addEventListener('click', () => this.toggle());
        this.btnReset.addEventListener('click', () => this.reset());
    }

    toggle() {
        if (this.isActive) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        this.isActive = true;
        this.btnStart.textContent = 'Pause Practice';
        this.btnReset.removeAttribute('disabled');

        if (this.phase === 'idle') {
            this.triggerPhase('inhale');
        } else {
            this.runTimer();
        }
    }

    pause() {
        clearInterval(this.interval);
        this.isActive = false;
        this.btnStart.textContent = 'Resume Practice';
        this.innerText.textContent = 'Paused';
        this.stateText.textContent = 'Breathing cycle paused';
    }

    reset() {
        clearInterval(this.interval);
        this.isActive = false;
        this.counter = 0;
        this.phase = 'idle';

        if (this.inner) {
            this.inner.style.transform = 'scale(1)';
            this.inner.className = 'breathing-circle-inner';
        }
        if (this.innerText) this.innerText.textContent = 'Begin';
        if (this.stateText) this.stateText.textContent = 'Ready when you are';
        if (this.timerText) this.timerText.textContent = '0s';

        this.btnStart.textContent = 'Start Meditation';
        this.btnReset.setAttribute('disabled', 'true');
    }

    triggerPhase(nextPhase) {
        this.phase = nextPhase;
        this.counter = this.phases[this.phase].duration;
        this.stateText.textContent = this.phases[this.phase].text;
        this.timerText.textContent = `${this.counter}s`;

        if (this.inner) {
            this.inner.style.transform = `scale(${this.phases[this.phase].scale})`;
            this.inner.className = 'breathing-circle-inner ' + this.phases[this.phase].glow;
        }

        this.runTimer();
    }

    runTimer() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.counter--;
            this.timerText.textContent = `${this.counter}s`;
            this.innerText.textContent = this.counter;

            if (this.counter <= 0) {
                clearInterval(this.interval);
                this.nextPhase();
            }
        }, 1000);
    }

    nextPhase() {
        const sequence = ['inhale', 'hold1', 'exhale', 'hold2'];
        const currentIndex = sequence.indexOf(this.phase);
        const nextIndex = (currentIndex + 1) % sequence.length;
        this.triggerPhase(sequence[nextIndex]);
    }
}

// Auto-initialize when content loads
document.addEventListener('DOMContentLoaded', () => {
    new BreathingEngine();
});
