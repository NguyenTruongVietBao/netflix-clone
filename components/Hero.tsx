import HeroCard from "./HeroCard"
import {fetchTrending} from "@/actions/movieData";

const Hero = async () => {
    const trending = await fetchTrending()
    const randomNumber = Math.floor(Math.random() * trending.length)
    const trendingMovie = trending[randomNumber]

    return (
        <div>
            <HeroCard trendingMovie={trendingMovie}/>
        </div>
    )
}

export default Hero