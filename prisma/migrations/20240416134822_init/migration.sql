-- CreateTable
CREATE TABLE "ArticleCriteriaUserSex" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    CONSTRAINT "ArticleCriteriaUserSex_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArticleCriteriaClothType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    CONSTRAINT "ArticleCriteriaClothType_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
