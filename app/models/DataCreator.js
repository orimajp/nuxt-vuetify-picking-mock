import BookCase from '~/models/BookCase'
import LocationBlock from '~/models/LocationBlock'
import Instruction from '@/models/Instruction'
import InstructionDetail from '@/models/InstructionDetail'

export default class DataCreator {

  static createData() {
    const bookCase = new BookCase();

    const block10 = new LocationBlock('10')
    const instruction11 = new Instruction('1')
    instruction11.addDetail(new InstructionDetail(1, '101', '1', 'Tシャツ S', 1))

//    const detail11 = new InstructionDetail(1, '101', '1', 'Tシャツ S', 1)
//    detail11.restCount = 0
//    instruction11.addDetail(detail11)

    instruction11.addDetail(new InstructionDetail(2, '102', '3', 'Tシャツ L', 3))

//    const detail12 = new InstructionDetail(2, '102', '3', 'Tシャツ L', 3)
//    detail12.restCount = 2
//    detail12.pick()
//    instruction11.addDetail(detail12)

    instruction11.addDetail(new InstructionDetail(3, '103', '2', 'Tシャツ M', 1))

    const instruction12 = new Instruction('2')
    instruction12.addDetail(new InstructionDetail(1, '106', '5', 'パーカー S', 1))
    const instruction13 = new Instruction('3')
    instruction13.addDetail(new InstructionDetail(1, '109', '1', 'ソックス', 1))
    block10.addInstruction(instruction11)
    block10.addInstruction(instruction12)
    block10.addInstruction(instruction13)

    bookCase.addLocationBlock(block10)

    const block20 = new LocationBlock('20')
    const instruction21 = new Instruction('5')
    instruction21.addDetail(new InstructionDetail(1, '201', '6', 'ジーパン', 1))
    block20.addInstruction(instruction21)
    bookCase.addLocationBlock(block20)

    return bookCase
  }

}
