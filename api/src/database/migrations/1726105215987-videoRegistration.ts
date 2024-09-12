import { MigrationInterface, QueryRunner } from "typeorm";

export class VideoRegistration1726105215987 implements MigrationInterface {
    name = 'VideoRegistration1726105215987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video_registration" ("id" SERIAL NOT NULL, "duration" TIMESTAMP NOT NULL, "resolution" character varying(32) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_id" integer NOT NULL, CONSTRAINT "REL_70a2373b271acfeaaab3bc6545" UNIQUE ("file_id"), CONSTRAINT "PK_418593be33a4c4947105fcc7964" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "video_registration" ADD CONSTRAINT "FK_70a2373b271acfeaaab3bc65455" FOREIGN KEY ("file_id") REFERENCES "files_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video_registration" DROP CONSTRAINT "FK_70a2373b271acfeaaab3bc65455"`);
        await queryRunner.query(`DROP TABLE "video_registration"`);
    }

}
