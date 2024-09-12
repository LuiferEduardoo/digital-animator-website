import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageRegistration1726106005850 implements MigrationInterface {
    name = 'ImageRegistration1726106005850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images_registration" ("id" SERIAL NOT NULL, "width" character varying(32) NOT NULL, "height" character varying(32) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_id" integer NOT NULL, CONSTRAINT "REL_1ac6019e1ec00d71102a723990" UNIQUE ("file_id"), CONSTRAINT "PK_52c129f6379d9c9f18949c0b0e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images_registration" ADD CONSTRAINT "FK_1ac6019e1ec00d71102a7239906" FOREIGN KEY ("file_id") REFERENCES "files_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images_registration" DROP CONSTRAINT "FK_1ac6019e1ec00d71102a7239906"`);
        await queryRunner.query(`DROP TABLE "images_registration"`);
    }

}
