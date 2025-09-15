import type { DomainEvent } from "../../shared/DomainEvent"
import { TaskId } from "../TaskId"
import { UserId } from "../../user/UserId"
import { ProjectId } from "../../project/ProjectId"

export class TaskCreatedEvent implements DomainEvent {
  readonly eventId: string
  readonly occuredOn: Date
  readonly eventType: "TaskCreated"

  constructor(
    readonly taskId: TaskId,
    readonly assigneeId: UserId,
    readonly projectId: ProjectId,
  ) {
    this.eventId = crypto.randomUUID()
    this.occuredOn = new Date()
    this.eventType = "TaskCreated"
  }
}
