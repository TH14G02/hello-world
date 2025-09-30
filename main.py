import os

from flask import Flask, send_file


app = Flask(__name__, static_folder='src/static')


# Página inicial
@app.route('/')
def index():
    return send_file('src/index.html')

# Página de login
@app.route('/login')
def login():
    return send_file('src/login.html')

# Página de perfil do usuário
@app.route('/profile')
def profile():
    return send_file('src/profile.html')

# Página sobre o site
@app.route('/about')
def about():
    return send_file('src/about.html')

@app.route('/favicon.ico')
def favicon():
    return send_file('src/static/icons/favicon.ico', mimetype='image/vnd.microsoft.icon')


# Rota específica para IMC (deve vir antes da rota genérica)
@app.route('/imc/<float:weight>/<float:height>')
def imc(weight, height):
    return send_file('src/imc.html')


# Rota genérica para a calculadora
@app.route('/<op>/<int:a>/<int:b>')
def oper(op, a, b):
    return send_file('src/math.html')


def main():
    port = int(os.environ.get('PORT', 80))
    app.run(debug=True, host='0.0.0.0', port=port)


if __name__ == "__main__":
    main()