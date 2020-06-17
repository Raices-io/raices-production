import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useAuth } from '../util/auth';
import useAddRole from '../hooks/useAddRole';
import useAsyncState from '../hooks/useAsyncState';
import LoadingPage from '../components/LoadingSpinner/LoadingPage';
// get in firebase
import { firebase } from '../util/firebase';

const UserType = () => {
	const [role, setRole] = useAsyncState(null);
	const { user } = useAuth();
	const { addRole, isLoading } = useAddRole();
	const router = useRouter();

	const sendEmail = async (userType, name, email) => {
		const callSendWelcomeEmail = firebase.functions().httpsCallable('callSendWelcomeEmail');
		try {
			await callSendWelcomeEmail({
				userType,
				name,
				email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const onSubmit = async e => {
		e.preventDefault();
		const newRole = await setRole(e.target.attributes.name.value);
		await addRole(user.email, newRole);
		// send transactional email for user sign up
		await sendEmail(newRole, user.displayName.split(' ')[0], user.email);
		if (!isLoading) router.push('/');
	};

	return isLoading ? (
		<LoadingPage />
	) : (
		<Container className="min-h-screen bg-gray-50 flex flex-col flex-grow justify-center items-center py-12 px-6 lg:px-8 text-center">
			<Form className="mt-8 mx-auto w-full max-w-md">
				<h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl leading-10">
					Favor de indicar su tipo de cuenta
				</h2>
				<InputGroup className="mt-8 flex-col justify-center bg-white py-8 px-4 shadow-xl rounded-lg px-10 rounded-lg">
					<Button
						className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
						onClick={onSubmit}
						name="customer">
						En busca de propiedad
					</Button>
					<Button
						className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
						onClick={onSubmit}
						name="agent">
						Soy un Agente
					</Button>
				</InputGroup>
			</Form>
		</Container>
	);
};

const Container = styled.div``;
const Form = styled.form``;
const InputGroup = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Button = styled.label`
	display: flex;
	justify-content: center;
	margin: 1rem 0;
	flex: 1;
	cursor: pointer;
`;

export default UserType;
