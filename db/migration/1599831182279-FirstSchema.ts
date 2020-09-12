import { MigrationInterface, QueryRunner } from "typeorm"

export class FirstSchema1599831182279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE Report (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt datetime(3) NOT NULL DEFAULT current_timestamp(3),
            updatedAt datetime(3) NOT NULL,
            name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            datasource varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
            params text COLLATE utf8mb4_unicode_ci NOT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB;
        
          `)
    await queryRunner.query(`CREATE TABLE Section (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt datetime(3) NOT NULL DEFAULT current_timestamp(3),
            updatedAt datetime(3) NOT NULL,
            userId int(11) NOT NULL,
            description varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            query text COLLATE utf8mb4_unicode_ci NOT NULL,
            reportId int(11) NOT NULL,
            datasource varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
            drilldown text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '{}',
            PRIMARY KEY (id),
            KEY reportId (reportId),
            CONSTRAINT section_ibfk_1 FOREIGN KEY (reportId) REFERENCES Report (id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
