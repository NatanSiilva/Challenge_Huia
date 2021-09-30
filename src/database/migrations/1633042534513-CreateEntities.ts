import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateEntities1633042534513 implements MigrationInterface {
  name = 'CreateEntities1633042534513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products" ("id" varchar PRIMARY KEY NOT NULL, "order_id" varchar NOT NULL, "product_id" varchar NOT NULL, "total_price" decimal NOT NULL, "quantity" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cpf" varchar NOT NULL, "birth_date" varchar NOT NULL, "role" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "customer_id" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_products"("id", "code", "created_at", "updated_at") SELECT "id", "code", "created_at", "updated_at" FROM "products"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_products" RENAME TO "products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_products"("id", "code", "created_at", "updated_at") SELECT "id", "code", "created_at", "updated_at" FROM "products"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_products" RENAME TO "products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL, "name" varchar NOT NULL, "lot_number" varchar NOT NULL, "color" varchar NOT NULL, "description" varchar NOT NULL, "amount" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_products"("id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity") SELECT "id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity" FROM "products"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_products" RENAME TO "products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL, "name" varchar NOT NULL, "lot_number" varchar NOT NULL, "color" varchar NOT NULL, "description" varchar NOT NULL, "amount" varchar NOT NULL, CONSTRAINT "FK_92d8e169c2e8bd84ef6e91308d4" FOREIGN KEY ("lot_number") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_products"("id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity", "name", "lot_number", "color", "description", "amount") SELECT "id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity", "name", "lot_number", "color", "description", "amount" FROM "products"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_products" RENAME TO "products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_orders_products" ("id" varchar PRIMARY KEY NOT NULL, "order_id" varchar NOT NULL, "product_id" varchar NOT NULL, "total_price" decimal NOT NULL, "quantity" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_orders_products"("id", "order_id", "product_id", "total_price", "quantity", "created_at", "updated_at") SELECT "id", "order_id", "product_id", "total_price", "quantity", "created_at", "updated_at" FROM "orders_products"`,
    );
    await queryRunner.query(`DROP TABLE "orders_products"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_orders_products" RENAME TO "orders_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_orders" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "customer_id" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_orders"("id", "code", "customer_id", "user_id", "created_at", "updated_at") SELECT "id", "code", "customer_id", "user_id", "created_at", "updated_at" FROM "orders"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_orders" RENAME TO "orders"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME TO "temporary_orders"`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "customer_id" varchar NOT NULL, "user_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "orders"("id", "code", "customer_id", "user_id", "created_at", "updated_at") SELECT "id", "code", "customer_id", "user_id", "created_at", "updated_at" FROM "temporary_orders"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_orders"`);
    await queryRunner.query(
      `ALTER TABLE "orders_products" RENAME TO "temporary_orders_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products" ("id" varchar PRIMARY KEY NOT NULL, "order_id" varchar NOT NULL, "product_id" varchar NOT NULL, "total_price" decimal NOT NULL, "quantity" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "orders_products"("id", "order_id", "product_id", "total_price", "quantity", "created_at", "updated_at") SELECT "id", "order_id", "product_id", "total_price", "quantity", "created_at", "updated_at" FROM "temporary_orders_products"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_orders_products"`);
    await queryRunner.query(
      `ALTER TABLE "products" RENAME TO "temporary_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL, "name" varchar NOT NULL, "lot_number" varchar NOT NULL, "color" varchar NOT NULL, "description" varchar NOT NULL, "amount" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "products"("id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity", "name", "lot_number", "color", "description", "amount") SELECT "id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity", "name", "lot_number", "color", "description", "amount" FROM "temporary_products"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_products"`);
    await queryRunner.query(
      `ALTER TABLE "products" RENAME TO "temporary_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "products"("id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity") SELECT "id", "code", "created_at", "updated_at", "manufacturing_date", "product_quantity" FROM "temporary_products"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_products"`);
    await queryRunner.query(
      `ALTER TABLE "products" RENAME TO "temporary_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "products"("id", "code", "created_at", "updated_at") SELECT "id", "code", "created_at", "updated_at" FROM "temporary_products"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_products"`);
    await queryRunner.query(
      `ALTER TABLE "products" RENAME TO "temporary_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "manufacturing_date" varchar NOT NULL, "product_quantity" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "products"("id", "code", "created_at", "updated_at") SELECT "id", "code", "created_at", "updated_at" FROM "temporary_products"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_products"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "orders_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
