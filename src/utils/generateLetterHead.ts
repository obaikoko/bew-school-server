import { StudentResult } from '../schemas/resultSchema';

export const generateLetterHeadHTML = (result: StudentResult) => {
  const fullName = [result.firstName, result.otherName, result.lastName]
    .filter(Boolean)
    .join(' ');

  return `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dzajrh9z7/image/upload/v1726781636/beryl/epfme50v5t4l66i6fzx3.jpg" alt="School Logo" style="height: 80px;" />
      <h2 style="margin: 0;">Bendonals International Schools</h2>
      <p style="margin: 0; font-size: 14px;">
        Plot 1, Block 1, Ikot Eneobong (Federal Housing Estate) Calabar Municipality, Cross River State<br />
        E-MAIL: berylintlschls@gmail.com TEL: 07060511978, 09073091617
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
        <td><strong>STUDENT AVERAGE:</strong> ${result.averageScore?.toFixed(
          2
        )}</td>
      </tr>
    </table>
    `;
};
