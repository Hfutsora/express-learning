import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

import * as jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import config from "../config";
import { decrypt } from "src/utils/crypto";

class UserController {
  // Authentication

  static signJWT = async (user: { id: any;  email: any; name: any; role: any; age: any }): Promise<string> => {
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        age: user.age,
      },
      config.jwtSecret,
      {
        expiresIn: config.expiration,
        issuer: config.issuer,
        audience: config.audience,
      },
    );

    return token;
  };

  static login = async (req: Request, res: Response): Promise<Response> => {
    // Check if email and password are set
    const { name, password } = req.body;
    if (!(name && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { name } });
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
    // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //   res.status(401).send();
    //   return;
    // }

    // Sing JWT, valid for 1 hour
    const token = await UserController.signJWT(user);

    // Send the jwt in the response
    return res.send({ token });
  };

 
  // Create & Update
  static newUser = async (req: Request, res: Response): Promise<Response> => {
    // Get parameters from the body
    const { email, password, name, age } = req.body;
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.age = age;

    // Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Hash the password, to securely store on DB
    user.hashPassword();

    // Try to save. If fails, the email is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("email already in use");
      return;
    }

    // If all ok, send 201 response
    return res.status(201).send("User created");
  };

  // Get user by ID
  static getOneById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "email", "name", "role", "createdAt", 'age'],
      });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(404).send("User not found");
    }
  };

  static getOwnUser = async (req: Request, res: Response): Promise<Response> => {
    const token: any = jwtDecode(req.headers.authorization);

    const id = token.userId;

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "email", "name", "role", "age", "createdAt"],
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
  };
}

export default UserController;
