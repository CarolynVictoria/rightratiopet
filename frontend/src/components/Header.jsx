import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
				<Container>
					<Navbar.Brand href='/' className='navtitle'>
						<img src={logo} className='logo' />
						Right:Ratio Data Center
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Nav.Link href='/login'>
								<FaUser />
								Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};
export default header;