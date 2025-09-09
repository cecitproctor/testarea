import { google } from 'googleapis';
import nodemailer from 'nodemailer';


export default async function handler(req, res){
if(req.method !== 'POST') return res.status(405).end();
const body = req.body;


try{
// 1) append to a 'Results' sheet (you can change the sheet name or make it dynamic)
const auth = new google.auth.JWT({
email: process.env.GOOGLE_CLIENT_EMAIL,
key: process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({version:'v4', auth});


const values = [[ new Date().toISOString(), body.user.accountId || '', body.user.name || '', body.user.email || '', body.quizCode || '', body.got, body.total, JSON.stringify(body.answers) ]];
await sheets.spreadsheets.values.append({ spreadsheetId: process.env.SPREADSHEET_ID, range: 'Results!A1', valueInputOption: 'RAW', requestBody: { values } });


// 2) optional: send email to teacher (teacher email must be present in SETTINGS sheet; for starter we skip fetching settings)
if(process.env.SMTP_HOST){
const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT||587), auth:{ user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
await transporter.sendMail({ from: process.env.SMTP_USER, to: body.user.email, subject: 'Quiz Results', text: `You scored ${body.got} / ${body.total}` });
}


res.status(200).json({ ok:true });
}catch(err){
console.error(err);
res.status(500).json({ ok:false, error: err.message || String(err) });
}
}