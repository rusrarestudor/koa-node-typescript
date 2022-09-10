import { MovieRepo } from "../repos/movie.repo";
import { MovieDTO } from "../dtos/movie.dto"
import { Service} from 'typedi'

@Service()
export class MovieService{
    readonly movieRepo : MovieRepo
    constructor() {
        this.movieRepo = new MovieRepo();
     }

    getInstance(data: MovieDTO): Promise<MovieDTO>{
        return this.movieRepo.getInstance(data);
    }
  
    public async getData(): Promise<Array<MovieDTO>> {
        return await this.movieRepo.findMovies();
    }

    public async getById(id: string): Promise<MovieDTO> {
        return await this.movieRepo.findMovie(id);
    }

    public async create(movieDTO: MovieDTO, entityAlreadyCreated?: Promise<MovieDTO> ): Promise<MovieDTO> {
        if(entityAlreadyCreated){
            const promise = Promise.resolve(movieDTO)
            return  promise;
        }else{
            return await this.movieRepo.createMovie(movieDTO);
        }
    }

}


