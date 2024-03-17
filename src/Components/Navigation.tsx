import { Link } from 'react-router-dom';
import { NavItem_I } from '../Config/Interfaces';
import config from '../config.json';

export default function Navigation() {
    const ConfigNav = config.Nav;
    return (
        <nav className='navbar navbar-dark bg-dark'>
            <ul className="navbar-nav">
                {ConfigNav.map((item: NavItem_I, index: number) => {
                    return (
                        <li key={index} className='nav-item'>
                            <Link to={item.Slug} className="nav-link">{item.Name}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}