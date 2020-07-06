import { createContext } from 'react'

export const TaxCalculationContext = createContext(null);
export const UserContext = createContext(null);

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }
  
  export const InitListReducerOld = (state, action) => {
    const list = action.list.filter(tx => tx.type === action.type)
    let total = 0;
    list.forEach(tx => {
      tx.date = new Date(tx.date)
      total+=tx.amt
    })

    return {
      ...state,
      [action.type]: {
        ...state[action.type],
        list: list,
        total: total
      }
    }
  }

  export const InitListReducer = (state, action) => {
    const types = action.types;

    const newState = {...state};

    types.forEach( t => {
      const list = action.list.filter(tx => tx.type === t)
      let total = 0;
      list.forEach(tx => {
        tx.date = new Date(tx.date)
        total+=tx.amt
      })
      newState[t] = {
        ...state[t], 
        list:list, 
        total: total
      }
    })

    return newState
  }

  export const DataLoadReducer = (state, action) => {
    const newState = {...state};

    if(action)
      newState.loadingCount ++;
    else
      newState.loadingCount --;

    newState.loading = newState.loadingCount > 0;

    return newState
  }

  export const EntityReducer = (state, action) => {
  
    const { type, entityTypeKey, entity } = action;
  
    let newList = [];
    let newTotal = 0;
    let matchIndex = 0;
  
    switch (type) {
      case 'add':
        entity.id = guid();
        newList = state[entityTypeKey].list.concat(entity);
        break;
  
      case 'update':
        newList = [...state[entityTypeKey].list]
        matchIndex = newList.findIndex(e => e.id === entity.id);
        newList[matchIndex] = entity;
        break;
  
      case 'delete':
        newList = [...state[entityTypeKey].list]
        matchIndex = newList.findIndex(e => e.id === entity.id);
        newList.splice(matchIndex, 1);
        break;
          
      default:
        return state;
    }
  
    newList.forEach(i => newTotal += i.amt);
  
    return {
      ...state,
      [action.entityTypeKey]: {
        ...state[action.entityTypeKey],
        list: newList,
        total: newTotal
      }
    }
  }
