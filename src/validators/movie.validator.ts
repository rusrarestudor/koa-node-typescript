import { IsDate, IsDefined, IsEmpty, IsString } from "class-validator";


export class MovieValidator{

    @IsEmpty({ always: true, message: "Do not send ID" })
    id!: string;

    @IsString()
    @IsDefined({message: "Empty name field" })
    name!: string;

    @IsString()
    @IsDefined({message: "Empty director field" })
    director!: string;

    @IsString()
    @IsDefined({message: "Empty genre field" })
    genre!: string;

    @IsString()
    @IsDefined({message: "Empty relaseDate field" })
    relaseDate!: string;
}