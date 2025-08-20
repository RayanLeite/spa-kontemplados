-- CreateTable
CREATE TABLE `cartas` (
    `id` VARCHAR(191) NOT NULL,
    `idCarta` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `administradora` VARCHAR(191) NOT NULL,
    `parcelas` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `valorCredito` DOUBLE NOT NULL,
    `valorEntrada` DOUBLE NOT NULL,
    `valorParcela` DOUBLE NOT NULL,
    `vencimento` DATETIME(3) NOT NULL,
    `comissao` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Ativa',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
