// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const signInBtn = document.getElementById('signInBtn');
    const userInfo = document.getElementById('userInfo');

    if (user) {
        if (signInBtn) signInBtn.style.display = 'none';
        if (userInfo) {
            userInfo.innerHTML = `
                <span class="text-white me-3">Welcome, ${user.email}</span>
                <button onclick="logout()" class="btn btn-outline-light">Logout</button>
            `;
        }
    }
});

function redirectToLogin() {
    window.location.href = '/login';
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
} 