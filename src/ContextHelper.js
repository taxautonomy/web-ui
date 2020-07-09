import { createContext } from 'react'

export const AppContext = createContext(null);

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

const getTotal = list =>{
  let total = 0;
  list.forEach(tx => total += tx.amt);
  return total;
}
export const TxCacheReducer = (state, args) => {

  const newState = { ...state };

  const {tx, action, types} = args;
  switch (action) {
    case "init":

      types.forEach(t => {
        const list = args.list.filter(tx => tx.type === t)
        let total = 0;
        list.forEach(tx => {
          tx.date = new Date(tx.date)
          total += tx.amt
        })
        newState[t] = {
          ...state[t],
          list: list,
          total: total
        }
      })
      break;

    case 'add':
      newState[tx.type].list = state[tx.type].list.concat(tx);
      newState[tx.type].total = getTotal(newState[tx.type].list);
      break;

    case 'update':
      newState[tx.type].list[state[tx.type].list.findIndex(t => t.id === tx.id)] = tx
      newState[tx.type].total = getTotal(newState[tx.type].list);
      break;

    case 'delete':
      newState[tx.type].list.splice(state[tx.type].list.findIndex(t => t.id === tx.id), 1)
      newState[tx.type].total = getTotal(newState[tx.type].list);
      break;
            
    default:
      break;


  }

  return newState;
}

export const DataLoadReducer = (state, action) => {
  const newState = { ...state };

  if (action)
    newState.loadingCount++;
  else
    newState.loadingCount--;

  newState.loading = newState.loadingCount > 0;

  return newState
}
