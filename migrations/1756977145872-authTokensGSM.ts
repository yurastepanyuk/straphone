import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthTokensGSM1756977145872 implements MigrationInterface {
  name = 'AuthTokensGSM1756977145872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP CONSTRAINT "FK_1a5e65ddcc98f170000468b4340"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD CONSTRAINT "fk_authTokensGSM_customerId" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP CONSTRAINT "fk_authTokensGSM_customerId"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD CONSTRAINT "FK_1a5e65ddcc98f170000468b4340" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
