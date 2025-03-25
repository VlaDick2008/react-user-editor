import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentEmployee, updateEmployee } from "../redux/employeeSlice";
import { useEmployeeDispatch } from "../redux/hooks";

export default function EmployeeCard() {
	const employee = useSelector(selectCurrentEmployee);
	const dispatch = useEmployeeDispatch();

	const [isSaving, setIsSaving] = React.useState(false);
	const [formData, setFormData] = React.useState({
		id: 0,
		department: "",
		company: "",
		jobTitle: "",
		name: "",
	});

	React.useEffect(() => {
		if (employee && employee.id !== formData.id) {
			setFormData({
				id: employee.id,
				department: employee.department,
				company: employee.company,
				jobTitle: employee.jobTitle,
				name: employee.name,
			});
		}

		console.log(formData);
	}, [employee, formData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaving(true);

		try {
			await dispatch(updateEmployee(formData)).unwrap();
			toast.success("Данные успешно обновлены");
		} catch (error) {
			toast.error("Произошла ошибка");
		} finally {
			setIsSaving(false);
		}
	};

	if (!employee) {
		return (
			<div className="flex flex-col justify-center items-center w-full h-full">
				<span className="text-3xl font-bold">
					Выберите сотрудника из списка слева
				</span>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="w-full bg-slate-300 p-5 border-b border-slate-500">
				<input
					type="text"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					className="border border-slate-500 w-[300px] rounded-lg bg-white px-2 py-1"
					placeholder="Какой то текст"
				/>
			</div>
			<div className="p-5 flex gap-10">
				<div className="w-[300px] h-[300px] object-cover border border-slate-500 rounded-full overflow-hidden">
					<img src="https://api.dicebear.com/9.x/notionists/svg" alt="avatar" />
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-3 [&>span]:flex [&>span]:flex-col [&>span]:gap-1"
				>
					<span>
						Должность
						<input
							type="text"
							value={formData.jobTitle}
							onChange={(e) =>
								setFormData({ ...formData, jobTitle: e.target.value })
							}
							className="border border-slate-500 w-[300px] rounded-lg bg-white px-2 py-1"
							placeholder="Какой то текст"
						/>
					</span>
					<span>
						Отдел
						<input
							type="text"
							value={formData.department}
							onChange={(e) =>
								setFormData({ ...formData, department: e.target.value })
							}
							className="border border-slate-500 w-[300px] rounded-lg bg-white px-2 py-1"
							placeholder="Какой то текст"
						/>
					</span>
					<span>
						Компания
						<input
							type="text"
							value={formData.company}
							onChange={(e) =>
								setFormData({ ...formData, company: e.target.value })
							}
							className="border border-slate-500 w-[300px] rounded-lg bg-white px-2 py-1"
							placeholder="Какой то текст"
						/>
					</span>
					<button
						className="rounded-2xl border border-slate-500 px-2 py-1 font-semibold hover:bg-slate-100 transition cursor-pointer"
						type="submit"
						disabled={isSaving}
					>
						Сохранить
					</button>
				</form>
			</div>
		</div>
	);
}
