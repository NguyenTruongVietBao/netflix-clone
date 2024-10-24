import MovieCard from "./MovieCard"
import {Movie} from "@/lib/types";

interface Props {
    title: string,
    movies: Movie[]
}

const CategoryList = ({ title, movies }: Props) => {
    return (
        <div className="category">
            <h1 className="category-title">{title}</h1>

            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default CategoryList