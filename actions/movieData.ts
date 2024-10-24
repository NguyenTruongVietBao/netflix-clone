import {getApiResponse} from "@/lib/request";

export const fetchTrending = async () => {
    const data = await getApiResponse('/trending/movie/week');
    const dataTrending = data.results;

    return dataTrending;
}

export const fetchGenreMovies = async () => {
    const data = await getApiResponse("/genre/movie/list")
    const genres = data.genres
    for (const genre of genres) {
        const data = await getApiResponse(`/discover/movie?with_genres=${genre.id}`)
        // Add movies array to genre object --> For examples: genre = { id: 28, name: 'Action', movies: [ ... ]},
        genre.movies = data.results
    }

    return genres
}

export const searchMovies = async (query: string) => {
    const data = await getApiResponse(`/search/movie?query=${query}`)
    const searchMoviesData = data.results

    return searchMoviesData
}

export const fetchMovieDetails = async (id: number) => {
    const movieDetailsData = await getApiResponse(`/movie/${id}?append_to_response=videos`)

    return movieDetailsData
}