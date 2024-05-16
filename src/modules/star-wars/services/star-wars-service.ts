import axios from "axios";

import StarWarsApiResult from "../interfaces/star-wars-api-result";

class StarWarsService {
    private static starWarsApi = import.meta.env.VITE_STAR_WARS_URL + '/api';

    static getCharactersAsync(page: number) {
        return axios.get<StarWarsApiResult>(`${StarWarsService.starWarsApi}/people/?page=${page}`);
    }
}

export default StarWarsService