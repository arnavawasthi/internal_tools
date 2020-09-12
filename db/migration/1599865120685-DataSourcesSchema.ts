import { MigrationInterface, QueryRunner } from "typeorm"

export class DataSourcesSchema1599865120685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE DataSource (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt datetime(3) NOT NULL DEFAULT current_timestamp(3),
            updatedAt datetime(3) NOT NULL,
            name varchar(64) NOT NULL,
            source_key varchar(64) NOT NULL,
            source_type varchar(64) NOT NULL,
            params text,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB;
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
