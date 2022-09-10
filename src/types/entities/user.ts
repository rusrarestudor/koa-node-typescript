import { IsEmail, IsString, IsEmpty } from "class-validator"

export interface User {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    admin?: boolean
    disable?: boolean
}
 
export class User implements User{

    @IsEmpty({ always: true, message: 'Do not send the ID!' })
    id?: boolean

    @IsEmail()
    email?: boolean

    @IsString()
    firstName?: boolean

    @IsString()
    lastName?: boolean


    admin?: boolean


    disable?: boolean

  constructor(args: User) {
    Object.assign(this, args);
  }  

}