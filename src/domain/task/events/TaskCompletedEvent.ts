import type { DomainEvent } from "../../shared/DomainEvent"
import { TaskId } from "../TaskId"

export class TaskCompletedEvent implements DomainEvent {
  readonly eventId: string
  readonly occuredOn: Date
  readonly eventType = "TaskCompleted"

  constructor(readonly taskId: TaskId) {
    this.eventId = crypto.randomUUID()
    this.occuredOn = new Date()
    this.eventType = "TaskCompleted"
  }
}
