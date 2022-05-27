import { SET_UPVOTED,
    SET_DOWNVOTED,
    SET_SAVED
    } from "./actions";

const initialState = {
    id: undefined,
    upVoted: false,
    downVoted: false,
    saved: false
};

const reactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UPVOTED:
            return { ...state,
                upVoted: true,
                downVoted: false,
                id: action.payload
            };

        case SET_DOWNVOTED:
            return { ...state,
                upVoted: false,
                downVoted: true,
                id: action.payload
            };
        case SET_SAVED:
            return { ...state,
                saved: !saved,
                id: action.payload
            };
        default:
            return state;
    }
}

export default reactionReducer;