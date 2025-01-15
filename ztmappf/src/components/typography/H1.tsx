import React from "react";

export function H1({
	children,
}: React.PropsWithChildren<{ children: React.ReactNode }>) {
	return <div className="text-3xl font-bold mb-6">{children}</div>;
}

export default H1;
