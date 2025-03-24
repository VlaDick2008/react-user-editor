import type React from "react";

export default function ListItem({ children }: { children: React.ReactNode }) {
	return <li className="border-b border-slate-500 px-5 py-2">{children}</li>;
}
