import type React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
	return (
		<button
			className="rounded-2xl border border-slate-500 px-2 py-1 font-semibold hover:bg-slate-100 transition cursor-pointer"
			type="button"
		>
			{children}
		</button>
	);
}
