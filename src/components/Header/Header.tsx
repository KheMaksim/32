import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<header className="header">
			<Link to={'home'} className='header__logo'>
				TV Shows
			</Link>
		</header>
	)
}

export default Header;