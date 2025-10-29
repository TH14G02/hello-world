document.getElementById('calc-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const a =  parseInt(document.getElementById('a').value);
            const b = parseInt(document.getElementById('b').value);
            const op = document.getElementById('op').value;

            window.location.href = `/${op}/${a}/${b}`;
        });