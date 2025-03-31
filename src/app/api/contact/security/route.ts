import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma } = formData.kontakt;
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Security-Anfrage von ${vorname} ${nachname}`;
    
    // Mapping für benutzerfreundliche Anzeige
    const securityTypesLabels: Record<string, string> = {
      objektschutz: "Objektschutz",
      werkschutz: "Werkschutz",
      baustellenbewachung: "Baustellenbewachung",
      asylunterkuenfte: "Sicherheit für Asylunterkünfte",
      city_streife: "City-Streife",
      revierstreifendienst: "Revier- & Streifendienst",
      doorman: "Doorman",
      ladendetektiv: "Laden- & Kaufhausdetektiv",
      empfangsdienst: "Empfangs- & Pfortendienst",
      nightaudit: "Night-Audit",
      eventschutz: "Event- & Veranstaltungsschutz",
      standwache: "Standwache / Messeschutz",
      ordnerdienst: "Ordnerdienst",
      parkraummanagement: "Parkraummanagement",
      chauffeurservice: "Fahr- & Chauffeurservice",
      sonstiges: "Sonstige Sicherheitsdienste"
    };

    const objektTypLabels: Record<string, string> = {
      gewerbe: "Gewerbeobjekt",
      buero: "Bürogebäude",
      industrie: "Industrieanlage",
      baustelle: "Baustelle",
      veranstaltung: "Veranstaltungsort",
      wohnanlage: "Wohnanlage",
      privat: "Privatobjekt",
      handelsobjekt: "Handelsobjekt",
      hotel: "Hotel/Gaststätte",
      institution: "Behörde/Institution",
      sonstiges: "Anderes Objekt"
    };

    const dauerTypLabels: Record<string, string> = {
      einmalig: "Einmalig",
      kurzzeitig: "Kurzzeitig",
      langfristig: "Langfristig",
      unbefristet: "Unbefristet"
    };

    const wiederholungLabels: Record<string, string> = {
      keine: "Keine Wiederholung",
      taeglich: "Täglich",
      woechentlich: "Wöchentlich",
      monatlich: "Monatlich"
    };

    // Helper-Funktionen für Formatierung
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Nicht angegeben';
      try {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
      } catch {
        return dateString;
      }
    };

    const getSecurityTypeDisplay = () => {
      const type = formData.securityType.hauptkategorie;
      const label = securityTypesLabels[type] || type;
      
      if (type === 'sonstiges' && formData.securityType.sonstigesText) {
        return `${label}: ${formData.securityType.sonstigesText}`;
      }
      
      return label || 'Nicht angegeben';
    };

    const getObjektTypDisplay = () => {
      const typ = formData.objektTyp.typ;
      const label = objektTypLabels[typ] || typ;
      return label || 'Nicht angegeben';
    };

    const qualifikationenList = () => {
      const qualifikationen = formData.personalUmfang.qualifikationen;
      const list = [];
      
      if (qualifikationen.sg34a) list.push("Sachkunde § 34a GewO");
      if (qualifikationen.ersteHilfe) list.push("Erweiterte Erste-Hilfe");
      if (qualifikationen.brandschutz) list.push("Brandschutzhelfer");
      if (qualifikationen.deeskalation) list.push("Deeskalationstraining");
      if (qualifikationen.evakuierung) list.push("Evakuierungshelfer");
      if (qualifikationen.fremdsprachen) list.push("Fremdsprachenkenntnisse");
      
      if (qualifikationen.sonstigeQualifikationen) {
        list.push(qualifikationen.sonstigeQualifikationen);
      }
      
      return list.length > 0 ? list.join(", ") : "Keine speziellen Qualifikationen";
    };

    const diensteTimes = () => {
      const dienste = formData.zeitlicheInfos.dienste;
      const times = [];
      
      if (dienste.tagesdienst) times.push("Tagdienst");
      if (dienste.nachtdienst) times.push("Nachtdienst");
      if (dienste.wochenenddienst) times.push("Wochenenddienst");
      if (dienste.feiertagsdienst) times.push("Feiertagsdienst");
      
      return times.length > 0 ? times.join(", ") : "Keine Angabe";
    };

    const getWiederholungDisplay = () => {
      const wiederholung = formData.zeitlicheInfos.wiederholung;
      return wiederholung ? wiederholungLabels[wiederholung] : 'Keine Angabe';
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue Security-Anfrage über das Kontaktformular:
    
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
  <h1>Neue Security-Anfrage</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    <p><strong>Adresse:</strong> ${formData.kontakt.kontaktStrasse} ${formData.kontakt.kontaktHausnummer}, ${formData.kontakt.kontaktPlz} ${formData.kontakt.kontaktOrt}</p>
    ${formData.kontakt.anmerkungen ? `<p><strong>Anmerkungen:</strong> ${formData.kontakt.anmerkungen}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Sicherheitsdienstleistung</h2>
    <table>
      <tr>
        <td class="label">Dienstleistungsart:</td>
        <td>${getSecurityTypeDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Objekttyp:</td>
        <td>${getObjektTypDisplay()}</td>
      </tr>
      ${formData.objektTyp.customDetails ? `
      <tr>
        <td class="label">Objektdetails:</td>
        <td>${formData.objektTyp.customDetails}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Personal</h2>
    <table>
      <tr>
        <td class="label">Anzahl Sicherheitskräfte:</td>
        <td>${formData.personalUmfang.anzahlMitarbeiter} Personen</td>
      </tr>
      <tr>
        <td class="label">Bewaffnung:</td>
        <td>${formData.personalUmfang.bewaffnung ? "Ja" : "Nein"}</td>
      </tr>
      <tr>
        <td class="label">Qualifikationen:</td>
        <td>${qualifikationenList()}</td>
      </tr>
      ${formData.personalUmfang.spezifischeAnforderungen ? `
      <tr>
        <td class="label">Spezifische Anforderungen:</td>
        <td>${formData.personalUmfang.spezifischeAnforderungen}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Zeitliche Details</h2>
    <table>
      <tr>
        <td class="label">Einsatzdauer:</td>
        <td>${formData.zeitlicheInfos.dauerTyp ? dauerTypLabels[formData.zeitlicheInfos.dauerTyp] : 'Nicht angegeben'}</td>
      </tr>
      <tr>
        <td class="label">Wiederholung:</td>
        <td>${getWiederholungDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Beginn:</td>
        <td>${formatDate(formData.zeitlicheInfos.beginnDatum)}</td>
      </tr>
      ${formData.zeitlicheInfos.endeDatum ? `
      <tr>
        <td class="label">Ende:</td>
        <td>${formatDate(formData.zeitlicheInfos.endeDatum)}</td>
      </tr>
      ` : ''}
      <tr>
        <td class="label">Dienstzeiten:</td>
        <td>${diensteTimes()}</td>
      </tr>
      ${formData.zeitlicheInfos.anmerkungen ? `
      <tr>
        <td class="label">Anmerkungen zu Zeiten:</td>
        <td>${formData.zeitlicheInfos.anmerkungen}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Einsatzort</h2>
    <table>
      <tr>
        <td class="label">Adresse:</td>
        <td>${formData.kontakt.adresseStrasse} ${formData.kontakt.adresseHausnummer}, ${formData.kontakt.adressePlz} ${formData.kontakt.adresseOrt}</td>
      </tr>
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