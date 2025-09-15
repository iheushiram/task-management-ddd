import { ValueObject } from "../shared/ValueObject"

export class Email extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error("Email cannot be empty")
    }

    // 基本的なメールアドレスの形式チェック
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email format")
    }

    if (value.length > 254) {
      throw new Error("Email address is too long")
    }
  }

  getDomain(): string {
    const parts = this.value.split("@")
    if (parts.length !== 2) {
      throw new Error("Invalid email format")
    }
    return parts[1]!
  }

  getLocalPart(): string {
    const parts = this.value.split("@")
    if (parts.length !== 2) {
      throw new Error("Invalid email format")
    }
    return parts[0]!
  }
}
