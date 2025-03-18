import axios from "axios";
import TasksResponse from '@/models/TasksResponse';
import TaskUpdateParams from "@/models/interfaces/TaskUpdateParams";

export async function getAllTasks() {
    const response = await axios.get<Array<TasksResponse>>('/api/');
    return response.data;
}

export async function updateTaskById(
    id: string,
    params: TaskUpdateParams,
) {
    const response = await axios.patch(`/api/${id}`, {
        ...params,
    });
    return response.data;
}

export async function addTask(
    params: TaskUpdateParams,
) {
    const response = await axios.post(`/api`, {
        ...params,
    });
    return response.data;
}