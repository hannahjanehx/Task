import { useRef, useState, Children, useEffect, FC} from 'react';
import { MovieTable } from './components/MovieTable';
import { InsertReview } from './components/InsertReview';
import { ReviewSubmitResponse } from './components/ReviewSubmitResponse';
import styled from 'styled-components';

// declaring types
export type movieCompanyData = {
  id: string,
  name: string
};

export type movieData = {
  cost: number,
  filmCompanyId: string,
  id: string,
  releaseYear: number,
  reviews: number[],
  title: string
};

type reviewBodyData = {
  message: string
};

type reviewResponseData = {
  message: string
};

export type movieTableData = {
  title: string,
  reviews: string,
  company?: string
};

let movieCompanyApiData: movieCompanyData[] = [];

const callMovieCompanyApi = async () => {
  useEffect(() => {
    fetch('https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movieCompanies')
       .then((response) => response.json())
       .then((data) => {
        movieCompanyApiData = data;
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);
}

let movieApiData: movieData[] = [];

const callMovieApi = async () => {
  useEffect(() => {
    fetch('https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movies')
       .then((response) => response.json())
       .then((data) => {
        movieApiData = data;
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);
}

const initialisation = () => {
  callMovieApi();
  callMovieCompanyApi();
}

const formatData = (movieData: movieData[], companyData: movieCompanyData[]) => {
  return movieData.map((movie: movieData, index: number) => {
    
    const tempObject : movieTableData = {
        title: movie.title,
        reviews: (movie.reviews.reduce((total: number, current: number) => (total+current))/movie.reviews.length).toFixed(1),
        company: companyData.find((f: any) => f.id === movie.filmCompanyId)?.name
    }

    return tempObject;
  })
}

// styles

const StyledHeading = styled.h2`
  padding: 10px;
  color: darkmagenta;
`;

const StyledButton = styled.button`
  margin-left: 15px;
  background-color: darkmagenta;
  color: white;
  font-weight: bold;
  padding: 5px;
`;

const StyledLabel = styled.label`
  margin-left: 5px;
`;

export const StyledParagraph = styled.p`
  margin-left: 5px;
`;

const StyledSelection = styled.select`
  margin-left: 5px;
`

export const App = () =>  {

  // loading and loading data error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  initialisation();

  // MOVIE DATA 
  const [movieData, setMovieData] = useState<movieTableData[]>([]);

  useEffect(() => {
    let count = 0;
    let timer = setTimeout(() => {
      count++;

    if(movieCompanyApiData.length > 0 && movieApiData.length > 0 && movieData.length === 0) {

      const movieTableData = formatData(movieApiData, movieCompanyApiData);

      setMovieData(movieTableData);
      setLoading(false);
      setError(false);

    }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if(count >= 5) {
        setError(true);
      }
      if(movieData.length > 0) {
        setLoading(false);
      }
    }
    
  }, [movieApiData, movieCompanyApiData]);

  // for showing and hiding the pop up modal - review  
  const [showReview, setShowReview] = useState(false);
  // for showing and hiding the pop up modal - review response
  const [showReviewResponse, setShowReviewResponse] = useState(false);

   const [movieReview, setMovieReview] = useState<reviewResponseData>({ message: '' });

   const movieReviewSubmission = async ({message} : reviewBodyData) => {

    await fetch('https://comforting-starlight-f3456a.netlify.app/.netlify/functions/submitReview',{
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({message})
    }).then((response) => response.json())
      .then((data) => {
      setMovieReview(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

      setShowReview(false);

      setShowReviewResponse(true);
   };  

  const [selectedMovie, setSelectedMovie] = useState<movieData>(); 

  // commented out, will try and get this working but wanted to get the rest to you asap.
  // const onRefreshHandler = (event: any) => {
  //   event.preventDefault();
  //   initialisation();
  // };
  

  // const refreshButton = (buttonText: string) => {
  //   if (movieData) {
  //     return <StyledButton onClick={onRefreshHandler}>{buttonText}</StyledButton>
  //   } else {
  //     return <StyledParagraph>No movies loaded yet</StyledParagraph>
  //   }   
  // };


  const sortOptionRef = useRef<HTMLSelectElement | null>(null);

  const sortChangeHandler = (event:any) => {
    event.preventDefault();

    const selectedOption = sortOptionRef.current?.value;

    let sortedData: movieTableData[] = [...movieData];
    if(selectedOption) {

      type key = keyof movieTableData;

      if(selectedOption == 'company') {
        sortedData.map((movie: movieTableData, index: number) => { 
          if(!movie.hasOwnProperty('company')) { 
            delete movieData[index];
          } 
        })
      }
        sortedData = sortedData.sort((a, b) => (a[selectedOption as key]! < b[selectedOption as key]! ? -1 : 1));
      
    }

    setMovieData(sortedData);

  }

  return (
    <>
    <div>
      <StyledHeading>Welcome to Movie database!</StyledHeading>
      {loading ? (
        <StyledParagraph>
          Loading...
        </StyledParagraph>
      ) : error ? (
        <StyledParagraph>
          There was an error while loading the data, please refresh the page and try again.
        </StyledParagraph>
      ) : (
        <>
      {/* {refreshButton("Refresh")} */}
      <StyledParagraph>Total movies displayed {movieData.length}</StyledParagraph>

      <StyledLabel>
        Sort Data: 
        <StyledSelection onChange={sortChangeHandler} ref={sortOptionRef}>
          <option>Please select an option</option>
          <option value="title">Title</option>
          <option value="reviews">Review Rating</option>
          <option value="company">Production Company</option>
        </StyledSelection>
      </StyledLabel>

      <MovieTable movieTableData={movieData} setSelectedMovie={setSelectedMovie} setShow={setShowReview} />

      <br/>
      <div>
        <StyledParagraph>{selectedMovie ? selectedMovie.title as string ? "You have selected " +  selectedMovie.title  as any : "No Movie Title" : "No Movie Selected"}</StyledParagraph>
        {selectedMovie && 
          <InsertReview movieTitle={selectedMovie.title} submitReview={movieReviewSubmission} show={showReview} setShow={setShowReview} />
        }
        {showReviewResponse &&
          <ReviewSubmitResponse message={movieReview.message} show={showReviewResponse} setShow={setShowReviewResponse} setMovieReview={setMovieReview} />
        }
      </div>
      </>)}
  </div>
</>
  );
}