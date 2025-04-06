import { User } from "src/app/model/user/User"
import { AppInitialState } from "../AppInitialState"
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions"
import { loginReducer } from "./login.reducers"
import { LoginState } from "./LoginState"

describe("Login store", () => {
     const defaultLoginState: LoginState = {
        ...AppInitialState.login,
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    }
        
    it('recoverPassword', () => {
        const newState = loginReducer(defaultLoginState, recoverPassword({email: "any@email.com"}));
        expect(newState).toEqual({
            ...defaultLoginState,
            isRecoveringPassword: true
        });
    });

    it('recoverPasswordSuccess', () => {
        const newState = loginReducer(defaultLoginState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...defaultLoginState,
            error: null,
            isRecoveredPassword: true,
        })
    })

    it('recoverPasswordFail', () => {
        const error = {error: 'error'};
        const newState = loginReducer(defaultLoginState, recoverPasswordFail({error}));
        expect(newState).toEqual({
            ...defaultLoginState,
            error,
            isRecoveringPassword: false
        })
    })

    it('login', () => {
        const newState = loginReducer(defaultLoginState, login({email: "valid@email.com", password: "anyPassword"}));
        expect(newState).toEqual({
            ...defaultLoginState,
            isLoggingIn: true
        })
    })

    it('loginSuccess', () => {
        const initialState: LoginState = {
            ...defaultLoginState,
            isLoggingIn: true
        };
        const user = new User();
        user.id = "anyId";
        const newState = loginReducer(initialState, loginSuccess({user}));
        expect(newState).toEqual({
            ...defaultLoginState,
            isLoggedIn: true
        })
    })

    it('loginFail', () => {
        const initialState: LoginState = {
            ...defaultLoginState,
            isLoggingIn: true
        };
        const error = {error: 'error'};
        const newState = loginReducer(initialState, loginFail({error}));
        expect(newState).toEqual({
            ...defaultLoginState,
            error
        })
    })
})