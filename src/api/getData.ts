import axios from 'axios';

export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export async function getData() {
    const response = axios.get(`https://jsonplaceholder.typicode.com/todos`);
    const answer: Todo[] = await (await response).data;
    return answer;
}