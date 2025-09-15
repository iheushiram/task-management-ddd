import React, { useState } from 'react'
import { TaskForm } from '../presentations/TaskForm'
import { useCreateTask } from '../../../../hooks/useTasks'
import type { TaskFormData, Priority } from '../../../../types/domain'

interface TaskFormContainerProps {
  onSuccess?: () => void
  onCancel?: () => void
  mode: 'create' | 'edit'
  initialData?: Partial<TaskFormData>
}

export const TaskFormContainer: React.FC<TaskFormContainerProps> = ({
  onSuccess,
  onCancel,
  mode,
  initialData
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate
  })

  const createTaskMutation = useCreateTask()

  const handleFormDataChange = (data: Partial<TaskFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleSubmit = async (data: TaskFormData) => {
    try {
      await createTaskMutation.mutateAsync({
        title: data.title,
        assigneeId: 'temp-user-id', // TODO: 実際のユーザーIDを取得
        priority: data.priority,
        dueDate: data.dueDate
      })

      // フォームをリセット
      setFormData({
        title: '',
        priority: 'medium',
        dueDate: undefined
      })

      // 成功コールバック
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const handleCancel = () => {
    // フォームをリセット
    setFormData({
      title: initialData?.title || '',
      priority: initialData?.priority || 'medium',
      dueDate: initialData?.dueDate
    })

    onCancel?.()
  }

  return (
    <TaskForm
      formData={formData}
      onFormDataChange={handleFormDataChange}
      onSubmit={handleSubmit}
      onCancel={onCancel ? handleCancel : undefined}
      loading={createTaskMutation.isPending}
      error={createTaskMutation.error?.message || null}
      mode={mode}
    />
  )
}