/**
 * PRANIC HEALING PORTAL — VIDEO LIGHTBOX PLAYER
 * Intercepts clicks on the student portal cards: opens the video player modal if logged in,
 * or scrolls to registration if logged out.
 */
class VideoLightbox {
    constructor() {
        this.videoModal = document.getElementById('video-modal');
        this.videoPlayer = document.getElementById('player');
        this.videoTitle = document.getElementById('video-modal-title');
        this.closeBtn = document.getElementById('video-modal-close');
        
        this.videoCards = document.querySelectorAll('.portal-video-card');

        this.videoSources = [
            { title: "Technique Review", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
            { title: "Chakra Integration", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
            { title: "Self-Hygiene Rhythms", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }
        ];

        this.init();
    }

    init() {
        if (this.videoCards.length === 0) return;

        // Bind clicks to video cards
        this.videoCards.forEach((card, index) => {
            card.addEventListener('click', (e) => this.handleCardClick(index, e));
        });

        // Close player events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Close by clicking backdrop
        if (this.videoModal) {
            this.videoModal.addEventListener('click', (e) => {
                if (e.target === this.videoModal) this.close();
            });
        }

        // Close by pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.videoModal && this.videoModal.classList.contains('open')) {
                this.close();
            }
        });
    }

    handleCardClick(index, event) {
        event.preventDefault();
        
        // Query auth status from AuthManager
        const loggedIn = window.authManager && window.authManager.isLoggedIn();

        if (loggedIn) {
            this.open(index);
        } else {
            this.scrollToRegistration();
        }
    }

    open(index) {
        if (!this.videoModal || !this.videoPlayer) return;

        const video = this.videoSources[index];
        this.videoTitle.textContent = video.title;
        this.videoPlayer.src = video.src;
        
        this.videoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        this.videoPlayer.play().catch(err => {
            console.error("Autoplay prevented or playback error:", err);
        });
    }

    close() {
        if (!this.videoModal || !this.videoPlayer) return;

        this.videoPlayer.pause();
        this.videoPlayer.src = "";
        
        this.videoModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    scrollToRegistration() {
        const registerSection = document.getElementById('register');
        if (registerSection) {
            registerSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const nameInput = document.getElementById('register-name');
                if (nameInput) nameInput.focus();
            }, 800);
        }
    }
}

// Auto-initialize when content loads
document.addEventListener('DOMContentLoaded', () => {
    window.videoLightbox = new VideoLightbox();
});
