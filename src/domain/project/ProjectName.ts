import { ValueObject } from "../shared/ValueObject"

export class ProjectName extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("Project name cannot be empty")
    }
    if (value.length > 50) {
      throw new Error("Project name cannot exceed 50 characters")
    }
    // プロジェクト名に使用できる文字のチェック
    const invalidCharsRegex = /[<>:"/\\|?*]/
    if (invalidCharsRegex.test(value)) {
      throw new Error("Project name contains invalid characters")
    }
  }
}
