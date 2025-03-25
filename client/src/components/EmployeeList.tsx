import React from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, type ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
	fetchEmployee,
	fetchEmployees,
	selectEmployees,
	selectLoading,
} from "../redux/employeeSlice";
import { useEmployeeDispatch } from "../redux/hooks";
import ListItem from "./ui/ListItem";

const Row = ({ index, style }: ListChildComponentProps) => {
	const { employees } = useSelector(selectEmployees);
	const employee = employees[index];

	return (
		<div style={style}>
			<ListItem onClick={() => console.log("click")}>
				<span>{employee ? employee.name : "Загрузка..."}</span>
			</ListItem>
		</div>
	);
};

export default function EmployeeList() {
	const dispatch = useEmployeeDispatch();
	const { employees, page, totalPages, total } = useSelector(selectEmployees);
	const loading = useSelector(selectLoading);
	const pageSize = 100;

	React.useEffect(() => {
		if (employees.length === 0) {
			dispatch(fetchEmployees({ page: 1, limit: pageSize }));
		}
	}, [dispatch, employees.length]);

	const isItemLoaded = (index: number) => index < employees.length;

	const loadMoreItems = React.useCallback(
		(startIndex: number, stopIndex: number) => {
			const nextPage = page + 1;
			dispatch(fetchEmployees({ page: nextPage, limit: pageSize }));
		},
		[dispatch, page],
	);

	return (
		<div className="border-r h-full w-[400px] border-slate-500 overflow-hidden tracking-wide">
			<AutoSizer>
				{({ height, width }) => (
					<InfiniteLoader
						isItemLoaded={isItemLoaded}
						loadMoreItems={loadMoreItems}
						itemCount={total}
					>
						{({ onItemsRendered, ref }) => (
							<FixedSizeList
								height={height}
								itemCount={total}
								itemSize={41}
								onItemsRendered={onItemsRendered}
								ref={ref}
								width={width}
								className="overflow-hidden"
							>
								{Row}
							</FixedSizeList>
						)}
					</InfiniteLoader>
				)}
			</AutoSizer>
		</div>
	);
}
