import { firebase } from '../util/firebase';
import { useRouter } from 'next/router';

const Logout = () => {
	const auth = firebase.auth();
	const router = useRouter();
	const logout = e => {
		e.preventDefault();
		return auth.signOut().then(() => router.push('/signin'));
	};
	return <button onClick={logout}>Log out</button>;
};

export default Logout;
