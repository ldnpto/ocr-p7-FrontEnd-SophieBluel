
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const errorMessage = document.querySelector('#login .errorMessage');        

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = "Invalid email format";
            alert('Invalid email format.');
            return;
        }
        const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            errorMessage.textContent = "Password must be at least 6 characters long, contain at least one digit, and one uppercase letter";
            return;
        }

        try {
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed: No token received.');
                }
            } else {
                errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";                
                return;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed: An error occurred.');
        }
    });
});