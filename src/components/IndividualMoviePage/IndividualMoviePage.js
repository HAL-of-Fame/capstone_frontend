import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IndividualMoviePage.css";
import apiClient from "../Services/apiClient";

const api_key = "765ece2c111fb5c30abfeb28d365ac2c";

export default function IndividualMoviePage() {
  const [individual, setIndividual] = useState([])
  const [error, setError] = useState(null);
  //   if (!user) {
  //     return <NotAllowed />
  //   }

  useEffect(() => {

    const fetchIndividual = async () => {

      const { data, error } = await apiClient.fetchIndivMovie();
      if (data) setIndividual(data);
      if (error) setError(error);

    };
    // const fetchIndividual = async () => {
    //   const data = await fetch(
    //     `https://api.themoviedb.org/3/movie/503736?api_key=` +
    //       api_key +
    //       `&language=en-US`
    //   );
    //   const responseData = await data.json();
    //   if (responseData) {
    //     setIndividual(responseData);
    //   }
    // };


    fetchIndividual();
  }, []);

  console.log(individual)
  return (
    <div className="individualMoviePage">
      <div className="column">
        <div className="top">
          <div className="left">
            <div className="moviePoster"></div>
            <div className="movieTitle">{individual.original_title}</div>
            <div className="releaseDate">Release date: {individual.release_date}</div>
            <div className="rating">Rating {individual.vote_average}/10</div>
            <div className="duration">Duration: {individual.runtime} minutes</div>
          </div>
          <div className="right">
            <Link to="orders">
              <button>Purchase</button>
            </Link>
          </div>
        </div>
        <div className="movieDescription">
          <p>
            Description:
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
