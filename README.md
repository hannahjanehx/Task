Our developer was part way through developing the following feature but left the company and you are tasked with picking up where they left off.

The aim is to complete the piece of work by refactoring and improving the current code to get it to a working state that passes all A/C. Use material UI components and a form library where desirable.

There are Future requirements if you have time.

***A/C***
* Display total number of movies.
* Table must show movie title, average review score to 1 decimal place and company that produces the film.
    * Movie company data comes from movieCompanies GET request.
    * Movies data comes from movies GET request.
    * (Future requirement - review column is sortable)
* User must be able to select table row to leave a review with form appearing when there is a selected movie.
    * POST request to submitReview endpoint, display message returned on response and display instead of form.
    * Form must restrict message to 100 characters and show an error message if over 100 and not allow for submission in this instance.
    * (Future requirement - On mobile, this must appear as information in a modal, anything larger than mobile, this must appear below the table)
* Highlight selected movie row when clicked.
* Handle error and loading states.
* (Future requirement - Button to refresh movies and movie companies)
* (Future requirement - containerise application using docker)

The three endpoints to be used are:
* GET movie companies: https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movieCompanies
* GET movies: https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movies
* POST review: https://comforting-starlight-f3456a.netlify.app/.netlify/functions/submitReview
    * body {review: message}
