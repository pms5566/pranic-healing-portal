# Pranic Healing Portal (Professional Demo)

This is a single-page, fully responsive demo website for a Pranic Healing practice portal. It is designed to showcase custom interactive wellness components, modern styling, and lightweight assets.

## 🌟 Key Features
- **Sticky Glassmorphic Header**: Blur background effect, custom logo SVG, and full navigation.
- **Hero Section**: Deep purple-to-indigo gradient with a low-opacity sacred geometry mandala pattern.
- **About Section**: Professional copy about the history of Pranic Healing, accompanied by an elegant vector silhouette avatar.
- **Guided Practice Widget**: An interactive widget guiding users through a 6-3-6-3 Pranic Breathing cadence. Features an expanding circle visualizer and a changing color glow.
- **Courses Section**: CSS Grid containing cards for 6 different energy healing courses, with custom vector SVGs and gold border hover transitions.
- **Instructors Cards**: Illustrated SVG face avatars (no real photos/names) and bio summaries.
- **Gated Student Portal**: Video cards that block access for unregistered guests. Clicking any card scrolls the page smoothly to the registration form and focuses the Name input field.
- **Register Form & Custom Validation**: Clean form fields that validate Name, Email formats, and course selections before opening a custom submission success modal.
- **Success Modal**: Centered pop-up confirming interest. Dismissible via the Close button, backdrop click, or pressing `Escape`.

## 🛠️ Tech Stack & Design Vibe
- **Calm & Spiritual Palette**: Deep purples (`#3b1f6e`), soft gold accents (`#c9a84c`), and warm off-white (`#faf7f2`).
- **Typography**: Cormorant Garamond (headings) and Inter (body text).
- **Lightweight Assets**: 100% vector SVGs written inline. No external image URLs, trackers, or libraries are loaded.
- **Performance**: IntersectionObserver is used for smooth scroll-triggered fade-ins.

## 🚀 How to Run Locally
1. Clone this repository.
2. Open `index.html` directly in your browser, or run a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.
