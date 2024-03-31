import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfo, loginRequest, logoutRequest, registerRequest, updateUserInfo } from '../../utils/api';
import { getCookie, deleteCookie, setCookie } from "../../utils/cookie";
import { TEmail, TPassword, TName, TUser } from '../../utils/types';

type TAuthState = {
  user: TUser | null| void;
  isAuthChecked: boolean;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  hasError: false
};

export const register = createAsyncThunk(
  'auth/register',
  async (form: TEmail & TPassword & TName, { dispatch }) => {
    dispatch(userRequest());

    try {
      const res = await registerRequest(form);
      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split("Bearer ")[1]);

      dispatch(userRequestSuccess(res.user));
    } catch (err) {
      dispatch(userRequestFailed());
      console.log(err);
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (form: TEmail & TPassword, { dispatch }) => {
    dispatch(userRequest());

    try {
      const res = await loginRequest(form);
      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split("Bearer ")[1]);

      dispatch(userRequestSuccess(res.user));
    } catch (err) {
      dispatch(userRequestFailed());
      console.log(err);
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(userRequest());

    try {
      await logoutRequest();
      deleteCookie('refreshToken');
      deleteCookie('token');

      dispatch(userReset());
    } catch (err) {
      dispatch(userRequestFailed());
      console.log(err);
    }
  }
);

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, { dispatch }) => {
    dispatch(userRequest());

    try {
      const res = await getUserInfo();
      dispatch(userRequestSuccess(res.user));
    } catch (err) {
      dispatch(userRequestFailed());
      console.log(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (form: TEmail & TPassword & TName, { dispatch }) => {
    dispatch(userRequest());

    try {
      const res = await updateUserInfo(form);
      dispatch(userRequestSuccess(res?.user));
    } catch (err) {
      dispatch(userRequestFailed());
      console.log(err);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('token') || getCookie('refreshToken')) {
      try {
        await dispatch(getUserData());
      } catch {
        deleteCookie('refreshToken');
        deleteCookie('token');
        dispatch(userReset());
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    userRequestSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    userReset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.hasError = false;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  // вариант через экстра-редьюсеры:
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(register.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(register.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(register.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     })
  //     .addCase(login.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(login.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     })
  //     .addCase(logout.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.user = null;
  //       state.isLoading = false;
  //     })
  //     .addCase(logout.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     })
  //     .addCase(getUserData.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(getUserData.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(getUserData.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     })
  //     .addCase(updateUser.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(updateUser.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(updateUser.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     })
  //     .addCase(checkUserAuth.pending, (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     })
  //     .addCase(checkUserAuth.fulfilled, (state) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(checkUserAuth.rejected, (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     });
  // },
});

export type TAuthActions =
  | ReturnType<typeof userRequest>
  | ReturnType<typeof userRequestSuccess>
  | ReturnType<typeof userRequestFailed>
  | ReturnType<typeof userReset>
  | ReturnType<typeof setAuthChecked>;

export const {
  userRequest,
  userRequestSuccess,
  userRequestFailed,
  userReset,
  setAuthChecked,
} = authSlice.actions;

export default authSlice.reducer;
