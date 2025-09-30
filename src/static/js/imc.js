document.addEventListener('DOMContentLoaded', () => {
    const pathParts = window.location.pathname.split('/');
    const weight = parseFloat(pathParts[pathParts.length - 2]);
    const height = parseFloat(pathParts[pathParts.length - 1]);

    function getIMCCategory(imc) {
        if (imc < 18.5) return 'Magreza';
        if (imc < 25) return 'Peso normal';
        if (imc < 30) return 'Sobrepeso';
        return 'Obesidade';
    }

    function getIMCCategoryColor(imc) {
        if (imc < 18.5) return '#3498db';
        if (imc < 25) return '#2ecc71';
        if (imc < 30) return '#f1c40f';
        return '#e74c3c';
    }

    function calculateIMC(weight, height) {
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            return {
                result: "Dados inválidos",
                operationText: "Por favor, insira valores positivos para peso e altura.",
                category: "",
                idealWeight: ""
            };
        }

        const heightInMeters = height / 100;
        const imc = (weight / (heightInMeters * heightInMeters));
        const idealWeight = 22 * (heightInMeters * heightInMeters);

        return {
            result: imc.toFixed(2),
            operationText: `Peso: ${weight} kg, Altura: ${height} cm`,
            category: getIMCCategory(imc),
            idealWeight: idealWeight.toFixed(2),
            color: getIMCCategoryColor(imc)
        };
    }

    const { result, operationText, category, idealWeight, color } = calculateIMC(weight, height);
    const imcCategoryElement = document.getElementById('imc-category');

    document.getElementById('operation-text').innerText = operationText;
    document.getElementById('result').innerText = result;
    imcCategoryElement.innerText = category;
    imcCategoryElement.style.backgroundColor = color;
    document.getElementById('ideal-weight-value').innerText = `${idealWeight} kg`;

    const imcValue = parseFloat(result);
    const pointer = document.getElementById('imc-pointer');
    
    const minIMC = 15;
    const maxIMC = 40;

    let percentage = ((imcValue - minIMC) / (maxIMC - minIMC)) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    pointer.style.left = `${percentage}%`;

    const heightInMeters = height / 100;
    const weightLimit1 = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
    const weightLimit2 = (25 * (heightInMeters * heightInMeters)).toFixed(1);
    const weightLimit3 = (30 * (heightInMeters * heightInMeters)).toFixed(1);

    const limitValues = document.querySelectorAll('.limit-value');
    if (limitValues.length >= 3) {
        limitValues[0].innerText = `${weightLimit1}kg`;
        limitValues[1].innerText = `${weightLimit2}kg`;
        limitValues[2].innerText = `${weightLimit3}kg`;
    }

    setTimeout(() => {
      document.getElementById('result-container').classList.add('show');
    }, 100);
});