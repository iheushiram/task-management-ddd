import { ValueObject } from "../shared/ValueObject"

export class UserName extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("User name cannot be empty")
    }
    if (value.length < 2) {
      throw new Error("User name must be at least 2 charactors long")
    }
    if (value.length > 30) {
      throw new Error("User name cannot exceed 30 charactors")
    }

    const invalidCharsRegex = /[<>:"/\\|?*@#$%^&()]/
    if (invalidCharsRegex.test(value)) {
      throw new Error("User name contains invalid charactors")
    }
  }
}
