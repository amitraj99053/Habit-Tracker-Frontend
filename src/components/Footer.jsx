const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Simple Brand */}
                <div className="footer-brand">
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">HabitFlow</span>
                </div>

                {/* Clean Navigation */}
                <nav className="footer-nav">
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy</a>
                </nav>

                {/* Minimal Socials */}
                <div className="footer-socials">
                    <a href="#" aria-label="Twitter">𝕏</a>
                    <a href="#" aria-label="Instagram">Instagram</a>
                    <a href="#" aria-label="LinkedIn">LinkedIn</a>
                </div>

                {/* Copyright */}
                <p className="footer-copyright">
                    &copy; {new Date().getFullYear()} HabitFlow. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
