import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthTokensGSM1756976395464 implements MigrationInterface {
  name = 'AuthTokensGSM1756976395464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP CONSTRAINT "FK_1a5e65ddcc98f170000468b4340"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ALTER COLUMN "customerId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD CONSTRAINT "FK_1a5e65ddcc98f170000468b4340" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP CONSTRAINT "FK_1a5e65ddcc98f170000468b4340"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ALTER COLUMN "customerId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD CONSTRAINT "FK_1a5e65ddcc98f170000468b4340" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
