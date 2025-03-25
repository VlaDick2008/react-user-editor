// hooks.ts
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";

export const useEmployeeDispatch = () => useDispatch<AppDispatch>();
