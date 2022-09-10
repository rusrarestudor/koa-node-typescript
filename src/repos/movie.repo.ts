import { MovieDTO, toMovieDTO } from "../dtos/movie.dto";
import { PrismaClient, Prisma  } from '@prisma/client'

export class MovieRepo {

    private prisma: PrismaClient;

    constructor() {
        this.prisma  = new PrismaClient();
    }

    public async findMovie (id: string): Promise<MovieDTO>{
      const correctMovie = await this.prisma.movie.findUnique({
        where: {
          id: +id,
        }
      })
      console.log(correctMovie)
      const promise = Promise.resolve(toMovieDTO(correctMovie))
      return promise;
  }

  public async getInstance (movie: MovieDTO): Promise<MovieDTO>{
    const correctMovie = await this.prisma.movie.findFirst({
      where: {
        name: movie.name
      }
    })
    console.log(correctMovie)
    const promise = Promise.resolve(toMovieDTO(correctMovie))
    return promise;
}



  public async findMovies (): Promise<Array<MovieDTO>>{
    const correctMovies = await this.prisma.movie.findMany({})

    var promises :Promise<MovieDTO>[] = new Array()
    console.log(correctMovies.length)
    correctMovies.forEach((correctMovie) => {
      const promise = Promise.resolve(toMovieDTO(correctMovie))
      promises.push(promise)
    })

    return Promise.all(promises);
}

public async createMovie (movieDTO: MovieDTO ): Promise<MovieDTO>{
  let movie: Prisma.MovieCreateInput
  movie = {
    name: '' + movieDTO.name,
    director: '' + movieDTO.director,
    genre: '' + movieDTO.director,
    relaseDate: ''+ movieDTO.relaseDate,
  }
  
  console.log(movie)
  const correctMovie = await this.prisma.movie.create({ data: movie })
  

  const promise = Promise.resolve(toMovieDTO(correctMovie))
  return promise;
}
}
