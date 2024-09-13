import { MigrationInterface, QueryRunner } from "typeorm";

export class Projects1726190286557 implements MigrationInterface {
    name = 'Projects1726190286557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "path_es" character varying NOT NULL, "path_en" character varying, "title_es" text NOT NULL, "title_en" text, "description_es" text NOT NULL, "description_en" text, "visible" boolean NOT NULL DEFAULT true, "important" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
