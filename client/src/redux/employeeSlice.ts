import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface EmployeeListItem {
	id: number;
	name: string;
}

export interface Employee extends EmployeeListItem {
	department: string;
	company: string;
	jobTitle: string;
}

export interface EmployeeState {
	employees: {
		employees: EmployeeListItem[];
		total: number;
		page: number;
		totalPages: number;
	};
	currentEmployee: Employee | null;
	loading: boolean;
	error: string | null;
}

const initialState: EmployeeState = {
	employees: {
		employees: [],
		total: 1000000,
		page: 1,
		totalPages: 0,
	},
	currentEmployee: null,
	loading: false,
	error: null,
};

// Получение списка пользователей
export const fetchEmployees = createAsyncThunk(
	"employees/fetchEmployees",
	async ({ page, limit }: { page: number; limit: number }) => {
		const res = await axios.get(
			`http://localhost:3001/api/employees?page=${page}&limit=${limit}`,
		);

		return res.data;
	},
);

// Получение информаци об одном пользователе
export const fetchEmployee = createAsyncThunk(
	"employees/fetchEmployee",
	async (id: number) => {
		const res = await axios.get(`http://localhost:3001/api/employees/${id}`);

		return res.data as Employee;
	},
);

// Обновление информации об одном пользователе
export const updateEmployee = createAsyncThunk(
	"employees/updateEmployee",
	async (employee: Employee) => {
		const res = await axios.put(
			`http://localhost:3001/api/employees/${employee.id}`,
			employee,
		);

		return res.data as Employee;
	},
);

const employeeSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		selectEmployee(state, action) {
			state.currentEmployee = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEmployees.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchEmployees.fulfilled, (state, action) => {
			state.employees.employees = [
				...state.employees.employees,
				...action.payload.employees,
			];
			state.employees.page = action.payload.page;
			state.employees.totalPages = action.payload.totalPages;
			state.employees.total = action.payload.total;
			state.loading = false;
		});
		builder.addCase(fetchEmployees.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});

		builder.addCase(fetchEmployee.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchEmployee.fulfilled, (state, action) => {
			state.loading = false;
			state.currentEmployee = action.payload;
		});
		builder.addCase(fetchEmployee.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});

		builder.addCase(updateEmployee.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(updateEmployee.fulfilled, (state, action) => {
			state.loading = false;
			state.currentEmployee = action.payload;
			state.employees.employees = state.employees.employees.map((u) =>
				u.id === action.payload.id
					? { id: action.payload.id, name: action.payload.name }
					: u,
			);
		});
		builder.addCase(updateEmployee.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
	},
});

export const { selectEmployee } = employeeSlice.actions;
export const selectEmployees = (state: { employees: EmployeeState }) =>
	state.employees.employees;
export const selectCurrentEmployee = (state: { employees: EmployeeState }) =>
	state.employees.currentEmployee;
export const selectLoading = (state: { employees: EmployeeState }) =>
	state.employees.loading;

export default employeeSlice.reducer;
