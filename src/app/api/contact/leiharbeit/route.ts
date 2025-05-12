import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma } = formData.kontakt;
    
    // Betreffzeile für die E-Mail anhand des Anfrage-Typs anpassen
    const isUnternehmen = formData.anfrageTyp === 'unternehmen';
    const anfrageName = isUnternehmen ? 'Personalanfrage' : 'Bewerbung';
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Leiharbeit ${anfrageName} von ${vorname} ${nachname}${isUnternehmen && firma ? ` (${firma})` : ''}`;
    
    // Hilfsfunktionen für die formatierte Ausgabe
    // Branchenlabels
    const getBranchenLabel = (branche: string, sonstiges?: string) => {
      const labels: Record<string, string> = {
        produktion: "Produktion",
        logistik: "Logistik",
        handwerk: "Handwerk",
        buero: "Büro/Verwaltung",
        it: "IT",
        gastronomie: "Gastronomie",
        handel: "Handel",
        medizin: "Medizin & Pflege",
        sonstiges: "Sonstiges"
      };
      if (branche === 'sonstiges' && sonstiges) {
        return sonstiges;
      }
      return labels[branche] || branche;
    };

    // Qualifikationsniveau
    const getQualifikationLabel = (niveau: string) => {
      const labels: Record<string, string> = {
        ungelernt: "Ungelernt",
        angelernt: "Angelernt",
        fachkraft: "Fachkraft",
        spezialist: "Spezialist",
        fuehrungskraft: "Führungskraft"
      };
      return labels[niveau] || niveau;
    };

    // Einsatzdauer
    const getEinsatzdauerLabel = (dauer: string) => {
      const labels: Record<string, string> = {
        ein_tag: "Ein Tag",
        mehrere_tage: "2-5 Tage",
        kurzfristig: "Kurzfristig (1-4 Wochen)",
        mittelfristig: "Mittelfristig (1-6 Monate)",
        langfristig: "Langfristig (> 6 Monate)"
      };
      return labels[dauer] || dauer;
    };

    // Verfügbarkeit
    const getVerfuegbarkeitLabel = (verfuegbarkeit: string) => {
      const labels: Record<string, string> = {
        sofort: "Sofort verfügbar",
        ein_monat: "In 1 Monat",
        drei_monate: "In 2-3 Monaten",
        spaeter: "Später"
      };
      return labels[verfuegbarkeit] || verfuegbarkeit;
    };

    // Arbeitszeit
    const getArbeitszeitLabel = (arbeitszeit: string) => {
      const labels: Record<string, string> = {
        vollzeit: "Vollzeit",
        teilzeit: "Teilzeit",
        minijob: "Minijob",
        flexibel: "Flexibel"
      };
      return labels[arbeitszeit] || arbeitszeit;
    };

    // Schichtbereitschaft
    const getSchichtbereitschaftLabel = (schicht: string) => {
      const labels: Record<string, string> = {
        nur_tag: "Nur Tagschicht",
        auch_nacht: "Auch Nachtschicht",
        auch_wochenende: "Auch Wochenende",
        voll_flexibel: "Voll flexibel"
      };
      return labels[schicht] || schicht || "Keine Angabe";
    };

    // Sprachniveau
    const getSprachniveauLabel = (niveau: string) => {
      const labels: Record<string, string> = {
        keine: "Keine",
        grundkenntnisse: "Grundkenntnisse",
        gut: "Gut",
        fliessend: "Fließend",
        muttersprache: "Muttersprache"
      };
      return labels[niveau] || niveau || "Keine Angabe";
    };

    // Datum formatieren
    const formatDatum = (datum: string): string => {
      if (!datum) return 'Nicht angegeben';
      try {
        const [jahr, monat, tag] = datum.split('-');
        return `${tag}.${monat}.${jahr}`;
      } catch {
        return datum;
      }
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue Leiharbeit ${anfrageName} über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}

${formatFormData(formData)}`;
    
    // Formatierte Daten für HTML-E-Mail mit verbessertem Styling
    let html = `
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
  <h1>Neue Leiharbeit ${anfrageName}</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    <p><strong>Adresse:</strong> ${formData.kontakt.adresseStrasse} ${formData.kontakt.adresseHausnummer}, ${formData.kontakt.adressePlz} ${formData.kontakt.adresseOrt}</p>
    ${formData.kontakt.anmerkungen ? `<p><strong>Anmerkungen:</strong> ${formData.kontakt.anmerkungen}</p>` : ''}
  </div>`;

  // Unterschiedliche Abschnitte je nach Anfragetyp (Unternehmen oder Bewerber)
  if (isUnternehmen && formData.unternehmenBedarf) {
    html += `
  <div class="section">
    <h2>Personalbedarf</h2>
    <table>
      <tr>
        <td class="label">Branche:</td>
        <td>${getBranchenLabel(formData.unternehmenBedarf.branche, formData.unternehmenBedarf.brancheSonstiges)}</td>
      </tr>
      <tr>
        <td class="label">Benötigte Mitarbeiter:</td>
        <td>${formData.unternehmenBedarf.anzahlMitarbeiter}</td>
      </tr>
      <tr>
        <td class="label">Qualifikationsniveau:</td>
        <td>${getQualifikationLabel(formData.unternehmenBedarf.qualifikationsniveau)}</td>
      </tr>
      <tr>
        <td class="label">Einsatzdauer:</td>
        <td>${getEinsatzdauerLabel(formData.unternehmenBedarf.einsatzdauer)}</td>
      </tr>
      <tr>
        <td class="label">Einsatzbeginn:</td>
        <td>${formatDatum(formData.unternehmenBedarf.einsatzbeginn)}</td>
      </tr>
      ${formData.expressAnfrage ? `
      <tr>
        <td class="label">Express-Anfrage:</td>
        <td>Ja</td>
      </tr>` : ''}
    </table>
  </div>`;
  } else if (!isUnternehmen && formData.bewerberProfil) {
    html += `
  <div class="section">
    <h2>Bewerberprofil</h2>
    <table>
      <tr>
        <td class="label">Fachbereich:</td>
        <td>${getBranchenLabel(formData.bewerberProfil.fachbereich, formData.bewerberProfil.fachbereichSonstiges)}</td>
      </tr>
      <tr>
        <td class="label">Qualifikationsniveau:</td>
        <td>${getQualifikationLabel(formData.bewerberProfil.qualifikation)}</td>
      </tr>
      <tr>
        <td class="label">Berufserfahrung:</td>
        <td>${formData.bewerberProfil.berufserfahrungJahre} Jahre</td>
      </tr>
      <tr>
        <td class="label">Verfügbarkeit:</td>
        <td>${getVerfuegbarkeitLabel(formData.bewerberProfil.verfuegbarkeit)}</td>
      </tr>
      <tr>
        <td class="label">Arbeitszeit:</td>
        <td>${getArbeitszeitLabel(formData.bewerberProfil.arbeitszeit)}</td>
      </tr>
      <tr>
        <td class="label">Einsatzregion:</td>
        <td>${formData.bewerberProfil.einsatzregion}</td>
      </tr>
    </table>
  </div>`;
  }

  // Gemeinsame Abschnitte für beide Anfragetypen
  html += `
  <div class="section">
    <h2>${isUnternehmen ? 'Anforderungen' : 'Kenntnisse & Fähigkeiten'}</h2>
    <table>
      <tr>
        <td class="label">Spezielle Kenntnisse:</td>
        <td>${formData.anforderungen.spezielleKenntnisse || "Keine Angabe"}</td>
      </tr>
      <tr>
        <td class="label">Schichtbereitschaft:</td>
        <td>${getSchichtbereitschaftLabel(formData.anforderungen.schichtbereitschaft)}</td>
      </tr>
      <tr>
        <td class="label">Führerschein:</td>
        <td>${formData.anforderungen.fuehrerschein ? 'Ja' : 'Nein'}</td>
      </tr>
      <tr>
        <td class="label">Sprachkenntnisse (Deutsch):</td>
        <td>${getSprachniveauLabel(formData.anforderungen.sprachkenntnisse.deutsch)}</td>
      </tr>
      <tr>
        <td class="label">Sprachkenntnisse (Englisch):</td>
        <td>${getSprachniveauLabel(formData.anforderungen.sprachkenntnisse.englisch)}</td>
      </tr>
      ${formData.anforderungen.sprachkenntnisse.weitere ? `
      <tr>
        <td class="label">Weitere Sprachen:</td>
        <td>${formData.anforderungen.sprachkenntnisse.weitere}</td>
      </tr>` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>${isUnternehmen ? 'Konditionen' : 'Erwartungen'}</h2>
    <table>
      <tr>
        <td class="label">Arbeitszeiten:</td>
        <td>${formData.konditionen.arbeitszeiten || "Keine Angabe"}</td>
      </tr>
      <tr>
        <td class="label">Überstundenbereitschaft:</td>
        <td>${formData.konditionen.ueberstundenBereitschaft ? 'Ja' : 'Nein'}</td>
      </tr>
      ${isUnternehmen && formData.konditionen.stundensatz ? `
      <tr>
        <td class="label">Stundensatz:</td>
        <td>${formData.konditionen.stundensatz}</td>
      </tr>` : ''}
      ${isUnternehmen ? `
      <tr>
        <td class="label">Unterkunftsmöglichkeiten:</td>
        <td>${formData.konditionen.unterkunftVorhanden ? 'Ja' : 'Nein'}</td>
      </tr>` : ''}
      ${!isUnternehmen && formData.konditionen.gehaltsvorstellung ? `
      <tr>
        <td class="label">Gehaltsvorstellung:</td>
        <td>${formData.konditionen.gehaltsvorstellung}</td>
      </tr>` : ''}
      ${!isUnternehmen ? `
      <tr>
        <td class="label">Unterkunftsbedarf:</td>
        <td>${formData.konditionen.unterkunftBedarf ? 'Ja' : 'Nein'}</td>
      </tr>` : ''}
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