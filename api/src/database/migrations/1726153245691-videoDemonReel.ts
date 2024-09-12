import { MigrationInterface, QueryRunner } from "typeorm";

export class VideoDemonReel1726153245691 implements MigrationInterface {
    name = 'VideoDemonReel1726153245691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video_demon_reel" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "video_id" integer NOT NULL, CONSTRAINT "REL_6aaeca1a197b87c24b89859e28" UNIQUE ("video_id"), CONSTRAINT "PK_8c9d47d95650ed9c2b0d7cca960" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "video_demon_reel" ADD CONSTRAINT "FK_6aaeca1a197b87c24b89859e28f" FOREIGN KEY ("video_id") REFERENCES "video_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video_demon_reel" DROP CONSTRAINT "FK_6aaeca1a197b87c24b89859e28f"`);
        await queryRunner.query(`DROP TABLE "video_demon_reel"`);
    }

}
