window.onload = function() {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
        document.getElementById('user-name').textContent = usuario;

        const userEmail = usuario.toLowerCase().replace(/\s/g, '.') + '@example.com';
        document.getElementById('user-email').textContent = userEmail;

        const phones = ['(11) 98765-4321', '(21) 91234-5678', '(31) 99999-8888', '(41) 98888-7777'];
        const birthdates = ['01/01/1990', '15/05/1985', '20/11/2000', '10/08/1995'];
        const cities = ['São Paulo-SP', 'Teresina-PI', 'Belo Horizonte-MG', 'Curitiba-PR'];

        const randomPhone = phones[Math.floor(Math.random() * phones.length)];
        const randomBirthdate = birthdates[Math.floor(Math.random() * birthdates.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];

        document.getElementById('user-phone').textContent = randomPhone;
        document.getElementById('user-birthdate').textContent = randomBirthdate;
        document.getElementById('user-city').textContent = randomCity;
    }
};
