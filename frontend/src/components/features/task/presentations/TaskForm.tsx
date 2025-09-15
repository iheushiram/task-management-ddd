import React from 'react'
import { Card, CardHeader, CardTitle } from '../../../ui/Card'
import { Input } from '../../../ui/Input'
import { Select } from '../../../ui/Select'
import { Button } from '../../../ui/Button'
import type { Priority, TaskFormData } from '../../../../types/domain'

interface TaskFormProps {
  formData: TaskFormData
  onFormDataChange: (data: Partial<TaskFormData>) => void
  onSubmit: (data: TaskFormData) => void
  onCancel?: () => void
  loading: boolean
  error: string | null
  mode: 'create' | 'edit'
}

export const TaskForm: React.FC<TaskFormProps> = ({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  loading,
  error,
  mode
}) => {
  const priorityOptions = [
    { value: 'low', label: '低' },
    { value: 'medium', label: '中' },
    { value: 'high', label: '高' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleTitleChange = (title: string) => {
    onFormDataChange({ title })
  }

  const handlePriorityChange = (priority: string) => {
    onFormDataChange({ priority: priority as Priority })
  }

  const handleDueDateChange = (dueDate: string) => {
    onFormDataChange({ dueDate: dueDate || undefined })
  }

  const validateForm = (): boolean => {
    return formData.title.trim().length > 0
  }

  const isFormValid = validateForm()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? '新しいタスク' : 'タスクを編集'}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Input
          label="タスクタイトル"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="タスクの内容を入力してください"
          required
          error={formData.title.trim().length === 0 && formData.title.length > 0 ? 'タイトルは必須です' : undefined}
        />

        <Select
          label="優先度"
          options={priorityOptions}
          value={formData.priority}
          onChange={handlePriorityChange}
          placeholder="優先度を選択してください"
        />

        <Input
          label="期限"
          type="datetime-local"
          value={formData.dueDate || ''}
          onChange={handleDueDateChange}
          placeholder="期限を設定してください（任意）"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!isFormValid || loading}
          >
            {mode === 'create' ? '作成' : '更新'}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              キャンセル
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}