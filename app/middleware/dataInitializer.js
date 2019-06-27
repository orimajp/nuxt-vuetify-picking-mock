import DataCreator from '~/models/DataCreator'

export default function ({store}) {
  if (store.getters['bookcase/isUnestablished']) {
    console.log('データ初期化')
    store.dispatch('bookcase/setBookCase', DataCreator.createData())
  }
}
