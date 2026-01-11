export interface Job {
    id: number;
    taskName: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'pending' | 'running' | 'completed' | 'failed';
    payload: any;
    createdAt: string;
}
