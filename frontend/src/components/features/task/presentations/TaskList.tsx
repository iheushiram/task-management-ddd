import React from 'react'
import { TaskItem } from './TaskItem'
import type { Task, TaskStatus } from '../../../../types/domain'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onEdit?: (taskId: string) => void
  onDelete?: (taskId: string) => void
  updatingTaskIds?: string[]
  emptyMessage?: string
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onStatusChange,
  onEdit,
  onDelete,
  updatingTaskIds = [],
  emptyMessage = 'タスクがありません'
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-gray-600">タスクを読み込んでいます...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-red-400 mb-4">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">エラーが発生しました</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyMessage}</h3>
          <p className="text-gray-600">新しいタスクを作成して始めましょう</p>
        </div>
      </div>
    )
  }

  // タスクをステータス別にグループ化
  const groupedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    done: tasks.filter(task => task.status === 'done')
  }

  const StatusSection: React.FC<{
    title: string
    tasks: Task[]
    status: TaskStatus
    count: number
  }> = ({ title, tasks, count }) => {
    if (tasks.length === 0) return null

    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          {title}
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {count}
          </span>
        </h2>
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
              isUpdating={updatingTaskIds.includes(task.id)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <StatusSection
        title="未着手"
        tasks={groupedTasks.todo}
        status="todo"
        count={groupedTasks.todo.length}
      />

      <StatusSection
        title="進行中"
        tasks={groupedTasks.in_progress}
        status="in_progress"
        count={groupedTasks.in_progress.length}
      />

      <StatusSection
        title="完了"
        tasks={groupedTasks.done}
        status="done"
        count={groupedTasks.done.length}
      />
    </div>
  )
}