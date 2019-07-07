import DataCreator from '~/models/DataCreator'

export default function ({store}) {
  if (store.getters['bookcase/isUnestablished']) {
    store.dispatch('bookcase/setBookCase', DataCreator.createData())
  }
}
