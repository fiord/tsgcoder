export const toggle = (() => {
  return {
    type: 'TOGGLE',
    payload: {}
  };
});

export const update = ((val) => {
  return {
    type: 'UPDATE',
    payload: val
  };
});

