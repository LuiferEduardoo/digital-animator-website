import { MigrationInterface, QueryRunner } from "typeorm";

export class Authentications1726172332611 implements MigrationInterface {
    name = 'Authentications1726172332611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authentications" ("id" SERIAL NOT NULL, "email" character varying(40) NOT NULL, "username" character varying(32) NOT NULL, "password" character varying(32) NOT NULL, "password_reset_token" character varying(32), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "UQ_e326319d7d4e8cdc3b382288533" UNIQUE ("email"), CONSTRAINT "UQ_6e032c55b87d63c9c4ab5056b7f" UNIQUE ("username"), CONSTRAINT "REL_e9a778e982665303f152c01573" UNIQUE ("user_id"), CONSTRAINT "PK_2505c0cb39a2248520f306c1447" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "authentications" ADD CONSTRAINT "FK_e9a778e982665303f152c01573d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentications" DROP CONSTRAINT "FK_e9a778e982665303f152c01573d"`);
        await queryRunner.query(`DROP TABLE "authentications"`);
    }

}
