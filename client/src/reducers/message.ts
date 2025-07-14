const initialState = {}

export default function messageReducer(state = initialState, action: { type: string; payload: any; }) {
  const { type, payload } = action;
  switch (type) {
    case "SET_MESSAGE":
      return payload;
    case "CLEAR_MESSAGE":
      return { message: "" };
    default:
      return state;
  }
}