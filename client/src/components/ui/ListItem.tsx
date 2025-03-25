import type React from "react";

export default function ListItem({
	children,
	onClick,
}: { children: React.ReactNode; onClick: () => void }) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Чё? Для пользователей пользующихся клавиатурой вместо мыши? Лол
		<li
			onClick={onClick}
			className="border-b border-slate-500 px-5 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition"
		>
			{children}
		</li>
	);
}
