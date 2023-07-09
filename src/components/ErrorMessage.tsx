import { FC } from "react";
import { Container } from "./Container";

type ErrorMessage = {
    errorTitle:string, 
    errorMessage:string
}

export const ErrorMessage = ({errorTitle, errorMessage} : ErrorMessage) => {
    return (
        <div>
            <h4>{errorTitle}</h4>
            <div>
                <p>{errorMessage}</p>
            </div>
        </div>

    );
}