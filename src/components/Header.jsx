import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { exchangeItems = [] } = useSelector((state) => state.cart);

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="site-header">
            <div className="container nav-shell">
                <Link className="brand" to="/">
                    <span className="brand-mark">RK</span>
                    <span>
                        <strong>Razmena knjiga</strong>
                        <small>Pronadji, sacuvaj i razmeni knjigu</small>
                    </span>
                </Link>

                <nav className="main-nav" aria-label="Navigacija">
                    <NavLink className="nav-label" to="/cart">
                        Korpa
                        {exchangeItems.length > 0 && (
                            <span className="nav-count">{exchangeItems.length}</span>
                        )}
                    </NavLink>
                    {userInfo ? (
                        <>
                            <NavLink className="nav-label" to="/profile">
                                Profil
                            </NavLink>
                            <button className="nav-label" type="button" onClick={logoutHandler}>
                                Odjava
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className="nav-label" to="/login">
                                Profil
                            </NavLink>
                            <NavLink className="nav-label nav-primary" to="/register">
                                Registracija
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
