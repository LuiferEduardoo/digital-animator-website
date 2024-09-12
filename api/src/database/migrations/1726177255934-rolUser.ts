import { MigrationInterface, QueryRunner } from "typeorm";

export class RolUser1726177255934 implements MigrationInterface {
    name = 'RolUser1726177255934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rol_user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rol_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_6e4239bc6ca88f7d6591dc6524" UNIQUE ("user_id"), CONSTRAINT "PK_76d5c66bb53107c08c79896b249" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rol_user" ADD CONSTRAINT "FK_54a8e0c49b2ee8b962009b946a9" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_user" ADD CONSTRAINT "FK_6e4239bc6ca88f7d6591dc6524f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol_user" DROP CONSTRAINT "FK_6e4239bc6ca88f7d6591dc6524f"`);
        await queryRunner.query(`ALTER TABLE "rol_user" DROP CONSTRAINT "FK_54a8e0c49b2ee8b962009b946a9"`);
        await queryRunner.query(`DROP TABLE "rol_user"`);
    }

}
