/**
 * ロケーションブロック
 */
export default class LocationBlock {
  constructor(locationBlockCode) {
    this.locationBlockCode = locationBlockCode
    this.instructions = []
  }

  /**
   * 指示書数
   *
   * @returns {number}
   */
  instructionCount() {
    return this.instructions.length
  }

  /**
   * 指示書追加
   *
   * @param instruction
   */
  addInstruction(instruction) {
    this.instructions.push(instruction)
  }

  // ユーザ認証している場合、着手したのが対象ユーザか否かにより、未完了指示書リストと着手済指示書リストのどちらを出すか選択する方法も考えられる

  /**
   * 未完了指示書リスト取得
   *
   * @returns {*[]}
   */
  nonCompletionInstructions() {
    return this.instructions.filter(instruction => !instruction.completed())
  }

  /**
   * 着手済指示書リスト取得
   *
   * @returns {*[]}
   */
  startedInstructions() {
    return this.instructions.filter(instruction => instruction.started())
  }

  /**
   * 未完了指示書数取得
   *
   * @returns {number}
   */
  nonCompletionInstructionsNumber() {
    return this.nonCompletionInstructions().length
  }

  /**
   * 着手済指示書数取得
   *
   * @returns {number}
   */
  startedInstructionsNumber() {
    return this.startedInstructions().length
  }

  /**
   * 着手済指示書有無判定
   *
   * @returns {boolean}
   */
  existsStartedInstruction() {
    return this.startedInstructionsNumber() !== 0
  }

  /**
   * 全指示書完了判定
   *
   * @returns {boolean}
   */
  completed() {
    return this.nonCompletionInstructionsNumber() === 0
  }

}
