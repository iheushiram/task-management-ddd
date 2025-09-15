export interface DomainEvent {
  readonly eventId: string
  readonly occuredOn: Date
  readonly eventType: string
}

export abstract class DomainEventPublisher {
  private static subscribers: Map<string, ((event: DomainEvent) => void)[]> =
    new Map()

  static subscribe(
    eventType: string,
    handler: (event: DomainEvent) => void,
  ): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, [])
    }
    this.subscribers.get(eventType)!.push(handler)
  }

  static publish(event: DomainEvent): void {
    const handlers = this.subscribers.get(event.eventType) || []
    handlers.forEach((handler) => handler(event))
  }
}
