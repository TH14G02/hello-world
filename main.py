import os

from flask import Flask, render_template, redirect, url_for

app = Flask(__name__, static_folder='src/static', template_folder='src/templates')

# Página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota genérica para a calculadora
@app.route('/<op>/<int:a>/<int:b>')
def oper(op: str, a: int, b: int):
    operations = {
        'soma': {'name': 'Adição', 'symbol': '+'},
        'sub': {'name': 'Subtração', 'symbol': '-'},
        'mul': {'name': 'Multiplicação', 'symbol': '*'},
        'div': {'name': 'Divisão', 'symbol': '/'}
    }

    operation_info = operations.get(op)

    if not operation_info:
        return render_template('error.html', error_message="A operação solicitada não foi encontrada.",
                               status_code=404), 404

    result = 0
    try:
        if op == 'soma':
            result = a + b
        elif op == 'sub':
            result = a - b
        elif op == 'mul':
            result = a * b
        elif op == 'div':
            if b == 0:
                return render_template('error.html', error_message="Não é possível dividir por zero.",
                                       status_code=400), 400
            result = a / b
    except Exception as e:
        return redirect(url_for('index'))

    return render_template('math.html', name=operation_info['name'].upper(),
                           operation_text=f"{a} {operation_info['symbol']} {b}",
                           result=result)

# Rota de exemplo que redireciona para uma operação padrão usando url_for
@app.route('/soma/')
@app.route('/soma')
def soma():
    # Redireciona para a rota 'oper' com os parâmetros definidos
    return redirect(url_for('oper', op='soma', a=10, b=5))

# Rota de exemplo que redireciona para uma operação padrão usando url_for
@app.route('/subtracao')
def subtracao():
    # Redireciona para a rota 'oper' com os parâmetros definidos
    return redirect(url_for('oper', op='sub', a=10, b=5))

# Rota de exemplo que redireciona para uma operação padrão usando url_for
@app.route('/multiplicacao')
def multiplicacao():
    # Redireciona para a rota 'oper' com os parâmetros definidos
    return redirect(url_for('oper', op='mul', a=10, b=5), 302)

# Rota de exemplo que redireciona para uma operação padrão usando url_for
@app.route('/divisao')
def divisao():
    # Redireciona para a rota 'oper' com os parâmetros definidos
    return redirect(url_for('oper', op='div', a=10, b=5), 302)


if __name__ == '__main__':
    # Define a porta a partir da variável de ambiente PORT, ou usa 5000 como padrão
    # A porta 80 geralmente requer privilégios de administrador, então 5000 é mais comum para desenvolvimento.
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)