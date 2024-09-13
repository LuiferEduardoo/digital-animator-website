import { MigrationInterface, QueryRunner } from "typeorm";

export class AnimationProject1726192195523 implements MigrationInterface {
    name = 'AnimationProject1726192195523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "animation_projects" ("id" SERIAL NOT NULL, "gif_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "REL_14c40b6592d7ccea2ff635bc1f" UNIQUE ("gif_id"), CONSTRAINT "REL_affd009a3522980494b064e2a1" UNIQUE ("project_id"), CONSTRAINT "PK_af82466f869b453da8e600d22c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animation_projects" ADD CONSTRAINT "FK_14c40b6592d7ccea2ff635bc1f1" FOREIGN KEY ("gif_id") REFERENCES "gif_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animation_projects" ADD CONSTRAINT "FK_affd009a3522980494b064e2a19" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animation_projects" DROP CONSTRAINT "FK_affd009a3522980494b064e2a19"`);
        await queryRunner.query(`ALTER TABLE "animation_projects" DROP CONSTRAINT "FK_14c40b6592d7ccea2ff635bc1f1"`);
        await queryRunner.query(`DROP TABLE "animation_projects"`);
    }

}
