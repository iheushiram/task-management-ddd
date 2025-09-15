import { ValueObject } from "../shared/ValueObject"

export class UserId extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("UserId cannot be empty")
    }
    // UUID形式の検証
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(value)) {
      throw new Error("UserId must be valid UUID")
    }
  }

  static generate(): UserId {
    return new UserId(crypto.randomUUID())
  }
}
