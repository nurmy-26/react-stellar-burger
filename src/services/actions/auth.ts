import { getUserInfo, loginRequest, logoutRequest, registerRequest, updateUserInfo } from '../../utils/api';
import { getCookie, deleteCookie, setCookie } from "../../utils/cookie";
import { TEmail, TPassword, TName, AppDispatch, AppThunk, TUser } from '../../utils/types';


export const USER_REQUEST = 'USER_REQUEST';
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED';
export const USER_RESET = 'USER_RESET';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';


export type TUserRequestAction = { readonly type: typeof USER_REQUEST; };
export type TUserRequestSuccessAction = {
  readonly type: typeof USER_REQUEST_SUCCESS;
  readonly user: TUser;
};
export type TUserRequestFailedAction = { readonly type: typeof USER_REQUEST_FAILED; };
export type TUserResetAction = { readonly type: typeof USER_RESET; };
export type TSetAuthCheckedAction = {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly checked: boolean;
};

export type TAuthActions = TUserRequestAction | TUserRequestSuccessAction | TUserRequestFailedAction |
  TUserResetAction | TSetAuthCheckedAction;


// генератор экшена выставления статуса проверки авторизации
const setAuthChecked = (bool: boolean): TSetAuthCheckedAction => {
  return {
    type: SET_AUTH_CHECKED,
    checked: bool
  }
}

// экшены со вторым return вернут промис
// генератор асинхронного экшена регистрации
export const register: AppThunk = (form: TEmail & TPassword & TName) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: USER_REQUEST });

    return registerRequest(form).then(res => {
      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split("Bearer ")[1]);

      dispatch({
        type: USER_REQUEST_SUCCESS,
        user: res.user
      })
    })
    .catch(err => {
      dispatch({
        type: USER_REQUEST_FAILED
      })
      console.log(err)
    })
    .finally(() => dispatch(setAuthChecked(true)))
  }
}

// генератор асинхронного экшена логина
export const login: AppThunk = (form: TEmail & TPassword) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: USER_REQUEST });

    return loginRequest(form).then(res => {
      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split("Bearer ")[1]);

      dispatch({
        type: USER_REQUEST_SUCCESS,
        user: res.user
      })
    })
    .catch(err => {
      dispatch({
        type: USER_REQUEST_FAILED
      })
      console.log(err)
    })
    .finally(() => dispatch(setAuthChecked(true)))
  }
}

// генератор асинхронного экшена логаута
export const logout: AppThunk = () => {
  return function(dispatch) {
    dispatch({ type: USER_REQUEST });

    return logoutRequest().then(() => {
      deleteCookie('refreshToken');
      deleteCookie('token');

      dispatch({
        type: USER_RESET
      })
    })
    .catch(err => {
      dispatch({
        type: USER_REQUEST_FAILED
      })
      console.log(err)
    })
  }
}

// генератор асинхронного экшена получения данных пользователя
export const getUserData: any = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: USER_REQUEST });

    return getUserInfo().then(res => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
        user: res.user
      })
    })
    .catch(err => {
      dispatch({
        type: USER_REQUEST_FAILED
      })
      console.log(err)
    })
  }
}

// генератор асинхронного экшена обновления данных пользователя
export const updateUser: AppThunk = (form: TEmail & TPassword & TName) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: USER_REQUEST });

    return updateUserInfo(form).then(res => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
        user: res.user
      })
    })
    .catch(err => {
      dispatch({
        type: USER_REQUEST_FAILED
      })
      console.log(err)
    })
  }
}

// генератор асинхронного экшена проверки авторизации по токену
export const checkUserAuth: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    // если токен есть, выполняем запрос на получение данных пользователя и сохраняем их в store
    if (getCookie('token') || getCookie('refreshToken')) {
      dispatch(getUserData())
      .catch(() => {
        deleteCookie('refreshToken');
        deleteCookie('token');
        dispatch({
          type: USER_RESET
        })
      })
      .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};
