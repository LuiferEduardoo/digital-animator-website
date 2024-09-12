import { MigrationInterface, QueryRunner } from "typeorm";

export class GifRegistration1726106628623 implements MigrationInterface {
    name = 'GifRegistration1726106628623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gif_registration" ("id" SERIAL NOT NULL, "width" character varying(32) NOT NULL, "height" character varying(32) NOT NULL, "number_frames" integer NOT NULL, "duration_each_frame" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_id" integer NOT NULL, CONSTRAINT "REL_2c71f4626537df022bd26fdac4" UNIQUE ("file_id"), CONSTRAINT "PK_f8527b85eef47e0326c80c6b4d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gif_registration" ADD CONSTRAINT "FK_2c71f4626537df022bd26fdac47" FOREIGN KEY ("file_id") REFERENCES "files_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gif_registration" DROP CONSTRAINT "FK_2c71f4626537df022bd26fdac47"`);
        await queryRunner.query(`DROP TABLE "gif_registration"`);
    }

}
