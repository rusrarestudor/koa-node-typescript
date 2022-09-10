import { JsonController, Param, Body, Get, Post, Patch, Delete, Ctx } from 'routing-controllers';
import { Service } from 'typedi';
import { User } from '../types/entities';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import json from 'koa-json';
import { Next, Response } from 'koa';


@JsonController('/auth')
@Service()
export class UserController{
  constructor() {
  }
  @Post('/login')
  login(@Body() userCtx: any) {
    const user = new User(userCtx);
    console.log(user)

    const accessToken = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET as string);
    console.log(accessToken)
    return  accessToken
  }

  @Post('/logout')
  logout(@Body() userCtx: any) {
    const user = new User(userCtx);
    console.log(user)

    const accessToken = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET as string);
    console.log(accessToken)
    return  accessToken
  }

  @Post('/refresh')
  refresh(@Body() userCtx: any) {
    const user = new User(userCtx);
    console.log(user)

    const accessToken = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET as string);
    console.log(accessToken)
    return  accessToken
  }

  

  public authenticateToken = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: Next) => {
    try {
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.split(' ')[1]
      if (!token) {
        res.status = 401;
        res.message = 'Invalid token ';
        return res
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if (err) {
          res.status = 403;
          res.message = 'No Access ';
          return res
        }
        next()
      })
  
      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        res.status = 401;
        res.message = 'Expired token';
        return;
      }
      res.status = 500;
      res.message = 'Failed to authenticate user';
    }

    
  };

}

