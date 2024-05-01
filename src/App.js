import { useState } from "react";
import React from "react";
// import StarRating from "./StarRating";

// function Test() {
//   const [ratedStars, setRatedStars] = React.useState(0);
//   return (
//     <div>
//       <StarRating setRatedStars={setRatedStars} />
//       <p>This movie was rated {ratedStars} stars</p>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div>
//       <StarRating
//         maxRating={5}
//         defaultRating={2}
//         color="orange"
//         size={20}
//         messages={["Terrible", "Fair", "Okay", "Good", "Amazing"]}
//       />
//       <StarRating maxRating={10} color="blue" size={36} />
//       <StarRating maxRating={15} defaultRating={7}/>
//       <Test />
//     </div>
//   );
// }

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const APIKEY = "20aff182";
// const APIKEY = "f84fc31d";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const query = "wolf";

  // React.useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=avengers`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  // fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=avengers`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  React.useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <NavBar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {isLoading ? (
          <Loader />
        ) : (
          <MovieList
            movies={movies}
            isOpen1={isOpen1}
            setIsOpen1={setIsOpen1}
          />
        )}
        {/* <MovieList movies={movies} isOpen1={isOpen1} setIsOpen1={setIsOpen1} /> */}
        <WatchedMovies isOpen2={isOpen2} setIsOpen2={setIsOpen2} />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return (
    <React.Fragment>
      <main className="main">{children}</main>
    </React.Fragment>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function MovieList({ isOpen1, movies, setIsOpen1 }) {
  return (
    <div className="box">
      <Button setIsOpen={setIsOpen1}>{isOpen1 ? "–" : "+"}</Button>
      {isOpen1 && (
        <ul className="list">
          {movies &&
            movies.map((movie) => (
              <Movie
                Poster={movie.Poster}
                Title={movie.Title}
                Year={movie.Year}
                key={movie.imdbID}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

function Button({ children, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {children}
    </button>
  );
}

function Movie({ Poster, Title, Year }) {
  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMovies({ isOpen2, setIsOpen2 }) {
  const [watched, setWatched] = useState([]);

  return (
    <div className="box">
      <Button setIsOpen={setIsOpen2}>{isOpen2 ? "–" : "+"}</Button>
      {isOpen2 && (
        <React.Fragment>
          <WatchedSummary watched={watched} />

          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovie
                Poster={movie.Poster}
                Title={movie.Title}
                imdbRating={movie.imdbRating}
                userRating={movie.userRating}
                runtime={movie.runtime}
              />
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
}

function WatchedMovie({ Poster, Title, imdbRating, userRating, runtime }) {
  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function Loader() {
  return <div className="loader">Loading...</div>;
}
