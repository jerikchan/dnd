export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload = {}, position } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  
  const result = [...arr];
  let itemToAdd = payload;

  if (payload.action === 'add') {
    delete payload.action;
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
  } else {
    // move
    if (removedIndex !== null && addedIndex !== null && !position) {
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
    
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
    }
  }
  
  if (position) {
    itemToAdd.x = position.x;
    itemToAdd.y = position.y;
  }

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};
