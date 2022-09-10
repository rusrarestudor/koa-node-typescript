import { Movie } from "@prisma/client";
import { rejects } from "assert";

export interface MovieDTO {
    id?: string;
    name?: string;
    director?: string;
    genre?: string;
    relaseDate?: string;
}

 
export class MovieDTO implements MovieDTO{
  public id?: string;
  public name?: string;
  public director?: string;
  public genre?: string;
  public relaseDate?: string;

  constructor(args: MovieDTO) {
    Object.assign(this, args);
  }  

}

export const toMovieDTO = (movie: Movie | null): MovieDTO =>{
  
  console.log(movie)
  const movieDTO = new MovieDTO({name: movie?.name,director: movie?.director,genre: movie?.genre,relaseDate: movie?.relaseDate.toString()});
  console.log(movieDTO)
  return movieDTO;

}
