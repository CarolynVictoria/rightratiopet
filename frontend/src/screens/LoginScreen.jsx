import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading, error, data }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);

	// if there's a redirect in the url, we want to redirect the user to that page after login

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<FormContainer>
			<h1 className='rr-cobalt'>Sign In</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email' className='my-3'>
					<Form.Label className='rr-cobalt'>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password' className='my-3'>
					<Form.Label className='rr-cobalt'>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button
					type='submit'
					variant='primary'
					className='mt-3'
					disabled={isLoading}
				>
					Sign In
				</Button>

				{isLoading && <Loader />}
			</Form>
			<Row className='py-3'>
				<Col>
					<p className='rr-cobalt rr-small'>
						Not registered?{'  '}
						<Link className='rr-cobalt'
							to={redirect ? `/register?redirect=${redirect}` : '/register'}
						>
							Register
						</Link>
					</p>
				</Col>
			</Row>
		</FormContainer>
	);
};
export default LoginScreen;
