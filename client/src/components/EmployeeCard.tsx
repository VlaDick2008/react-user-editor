import Input from "./ui/Input";

export default function EmployeeCard() {
	return (
		<div className="w-full">
			<div className="w-full bg-slate-300 p-5 border-b border-slate-500">
				<Input />
			</div>
			<div className="p-5 flex gap-10">
				<div className="w-[300px] h-[300px] object-cover border border-slate-500 rounded-full overflow-hidden">
					<img
						src="https://api.dicebear.com/9.x/notionists/svg?scale=100"
						alt="avatar"
					/>
				</div>
				<div className="flex flex-col gap-3 [&>span]:flex [&>span]:flex-col [&>span]:gap-1">
					<span>
						Должность
						<Input />
					</span>
					<span>
						Отдел
						<Input />
					</span>
					<span>
						Компания
						<Input />
					</span>
				</div>
			</div>
		</div>
	);
}
