export default class OrderCode {
  value: string
  constructor (readonly date: Date, readonly sequence: number) {
    this.value = this.generateCode(date, sequence)
  }

  private generateCode (date: Date, sequence: number):string {
    const year = date.getFullYear()
    return `${year}${(new String(sequence).padStart(8, '0'))}`
  }
}
