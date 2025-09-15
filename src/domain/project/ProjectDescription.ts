import { ValueObject } from "../shared/ValueObject"

export class ProjectDescription extends ValueObject<string> {
  protected validate(value: string): void {
    if (value.length > 500) {
      throw new Error("Project Description cannot exceed 500 characters")
    }
  }

  isEmpty(): boolean {
    return !this.value || this.value.trim().length === 0
  }
}
