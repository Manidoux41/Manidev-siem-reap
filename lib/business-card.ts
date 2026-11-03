import { jsPDF } from "jspdf";

export const cardLayout = {
  pageWidth: 210, pageHeight: 297, width: 85, height: 55,
  columns: 2, rows: 5, gap: 2, count: 10,
} as const;

export function createBusinessCardPdf(image: string, cropMarks: boolean) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const { width, height, columns, rows, gap } = cardLayout;
  const left = (210 - (columns * width + (columns - 1) * gap)) / 2;
  const top = (297 - (rows * height + (rows - 1) * gap)) / 2;
  pdf.setProperties({ title: "Manidev — Cartes de visite", creator: "Manidev" });
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = left + column * (width + gap);
      const y = top + row * (height + gap);
      pdf.addImage(image, "PNG", x, y, width, height, "business-card");
      if (cropMarks) {
        pdf.setDrawColor(140);
        pdf.setLineWidth(0.1);
        for (const cornerX of [x, x + width]) {
          for (const cornerY of [y, y + height]) {
            const dx = cornerX === x ? -1 : 1;
            const dy = cornerY === y ? -1 : 1;
            pdf.line(cornerX + dx * 0.25, cornerY, cornerX + dx * 0.9, cornerY);
            pdf.line(cornerX, cornerY + dy * 0.25, cornerX, cornerY + dy * 0.9);
          }
        }
      }
    }
  }
  return pdf;
}
