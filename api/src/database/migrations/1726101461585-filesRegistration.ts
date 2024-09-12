import { MigrationInterface, QueryRunner } from "typeorm";

export class FilesRegistration1726101461585 implements MigrationInterface {
    name = 'FilesRegistration1726101461585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files_registration" ("id" SERIAL NOT NULL, "name" text NOT NULL, "folder" text NOT NULL, "format" character varying(32) NOT NULL, "file_size" character varying(32) NOT NULL, "url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ec44d086109f00e72ea1d345173" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files_registration"`);
    }

}
