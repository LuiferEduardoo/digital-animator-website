import { MigrationInterface, QueryRunner } from "typeorm";

export class About1726092712976 implements MigrationInterface {
    name = 'About1726092712976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "about" ("id" SERIAL NOT NULL, "title_es" text NOT NULL, "title_en" text NOT NULL, "content_es" text NOT NULL, "content_en" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "about"`);
    }

}
