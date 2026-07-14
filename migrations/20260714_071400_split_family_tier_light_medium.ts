import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Split familyTier 'light-medium' into 'light-duty' + 'medium-duty'.
 * 現有 'light-medium' 資料一律 remap 至 'light-duty'(依使用者指示,MT-A110 為此類)。
 * DOWN 方向:'light-duty' 與 'medium-duty' 都合併回 'light-medium'。
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products" ALTER COLUMN "family_tier" SET DATA TYPE text;
    ALTER TABLE "_products_v" ALTER COLUMN "version_family_tier" SET DATA TYPE text;
    UPDATE "products" SET "family_tier" = 'light-duty' WHERE "family_tier" = 'light-medium';
    UPDATE "_products_v" SET "version_family_tier" = 'light-duty' WHERE "version_family_tier" = 'light-medium';
    DROP TYPE "public"."enum_products_family_tier";
    DROP TYPE "public"."enum__products_v_version_family_tier";
    CREATE TYPE "public"."enum_products_family_tier" AS ENUM('light-duty', 'medium-duty', 'heavy-duty', 'precision', 'general', 'medical', 'heat-sealed');
    CREATE TYPE "public"."enum__products_v_version_family_tier" AS ENUM('light-duty', 'medium-duty', 'heavy-duty', 'precision', 'general', 'medical', 'heat-sealed');
    ALTER TABLE "products" ALTER COLUMN "family_tier" SET DATA TYPE "public"."enum_products_family_tier" USING "family_tier"::"public"."enum_products_family_tier";
    ALTER TABLE "_products_v" ALTER COLUMN "version_family_tier" SET DATA TYPE "public"."enum__products_v_version_family_tier" USING "version_family_tier"::"public"."enum__products_v_version_family_tier";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products" ALTER COLUMN "family_tier" SET DATA TYPE text;
    ALTER TABLE "_products_v" ALTER COLUMN "version_family_tier" SET DATA TYPE text;
    UPDATE "products" SET "family_tier" = 'light-medium' WHERE "family_tier" IN ('light-duty', 'medium-duty');
    UPDATE "_products_v" SET "version_family_tier" = 'light-medium' WHERE "version_family_tier" IN ('light-duty', 'medium-duty');
    DROP TYPE "public"."enum_products_family_tier";
    DROP TYPE "public"."enum__products_v_version_family_tier";
    CREATE TYPE "public"."enum_products_family_tier" AS ENUM('light-medium', 'heavy-duty', 'precision', 'general', 'medical', 'heat-sealed');
    CREATE TYPE "public"."enum__products_v_version_family_tier" AS ENUM('light-medium', 'heavy-duty', 'precision', 'general', 'medical', 'heat-sealed');
    ALTER TABLE "products" ALTER COLUMN "family_tier" SET DATA TYPE "public"."enum_products_family_tier" USING "family_tier"::"public"."enum_products_family_tier";
    ALTER TABLE "_products_v" ALTER COLUMN "version_family_tier" SET DATA TYPE "public"."enum__products_v_version_family_tier" USING "version_family_tier"::"public"."enum__products_v_version_family_tier";
  `)
}
