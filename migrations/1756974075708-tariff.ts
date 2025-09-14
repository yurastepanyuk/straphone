import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tariff1756974075708 implements MigrationInterface {
  name = 'Tariff1756974075708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "balance" DROP CONSTRAINT "FK_cf4582c980772ff3fa19b513ede"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ALTER COLUMN "customerId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "balance" DROP COLUMN "balance"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD "balance" integer NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff" DROP CONSTRAINT "UQ_b3980ba974e3ae6569836192678"
        `);
    await queryRunner.query(`
            ALTER TABLE tariff
            ALTER COLUMN name TYPE character varying(128),
            ALTER COLUMN name SET NOT NULL;
        `);
    // await queryRunner.query(`
    //         ALTER TABLE "tariff"
    //         ADD "name" character varying(128) NOT NULL
    //     `);
    await queryRunner.query(`
            ALTER TABLE "tariff"
            ADD CONSTRAINT "UQ_b3980ba974e3ae6569836192678" UNIQUE ("name")
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD CONSTRAINT "balance_positive" CHECK (balance >= 0)
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD CONSTRAINT "FK_cf4582c980772ff3fa19b513ede" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "balance" DROP CONSTRAINT "FK_cf4582c980772ff3fa19b513ede"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance" DROP CONSTRAINT "balance_positive"
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff" DROP CONSTRAINT "UQ_b3980ba974e3ae6569836192678"
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff"
            ADD CONSTRAINT "UQ_b3980ba974e3ae6569836192678" UNIQUE ("name")
        `);
    await queryRunner.query(`
            ALTER TABLE "balance" DROP COLUMN "balance"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD "balance" numeric(10, 2) NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ALTER COLUMN "customerId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD CONSTRAINT "FK_cf4582c980772ff3fa19b513ede" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
