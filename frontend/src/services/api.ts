import axios, { AxiosResponse } from 'axios'
import type {
  Task,
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
  ApiError
} from '../types/domain'

// API クライアントの設定
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // エラーハンドリング
    const message = error.response?.data?.error || 'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// Task API
export const taskApi = {
  // タスク作成
  createTask: async (data: CreateTaskRequest): Promise<CreateTaskResponse> => {
    const response: AxiosResponse<CreateTaskResponse> = await apiClient.post('/tasks', data)
    return response.data
  },

  // タスクステータス更新
  updateTaskStatus: async (
    taskId: string,
    data: Omit<UpdateTaskStatusRequest, 'taskId'>
  ): Promise<UpdateTaskStatusResponse> => {
    const response: AxiosResponse<UpdateTaskStatusResponse> = await apiClient.put(
      `/tasks/${taskId}/status`,
      data
    )
    return response.data
  },

  // タスク一覧取得 (まだバックエンドに実装されていないが、将来のために定義)
  getTasks: async (): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await apiClient.get('/tasks')
    return response.data
  },

  // 単一タスク取得
  getTask: async (taskId: string): Promise<Task> => {
    const response: AxiosResponse<Task> = await apiClient.get(`/tasks/${taskId}`)
    return response.data
  }
}

export { apiClient }