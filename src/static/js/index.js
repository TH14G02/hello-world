document.getElementById('calc-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    const op = document.getElementById('op').value;
    window.location.href = `/${op}/${a}/${b}`;
});