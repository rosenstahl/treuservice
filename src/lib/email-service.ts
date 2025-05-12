import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mx2fc0.netcup.net',
  port: 465,
  secure: true,
  auth: {
    user: 'info@treuservice.com',
    pass: '8tAS2eFvhhqEt6-',
  },
  // Diese Zeile ist entscheidend
  tls: {
    rejectUnauthorized: false
  }
});

// Konfiguration für E-Mail-Empfänger
const toEmail = 'info@treuservice.com';

// Generische Funktion zum Senden von E-Mails
export async function sendEmail({
  subject,
  text,
  html,
  replyTo,
}: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  try {
    const mailOptions = {
      from: '"Treuservice Website" <info@treuservice.com>',
      to: toEmail,
      replyTo: replyTo || toEmail,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`E-Mail gesendet: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return { success: false, error };
  }
}

// Besser typisierte Version ohne 'any'
type FormDataValue = string | number | boolean | null | undefined | FormDataObject | string[];
interface FormDataObject {
  [key: string]: FormDataValue;
}

// Formatieren der Formularinhalte für den E-Mail-Text
export function formatFormData(data: FormDataObject, labels?: Record<string, string>): string {
  let result = '';
  
  for (const [key, value] of Object.entries(data)) {
    // Überspringen leerer Werte
    if (value === undefined || value === null || value === '') continue;
    
    const label = labels?.[key] || key;
    
    if (typeof value === 'object' && !Array.isArray(value)) {
      result += `\n${label}:\n`;
      result += formatFormData(value as FormDataObject, labels);
    } else {
      result += `${label}: ${value}\n`;
    }
  }
  
  return result;
}

// Formatieren der Formularinhalte für den HTML-Text
export function formatFormDataHtml(data: FormDataObject, labels?: Record<string, string>): string {
  let result = '<dl>';
  
  for (const [key, value] of Object.entries(data)) {
    // Überspringen leerer Werte
    if (value === undefined || value === null || value === '') continue;
    
    const label = labels?.[key] || key;
    
    if (typeof value === 'object' && !Array.isArray(value)) {
      result += `<dt><strong>${label}:</strong></dt>`;
      result += `<dd>${formatFormDataHtml(value as FormDataObject, labels)}</dd>`;
    } else {
      result += `<dt><strong>${label}:</strong></dt><dd>${value}</dd>`;
    }
  }
  
  result += '</dl>';
  return result;
}