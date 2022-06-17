-- CreateTable
CREATE TABLE "accounts" (
    "account_id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password_hash" VARCHAR NOT NULL,
    "dynamic_salt" VARCHAR NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "deleted_on" TIMESTAMP(3),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "token_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "token" VARCHAR NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("token_id")
);

-- CreateTable
CREATE TABLE "email_temp_keys" (
    "email_key_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "email_key" VARCHAR NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_temp_keys_pkey" PRIMARY KEY ("email_key_id")
);

-- CreateTable
CREATE TABLE "pass_temp_keys" (
    "pass_key_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "pass_key" VARCHAR NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pass_temp_keys_pkey" PRIMARY KEY ("pass_key_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_dynamic_salt_key" ON "accounts"("dynamic_salt");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_temp_keys" ADD CONSTRAINT "email_temp_keys_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pass_temp_keys" ADD CONSTRAINT "pass_temp_keys_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
