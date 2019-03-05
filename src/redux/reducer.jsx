const initialState = {
  codeId: null,
  langs: [],
  lang: "",
  code: "",
  stdin: "",
  stdout: "",
  stderr: "",
  state: "pending",
  isOpen: false,
};

export default function reducer(state = initialState, action) {
  console.log("action:",action);
  switch(action.type) {
    case 'TOGGLE':
      return {
        ...state,
        isOpen: state.isOpen ^ true
      };
    case 'UPDATE':
      return {
        ...state,
        ...action.payload
      };
    default: 
      return state;
  }
};
