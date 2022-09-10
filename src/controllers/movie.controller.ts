import { JsonController, Param, Body, Get, Post, Patch, Delete, Ctx } from 'routing-controllers';
import { Context } from 'koa';
import { MovieService } from '../services/movie.service';
import { Service } from 'typedi';
import { MovieDTO } from '../dtos/movie.dto';



@JsonController('/movies')
@Service()
export class MovieController{

  constructor(private readonly movieService: MovieService) {
  }
  
  @Get()
  getAll(@Ctx() ctx: Context) {
    return this.movieService.getData()
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.movieService.getById(id.toString());
  }

  @Post()
  post(@Body() movie: any) {
    const instance: Promise<MovieDTO> = this.movieService.getInstance(movie)
    return this.movieService.create(movie, instance);
  }

  @Patch('/:id')
  put(@Param('id') id: number, @Body() movie: any) {
    return 'Updating a movie...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing movie #' + id;
  }

}
