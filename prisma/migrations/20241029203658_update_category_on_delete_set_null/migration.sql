-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_fkey";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
