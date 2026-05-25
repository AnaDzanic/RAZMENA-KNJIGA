const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="container">
                 <p>&copy; {currentYear} Razmena knjiga. Sva prava zadržana.</p>
            </div>
        </footer>
    )
}

export default Footer;