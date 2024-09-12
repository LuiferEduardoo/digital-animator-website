import { MigrationInterface, QueryRunner } from "typeorm";

export class Rol1726153973515 implements MigrationInterface {
    name = 'Rol1726153973515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rol" ("id" SERIAL NOT NULL, "rol" character varying(40) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rol"`);
    }

}
