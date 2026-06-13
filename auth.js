/**
 * PRANIC HEALING PORTAL — AUTHENTICATION & SESSION MANAGEMENT
 * Handles: Registration validation, Login validation, auto-login, and localStorage session sync.
 */
class AuthManager {
    constructor() {
        this.navLoginBtn = document.getElementById('nav-login-btn');
        
        // Modals
        this.loginModal = document.getElementById('login-modal');
        this.successModal = document.getElementById('success-modal');
        
        // Forms
        this.registerForm = document.getElementById('register-form');
        this.loginForm = document.getElementById('login-form');

        // Fields - Register
        this.inputRegName = document.getElementById('register-name');
        this.inputRegEmail = document.getElementById('register-email');
        this.inputRegCourse = document.getElementById('register-course');
        
        this.errRegName = document.getElementById('error-name');
        this.errRegEmail = document.getElementById('error-email');
        this.errRegCourse = document.getElementById('error-course');

        // Fields - Login
        this.inputLoginEmail = document.getElementById('login-email');
        this.inputLoginPassword = document.getElementById('login-password');
        
        this.errLoginEmail = document.getElementById('error-login-email');
        this.errLoginPassword = document.getElementById('error-login-password');

        this.init();
    }

    init() {
        // Toggle Login / Logout in Navbar
        if (this.navLoginBtn) {
            this.navLoginBtn.addEventListener('click', (e) => this.handleNavClick(e));
        }

        // Form submits
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => this.handleRegistration(e));
        }
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Live error clearing on input
        this.setupRealtimeValidation();

        // Check login status on page load
        this.checkLoginStatus();
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    handleNavClick(e) {
        e.preventDefault();
        if (this.isLoggedIn()) {
            this.logout();
        } else {
            this.openModal(this.loginModal);
        }
    }

    isLoggedIn() {
        return localStorage.getItem('studentLoggedIn') === 'true';
    }

    logout() {
        localStorage.removeItem('studentLoggedIn');
        localStorage.removeItem('studentName');
        this.checkLoginStatus();
    }

    checkLoginStatus() {
        const loggedIn = this.isLoggedIn();
        const studentName = localStorage.getItem('studentName') || 'Student';

        if (this.navLoginBtn) {
            if (loggedIn) {
                this.navLoginBtn.textContent = `Logout (${studentName.split(' ')[0]})`;
            } else {
                this.navLoginBtn.textContent = 'Login';
            }
        }

        // Toggle portal card unlocking states
        document.querySelectorAll('.portal-video-card').forEach(card => {
            if (loggedIn) {
                card.classList.add('unlocked');
            } else {
                card.classList.remove('unlocked');
            }
        });
    }

    handleRegistration(e) {
        e.preventDefault();
        let hasErrors = false;

        // Reset error display states
        this.resetErrors([this.inputRegName, this.inputRegEmail, this.inputRegCourse], [this.errRegName, this.errRegEmail, this.errRegCourse]);

        if (this.inputRegName.value.trim().length < 2) {
            this.showError(this.inputRegName, this.errRegName);
            hasErrors = true;
        }

        if (!this.isValidEmail(this.inputRegEmail.value.trim())) {
            this.showError(this.inputRegEmail, this.errRegEmail);
            hasErrors = true;
        }

        if (this.inputRegCourse.value === '') {
            this.showError(this.inputRegCourse, this.errRegCourse);
            hasErrors = true;
        }

        if (!hasErrors) {
            // Auto-login registered student
            localStorage.setItem('studentLoggedIn', 'true');
            localStorage.setItem('studentName', this.inputRegName.value.trim());
            this.checkLoginStatus();

            // Open success modal and reset form
            this.openModal(this.successModal);
            this.registerForm.reset();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        let hasErrors = false;

        this.resetErrors([this.inputLoginEmail, this.inputLoginPassword], [this.errLoginEmail, this.errLoginPassword]);

        if (!this.isValidEmail(this.inputLoginEmail.value.trim())) {
            this.showError(this.inputLoginEmail, this.errLoginEmail);
            hasErrors = true;
        }

        if (this.inputLoginPassword.value.length < 4) {
            this.showError(this.inputLoginPassword, this.errLoginPassword);
            hasErrors = true;
        }

        if (!hasErrors) {
            localStorage.setItem('studentLoggedIn', 'true');
            const name = this.inputLoginEmail.value.trim().split('@')[0].replace('.', ' ');
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
            localStorage.setItem('studentName', formattedName);
            
            this.checkLoginStatus();
            this.closeModal(this.loginModal);
        }
    }

    showError(input, errorElement) {
        if (input) input.classList.add('invalid');
        if (errorElement) errorElement.style.display = 'block';
    }

    resetErrors(inputs, errorElements) {
        inputs.forEach(input => {
            if (input) input.classList.remove('invalid');
        });
        errorElements.forEach(err => {
            if (err) err.style.display = 'none';
        });
    }

    openModal(modal) {
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    setupRealtimeValidation() {
        if (this.inputRegName) {
            this.inputRegName.addEventListener('input', () => {
                if (this.inputRegName.value.trim().length >= 2) {
                    this.resetErrors([this.inputRegName], [this.errRegName]);
                }
            });
        }
        if (this.inputRegEmail) {
            this.inputRegEmail.addEventListener('input', () => {
                if (this.isValidEmail(this.inputRegEmail.value.trim())) {
                    this.resetErrors([this.inputRegEmail], [this.errRegEmail]);
                }
            });
        }
        if (this.inputRegCourse) {
            this.inputRegCourse.addEventListener('change', () => {
                if (this.inputRegCourse.value !== '') {
                    this.resetErrors([this.inputRegCourse], [this.errRegCourse]);
                }
            });
        }
        if (this.inputLoginEmail) {
            this.inputLoginEmail.addEventListener('input', () => {
                if (this.isValidEmail(this.inputLoginEmail.value.trim())) {
                    this.resetErrors([this.inputLoginEmail], [this.errLoginEmail]);
                }
            });
        }
        if (this.inputLoginPassword) {
            this.inputLoginPassword.addEventListener('input', () => {
                if (this.inputLoginPassword.value.length >= 4) {
                    this.resetErrors([this.inputLoginPassword], [this.errLoginPassword]);
                }
            });
        }
    }
}

// Bind auth manager to window so other scripts can query login state
window.authManager = new AuthManager();
