const api = {

  profile: "",
  bar: false,
  home: false,

};

const anyplayReducer = (state = api, action) => {
  switch (action.type) {
    case "PROFILE":
      state = { ...state, profile: action.payload };
      break;
    case "BAR":
      state = { ...state, bar: action.payload };
      break;
    case "HOME":
      state = { ...state, home: action.payload };
      break;

    default:
      state = api;
  }
  return state;
};

export default anyplayReducer;
