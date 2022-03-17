import { cloneDeep, uniqWith, isEqual, differenceWith } from 'lodash'

const initStore = {
  tags: [],
  dogamis: [],
}

export const state = () => ({ ...cloneDeep(initStore) })

export const mutations = {
  ADD_TAGS(state, tags) {
    state.tags = uniqWith([...state.tags, ...tags], isEqual)
  },
  REMOVE_TAGS(state, tags) {
    state.tags = differenceWith(state.tags, tags, isEqual)
  },
  CLEAR_TAGS(state) {
    state.tags = []
  },
  SET_DOGAMIS(state, dogamis) {
    state.dogamis = Array.from(new Set([...dogamis]))
  },
}
