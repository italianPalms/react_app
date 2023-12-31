import React, { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";

export default function Movies() {

    const [movies, setMovies] = useState([]);
    const [footerVisible, setFooterVisible] = useState(false);
    const contentRef = useRef(null);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2VjYzJmNTAyNTUwNWYzYTYyMzc3OGZhNzgzMTY0NiIsInN1YiI6IjYzZTdjNmQ2MTI3Nzc4MDA4OTVmMDg3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wtHvOjgCOPgJELSD4gF3ofi_H71MW1P5QxxaCHCMHCQ'
        }
      };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
                const data = await response.json();
                //Extract the results array from the API reponse
                const movieList = data.results || [];
                // console.log(movieList);
                setMovies(movieList);
                console.log(movieList);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        // handle scrolling to make sure the footer is not visible before the user scroll all the way down
        function handleScroll() {
            // calculate how far the user has scrolled down
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const contentTop = contentRef.current.offsetTop;
            const contentHeight = contentRef.current.clientHeight;


            // when the user has scrolled to the end of the content, show the footer
            if(scrollY + windowHeight >= contentTop + contentHeight /2) {
                setFooterVisible(true);
            } else {
            setFooterVisible(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // TODO: Add functionality to search for movies (including a search bar that cbecomes visible when the user click the search icon)

    return (
        <>
        <div className="relative">
            <div className="flex-1" ref={contentRef}>
                <div className="mt-16">
                    <div className="flex flex-col items-center justify-center mb-6 pt-4 pb-2">
                        <h1 className="font-semibold sm:text-2xl md:text-3xl lg:text-4xl">Movies</h1>
                    </div>
                </div>
                <div className="flex flex-wrap pl-5 pr-10 mb-10">
                    {movies.map((movie) => (
                    <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                        <div className="text-center">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                            className="mx-auto mb-2"/>
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <p className="font-medium">{movie.vote_average}</p>
                        </div>
                    </div>
                    ))}
                </div>
                {movies.map((movie) => {
                return <pre className="whitespace-pre-wrap ml-5" key={movie.id}>{JSON.stringify(movie, null, 2)}</pre>
                })}
            </div>
            <Footer className={footerVisible ? "sticky-footer footerVisible" : "sticky-footer"} />
        </div>
        </>
    )
}