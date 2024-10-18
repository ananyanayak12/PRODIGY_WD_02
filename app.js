let startTime = 0;
        let elapsedTime = 0;
        let timerInterval;
        let lapCount = 0;

        const display = document.getElementById('display');
        const startBtn = document.getElementById('start-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetBtn = document.getElementById('reset-btn');
        const lapBtn = document.getElementById('lap-btn');
        const laps = document.getElementById('laps');

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        lapBtn.addEventListener('click', recordLap);

        function startTimer() {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10);
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        }

        function pauseTimer() {
            clearInterval(timerInterval);
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }

        function resetTimer() {
            clearInterval(timerInterval);
            startTime = 0;
            elapsedTime = 0;
            lapCount = 0;
            display.textContent = '00:00:00.000';
            laps.innerHTML = '';
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }

        function recordLap() {
            const lapTime = formatTime(elapsedTime);
            const lapListItem = document.createElement('li');
            lapListItem.textContent = `Lap ${lapCount + 1}: ${lapTime}`;
            laps.appendChild(lapListItem);
            lapCount++;
        }

        function updateTimer() {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }

        function formatTime(time) {
            const hours = Math.floor(time / 3600000);
            const minutes = Math.floor((time % 3600000) / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            const milliseconds = time % 1000;
            return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
        }

        function padZero(time, digits = 2) {
            let str = time.toString();
            while (str.length < digits) {
                str = '0' + str;
            }
            return str;
        }