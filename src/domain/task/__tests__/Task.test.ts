import { Task } from "../Task"
import { TaskTitle } from "../TaskTitle"
import { TaskStatus } from "../TaskStatus"
import { Priority } from "../Priority"
import { UserId } from "../../user/UserId"
import { describe } from "node:test"

describe("Task", () => {
  const assigneeId = new UserId("user-123")

  describe("create", () => {
    it("should create a new task with default values", () => {
      const title = new TaskTitle("Sample Task")
      const task = Task.create(title, assigneeId)

      expect(task.getTitle().getValue()).toBe("Sample Task")
      expect(task.getStatus().getValue()).toBe("TODO")
      expect(task.getPriority().getValue()).toBe("MEDIUM")
      expect(task.getAssigneeId()).toBe(assigneeId)
    })

    it("should create a task with specified priority and due date", () => {
      const title = new TaskTitle("High Priority Task")
      const priority = Priority.high()
      const dueDate = new Date("2024-12-31")

      const task = Task.create(title, assigneeId, priority, dueDate)

      expect(task.getPriority().getValue()).toBe("HIGH")
      expect(task.getDueDate()).toBe(dueDate)
    })
  })
})
