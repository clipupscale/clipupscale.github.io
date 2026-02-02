document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const WORK_TIME = 25 * 60; // 25 minutes in seconds
    
    // State
    let timeLeft = WORK_TIME;
    let timerInterval = null;
    let isRunning = false;

    // DOM Elements
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Format time helper (MM:SS)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Update Display
    const updateDisplay = () => {
        timerDisplay.textContent = formatTime(timeLeft);
        document.title = `${formatTime(timeLeft)} - Focus Flow`;
    };

    // Timer Logic
    const startTimer = () => {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                alert("Session complete! Take a break.");
                resetTimer(); // Auto reset after alert
            }
        }, 1000);
    };

    const pauseTimer = () => {
        if (!isRunning) return;
        
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    };

    const resetTimer = () => {
        pauseTimer(); // Stop if running
        timeLeft = WORK_TIME;
        updateDisplay();
        // Reset document title
        document.title = "Focus Flow | Productivity Timer";
    };

    // Event Listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Initial render
    updateDisplay();
});
