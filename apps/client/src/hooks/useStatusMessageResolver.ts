export const useStatusMessageResolver = () => {
	return (status?: boolean) =>
		status === undefined ? "PENDING" : status ? "UP" : "DOWN";
};
