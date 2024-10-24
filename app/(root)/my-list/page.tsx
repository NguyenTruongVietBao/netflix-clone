import {fetchMovieDetails} from "@/actions/movieData";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import {Movie} from "@/lib/types";
import {fetchMyList} from "@/actions/user";


const MyList = async () => {
    const myList = await fetchMyList();

    const myListDetails = await Promise.all(
        myList.map(async (movieId: number) => {
            const movieDetails = await fetchMovieDetails(movieId);
            return movieDetails;
        })
    );

    return (
        <>
            <Navbar />
            <div className="list">
                {myListDetails.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </>
    );
};

export default MyList;
