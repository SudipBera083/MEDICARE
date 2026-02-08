import PDFDocument from "pdfkit";

export const billToPdf_service = (bill) => {
    return new Promise((resolve, reject) => {

        try {
            const doc = new PDFDocument({ margin: 40 });
            let buffers = [];

            // Capture buffer chunks
            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // ===========================
            // HEADER
            // ===========================
            doc
                .fontSize(22)
                .fillColor("#000")
                .text("Pathology Lab", { align: "center" });

            doc
                .fontSize(12)
                .text("Diagnostic & Testing Center", { align: "center" })
                .moveDown(0.5);

            doc
                .fontSize(10)
                .text("123 Health St., Cityville, XX 45678", { align: "center" })
                .text("Phone: 123-456-7890 | Email: info@pathologylab.com", { align: "center" })
                .moveDown(1);

            doc
                .moveTo(40, doc.y)
                .lineTo(550, doc.y)
                .stroke();

            // ===========================
            // BILL DETAILS (Right aligned)
            // ===========================
            doc.moveDown(1);
            doc.fontSize(11);

            const rightX = 350;
            doc.text(`Bill No: ${bill.billNumber}`, rightX);
            doc.text(`Bill Date: ${new Date(bill.billDate).toDateString()}`, rightX);
            doc.text(`Due Date: ${bill.dueDate ? new Date(bill.dueDate).toDateString() : "-"}`, rightX);

            doc.moveDown(1);

            // ===========================
            // PATIENT INFORMATION
            // ===========================
            doc.fontSize(12).text("Patient Information:", { underline: true });

            doc.fontSize(11);
            doc.text(`Patient Name: ${bill.patientName}`);
            doc.text(`Age: ${bill.patientAge}`);
            doc.text(`Gender: ${bill.patientGender}`);
            doc.text(`Phone: ${bill.patientPhone}`);

            doc.moveDown(1);

            // ===========================
            // TEST DETAILS TABLE
            // ===========================
            doc.fontSize(12).text("Test Details:", { underline: true }).moveDown(0.5);

            // Table headers
            doc.fontSize(11).text("Test Name", 40)
                .text("Test Code", 200)
                .text("Price", 300)
                .text("Qty", 380)
                .text("Subtotal", 430);

            doc.moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
            doc.moveDown(0.5);

            // Table rows
            bill.items.forEach(item => {
                doc.text(item.testName, 40)
                    .text(item.testCode || "-", 200)
                    .text(`₹ ${item.price}`, 300)
                    .text(item.quantity || 1, 380)
                    .text(`₹ ${item.subtotal}`, 430);
                doc.moveDown(0.3);
            });

            doc.moveDown(1);

            // ===========================
            // AMOUNTS SECTION
            // ===========================
            doc.fontSize(11);

            doc.text(`Subtotal: ₹ ${bill.subtotal}`, 350);
            doc.text(`Discount: ₹ ${bill.discount}`, 350);
            doc.text(`Total Amount: ₹ ${bill.billAmount}`, 350);

            doc.moveDown(1);

            // ===========================
            // PAYMENT DETAILS
            // ===========================
            doc.text(`Status: ${bill.billStatus}`);
            doc.text(`Paid Amount: ₹ ${bill.paidAmount}`);
            doc.text(`Pending Amount: ₹ ${bill.pendingAmount}`);
            doc.text(`Payment Method: ${bill.paymentMethod}`);

            doc.moveDown(1);

            // ===========================
            // NOTES
            // ===========================
            doc.fontSize(12).text("Notes:", { underline: true });
            doc.fontSize(11).text(bill.notes || "N/A");

            // END DOCUMENT
            doc.end();

        } catch (err) {
            reject(err);
            throw new Error(`SERVICE ERROR | billToPdf_service  ${err}`);
        }
    });
};
