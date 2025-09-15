export class DateRange {
  constructor(
    private readonly startDate: Date,
    private readonly endDate: Date,
  ) {
    if (startDate >= endDate) {
      throw new Error("Start date must be before end date")
    }
  }

  getStartDate(): Date {
    return new Date(this.startDate)
  }

  getEndDate(): Date {
    return new Date(this.endDate)
  }

  contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate
  }

  overlaps(other: DateRange): boolean {
    return this.startDate <= other.endDate && this.endDate >= other.startDate
  }

  getDurationInDays(): number {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }
}
