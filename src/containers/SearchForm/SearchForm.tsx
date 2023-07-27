import reducer, { initialState } from "@/store/reducer";
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAME_URL } from "@/api/URLS";
import ISerialTitle from "@/interfaces/ISerialTitle";
import IResponse from "@/interfaces/IResponse";
import api from "@/api/api";
import "./SearchForm.css";

const SearchForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let { text, serialNames } = state;
    const navigate = useNavigate();

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`${serialNames[0].id}`);
        dispatch({ type: "SET_TEXT", payload: "" });
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_TEXT", payload: e.target.value });
    };

    const requestSerials = useCallback(
        async (text: string) => {
            const { data: serialResponse } = await api.get(NAME_URL + text);
            const names = await serialResponse.map((serial: IResponse) => {
                return { name: serial.show.name, id: serial.show.id };
            });
            dispatch({ type: "SET_SERIAL_NAMES", payload: names });
        },
        [text, serialNames]
    );

    const renderSuggestions = (): JSX.Element | null => {
        return text === "" ? null : (
            <ul className="autocomplete">
                {serialNames.length === 0 ? (
                    <li className="autocomplete__item">No suggestions.</li>
                ) : (
                    serialNames.map((serial: ISerialTitle, index: number) => {
                        return (
                            <Link
                                to={`${serial.id}`}
                                key={index}
                                className="autocomplete__item"
                                onClick={() =>
                                    dispatch({ type: "SET_TEXT", payload: "" })
                                }
                            >
                                {serial.name}
                            </Link>
                        );
                    })
                )}
            </ul>
        );
    };

    useEffect(() => {
        requestSerials(text);
    }, [text]);

    return (
        <div>
            <form className="form" onSubmit={onSubmitHandler}>
                <label className="form__label" htmlFor="search">
                    Search for TV show:{" "}
                </label>
                <input
                    className="form__input"
                    type="text"
                    value={text}
                    id="search"
                    placeholder="Start writing serial name here"
                    onChange={onChangeHandler}
                />
                {renderSuggestions()}
            </form>
        </div>
    );
};

export default SearchForm;
