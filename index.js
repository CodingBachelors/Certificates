const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


submitBtn.addEventListener("click", () => {
    const val = userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        generatePDF(val);
    } else {
        userName.reportValidity();
    }
});
var findDate = () => {
    var d = new Date()
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return String(month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear())
}
const generatePDF = async(name) => {
    const existingPdfBytes = await fetch("./certificates/OfferLetter.pdf").then((res) =>
        res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = await fetch("./fonts/Aileron-Bold.otf").then((res) =>
        res.arrayBuffer()
    );
    const AileronBold = await pdfDoc.embedFont(fontBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    firstPage.drawText((name + ','), {
        x: 95,
        y: 590,
        size: 12.5,
        font: AileronBold,
        color: rgb(0.1, 0.2, 0.3),
    });
    firstPage.drawText(findDate(), {
        x: 95,
        y: 136,
        size: 11.6,
        //font: AileronBold,
        color: rgb(0.1, 0.2, 0.3),
    });
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    let certName = userName.value + ".pdf";
    saveAs(pdfDataUri, certName)
};