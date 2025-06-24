import puppeteer from 'puppeteer';

export const generateStudentPdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0.75cm', bottom: '0.75cm', left: '1cm', right: '1cm' }, 
    scale: 0.7, 
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
};
