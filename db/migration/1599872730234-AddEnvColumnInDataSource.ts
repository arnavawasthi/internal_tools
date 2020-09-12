import { MigrationInterface, QueryRunner } from "typeorm"

export class AddEnvColumnInDataSource1599872730234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table DataSource add column env varchar(64)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
