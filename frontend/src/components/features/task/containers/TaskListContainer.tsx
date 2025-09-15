import React, { useState } from 'react'
import { TaskList } from '../presentations/TaskList'
import { useTasks, useUpdateTaskStatus } from '../../../../hooks/useTasks'
import type { TaskStatus } from '../../../../types/domain'

interface TaskListContainerProps {
  onEditTask?: (taskId: string) => void
  onDeleteTask?: (taskId: string) => void
}

export const TaskListContainer: React.FC<TaskListContainerProps> = ({
  onEditTask,
  onDeleteTask
}) => {
  const [updatingTaskIds, setUpdatingTaskIds] = useState<string[]>([])

  const {
    data: tasks = [],
    isLoading,
    error: fetchError
  } = useTasks()

  const updateTaskStatusMutation = useUpdateTaskStatus()

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    // 更新中のタスクIDを追加
    setUpdatingTaskIds(prev => [...prev, taskId])

    try {
      await updateTaskStatusMutation.mutateAsync({
        taskId,
        status,
        userId: 'temp-user-id' // TODO: 実際のユーザーIDを取得
      })
    } catch (error) {
      console.error('Failed to update task status:', error)
    } finally {
      // 更新完了後にタスクIDを除去
      setUpdatingTaskIds(prev => prev.filter(id => id !== taskId))
    }
  }

  const errorMessage = fetchError?.message || updateTaskStatusMutation.error?.message || null

  return (
    <TaskList
      tasks={tasks}
      loading={isLoading}
      error={errorMessage}
      onStatusChange={handleStatusChange}
      onEdit={onEditTask}
      onDelete={onDeleteTask}
      updatingTaskIds={updatingTaskIds}
    />
  )
}