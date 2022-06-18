import { ENABLE_ALL,
    ENABLE_ANNOUNCE,
    DISABLE_ANNOUNCE,
    ENABLE_SIGNAL,
    DISABLE_SIGNAL,
    ENABLE_TRAITE,
    DISABLE_TRAITE,
    ENABLE_EN_COURS,
    DISABLE_EN_COURS,
    } from "./actions";

const initialState = {
    all: true,
    signal: false,
    announce: false,
    traite: false,
    enCoursDeTraitement: false,
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENABLE_ALL:
            return { ...state,
                all: true,
                signal: false,
                announce: false,
                traite: false,
                enCoursDeTraitement: false
            };

        case ENABLE_SIGNAL:
            return { ...state,
                all: false,
                signal: true,
                announce: false,
            };
        case DISABLE_SIGNAL:
            return { ...state,
                all: true,
                signal: false,
                announce: false,
            };
        case ENABLE_ANNOUNCE:
            return { ...state,
                all: false,
                signal: false,
                announce: true,
                traite: false,
                enCoursDeTraitement: false,
            };
        case DISABLE_ANNOUNCE:
            return { ...state,
                all: true,
                signal: false,
                announce: false,
            };
        case ENABLE_TRAITE:
            return { ...state,
                traite: true,
                enCoursDeTraitement: false,
                all: false,
                signal: true,
                announce: false,
            };
        case DISABLE_TRAITE:
            return { ...state, traite: false };

        case ENABLE_EN_COURS:
            return { ...state,
                traite: false,
                enCoursDeTraitement: true,
                all: false,
                signal: true,
                announce: false,
                };
        case DISABLE_EN_COURS:
            return { ...state, enCoursDeTraitement: false };
        default:
            return state;
    }
}

export default filterReducer;