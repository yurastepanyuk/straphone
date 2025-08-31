import { MigrationInterface, QueryRunner } from 'typeorm';

export class CallEventCustomerIdx1756110733202 implements MigrationInterface {
  name = 'CallEventCustomerIdx1756110733202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX "call-event-customer_index" ON "callEvent" ("customerId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."call-event-customer_index"
        `);
  }
}
