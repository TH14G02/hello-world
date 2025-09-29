document.getElementById('calculate-btn').addEventListener('click', function() {
    const lastCycleDateInput = document.getElementById('last-cycle-date').value;

    if (!lastCycleDateInput) {
        alert('Por favor, insira uma data.');
        return;
    }

    // Força a data para UTC
    const [year, month, day] = lastCycleDateInput.split('-');
    const lastCycleDate = new Date(Date.UTC(year, month - 1, day));

    fetch('/calculate_fertile_period', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            last_cycle_date: lastCycleDate.toISOString().split('T')[0] // Envia a data em formato YYYY-MM-DD
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const parseDate = (dateStr) => {
                const [d, m, y] = dateStr.split('/');
                return new Date(Date.UTC(y, m - 1, d));
            };

            const startDate = parseDate(data.inicio);
            const endDate = parseDate(data.fim);

            const calendarContainer = document.getElementById('calendar-container');
            calendarContainer.innerHTML = ''; 

            renderMonth(calendarContainer, startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate, endDate);

            if (startDate.getUTCMonth() !== endDate.getUTCMonth()) {
                renderMonth(calendarContainer, endDate.getUTCFullYear(), endDate.getUTCMonth(), startDate, endDate);
            }

            document.getElementById('resultado-container').style.display = 'block';
        }
    });
});

function renderMonth(container, year, month, fertileStart, fertileEnd) {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const monthContainer = document.createElement('div');
    monthContainer.className = 'month-container';

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `<h3>${monthNames[month]} ${year}</h3>`;
    monthContainer.appendChild(header);

    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    monthContainer.appendChild(calendarGrid);

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-name';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });

    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const startingDay = firstDayOfMonth.getUTCDay();
    const daysInMonth = new Date(year, month + 1, 0).getUTCDate();

    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        calendarGrid.appendChild(emptyDay);
    }

    const startTimestamp = fertileStart.getTime();
    const endTimestamp = fertileEnd.getTime();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const currentTimestamp = Date.UTC(year, month, day);

        if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp) {
            dayElement.classList.add('fertile-day');
        }
        calendarGrid.appendChild(dayElement);
    }
    container.appendChild(monthContainer);
}
