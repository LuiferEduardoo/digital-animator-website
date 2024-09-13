import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesProjects1726194550887 implements MigrationInterface {
    name = 'ImagesProjects1726194550887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images_projects" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "image_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_6be11838bb43d5ba7a16c92d14a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images_projects" ADD CONSTRAINT "FK_c290c312f6ed8f58135c1ebfc9b" FOREIGN KEY ("image_id") REFERENCES "images_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images_projects" ADD CONSTRAINT "FK_2c575eb889e96350a2b658508c5" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images_projects" DROP CONSTRAINT "FK_2c575eb889e96350a2b658508c5"`);
        await queryRunner.query(`ALTER TABLE "images_projects" DROP CONSTRAINT "FK_c290c312f6ed8f58135c1ebfc9b"`);
        await queryRunner.query(`DROP TABLE "images_projects"`);
    }

}
