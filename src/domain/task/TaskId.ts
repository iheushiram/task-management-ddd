import { ValueObject } from "../shared/ValueObject"

export class TaskId extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("TaskId cannot be empty")
    }

    // UUID形式検証
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    if (!uuidRegex.test(value)) {
      throw new Error("TaskId must be a valid UUID")
    }
  }

  static generate(): TaskId {
    return new TaskId(crypto.randomUUID())
  }
}
