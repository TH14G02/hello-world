import os

from flask import Flask, render_template, send_file


app = Flask(__name__, static_folder='src/static', template_folder='src/templates')


# Página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Página de login
@app.route('/login')
def login():
    return render_template('login.html')

# Página de perfil do usuário
@app.route('/profile')
def profile():
    return render_template('profile.html')

# Página sobre o site
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/favicon.ico')
def favicon():
    return send_file('src/static/icons/favicon.ico', mimetype='image/vnd.microsoft.icon')


# Rota específica para IMC (deve vir antes da rota genérica)
@app.route('/imc/<float:weight>/<float:height>')
def imc(weight, height):
    return render_template('imc.html')


# Rota genérica para a calculadora
@app.route('/<op>/<int:a>/<int:b>')
def oper(op, a, b):
    return render_template('math.html')


def main():
    port = int(os.environ.get('PORT', 80))
    app.run(debug=True, host='0.0.0.0', port=port)


if __name__ == "__main__":
    main()