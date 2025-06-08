-- CreateTable
CREATE TABLE "Laboratorio" (
    "CodLab" SERIAL NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,

    CONSTRAINT "Laboratorio_pkey" PRIMARY KEY ("CodLab")
);

-- CreateTable
CREATE TABLE "TipoMedic" (
    "CodTipoMed" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "TipoMedic_pkey" PRIMARY KEY ("CodTipoMed")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "CodEspec" SERIAL NOT NULL,
    "descripcionEsp" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("CodEspec")
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "CodMedicamento" SERIAL NOT NULL,
    "descripcionMed" TEXT NOT NULL,
    "fechaFabricacion" TIMESTAMP(3) NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "presentacion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "precioVentaUni" DOUBLE PRECISION NOT NULL,
    "precioVentaPres" DOUBLE PRECISION NOT NULL,
    "Marca" TEXT NOT NULL,
    "CodTipoMed" INTEGER NOT NULL,
    "CodEspec" INTEGER NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("CodMedicamento")
);

-- CreateTable
CREATE TABLE "OrdenVenta" (
    "NroOrdenVta" SERIAL NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,
    "Motivo" TEXT NOT NULL,
    "Situacion" TEXT NOT NULL,

    CONSTRAINT "OrdenVenta_pkey" PRIMARY KEY ("NroOrdenVta")
);

-- CreateTable
CREATE TABLE "DetalleOrdenVta" (
    "id" SERIAL NOT NULL,
    "NroOrdenVta" INTEGER NOT NULL,
    "CodMedicamento" INTEGER NOT NULL,
    "descripcionMed" TEXT NOT NULL,
    "cantidadRequerida" INTEGER NOT NULL,

    CONSTRAINT "DetalleOrdenVta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenCompra" (
    "NroOrdenC" SERIAL NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,
    "Situacion" TEXT NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,
    "NroFacturaProv" TEXT NOT NULL,
    "CodLab" INTEGER NOT NULL,

    CONSTRAINT "OrdenCompra_pkey" PRIMARY KEY ("NroOrdenC")
);

-- CreateTable
CREATE TABLE "DetalleOrdenCompra" (
    "id" SERIAL NOT NULL,
    "NroOrdenC" INTEGER NOT NULL,
    "CodMedicamento" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "montouni" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetalleOrdenCompra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medicamento" ADD CONSTRAINT "Medicamento_CodEspec_fkey" FOREIGN KEY ("CodEspec") REFERENCES "Especialidad"("CodEspec") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamento" ADD CONSTRAINT "Medicamento_CodTipoMed_fkey" FOREIGN KEY ("CodTipoMed") REFERENCES "TipoMedic"("CodTipoMed") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleOrdenVta" ADD CONSTRAINT "DetalleOrdenVta_CodMedicamento_fkey" FOREIGN KEY ("CodMedicamento") REFERENCES "Medicamento"("CodMedicamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleOrdenVta" ADD CONSTRAINT "DetalleOrdenVta_NroOrdenVta_fkey" FOREIGN KEY ("NroOrdenVta") REFERENCES "OrdenVenta"("NroOrdenVta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenCompra" ADD CONSTRAINT "OrdenCompra_CodLab_fkey" FOREIGN KEY ("CodLab") REFERENCES "Laboratorio"("CodLab") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleOrdenCompra" ADD CONSTRAINT "DetalleOrdenCompra_CodMedicamento_fkey" FOREIGN KEY ("CodMedicamento") REFERENCES "Medicamento"("CodMedicamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleOrdenCompra" ADD CONSTRAINT "DetalleOrdenCompra_NroOrdenC_fkey" FOREIGN KEY ("NroOrdenC") REFERENCES "OrdenCompra"("NroOrdenC") ON DELETE RESTRICT ON UPDATE CASCADE;
