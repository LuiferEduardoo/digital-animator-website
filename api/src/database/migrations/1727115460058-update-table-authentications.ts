import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableAuthentications1727115460058 implements MigrationInterface {
    name = 'UpdateTableAuthentications1727115460058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentications" ADD "active" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "authentications" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "authentications" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authentications" DROP COLUMN "password_reset_token"`);
        await queryRunner.query(`ALTER TABLE "authentications" ADD "password_reset_token" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentications" DROP COLUMN "password_reset_token"`);
        await queryRunner.query(`ALTER TABLE "authentications" ADD "password_reset_token" character varying(32)`);
        await queryRunner.query(`ALTER TABLE "authentications" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "authentications" ADD "password" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authentications" DROP COLUMN "active"`);
    }

}
