"use strict";
// import puppeteer from 'puppeteer';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudentPdf = void 0;
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
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const generateStudentPdf = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const executablePath = yield chrome_aws_lambda_1.default.executablePath;
    const browser = yield puppeteer_core_1.default.launch({
        args: chrome_aws_lambda_1.default.args,
        defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
        executablePath,
        headless: chrome_aws_lambda_1.default.headless,
    });
    const page = yield browser.newPage();
    yield page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = yield page.pdf({
        format: 'a4',
        printBackground: true,
        margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
        scale: 0.75,
    });
    yield browser.close();
    return Buffer.from(pdfBuffer);
});
exports.generateStudentPdf = generateStudentPdf;
