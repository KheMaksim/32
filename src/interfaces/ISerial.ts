import { ReactNode } from "react";

export default interface ISerial {
    image: {
        original: string;
    };
    name: string;
    rating: {
        average: string;
    };
    premiered: string;
    genres: string[];
    status: string;
    webChannel: {
        officialSite: string;
    } | null;
    summary: ReactNode;
}
