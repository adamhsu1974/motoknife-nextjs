import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "_order" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version__order" varchar;
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE INDEX "_products_v_version_version__order_idx" ON "_products_v" USING btree ("version__order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "products__order_idx";
  DROP INDEX "_products_v_version_version__order_idx";
  ALTER TABLE "products" DROP COLUMN "_order";
  ALTER TABLE "_products_v" DROP COLUMN "version__order";`)
}
