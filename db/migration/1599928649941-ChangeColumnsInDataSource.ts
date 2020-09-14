import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangeColumnsInDataSource1599928649941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table DataSource change column source_key sourceKey varchar(64) NOT NULL`
    )
    await queryRunner.query(
      `alter table DataSource change column source_type sourceType  varchar(64) NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
