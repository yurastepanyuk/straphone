import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transacrion1757493417278 implements MigrationInterface {
  name = 'Transacrion1757493417278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP CONSTRAINT "FK_4edd081e163dc52c913e5198c78"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP COLUMN "transactionId"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "callEventId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP CONSTRAINT "FK_904e1613ce37835745932efa1ab"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ALTER COLUMN "customerId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_94c0fdb0c15ae19d99ec6e967b5"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "customerId"
            SET NOT NULL
        `);
    // await queryRunner.query(`
    //         ALTER TABLE "transaction" DROP COLUMN "sum"
    //     `);
    // await queryRunner.query(`
    //         ALTER TABLE "transaction"
    //         ADD "sum" integer NOT NULL DEFAULT '0'
    //     `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN sum TYPE integer
            USING sum::integer;
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "tariffId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            CREATE INDEX "call-event-customerId_index" ON "callEvent" ("customerId")
        `);
    await queryRunner.query(`
            CREATE INDEX "transaction-customerId_index" ON "transaction" ("customerId")
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD CONSTRAINT "FK_904e1613ce37835745932efa1ab" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "fk_transaction_callEvent" FOREIGN KEY ("callEventId") REFERENCES "callEvent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_94c0fdb0c15ae19d99ec6e967b5" FOREIGN KEY ("tariffId") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_94c0fdb0c15ae19d99ec6e967b5"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "fk_transaction_callEvent"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP CONSTRAINT "FK_904e1613ce37835745932efa1ab"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customerId_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customerId_index"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "tariffId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "sum"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "sum" numeric(10, 2) NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "customerId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_94c0fdb0c15ae19d99ec6e967b5" FOREIGN KEY ("tariffId") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ALTER COLUMN "customerId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD CONSTRAINT "FK_904e1613ce37835745932efa1ab" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "callEventId"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD "transactionId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD CONSTRAINT "FK_4edd081e163dc52c913e5198c78" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
