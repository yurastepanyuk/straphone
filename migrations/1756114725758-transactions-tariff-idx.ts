import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionsTariffIdx1756114725758 implements MigrationInterface {
  name = 'TransactionsTariffIdx1756114725758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX "transaction_tariff_index" ON "transaction" ("tariffId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."transaction_tariff_index"
        `);
  }
}
