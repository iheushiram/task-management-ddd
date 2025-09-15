import React from 'react'
import { Card } from '../../../ui/Card'
import { Button } from '../../../ui/Button'
import type { Task, TaskStatus, Priority } from '../../../../types/domain'

interface TaskItemProps {
  task: Task
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onEdit?: (taskId: string) => void
  onDelete?: (taskId: string) => void
  isUpdating?: boolean
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  isUpdating = false
}) => {
  const handleStatusChange = (newStatus: TaskStatus) => {
    onStatusChange(task.id, newStatus)
  }

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'done':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return 'To Do'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: Priority): string => {
    switch (priority) {
      case 'high':
        return 'High'
      case 'medium':
        return 'Medium'
      case 'low':
        return 'Low'
      default:
        return priority
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ja-JP')
  }

  const isOverdue = (): boolean => {
    if (!task.dueDate) return false
    return new Date(task.dueDate) < new Date() && task.status !== 'done'
  }

  return (
    <Card className={`transition-opacity ${isUpdating ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>

            {task.dueDate && (
              <span className={`${isOverdue() ? 'text-red-600 font-medium' : ''}`}>
                期限: {formatDate(task.dueDate)}
                {isOverdue() && ' (期限切れ)'}
              </span>
            )}

            <span>作成: {formatDate(task.createdAt)}</span>

            {task.updatedAt !== task.createdAt && (
              <span>更新: {formatDate(task.updatedAt)}</span>
            )}
          </div>

          <div className="flex gap-2">
            {task.status !== 'done' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleStatusChange(task.status === 'todo' ? 'in_progress' : 'done')}
                disabled={isUpdating}
                loading={isUpdating}
              >
                {task.status === 'todo' ? '開始' : '完了'}
              </Button>
            )}

            {task.status === 'done' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleStatusChange('in_progress')}
                disabled={isUpdating}
              >
                再開
              </Button>
            )}

            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(task.id)}
                disabled={isUpdating}
              >
                編集
              </Button>
            )}

            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(task.id)}
                disabled={isUpdating}
              >
                削除
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}