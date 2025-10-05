-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "sex" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "yearOfStarting" INTEGER NOT NULL,
    "plannedYearOfRetirement" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectives" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "desiredMonthlyPension" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "objectives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_yearOfStarting_idx" ON "users"("yearOfStarting");

-- CreateIndex
CREATE UNIQUE INDEX "objectives_userId_key" ON "objectives"("userId");

-- CreateIndex
CREATE INDEX "objectives_userId_idx" ON "objectives"("userId");

-- AddForeignKey
ALTER TABLE "objectives" ADD CONSTRAINT "objectives_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
