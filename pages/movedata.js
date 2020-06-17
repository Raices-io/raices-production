import useMoveData from '../hooks/useMoveData';

export default () => {
	const { moveData } = useMoveData();

	return (
		<button className="btn btn-indigo" onClick={moveData}>
			Move Data
		</button>
	);
};
