// ドメイン型定義 - バックエンドのドメインモデルに対応

// Task関連の型
export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: Priority
  assigneeId: string
  createdAt: string
  updatedAt: string
  dueDate?: string
}

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

// Project関連の型
export interface Project {
  id: string
  name: string
  description?: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

// User関連の型
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

// API リクエスト/レスポンス型
export interface CreateTaskRequest {
  title: string
  assigneeId: string
  projectId?: string
  priority?: Priority
  dueDate?: string
}

export interface CreateTaskResponse {
  task: Task
}

export interface UpdateTaskStatusRequest {
  taskId: string
  status: TaskStatus
  userId: string
}

export interface UpdateTaskStatusResponse {
  message: string
}

// UI関連の型
export interface TaskFormData {
  title: string
  priority: Priority
  dueDate?: string
}

export interface ApiError {
  error: string
}