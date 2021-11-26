import { User } from "../entity/user/Index";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    user.name = "SORA";
    user.email = "346762712@qq.com";
    user.password = "123456";
    user.role = "ADMIN";
    user.hashPassword();
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
