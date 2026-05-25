const Header = () => {
    return(
        <header className="site-header">
            <div className="container nav-shell">
                <div className="brand">
                    <span>📚</span>
                    <span>
                        <strong>Razmena knjiga</strong>
                    </span>
                </div>

                <nav className="main-nav" aria-label="Navigacija">
                    <span className="nav-label">Korpa</span>
                    <span className="nav-label">Profil</span>
                </nav>

            </div>
        </header>
    );
};

export default Header;