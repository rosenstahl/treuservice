import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma, wunschtermin } = formData.kontakt;
    
    // Betreffzeile für die E-Mail
    const subject = `Neue PV-Montage-Anfrage von ${vorname} ${nachname}`;
    
    // Hilfsfunktionen für formatierten Output

    // Dachtyp-Anzeigename
    const getDachTypDisplay = () => {
      const typeMap: Record<string, string> = {
        pitched: 'Schrägdach',
        flat: 'Flachdach',
        facade: 'Fassade',
        carport: 'Carport',
        other: 'Anderer Dachtyp'
      };
      
      const typ = formData.dach.typ;
      if (typ === 'other' && formData.dach.sonstigesText) {
        return `${typeMap[typ]}: ${formData.dach.sonstigesText}`;
      }
      
      return typeMap[typ] || typ;
    };

    // Modultyp-Anzeigename
    const getModulTypDisplay = () => {
      const typeMap: Record<string, string> = {
        standard: 'Standard',
        premium: 'Premium',
        bifacial: 'Bifazial'
      };
      
      return typeMap[formData.anlage.modulTyp] || formData.anlage.modulTyp;
    };

    // Montageart-Anzeigename
    const getMontageArtDisplay = () => {
      const typeMap: Record<string, string> = {
        'roof-mounted': 'Aufdach',
        'in-roof': 'Indach',
        'flat-roof': 'Flachdach'
      };
      
      return typeMap[formData.anlage.montageArt] || formData.anlage.montageArt;
    };

    // Ausrichtungs-Anzeigename
    const getAusrichtungDisplay = () => {
      const typeMap: Record<string, string> = {
        south: 'Süd',
        'east-west': 'Ost-West',
        other: 'Andere'
      };
      
      return typeMap[formData.dach.ausrichtung] || formData.dach.ausrichtung;
    };

    // Datum formatieren
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return 'Nicht angegeben';
      
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch {
        return dateString;
      }
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue PV-Montage-Anfrage über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}
Adresse: ${formData.kontakt.adresseStrasse} ${formData.kontakt.adresseHausnummer}, ${formData.kontakt.adressePlz} ${formData.kontakt.adresseOrt}
${wunschtermin ? `Wunschtermin: ${formatDate(wunschtermin)}` : ''}
${formData.kontakt.anmerkungen ? `Anmerkungen: ${formData.kontakt.anmerkungen}` : ''}

DACHDATEN:
Dachtyp: ${getDachTypDisplay()}
Fläche: ${formData.dach.flaeche} m²
Neigung: ${formData.dach.neigung}°
Material: ${formData.dach.material}
Ausrichtung: ${getAusrichtungDisplay()}
${formData.dach.hindernis && formData.dach.hindernisDetails ? `Hindernisse/Verschattung: ${formData.dach.hindernisDetails}` : ''}

ANLAGENDATEN:
Leistung: ${formData.anlage.leistung} kWp
Modultyp: ${getModulTypDisplay()}
Montageart: ${getMontageArtDisplay()}
Eigenverbrauch: ${formData.anlage.eigenverbrauch}%
${formData.anlage.anzahlModule ? `Anzahl Module: ${formData.anlage.anzahlModule}` : ''}

SPEICHER:
Gewünscht: ${formData.speicher.speicherGewuenscht ? 'Ja' : 'Nein'}
${formData.speicher.speicherGewuenscht ? `Kapazität: ${formData.speicher.kapazitaet} kWh` : ''}
${formData.speicher.speicherGewuenscht && formData.speicher.hersteller ? `Hersteller: ${formData.speicher.hersteller}` : ''}

${formatFormData(formData)}`;
    
    // Formatierte Daten für HTML-E-Mail
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    h1 { color: #0056b3; }
    h2 { color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 25px; }
    .contact-info { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .contact-info p { margin: 5px 0; }
    .section { margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; background-color: #f1f1f1; padding: 8px; }
    td { padding: 8px; border-bottom: 1px solid #ddd; }
    .label { font-weight: bold; width: 30%; }
    .highlight { background-color: #f0f7ff; }
  </style>
</head>
<body>
  <h1>Neue PV-Montage-Anfrage</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    <p><strong>Adresse:</strong> ${formData.kontakt.adresseStrasse} ${formData.kontakt.adresseHausnummer}, ${formData.kontakt.adressePlz} ${formData.kontakt.adresseOrt}</p>
    ${wunschtermin ? `<p><strong>Wunschtermin:</strong> ${formatDate(wunschtermin)}</p>` : ''}
    ${formData.kontakt.anmerkungen ? `<p><strong>Anmerkungen:</strong> ${formData.kontakt.anmerkungen}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Dach-Details</h2>
    <table>
      <tr>
        <td class="label">Dachtyp:</td>
        <td>${getDachTypDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Material:</td>
        <td>${formData.dach.material}</td>
      </tr>
      <tr>
        <td class="label">Ausrichtung:</td>
        <td>${getAusrichtungDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Fläche:</td>
        <td>${formData.dach.flaeche} m²</td>
      </tr>
      <tr>
        <td class="label">Neigung:</td>
        <td>${formData.dach.neigung}°</td>
      </tr>
      ${formData.dach.hindernis && formData.dach.hindernisDetails ? `
      <tr>
        <td class="label">Hindernisse/Verschattung:</td>
        <td>${formData.dach.hindernisDetails}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>PV-Anlage</h2>
    <table>
      <tr>
        <td class="label">Anlagenleistung:</td>
        <td>${formData.anlage.leistung} kWp</td>
      </tr>
      <tr>
        <td class="label">Modultyp:</td>
        <td>${getModulTypDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Montageart:</td>
        <td>${getMontageArtDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Eigenverbrauch:</td>
        <td>${formData.anlage.eigenverbrauch}%</td>
      </tr>
      ${formData.anlage.anzahlModule ? `
      <tr>
        <td class="label">Anzahl Module:</td>
        <td>${formData.anlage.anzahlModule}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Batteriespeicher</h2>
    <table>
      <tr>
        <td class="label">Speicher gewünscht:</td>
        <td>${formData.speicher.speicherGewuenscht ? 'Ja' : 'Nein'}</td>
      </tr>
      ${formData.speicher.speicherGewuenscht ? `
      <tr>
        <td class="label">Kapazität:</td>
        <td>${formData.speicher.kapazitaet} kWh</td>
      </tr>
      ` : ''}
      ${formData.speicher.speicherGewuenscht && formData.speicher.hersteller ? `
      <tr>
        <td class="label">Bevorzugter Hersteller:</td>
        <td>${formData.speicher.hersteller}</td>
      </tr>
      ` : ''}
    </table>
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