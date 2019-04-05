
import * as ActionTypes from '../../constants/Loading';

interface LoadingInitialState {
    isLoading: boolean;
}

const initialState: LoadingInitialState = {
    isLoading: false
}

const Loading = (state: LoadingInitialState = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SHOW_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.HIDE_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }   
}

export default Loading;