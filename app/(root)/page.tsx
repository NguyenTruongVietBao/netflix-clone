import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {Genre} from "@/lib/types";
import {fetchGenreMovies} from "@/actions/movieData";
import CategoryList from "@/components/CategoryList";

const Home = async () => {
    const genres = await fetchGenreMovies()
    return (
        <div>
            <Navbar/>
            <Hero/>
            <div className="all-movies">
                {genres.map((genre: Genre) => (
                    <CategoryList key={genre.id} title={genre.name} movies={genre.movies}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
