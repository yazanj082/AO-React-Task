import StarWarsCharacter from "./star-wars-character";

interface StarWarsApiResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: StarWarsCharacter[];
}

export default StarWarsApiResult;