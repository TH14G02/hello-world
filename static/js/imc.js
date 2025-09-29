document.getElementById('calculate-btn').addEventListener('click', function() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    fetch('/calculate_imc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ peso: peso, altura: altura })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('imc-value').textContent = data.imc;
            const statusValue = document.getElementById('status-value');
            statusValue.textContent = data.status;

            const statusParagraph = document.getElementById('status-paragraph');
            statusParagraph.className = 'status'; // Reset classes

            if (data.status === 'Abaixo do peso') {
                statusParagraph.classList.add('status-abaixo');
            } else if (data.status === 'Peso normal') {
                statusParagraph.classList.add('status-normal');
            } else if (data.status === 'Sobrepeso') {
                statusParagraph.classList.add('status-sobrepeso');
            } else {
                statusParagraph.classList.add('status-obesidade');
            }
            
            document.getElementById('resultado-container').style.display = 'block';
        }
    });
});