import { useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../util/auth';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import useAddRole from '../hooks/useAddRole';
import Spinner from '../components/Spinner';

const RoleManagement = () => {
	// ROUTER
	const router = useRouter();
	// AUTH
	const auth = useAuth();
	const user = auth.user;
	const { register, handleSubmit, reset } = useForm();

	const { addRole, isLoading, isSuccessful, error } = useAddRole();

	console.log(isLoading);

	const onSubmit = data => {
		const { email, role } = data;
		addRole(email, role);
		reset();
	};
	//  if not signed in AND Auth user redirect to sign in page
	useEffect(() => {
		if (user == false) {
			router.push('/signin');
		}
	}, [auth, router]);

	if (!auth.user) {
		return <div className="h-screen w-screen bg-white">Loading...</div>;
	}

	if (auth.user && !auth.user.admin) {
		router.push('/signin');
	}
	return (
		<PageContainer>
			<div className="p-16 bg-gray-50 h-full">
				<div>
					<h3 className="text-lg leading-6 font-medium text-gray-900">Role Management</h3>
					<p className="mt-1 text-sm leading-5 text-gray-500">
						Enter user email address and select role.
					</p>
				</div>
				<form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="email" class="block text-sm font-medium leading-5 text-gray-700">
							User Email
						</label>
						<div className="mt-1 relative rounded-md shadow-sm max-w-sm">
							<input
								id="email"
								className="form-input block w-full sm:text-sm sm:leading-5"
								placeholder="user@example.com"
								name="email"
								ref={register({ required: true })}
								aria-describedby="email-description"
							/>
						</div>
					</div>
					<fieldset className="mt-6">
						<div className="mt-4">
							<div className="flex items-center">
								<input
									id="admin"
									name="role"
									type="radio"
									ref={register({ required: true })}
									value="admin"
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<label htmlFor="admin" className="ml-3">
									<span className="block text-sm leading-5 font-medium text-gray-700">
										Admin
									</span>
								</label>
							</div>
							<div className="mt-4 flex items-center">
								<input
									id="agent"
									name="role"
									type="radio"
									ref={register({ required: true })}
									value="agent"
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<label htmlFor="agent" className="ml-3">
									<span className="block text-sm leading-5 font-medium text-gray-700">
										Agent
									</span>
								</label>
							</div>
							<div className="mt-4 flex items-center">
								<input
									id="client"
									name="role"
									type="radio"
									ref={register({ required: true })}
									value="client"
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<label htmlFor="client" className="ml-3">
									<span className="block text-sm leading-5 font-medium text-gray-700">
										Client
									</span>
								</label>
							</div>
						</div>
					</fieldset>
					<button
						type="submit"
						className="mt-10 inline-flex justify-center py-2 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none active:bg-indigo-700 transition duration-150 ease-in-out">
						Submit
					</button>
				</form>
				{isLoading && <Spinner />}
				{isSuccessful && <SuccessMessage>Role added successfully.</SuccessMessage>}
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</div>
		</PageContainer>
	);
};

export default RoleManagement;
