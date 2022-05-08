export default class Dimension {
  constructor (readonly width: number, readonly height: number, readonly length: number) {
  }

  getVolume () {
    if (this.width && this.height && this.length) {
      return (this.width / 100) * (this.height / 100) * (this.length / 100)
    }

    return 0
  }
}
