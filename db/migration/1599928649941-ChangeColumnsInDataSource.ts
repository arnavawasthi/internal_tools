import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangeColumnsInDataSource1599928649941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table DataSource rename column source_key to sourceKey`)
    await queryRunner.query(`alter table DataSource rename column source_type to sourceType`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
