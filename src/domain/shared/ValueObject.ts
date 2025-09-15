export abstract class ValueObject<T> {
  protected readonly value: T

  constructor(value: T) {
    this.value = value
    this.validate(value)
  }

  protected abstract validate(value: T): void

  getValue(): T {
    return this.value
  }

  equals(other: ValueObject<T>): boolean {
    return this.value === other.value
  }
}
