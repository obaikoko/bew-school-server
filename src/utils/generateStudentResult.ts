import { prisma } from '../config/db/prisma';
import { StudentResult } from '../schemas/resultSchema';
import { generateLetterHeadHTML } from './generateLetterHead';

function formatCurrency(value?: number | string | null): string {
  if (!value || isNaN(Number(value))) return '₦-';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value?: Date | null): string {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const generateStudentResultHTML = async (result: StudentResult) => {
  const nextTermInfo = await prisma.nextTerm.findFirst({
    where: {
      session: result.session,
      term: result.term,
      level: result.level,
    },
  });

  if (!nextTermInfo) {
    throw new Error('No resumption info found');
  }
  const subjectRows = result.subjectResults
    .map((subject) => {
      return `<tr>
      <td>${subject.subject}</td>
      <td>${subject.testScore}</td>
      <td>${subject.examScore}</td>
      <td>${subject.totalScore}</td>
      <td>${subject.grade}</td>
    </tr>`;
    })
    .join('');

  const affectiveRows = result.affectiveAssessment
    .map((item) => {
      return `<tr><td>${item.aCategory}</td><td>${item.grade}</td></tr>`;
    })
    .join('');

  const psychomotorRows = result.psychomotor
    .map((item) => {
      return `<tr><td>${item.pCategory}</td><td>${item.grade}</td></tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Student Result Sheet</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      table-layout: fixed;
    }

    th, td {
      border: 1px solid #000;
      padding: 8px;
      text-align: center;
      vertical-align: top;
    }

    th {
      background-color: #f1f1f1;
    }

    .col-2-3 {
      width: 66.66%;
    }

    .col-1-3 {
      width: 33.33%;
    }

    .nested-table {
      width: 100%;
      border-collapse: collapse;
    }

    .nested-table th,
    .nested-table td {
      border: 1px solid #000;
      padding: 6px;
    }

    .footer td {
      text-align: left;
    }
  </style>
</head>
<body>

${generateLetterHeadHTML(result)}

<table>
  <tr>
    <th class="col-2-3" colspan="5">SUBJECTS AND SCORES</th>
    <th class="col-1-3" colspan="3">ASSESSMENTS</th>
  </tr>
  <tr>
    <th>SUBJECT</th>
    <th>TEST(30%)</th>
    <th>EXAM(70%)</th>
    <th>TOTAL(100%)</th>
    <th>GRADE</th>
    <th colspan="3" rowspan="${result.subjectResults.length + 2}">
      <!-- Right column begins -->
      <table class="nested-table">
        <tr><th colspan="2">Affective Assessment</th></tr>
        ${affectiveRows}

        <tr><th colspan="2">Psychomotor</th></tr>
        ${psychomotorRows}

        <tr><th colspan="2">Grading System</th></tr>
        <tr><td>90 - 100</td><td>A+</td></tr>
        <tr><td>80 - 89</td><td>A</td></tr>
        <tr><td>70 - 79</td><td>B+</td></tr>
        <tr><td>60 - 69</td><td>B</td></tr>
        <tr><td>50 - 59</td><td>C</td></tr>
        <tr><td>40 - 49</td><td>D</td></tr>
        <tr><td>0 - 39</td><td>F</td></tr>
      </table>
    </th>
  </tr>
  ${subjectRows}

  <tr class="footer">
    <td colspan="8">NUMBER OF PEOPLE IN CLASS: ${
      result.numberInClass ?? '-'
    }</td>
  </tr>
  <tr class="footer">
    <td colspan="8">
    Teachers' Remark: ${result.teacherRemark}
    </td>
  </tr>
  <tr class="footer">
    <td colspan="8">
     Principals/Head Teachers Remark: ${result.principalRemark}
    </td>
  </tr>
  <tr class="footer">
    <td colspan="8">
      Pass/Fail: ____________ &nbsp;&nbsp;&nbsp;&nbsp; 
      Conduct: ____________ &nbsp;&nbsp;&nbsp;&nbsp; 
      Signature: ____________
    </td>
  </tr>
  <tr class="footer">
    <td colspan="8">
      Re-Opening Date: ${formatDate(
        nextTermInfo.reOpeningDate ?? '-'
      )} &nbsp;&nbsp;&nbsp;&nbsp;
      Next Term Fee: ₦${formatCurrency(
        nextTermInfo.nextTermFee ?? '-'
      )} &nbsp;&nbsp;&nbsp;&nbsp;
      Bus Fare: ₦${formatCurrency(
        nextTermInfo.busFee ?? '-'
      )} &nbsp;&nbsp;&nbsp;&nbsp;
      Other Charges: ₦${formatCurrency(nextTermInfo.otherCharges && '-')} 
    </td>
  
  </tr>
  <tr class="footer">
     <td colspan="8">
      Account Name: Beryl International Schools &nbsp;&nbsp;&nbsp;&nbsp;
      Account Number: 1234567890 &nbsp;&nbsp;&nbsp;&nbsp;
      Bank Name: First Bank of Nigeria &nbsp;&nbsp;&nbsp;&nbsp;
    </td>
  
  </tr>
</table>

</body>
</html>`;
};
