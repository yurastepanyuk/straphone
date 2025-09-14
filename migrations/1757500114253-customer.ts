import { MigrationInterface, QueryRunner } from 'typeorm';

export class Customer1757500114253 implements MigrationInterface {
  name = 'Customer1757500114253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."call-event-customerId_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_IMSI_uindex"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_d7ac55b2a591ed25842a6a7f3b"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."transaction-customerId_index"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "UQ_43a2be0a1b1aadfbba6c6d9f747"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "IMSI"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "customerWeb"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "customerWeb"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "imsi" character varying(38) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "UQ_94c1d5073398e7a5ee6b43dc6b2" UNIQUE ("imsi")
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff"
            ADD "updatedBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "createdBy" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "updatedBy" integer
        `);
    // await queryRunner.query(`
    //         CREATE INDEX "customerId_index" ON "callEvent" ("customerId")
    //     `);
    await queryRunner.query(`
            CREATE INDEX "call-event-customer_index" ON "callEvent" ("customerId")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_imsi_uindex" ON "customer" ("imsi")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_11a1003f4d79400e220f9519e6" ON "customer" ("phoneNumber", "imsi")
        `);
    await queryRunner.query(`
            CREATE INDEX "transaction-customerId_index" ON "transaction" ("customerId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."customerId_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_11a1003f4d79400e220f9519e6"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_imsi_uindex"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."call-event-customer_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customerId_index"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "tariff" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "UQ_94c1d5073398e7a5ee6b43dc6b2"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "imsi"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "customerWeb" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "customerWeb" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensWeb" DROP COLUMN "updatedBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensWeb" DROP COLUMN "createdBy"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "IMSI" character varying(38) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "UQ_43a2be0a1b1aadfbba6c6d9f747" UNIQUE ("IMSI")
        `);
    await queryRunner.query(`
            CREATE INDEX "transaction-customerId_index" ON "transaction" ("customerId")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_d7ac55b2a591ed25842a6a7f3b" ON "customer" ("phoneNumber", "IMSI")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_IMSI_uindex" ON "customer" ("IMSI")
        `);
    await queryRunner.query(`
            CREATE INDEX "call-event-customerId_index" ON "callEvent" ("customerId")
        `);
  }
}
