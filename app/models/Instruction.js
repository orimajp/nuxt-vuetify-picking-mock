/**
 * 指示書
 */
export default class Instruction {
  constructor(instructionNumber) {
    this.instructionNumber = instructionNumber
    this.details = []
  }

  /**
   * 明細取得
   *
   * @param detailId
   * @returns {null|*}
   */
  getDetail(detailId) {
    const detail = this.details.find(detail => detail.detailId === detailId)
    if (detail !== undefined) {
      return detail
    }
    return null
  }

  /**
   * 明細追加
   *
   * @param detail 明細
   */
  addDetail(detail) {
    this.details.push(detail)
    console.log('detail count=' + this.details.length)
  }

  /**
   * 全明細リスト取得
   *
   * @returns {Array}
   */
  allDetails(){
    return this.details
  }

  /**
   * ピック対象明細リスト取得
   *
   * @returns {*[]}
   */
  pickTargetDetails() {
    return this.details.filter(detail => !detail.completed)
  }

  /**
   * 完了済明細リスト取得
   *
   * @returns {*[]}
   */
  completeDetails() {
    return this.details.filter(detail => detail.completed)
  }

  /**
   * 全明細数取得
   *
   * @returns {number}
   */
  allCount() {
    return this.allDetails().length
  }

  /**
   * ピック対象明細数取得
   *
   * @returns {number}
   */
  pickTargetCount() {
    return this.pickTargetDetails().length
  }

  /**
   * 完了済明細数取得
   *
   * @returns {number}
   */
  completeCount() {
    return this.completeDetails().length
  }

  /**
   * 未登録チェック
   *
   * @returns {boolean}
   */
  isEmpty() {
    return this.details.length === 0
  }

  /**
   * 未完了明細有無判定
   *
   * @returns {boolean}
   */
  started() {
    // 着手済だが未完了のものがあるか
    if (this.details.filter(detail => detail.started && !detail.completed).length !== 0) {
      return true
    }
    return this.completeCount() !== 0 && !this.completed()
  }

  /**
   * 完了済判定
   *
   * @returns {boolean}
   */
  completed() {
    return this.pickTargetCount() === 0
  }

}
