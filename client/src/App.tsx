import EmployeeCard from "./components/EmployeeCard";
import EmployeeList from "./components/EmployeeList";

export default function App() {
	return (
		<main className="p-10 bg-slate-200 w-full h-screen overflow-hidden">
			<div className="bg-white rounded-lg flex h-full border border-slate-500 overflow-hidden">
				<EmployeeList />
				<EmployeeCard />
			</div>
		</main>
	);
}
