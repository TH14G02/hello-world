document.getElementById('imc-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const weight = parseFloat(document.getElementById('weight').value).toFixed(1);
    const height = parseFloat(document.getElementById('height').value).toFixed(1);
    window.location.href = `/imc/${weight}/${height}`;
});

document.getElementById('calc-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    const op = document.getElementById('op').value;
    window.location.href = `/${op}/${a}/${b}`;
});