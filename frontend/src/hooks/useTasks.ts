import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '../services/api'
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskStatusRequest
} from '../types/domain'

// クエリキー定数
export const QUERY_KEYS = {
  tasks: ['tasks'] as const,
  task: (id: string) => ['tasks', id] as const
}

// タスク一覧取得フック
export const useTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.tasks,
    queryFn: taskApi.getTasks,
    staleTime: 1000 * 60 * 5, // 5分
    gcTime: 1000 * 60 * 10 // 10分
  })
}

// 単一タスク取得フック
export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.task(taskId),
    queryFn: () => taskApi.getTask(taskId),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5
  })
}

// タスク作成フック
export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: (data) => {
      // タスク一覧を無効化して再フェッチを促す
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks })

      // 楽観的更新のためにキャッシュに新しいタスクを追加
      queryClient.setQueryData<Task[]>(QUERY_KEYS.tasks, (oldTasks) => {
        return oldTasks ? [...oldTasks, data.task] : [data.task]
      })
    },
    onError: (error) => {
      console.error('Failed to create task:', error)
    }
  })
}

// タスクステータス更新フック
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, ...data }: UpdateTaskStatusRequest) =>
      taskApi.updateTaskStatus(taskId, data),
    onMutate: async ({ taskId, status }) => {
      // 楽観的更新のため既存のクエリをキャンセル
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.tasks })

      // 前の値を保存
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.tasks)

      // 楽観的更新
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(QUERY_KEYS.tasks, (oldTasks) =>
          oldTasks?.map(task =>
            task.id === taskId
              ? { ...task, status, updatedAt: new Date().toISOString() }
              : task
          ) || []
        )
      }

      return { previousTasks }
    },
    onError: (_error, _variables, context) => {
      // エラー時は前の値にロールバック
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.tasks, context.previousTasks)
      }
    },
    onSettled: () => {
      // 成功・失敗に関わらずクエリを無効化
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks })
    }
  })
}