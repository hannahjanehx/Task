import { StyledParagraph } from "../App";
import { Container } from "./Container";

type ReviewSubmitResponse = {
    show: boolean,
    setShow: any,
    message: string,
    setMovieReview: any
}

export const ReviewSubmitResponse = ({show, setShow, message, setMovieReview} : ReviewSubmitResponse) => {
    if(message === '') {
        setMovieReview({
          message: 'There was an error submitting your review, please try again.'
        });
    }
    return (
        <Container title="Submission Complete" show={show} onClose={() => {setShow(false); setMovieReview({message: ''})}}>
            <StyledParagraph>
                {message}
            </StyledParagraph>
        </Container>
    );
}