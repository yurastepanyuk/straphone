import { MigrationInterface, QueryRunner } from 'typeorm';

export class TariffCost1756654371202 implements MigrationInterface {
  name = 'TariffCost1756654371202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE tariff
            ALTER COLUMN cost TYPE integer
            USING cost::integer;
        `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_: QueryRunner): Promise<void> {
    //
  }
}
