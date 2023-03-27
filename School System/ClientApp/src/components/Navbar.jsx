import { NavLink, Outlet } from 'react-router-dom';
import '../css/Navbar.css'

const Navbar = () => {
    return (
        <div className="root-layout">
            <header>
                <nav className="navbar">
                    <h1>School System</h1>
                    <div className="links">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/addStudent">Add</NavLink>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Navbar;