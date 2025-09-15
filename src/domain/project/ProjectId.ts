import { ValueObject } from "../shared/ValueObject"

export class ProjectId extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("ProjectId cannot be empty")
    }
    // UUID形式の検証
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(value)) {
      throw new Error("ProjectId must be a valid UUID")
    }
  }

  static generate(): ProjectId {
    return new ProjectId(crypto.randomUUID())
  }
}
