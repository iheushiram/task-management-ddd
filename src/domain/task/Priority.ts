import { ValueObject } from "../shared/ValueObject"

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH"

export class Priority extends ValueObject<PriorityLevel> {
  protected validate(value: PriorityLevel): void {
    const validPriorities: PriorityLevel[] = ["LOW", "MEDIUM", "HIGH"]
    if (!validPriorities.includes(value)) {
      throw new Error("Invalid priority level")
    }
  }

  static low(): Priority {
    return new Priority("LOW")
  }

  static medium(): Priority {
    return new Priority("MEDIUM")
  }

  static high(): Priority {
    return new Priority("HIGH")
  }

  isHigherThan(other: Priority): boolean {
    const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 }
    return priorityOrder[this.value] > priorityOrder[other.value]
  }
}
