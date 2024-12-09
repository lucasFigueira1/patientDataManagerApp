import axios from "axios";
import { Patient } from "../types";



export const getPatients = async (): Promise<Patient[] | null> => {
  try {
    const res = await axios.get('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');
    if (!res || !res.data) return null;
    return res.data;
  } catch (error) {
    return null;
  }
}
