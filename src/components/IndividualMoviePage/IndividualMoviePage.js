import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./IndividualMoviePage.css";

const api_key = "765ece2c111fb5c30abfeb28d365ac2c";
// const movie_id = "503736";

export default function IndividualMoviePage() {
  const [individual, setIndividual] = useState([])
  const [error, setError] = useState(null);

  const { movie_id }  = useParams();


  useEffect(() => {

    // const fetchIndividual = async () => {

    //   const { data, error } = await apiClient.fetchIndivMovie();
    //   if (data) setIndividual(data);
    //   if (error) setError(error);

    // };
    const fetchIndividual = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/` + movie_id + `?api_key=` +
          api_key +
          `&language=en-US`
      );
      const responseData = await data.json();
      if (responseData) {
        setIndividual(responseData);
      }
    };


    fetchIndividual();
  }, []);

  console.log(individual)
  const poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${individual.poster_path}`;
  return (
    <div className="individualMoviePage">
      <div className="column">
        <div className="top">
          <div className="left">
            <div className="moviePoster">
              <img className="poster" src={poster} alt="movie poster" />
            </div>
            <div className="movieTitle">{individual.original_title}</div>
            <div className="releaseDate">Release date: {individual.release_date}</div>
            <div className="rating">Rating {individual.vote_average}/10</div>
            <div className="duration">Duration: {individual.runtime} minutes</div>
          </div>
          <div className="right">
            <Link to="/shopping-cart">
              <button>Purchase</button>
            </Link>
          </div>
        </div>
        <div className="movieDescription">
          <p>
            {individual.overview}
          </p>
        </div>
        <div className="discussionSection">
          <p>Discussion:</p>
        </div>
      </div>
    </div>
  );
}
