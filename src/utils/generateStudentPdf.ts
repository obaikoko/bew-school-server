// import puppeteer from 'puppeteer';

// export const generateStudentPdf = async (html: string): Promise<Buffer> => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setContent(html, { waitUntil: 'networkidle0' });

//   const pdfBuffer = await page.pdf({
//     format: 'A4',
//     printBackground: true,
//     margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }, // Add margins for better spacing
//     scale: 0.75, // Full scale to utilize the full page
//   });

//   await browser.close();

//   return Buffer.from(pdfBuffer);
// };

import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

export const generateStudentPdf = async (html: string): Promise<Buffer> => {
  const executablePath = await chromium.executablePath;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
    scale: 0.75,
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
};
