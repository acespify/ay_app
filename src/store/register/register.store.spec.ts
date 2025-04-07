import { UserRegister } from "src/app/model/UserRegister";
import { AppInitialState } from "../AppInitialState"
import { registerReducer } from "./register.reducer";
import { register, registerFail, registerSuccess } from "./register.actions";

describe('Register store', () => {

    it('resister', () => {
        const initialState = {
            ...AppInitialState.register
        };
        const newState = registerReducer(initialState, register({userRegister: new UserRegister()}));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRegistered: false,
            isRegistering: true
        })
    })

    it('resisterSuccess', () => {
        const initialState = {
            ...AppInitialState.register,
            isRegistering: true
        };
        const newState = registerReducer(initialState, registerSuccess());
        expect(newState).toEqual({
            ...initialState,
            isRegistered: true,
            isRegistering: false
        })
    })
    it('resisterFail', () => {
        const initialState = {
            ...AppInitialState.register,
            isRegistering: true
        };
        const error = {error: "anyError"};
        const newState = registerReducer(initialState, registerFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRegistered: false,
            isRegistering: false
        })
    })
})