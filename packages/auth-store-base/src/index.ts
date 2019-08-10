// module Base
export { default as reducer, KEY } from './reducer'
export { default as saga } from './sagas'
import * as _actions from './actions'
export const actions = _actions
import * as _selectors from './selectors'
export const selectors = _selectors
