import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface postsState {
    id: string;
    title: string;
    content: string;
    authorId: string;
    tags: string[];
  }
interface userState {
  id: string;
  email: string;
  username: string;
  password: string;
  posts: postsState[];
  isLogged: boolean;
}

// Define the initial state using that type
const initialState: userState = {
    id: "",
    email: "",
    username: "",
    password: "",
    posts: [],
    isLogged: false,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<userState>) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.posts = action.payload.posts;
        state.isLogged = true;
    },
    logOut: (state) => {
        state.id = "";
        state.email = "";
        state.username = "";
        state.password = "";
        state.posts = [];
        state.isLogged = false;
    },
  },
});

export const { signIn, logOut } = userSlice.actions;

export default userSlice.reducer;
