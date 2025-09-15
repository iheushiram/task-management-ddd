import React, { useState } from 'react'
import { QueryProvider } from './providers/QueryProvider'
import { TaskListContainer } from './components/features/task/containers/TaskListContainer'
import { TaskFormContainer } from './components/features/task/containers/TaskFormContainer'
import { Card, CardHeader, CardTitle } from './components/ui/Card'
import { Button } from './components/ui/Button'

function App() {
  const [showForm, setShowForm] = useState(false)

  const handleTaskCreated = () => {
    setShowForm(false)
  }

  const handleCancelForm = () => {
    setShowForm(false)
  }

  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              タスク管理システム
            </h1>
            <p className="text-gray-600">
              Domain-Driven Design (DDD) で構築されたタスク管理アプリケーション
            </p>
          </div>

          <div className="space-y-6">
            {/* タスク作成ボタン / フォーム */}
            {!showForm ? (
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">タスク作成</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      新しいタスクを作成して管理を開始しましょう
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setShowForm(true)}
                  >
                    新しいタスク
                  </Button>
                </div>
              </Card>
            ) : (
              <TaskFormContainer
                mode="create"
                onSuccess={handleTaskCreated}
                onCancel={handleCancelForm}
              />
            )}

            {/* タスク一覧 */}
            <div>
              <CardHeader className="mb-4">
                <CardTitle>タスク一覧</CardTitle>
              </CardHeader>
              <TaskListContainer />
            </div>
          </div>
        </div>
      </div>
    </QueryProvider>
  )
}

export default App
