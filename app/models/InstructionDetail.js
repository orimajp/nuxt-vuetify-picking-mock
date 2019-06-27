/**
 * 指示書明細
 */
export default class InstructionDetail {
  constructor(detailId, location, itemCode, itemName, count) {
    this.detailId = detailId
    this.location = location
    this.itemCode = itemCode
    this.itemName = itemName
    this.allCount = count
    this.restCount = count
  }

  pick() {
    if (this.restCount < 1) {
      throw new Error('残数がマイナスになります。')
    }
    this.restCount--
  }

  get completed() {
    return this.restCount < 1
  }

  get started() {
    return this.restCount < this.allCount
  }

  get completeCount() {
    return this.allCount - this.restCount
  }

}
