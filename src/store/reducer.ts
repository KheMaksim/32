import ISerial from "@/interfaces/ISerial";
import ISerialTitle from "@/interfaces/ISerialTitle";

interface State {
    text: string;
    serialNames: ISerialTitle[];
    serial: ISerial;
    isLoading: boolean;
}

const SET_TEXT = "SET_TEXT";
const SET_SERIAL_NAMES = "SET_SERIAL_NAMES";
const SET_SERIAL = "SET_SERIAL";
const START_LOADING = "START_LOADING";
const STOP_LOADING = "STOP_LOADING";

type StartLoading = {
    type: typeof START_LOADING;
};

type StopLoading = {
    type: typeof STOP_LOADING;
};

type SetText = {
    type: typeof SET_TEXT;
    payload: string;
};

type SetSerialNames = {
    type: typeof SET_SERIAL_NAMES;
    payload: ISerialTitle[];
};

type SetSerial = {
    type: typeof SET_SERIAL;
    payload: ISerial;
};

type Actions =
    | SetText
    | SetSerialNames
    | SetSerial
    | StartLoading
    | StopLoading;

export const initialState: State = {
    text: "",
    serialNames: [],
    serial: {
        image: {
            original: "",
        },
        name: "",
        rating: {
            average: "",
        },
        premiered: "",
        genres: [],
        status: "",
        webChannel: {
            officialSite: "",
        },
        summary: "",
    },
    isLoading: false,
};

const reducer = (state: State, action: Actions) => {
    switch (action.type) {
        case SET_TEXT:
            return {
                ...state,
                text: action.payload,
                serialNames: [],
            };
        case SET_SERIAL_NAMES:
            return {
                ...state,
                serialNames: action.payload,
            };
        case SET_SERIAL:
            return {
                ...state,
                serial: action.payload,
            };
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
