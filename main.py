import os

from flask import Flask, jsonify, render_template, request
from datetime import datetime, timedelta


app = Flask(__name__)


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
    return render_template('profile.html', usuario='ifpi', senha='ifpi')

# Página sobre o site
@app.route('/about')
def about():
    return render_template('about.html')

# Calculadora de IMC (página inicial)
@app.route('/imc')
def imc():
    # Valores iniciais para o primeiro carregamento da página
    return render_template('imc.html', peso=70, altura=1.75, imc=None, status=None)

# Endpoint para calcular o IMC via AJAX
@app.route('/calculate_imc', methods=['POST'])
def calculate_imc():
    data = request.get_json()
    try:
        peso = float(data['peso'])
        altura = float(data['altura'])

        if altura == 0:
            return jsonify({'error': 'Altura não pode ser zero.'}), 400

        valor_imc = peso / (altura ** 2)

        if valor_imc < 18.5:
            status = "Abaixo do peso"
        elif valor_imc < 25:
            status = "Peso normal"
        elif valor_imc < 30:
            status = "Sobrepeso"
        else:
            status = "Obesidade"

        return jsonify({
            'imc': round(valor_imc, 2),
            'status': status
        })
    except (ValueError, KeyError):
        return jsonify({'error': 'Dados inválidos.'}), 400

# Página de cálculo do período fértil
@app.route('/periodo_fertil')
def fertile_period_page():
    return render_template('fertile_period.html', data=None, inicio=None, fim=None)

# Endpoint para calcular o período fértil via AJAX
@app.route('/calculate_fertile_period', methods=['POST'])
def calculate_fertile_period():
    data = request.get_json()
    try:
        # A data virá no formato 'YYYY-MM-DD' do input type="date"
        last_cycle_str = data['last_cycle_date']
        data_ciclo = datetime.strptime(last_cycle_str, '%Y-%m-%d')
        
        ovulacao = data_ciclo + timedelta(days=14)
        inicio_fertil = ovulacao - timedelta(days=4)
        fim_fertil = ovulacao + timedelta(days=1)
        
        return jsonify({
            'data': data_ciclo.strftime('%d/%m/%Y'),
            'inicio': inicio_fertil.strftime('%d/%m/%Y'),
            'fim': fim_fertil.strftime('%d/%m/%Y')
        })
    except (ValueError, KeyError):
        return jsonify({'error': 'Data inválida. Por favor, forneça uma data válida.'}), 400


# Saudação personalizada com dados do usuário
@app.route('/bem_vindo/<nome>/<int:idade>/<meta>')
def greeting(nome, idade, meta):
    return render_template('greeting.html', nome=nome, idade=idade, meta=meta)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'icons/favicon.ico', mimetype='image/vnd.microsoft.icon')
                               
def main():
    app.run(port=int(os.environ.get('PORT', 80)))

if __name__ == "__main__":
    main()
