import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

type ServiceType = 'entruempelung' | 'entkernung' | 'reinigung' | 'security' | 'winter' | 'sanierung' | 'pv' | 'leiharbeit';

// Service spezifische Übersetzungen und Texte
const serviceLabels: Record<ServiceType, {title: string, emailSubject: string}> = {
  entruempelung: {
    title: 'Entrümpelung',
    emailSubject: 'Neue Entrümpelungs-Anfrage'
  },
  entkernung: {
    title: 'Entkernung',
    emailSubject: 'Neue Entkernungs-Anfrage'
  },
  reinigung: {
    title: 'Reinigung',
    emailSubject: 'Neue Reinigungs-Anfrage'
  },
  security: {
    title: 'Security',
    emailSubject: 'Neue Security-Anfrage'
  },
  winter: {
    title: 'Winterdienst',
    emailSubject: 'Neue Winterdienst-Anfrage'
  },
  sanierung: {
    title: 'Sanierung',
    emailSubject: 'Neue Sanierungs-Anfrage'
  },
  pv: {
    title: 'PV-Montage',
    emailSubject: 'Neue PV-Montage-Anfrage'
  },
  leiharbeit: {
    title: 'Leiharbeit',
    emailSubject: 'Neue Leiharbeits-Anfrage'
  }
};

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { 
      anrede, 
      vorname, 
      nachname, 
      email, 
      telefon, 
      firma, 
      adresseStrasse, 
      adresseHausnummer, 
      adressePlz, 
      adresseOrt, 
      wunschtermin, 
      anmerkungen,
      serviceType 
    } = formData;
    
    // Überprüfen ob der Service-Typ gültig ist
    if (!serviceType || !Object.keys(serviceLabels).includes(serviceType)) {
      return NextResponse.json(
        { success: false, message: 'Ungültiger Service-Typ' },
        { status: 400 }
      );
    }
    
    // Betreffzeile für die E-Mail
    const subject = `${serviceLabels[serviceType as ServiceType].emailSubject} von ${vorname} ${nachname}`;

    // Formatiere das Datum
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Keine Angabe';
      
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE');
      } catch {
        return dateString;
      }
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue ${serviceLabels[serviceType as ServiceType].title}-Anfrage über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}
Adresse: ${adresseStrasse} ${adresseHausnummer}, ${adressePlz} ${adresseOrt}
Wunschtermin: ${formatDate(wunschtermin)}
${anmerkungen ? `Anmerkungen: ${anmerkungen}` : ''}`;
    
    // Formatierte Daten für HTML-E-Mail im Apple Design Stil
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
      line-height: 1.6; 
      color: #1d1d1f; 
      margin: 0;
      padding: 0;
      background-color: #f5f5f7;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    h1 { 
      color: #1d1d1f; 
      font-weight: 500;
      font-size: 24px;
      margin-top: 0;
      padding-bottom: 12px;
      border-bottom: 1px solid #d2d2d7;
    }
    h2 { 
      color: #1d1d1f; 
      font-weight: 500;
      font-size: 18px;
      margin-top: 25px; 
      margin-bottom: 15px;
    }
    .section { 
      margin-bottom: 25px; 
      padding: 0;
    }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 15px;
    }
    th { 
      text-align: left; 
      font-weight: normal;
      color: #86868b;
      font-size: 14px;
      padding: 8px 12px 8px 0;
    }
    td { 
      padding: 8px 12px 8px 0;
      font-weight: 400;
    }
    .info-row {
      padding: 12px 0;
      border-bottom: 1px solid #f5f5f7;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .label { 
      color: #86868b;
      font-size: 14px;
      width: 30%; 
    }
    .value {
      font-weight: 400;
    }
    .header {
      text-align: center;
      margin-bottom: 25px;
    }
    .header img {
      max-width: 120px;
      margin-bottom: 15px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #86868b;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #d2d2d7;
    }
    .highlight {
      background-color: #f5f5f7; 
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Neue ${serviceLabels[serviceType as ServiceType].title}-Anfrage</h1>
    </div>
    
    <div class="highlight">
      <h2>Kontaktdaten</h2>
      <div class="info-row">
        <span class="label">Name:</span>
        <span class="value">${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</span>
      </div>
      <div class="info-row">
        <span class="label">E-Mail:</span>
        <span class="value">${email}</span>
      </div>
      <div class="info-row">
        <span class="label">Telefon:</span>
        <span class="value">${telefon}</span>
      </div>
      ${firma ? `
      <div class="info-row">
        <span class="label">Firma:</span>
        <span class="value">${firma}</span>
      </div>
      ` : ''}
      <div class="info-row">
        <span class="label">Adresse:</span>
        <span class="value">${adresseStrasse} ${adresseHausnummer}, ${adressePlz} ${adresseOrt}</span>
      </div>
    </div>
    
    <div class="section">
      <h2>Anfrage-Details</h2>
      <div class="info-row">
        <span class="label">Service-Typ:</span>
        <span class="value">${serviceLabels[serviceType as ServiceType].title}</span>
      </div>
      <div class="info-row">
        <span class="label">Wunschtermin:</span>
        <span class="value">${formatDate(wunschtermin)}</span>
      </div>
      ${anmerkungen ? `
      <div class="info-row">
        <span class="label">Anmerkungen:</span>
        <span class="value">${anmerkungen}</span>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>Diese E-Mail wurde automatisch über das Kontaktformular auf treuservice.de generiert.</p>
    </div>
  </div>
</body>
</html>`;
    
    // E-Mail senden
    const result = await sendEmail({
      subject,
      text,
      html,
      replyTo: email
    });
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Fehler beim Senden der E-Mail:', result.error);
      return NextResponse.json(
        { success: false, message: 'Fehler beim Senden der E-Mail' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Fehler bei der Verarbeitung der Anfrage:', error);
    return NextResponse.json(
      { success: false, message: 'Fehler bei der Verarbeitung der Anfrage' },
      { status: 500 }
    );
  }
}