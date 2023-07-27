import reducer, { initialState } from "@/store/reducer";
import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ID_URL } from "@/api/URLS";
import ISerial from "@/interfaces/ISerial";
import IInfo from "@/interfaces/IInfo";
import api from "@/api/api";
import Loader from "@/components/UI/Loader/Loader";
import "./Page.css";

const Page = () => {
    const { pageName } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { serial, isLoading } = state;

    const filmInfo: IInfo[] = [
        {
            category: "Rating: ",
            info:
                serial.rating.average === null
                    ? "No information."
                    : serial.rating.average,
        },
        { category: "Premiered: ", info: serial.premiered },
        {
            category: "Genres: ",
            info:
                serial.genres.length === 0
                    ? "No information."
                    : serial.genres.join(", "),
        },
        { category: "Status: ", info: serial.status },
        {
            category: "Official site: ",
            info:
                serial.webChannel !== null
                    ? serial.webChannel.officialSite
                    : "No information.",
        },
    ];

    const request = useCallback(async () => {
        dispatch({ type: "START_LOADING" });
        const { data: serialResponse } = await api.get<ISerial>(
            ID_URL + pageName!
        );
        dispatch({ type: "SET_SERIAL", payload: serialResponse });
        dispatch({ type: "STOP_LOADING" });
    }, [pageName]);

    const renderInfo = () => {
        return filmInfo.map((film: IInfo, index: number) => (
            <p key={index} className="film__subtitle">
                <span className="film__category">{film.category}</span>
                {film.category === "Official site: " ? (
                    film.info === "No information." ? (
                        "No information."
                    ) : (
                        <a href={film.info}>{film.info}</a>
                    )
                ) : (
                    film.info
                )}
            </p>
        ));
    };

    const transformSummary = (text: ReactNode) => {
        const description = document.querySelector("#description");
        const temporaryElement = document.createElement("span");
        temporaryElement.innerHTML = `${text}`;
        return (description!.textContent = temporaryElement.textContent);
    };

    useEffect(() => {
        request();
    }, [request]);

    return (
        <>
            {isLoading && <Loader />}
            <div className="film">
                <div className="film__poster">
                    <img
                        src={serial.image.original}
                        alt="image"
                        className="film__image"
                    />
                </div>
                <div className="film__info">
                    <h2 className="film__title">{serial.name}</h2>
                    {renderInfo()}
                </div>
                <p className="film__subtitle">
                    <span className="film__category">Description: </span>
                    <span id="description" className="film__description">
                        {serial.summary === null || serial.summary === ""
                            ? "No information."
                            : transformSummary(serial.summary)}
                    </span>
                </p>
            </div>
        </>
    );
};

export default Page;
