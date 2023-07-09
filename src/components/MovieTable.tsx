import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { movieCompanyData, movieData, movieTableData } from "../App";
import styled, { css } from "styled-components";
import { useState } from "react";

type MovieTable = {
    movieTableData:movieTableData[], 
    setSelectedMovie:any,
    setShow:any
}

const StyledTable = styled.table`
    padding: 5px;
    margin: 10px;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    thead tr {
        background-color: darkmagenta;
        color: #ffffff;
        text-align: left;
    }

    tbody {
        tr:nth-child(odd) {
          background-color: orchid;
        }
        tr:hover {
          background-color: lightpink;
        }
      }
`;

type StyledTrProps = {
    theme?: string
}

const StyledTr =styled.tr<StyledTrProps>`
    ${StyledTrProps => {
        if(StyledTrProps.theme === 'active') {
            return css`
                background-color: deeppink;
            `
        }
    }}
   
`;


export const MovieTable = ({movieTableData, setSelectedMovie, setShow} : MovieTable) => {

    const [selectedRow, setSelectedRow] = useState(-1);

    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Review</th>
                    <th>Film Company</th>
                </tr>
            </thead>
            <tbody>
            {movieTableData.map((movie: movieTableData, index: number) => 
                <StyledTr key={index} theme={index===selectedRow ? 'active' : ''} onClick={() => {setSelectedMovie(movie); setShow(true); setSelectedRow(index)}}>
                    <td>{movie.title}</td>
                    <td>{movie.reviews}</td>
                    <td>{movie.company}</td>
                </StyledTr>
            )}
            </tbody>
        </StyledTable>
    );
}