const initialState = {
  // main menu
  isOpen: false, // toggle main menu
  user: null, // user authentication
  // code execution
  codes: [], // code list by user
  // show and submit code
  codeId: null,
  langs: [],
  lang: "",
  code: "",
  stdin: "",
  stdout: "",
  stderr: "",
  // code judge
  state: "pending",
  error: "",
  // problem
  problems: [], // problem list
  problemId: null,
  problem: null, // problem data
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
