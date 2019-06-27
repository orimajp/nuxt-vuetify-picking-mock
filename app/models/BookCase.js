/**
 * 指示書箱
 */
export default class BookCase {
  constructor() {
    this.locationBlocks = []
  }

  /**
   * 指示書数得
   *
   * @param instructionNumber
   * @returns {*}
   */
  getInstruction(instructionNumber) {
    let instruction = null
    this.locationBlocks.forEach(locationBlock => {
      const tmp = locationBlock.instructions.find(instruction => instruction.instructionNumber === instructionNumber)
      if (tmp !== undefined) {
        instruction = tmp
      }
    })
    console.log(instruction)
    return instruction
  }

  /**
   * ロケブロック取得
   *
   * @param locationBlockCode
   * @returns {null}
   */
  getLocationBlock(locationBlockCode) {
    const blocks = this.locationBlocks.filter(locationBlock => locationBlock.locationBlockCode === locationBlockCode)
    return blocks.length === 0 ? null : blocks[0]
  }

  /**
   * ロケーションブロック追加
   *
   * @param locationBlock
   */
  addLocationBlock(locationBlock) {
    this.locationBlocks.push(locationBlock)
  }

  /**
   * 未完了指示ありロケーションブロックリスト取得
   *
   * @returns {*[]}
   */
  nonCompleteLocationBlocks() {
    return this.locationBlocks.filter(locationBlock => !locationBlock.completed())
  }

  /**
   * 着手済指示ありロケーションブロックリスト取得
   *
   * @returns {*[]}
   */
  startedLocationBlocks() {
    return this.locationBlocks.filter(locationBlock => locationBlock.existsStartedInstruction())
  }

  /**
   * 着手済指示ありロケーションブロック有無判定
   *
   * @returns {boolean}
   */
  existsStartedInstruction() {
    return this.startedLocationBlocks().length !== 0
  }

  /**
   * 全ロケブロック完了判定
   *
   * @returns {boolean}
   */
  completed() {
    return this.nonCompleteLocationBlocks().length === 0
  }

}
