import { ValueObject } from "../shared/ValueObject"

export class TaskTitle extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("Task title cannot be empty")
    }
    if (value.length > 100) {
      throw new Error("Task title cannot exceed 100 characters")
    }
  }
}
