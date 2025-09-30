document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    localStorage.setItem('usuario', usuario);
    window.location.href = '/profile';
});