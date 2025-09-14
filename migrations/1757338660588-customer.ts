import { MigrationInterface, QueryRunner } from "typeorm";

export class Customer1757338660588 implements MigrationInterface {
    name = 'Customer1757338660588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "authTokensWeb" DROP CONSTRAINT "FK_3b5e949b14eacf9e0861e86e13b"
        `);
        await queryRunner.query(`
            ALTER TABLE "balance" DROP CONSTRAINT "FK_cf4582c980772ff3fa19b513ede"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "FK_78d94d5aad3c8316811d5ee537a"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "FK_3849b77eab8cbec7d131a167dfe"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "FK_d54eed24beee95d2581787d2a18"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."customer_customer_web_index"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."customer_balance_index"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "REL_3849b77eab8cbec7d131a167df"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "customerWebId"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "REL_d54eed24beee95d2581787d2a1"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "balanceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ALTER COLUMN "customerWebId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ALTER COLUMN "tariffId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "UQ_78d94d5aad3c8316811d5ee537a" UNIQUE ("tariffId")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_tariff_uindex" ON "customer" ("tariffId")
        `);
        await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ADD CONSTRAINT "fk_authTokensWeb_customerWebId" FOREIGN KEY ("customerWebId") REFERENCES "customerWeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "balance"
            ADD CONSTRAINT "fk_balance_customerId" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "fk_customer_tariff" FOREIGN KEY ("tariffId") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "fk_customer_tariff"
        `);
        await queryRunner.query(`
            ALTER TABLE "balance" DROP CONSTRAINT "fk_balance_customerId"
        `);
        await queryRunner.query(`
            ALTER TABLE "authTokensWeb" DROP CONSTRAINT "fk_authTokensWeb_customerWebId"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."customer_tariff_uindex"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "UQ_78d94d5aad3c8316811d5ee537a"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ALTER COLUMN "tariffId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ALTER COLUMN "customerWebId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "balanceId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "REL_d54eed24beee95d2581787d2a1" UNIQUE ("balanceId")
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "customerWebId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "REL_3849b77eab8cbec7d131a167df" UNIQUE ("customerWebId")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_balance_index" ON "customer" ("balanceId")
        `);
        await queryRunner.query(`
            CREATE INDEX "customer_customer_web_index" ON "customer" ("customerWebId")
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_d54eed24beee95d2581787d2a18" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_3849b77eab8cbec7d131a167dfe" FOREIGN KEY ("customerWebId") REFERENCES "customerWeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_78d94d5aad3c8316811d5ee537a" FOREIGN KEY ("tariffId") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "balance"
            ADD CONSTRAINT "FK_cf4582c980772ff3fa19b513ede" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ADD CONSTRAINT "FK_3b5e949b14eacf9e0861e86e13b" FOREIGN KEY ("customerWebId") REFERENCES "customerWeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
