import TopNav from '../../../components/Navigation/TopNav';
import { useState } from 'react';
import Link from 'next/link';
import useGetAgentHomes from '../../../hooks/useGetAgentHomes';
import AgentPropertyRow from '../../../components/Agent/AgentPropertyRow';

export default () => {
	const { loading, error, approvedHomes } = useGetAgentHomes();

	return (
		<div className="relative flex flex-col w-screen h-full flex-grow overflow-y-scroll antialiased">
			<div className="z-40 hidden md:block">
				<TopNav fixed />
			</div>
			<div class="sm:mt-24 sm:mx-12">
				<div>
					<h2>Propiedades</h2>
				</div>
				<div class="bg-white shadow overflow-hidden sm:rounded-md mt-6">
					<ul>
						{approvedHomes.map((home, index) => {
							return <AgentPropertyRow home={home} index={index} key={index} />;
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};
