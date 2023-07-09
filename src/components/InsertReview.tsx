import { useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Container } from "./Container";

type InsertReview = {
    movieTitle: string,
    submitReview: any,
    show: boolean,
    setShow: any
}

export const InsertReview = ({ movieTitle, submitReview, show, setShow } : InsertReview) => {

    const reviewInputRef = useRef<HTMLInputElement | null>(null);

    const [errorState, setErrorState] = useState({
        errorTitle: '',
        errorMessage: ''
    });

    const reviewSubmissionHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const review = reviewInputRef.current?.value ?? '';

        if(review.trim().length === 0) {
        setErrorState({
            errorTitle: 'Missing Review',
            errorMessage: 'Please ensure that a review is added.'
        });
        return;
        }else if(review.trim().length > 100) {
        setErrorState({
            errorTitle: 'Review too long',
            errorMessage: 'Review must be less than 100 characters. Please reduce and submit again.'
        });
        return;
        }

        const reviewData = {
        message: review
        };

        submitReview(reviewData);

        if(reviewInputRef.current !== null) reviewInputRef.current.value = '';
    };

    return (
        <Container title="Time to Review!" show={show} onClose={() => setShow(false)}>
            {errorState && <ErrorMessage errorTitle={errorState.errorTitle} errorMessage={errorState.errorMessage} />}
            <form onSubmit={reviewSubmissionHandler}>
                <label>
                    Review for {movieTitle}:
                    <input type="text" ref={reviewInputRef} />
                </label> 
                <button>Submit Review</button>
            </form>
        </Container>
    );
}