document.addEventListener('DOMContentLoaded', () => {
    const pathParts = window.location.pathname.split('/');
    const operation = pathParts[pathParts.length - 3];
    const num1 = parseFloat(pathParts[pathParts.length - 2]);
    const num2 = parseFloat(pathParts[pathParts.length - 1]);

    const operations = {
        soma: { name: 'Adição', symbol: '+' },
        sub: { name: 'Subtração', symbol: '-' },
        mul: { name: 'Multiplicação', symbol: '*' },
        div: { name: 'Divisão', symbol: '/' }
    };

    const { name, symbol } = operations[operation] || { name: 'Operação Desconhecida', symbol: '?' };

    function calculate(op, n1, n2) {
        if (isNaN(n1) || isNaN(n2)) {
            return {
                result: "Valores inválidos",
                operationText: "Por favor, insira números válidos."
            };
        }

        let result;
        switch (op) {
            case 'soma':
                result = n1 + n2;
                break;
            case 'sub':
                result = n1 - n2;
                break;
            case 'mul':
                result = n1 * n2;
                break;
            case 'div':
                result = n2 !== 0 ? n1 / n2 : 'Erro: Divisão por zero';
                break;
            default:
                result = 'Operação inválida';
        }

        return {
            result: result,
            operationText: `${n1} ${symbol} ${n2}`
        };
    }

    const { result, operationText } = calculate(operation, num1, num2);

    document.getElementById('operation-name').innerText = name;
    document.getElementById('operation-text').innerText = operationText;
    document.getElementById('result').innerText = result;

    setTimeout(() => {
      document.getElementById('result-container').classList.add('show');
    }, 100);
});