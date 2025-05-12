import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma } = formData.kontakt;
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Entkernung-Anfrage von ${vorname} ${nachname}`;
    
    // Objekttyp formatieren
    const getObjektTypName = () => {
      const objektTypLabels: Record<string, string> = {
        wohnung: "Wohnung",
        haus: "Haus/Villa",
        gewerbe: "Gewerbeobjekt",
        industriegebaeude: "Industriegebäude",
        oeffentlichesgebaeude: "Öffentliches Gebäude",
        sonstiges: "Sonstiges Objekt"
      };
      return objektTypLabels[formData.objektTyp] || formData.objektTyp;
    };

    // Schadstoffe formatieren
    const getSchadstoffeText = () => {
      const labels: Record<string, string> = {
        asbest: "Asbest",
        pcb: "PCB",
        kmf: "KMF",
        schimmel: "Schimmel",
        holzschutz: "Holzschutzmittel"
      };
      
      const selected = [];
      if (formData.schadstoffoptionen.asbest) selected.push(labels.asbest);
      if (formData.schadstoffoptionen.pcb) selected.push(labels.pcb);
      if (formData.schadstoffoptionen.kmf) selected.push(labels.kmf);
      if (formData.schadstoffoptionen.schimmel) selected.push(labels.schimmel);
      if (formData.schadstoffoptionen.holzschutz) selected.push(labels.holzschutz);
      
      if (selected.length === 0) {
        return formData.schadstoffoptionen.unbekannt ? "Keine bekannten Schadstoffe" : "Keine Angabe";
      }
      
      return selected.join(", ");
    };

    // Zusatzoptionen formatieren
    const getZusatzoptionenText = () => {
      const labels: Record<string, string> = {
        entsorgung: "Entsorgung",
        beratung: "Beratung",
        statikPruefung: "Statikprüfung",
        behoerdengaenge: "Behördengänge"
      };
      
      const selected = [];
      if (formData.zusatzoptionen.entsorgung) selected.push(labels.entsorgung);
      if (formData.zusatzoptionen.beratung) selected.push(labels.beratung);
      if (formData.zusatzoptionen.statikPruefung) selected.push(labels.statikPruefung);
      if (formData.zusatzoptionen.behoerdengaenge) selected.push(labels.behoerdengaenge);
      
      if (selected.length === 0) {
        return "Keine zusätzlichen Optionen";
      }
      
      return selected.join(", ");
    };

    // Formatierte Daten für Text-E-Mail
    const text = `Neue Entkernung-Anfrage über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}

${formatFormData(formData)}`;
    
    // Formatierte Daten für HTML-E-Mail mit verbessertem Styling
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
  </style>
</head>
<body>
  <h1>Neue Entkernung-Anfrage</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    <p><strong>Adresse:</strong> ${formData.kontakt.adresseStrasse} ${formData.kontakt.adresseHausnummer}, ${formData.kontakt.adressePlz} ${formData.kontakt.adresseOrt}</p>
    ${formData.kontakt.anmerkungen ? `<p><strong>Anmerkungen:</strong> ${formData.kontakt.anmerkungen}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Objektdaten</h2>
    <table>
      <tr>
        <td class="label">Objekttyp:</td>
        <td>${getObjektTypName()}</td>
      </tr>
      <tr>
        <td class="label">Baujahr:</td>
        <td>${formData.objektDetails.baujahr || 'Keine Angabe'}</td>
      </tr>
      <tr>
        <td class="label">Fläche:</td>
        <td>${formData.objektDetails.flaeche} m²</td>
      </tr>
      <tr>
        <td class="label">Stockwerke:</td>
        <td>${formData.objektDetails.stockwerke === 11 ? 'Mehr als 10' : formData.objektDetails.stockwerke}</td>
      </tr>
      ${formData.objektDetails.besonderheiten ? `
      <tr>
        <td class="label">Besonderheiten:</td>
        <td>${formData.objektDetails.besonderheiten}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Umfang</h2>
    <table>
      <tr>
        <td class="label">Art:</td>
        <td>${formData.umfang.komplettEntkernung ? 'Komplettentkernung' : 'Selektiver Rückbau'}</td>
      </tr>
      ${formData.umfang.selektiverRueckbau && formData.umfang.ausgewaehlteElemente.length > 0 ? `
      <tr>
        <td class="label">Ausgewählte Elemente:</td>
        <td>${formData.umfang.ausgewaehlteElemente.join(', ')}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Schadstoffe & Optionen</h2>
    <table>
      <tr>
        <td class="label">Schadstoffe:</td>
        <td>${getSchadstoffeText()}</td>
      </tr>
      <tr>
        <td class="label">Zusatzoptionen:</td>
        <td>${getZusatzoptionenText()}</td>
      </tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Adresse & Termine</h2>
    <table>
      <tr>
        <td class="label">Objektadresse:</td>
        <td>${formData.adresseTermin.strasse} ${formData.adresseTermin.hausnummer}, ${formData.adresseTermin.plz} ${formData.adresseTermin.ort}</td>
      </tr>
      <tr>
        <td class="label">Wunschtermin:</td>
        <td>${new Date(formData.adresseTermin.wunschtermin).toLocaleDateString('de-DE')}</td>
      </tr>
      ${formData.adresseTermin.alternativtermin ? `
      <tr>
        <td class="label">Alternativtermin:</td>
        <td>${new Date(formData.adresseTermin.alternativtermin).toLocaleDateString('de-DE')}</td>
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