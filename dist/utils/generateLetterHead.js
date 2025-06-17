"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLetterHeadHTML = void 0;
const generateLetterHeadHTML = (result) => {
    var _a;
    const fullName = [result.firstName, result.otherName, result.lastName]
        .filter(Boolean)
        .join(' ');
    return `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="cid:school_logo" alt="School Logo" style="height: 80px;" />
      <h2 style="margin: 0;">Bendonals International Schools</h2>
      <p style="margin: 0; font-size: 14px;">
        NO. 9 BY MTN MAST, ODUKPANI CLOSE, IKOT ENEOBONG, F.H.E 8 MILES, CALABAR, C.R.S NIGERIA<br />
        E-MAIL: bendonaldsschools@gmail.com TEL: 07038307768, 08169866808
      </p>
    </div>
  
    <table style="width: 100%; margin-bottom: 20px; font-size: 14px;">
      <tr>
        <td><strong>STUDENT NAME:</strong> ${fullName}</td>
        <td><strong>CLASS:</strong> ${result.level}${result.subLevel}</td>
      </tr>
      <tr>
        <td><strong>SESSION:</strong> ${result.session} ${result.term}</td>
        <td><strong>POSITION IN CLASS:</strong> ${result.position}</td>
      </tr>
      <tr>
        <td><strong>STUDENT'S TOTAL SCORE:</strong> ${result.totalScore}</td>
        <td><strong>STUDENT AVERAGE:</strong> ${(_a = result.averageScore) === null || _a === void 0 ? void 0 : _a.toFixed(2)}</td>
      </tr>
    </table>
    `;
};
exports.generateLetterHeadHTML = generateLetterHeadHTML;
