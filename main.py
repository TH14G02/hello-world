import os

from flask import Flask, render_template, send_file


app = Flask(__name__, static_folder='src/static', template_folder='src/templates')

# Página inicial
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/favicon.ico')
def favicon():
    return send_file('src/static/icons/favicon.ico', mimetype='image/vnd.microsoft.icon')


# Rota genérica para a calculadora
@app.route('/<op>/<int:a>/<int:b>')
def oper(op, a, b):
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
    if op == 'soma':
        result = a + b
    elif op == 'sub':
        result = a - b
    elif op == 'mul':
        result = a * b
    elif op == 'div':
        if b != 0:
            result = a / b
        else:
            result = 'Erro: Divisão por zero'

    return render_template('math.html', name=operation_info['name'].upper(),
                           operation_text=f"{a} {operation_info['symbol']} {b}",
                           result=result)


def main():
    port = int(os.environ.get('PORT', 80))
    app.run(debug=True, host='0.0.0.0', port=port)


if __name__ == "__main__":
    main()