import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1756053348879 implements MigrationInterface {
  name = 'Init1756053348879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "authTokensWeb" (
                "id" SERIAL NOT NULL,
                "session" character varying(255) NOT NULL,
                "expired" TIMESTAMP NOT NULL,
                "payload" jsonb,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "customerWebId" integer,
                CONSTRAINT "PK_cc4fdf417e7bc4346ec9aa24efe" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "auth_tokens_web_session_uindex" ON "authTokensWeb" ("session")
        `);
    await queryRunner.query(`
            CREATE INDEX "auth_tokens_web_customer_web_index" ON "authTokensWeb" ("customerWebId")
        `);
    await queryRunner.query(`
            CREATE TABLE "customerWeb" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "pass" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "customerId" integer,
                CONSTRAINT "REL_d0cc26d8dbddec221ad2836db3" UNIQUE ("customerId"),
                CONSTRAINT "PK_4a04fa054eed494c303b3c9a667" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_web_customer_index" ON "customerWeb" ("customerId")
        `);
    await queryRunner.query(`
            CREATE TABLE "authTokensGSM" (
                "id" SERIAL NOT NULL,
                "session" character varying(255) NOT NULL,
                "expired" TIMESTAMP NOT NULL,
                "payload" jsonb,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "customerId" integer,
                CONSTRAINT "PK_7b1e1efbd049061a96a754573f6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "customerId_index" ON "authTokensGSM" ("customerId")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "session_uindex" ON "authTokensGSM" ("session")
        `);
    await queryRunner.query(`
            CREATE TABLE "callEvent" (
                "id" SERIAL NOT NULL,
                "dateStart" TIMESTAMP NOT NULL,
                "dateEnd" TIMESTAMP NOT NULL,
                "duration" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "customerId" integer,
                "transactionId" integer,
                CONSTRAINT "PK_8bee53c92a031b28ce92035293c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "balance" (
                "id" SERIAL NOT NULL,
                "balance" numeric(10, 2) NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "customerId" integer,
                CONSTRAINT "REL_cf4582c980772ff3fa19b513ed" UNIQUE ("customerId"),
                CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "balance_customer_uindex" ON "balance" ("customerId")
        `);
    await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" SERIAL NOT NULL,
                "phoneNumber" character varying NOT NULL,
                "IMSI" character varying(38) NOT NULL,
                "active" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "tariffId" integer,
                "customerWebId" integer,
                "balanceId" integer,
                CONSTRAINT "UQ_2e64383bae8871598afb8b73f0d" UNIQUE ("phoneNumber"),
                CONSTRAINT "UQ_43a2be0a1b1aadfbba6c6d9f747" UNIQUE ("IMSI"),
                CONSTRAINT "REL_3849b77eab8cbec7d131a167df" UNIQUE ("customerWebId"),
                CONSTRAINT "REL_d54eed24beee95d2581787d2a1" UNIQUE ("balanceId"),
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_phone_number_uindex" ON "customer" ("phoneNumber")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_IMSI_uindex" ON "customer" ("IMSI")
        `);
    await queryRunner.query(`
            CREATE INDEX "customer_customer_web_index" ON "customer" ("customerWebId")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "customer_balance_index" ON "customer" ("balanceId")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_d7ac55b2a591ed25842a6a7f3b" ON "customer" ("phoneNumber", "IMSI")
        `);
    await queryRunner.query(`
            CREATE TABLE "tariff" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "cost" numeric NOT NULL,
                "freeMinuteMounth" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_b3980ba974e3ae6569836192678" UNIQUE ("name"),
                CONSTRAINT "PK_bbeac9df199ea1c22c6dea75c2f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" SERIAL NOT NULL,
                "sum" numeric(10, 2) NOT NULL DEFAULT '0',
                "date" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "customerId" integer,
                "tariffId" integer,
                CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "transaction_customer_index" ON "transaction" ("customerId")
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensWeb"
            ADD CONSTRAINT "FK_3b5e949b14eacf9e0861e86e13b" FOREIGN KEY ("customerWebId") REFERENCES "customerWeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "customerWeb"
            ADD CONSTRAINT "FK_d0cc26d8dbddec221ad2836db3c" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM"
            ADD CONSTRAINT "FK_1a5e65ddcc98f170000468b4340" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD CONSTRAINT "FK_904e1613ce37835745932efa1ab" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent"
            ADD CONSTRAINT "FK_4edd081e163dc52c913e5198c78" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "balance"
            ADD CONSTRAINT "FK_cf4582c980772ff3fa19b513ede" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_78d94d5aad3c8316811d5ee537a" FOREIGN KEY ("tariffId") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_3849b77eab8cbec7d131a167dfe" FOREIGN KEY ("customerWebId") REFERENCES "customerWeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_d54eed24beee95d2581787d2a18" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_94c0fdb0c15ae19d99ec6e967b5" FOREIGN KEY ("tariffId") REFERENCES "tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_94c0fdb0c15ae19d99ec6e967b5"
        `);
    await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "FK_d54eed24beee95d2581787d2a18"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "FK_3849b77eab8cbec7d131a167dfe"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP CONSTRAINT "FK_78d94d5aad3c8316811d5ee537a"
        `);
    await queryRunner.query(`
            ALTER TABLE "balance" DROP CONSTRAINT "FK_cf4582c980772ff3fa19b513ede"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP CONSTRAINT "FK_4edd081e163dc52c913e5198c78"
        `);
    await queryRunner.query(`
            ALTER TABLE "callEvent" DROP CONSTRAINT "FK_904e1613ce37835745932efa1ab"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensGSM" DROP CONSTRAINT "FK_1a5e65ddcc98f170000468b4340"
        `);
    await queryRunner.query(`
            ALTER TABLE "customerWeb" DROP CONSTRAINT "FK_d0cc26d8dbddec221ad2836db3c"
        `);
    await queryRunner.query(`
            ALTER TABLE "authTokensWeb" DROP CONSTRAINT "FK_3b5e949b14eacf9e0861e86e13b"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."transaction_customer_index"
        `);
    await queryRunner.query(`
            DROP TABLE "transaction"
        `);
    await queryRunner.query(`
            DROP TABLE "tariff"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_d7ac55b2a591ed25842a6a7f3b"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_balance_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_customer_web_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_IMSI_uindex"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_phone_number_uindex"
        `);
    await queryRunner.query(`
            DROP TABLE "customer"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."balance_customer_uindex"
        `);
    await queryRunner.query(`
            DROP TABLE "balance"
        `);
    await queryRunner.query(`
            DROP TABLE "callEvent"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."session_uindex"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customerId_index"
        `);
    await queryRunner.query(`
            DROP TABLE "authTokensGSM"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."customer_web_customer_index"
        `);
    await queryRunner.query(`
            DROP TABLE "customerWeb"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."auth_tokens_web_customer_web_index"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."auth_tokens_web_session_uindex"
        `);
    await queryRunner.query(`
            DROP TABLE "authTokensWeb"
        `);
  }
}
