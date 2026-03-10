// ==========================================
// ΛΟΓΙΚΗ ΕΞΑΓΩΓΗΣ ΣΕ WORD (ΟΛΑ ΤΑ ΕΓΓΡΑΦΑ)
// ==========================================
const pStyle = "text-align: justify; font-family: 'Times New Roman'; font-size: 12pt; line-height: 115%; margin: 0cm 0cm 4pt 0cm; padding: 0cm; background: white; color: black;";

function formatTextToParagraphs(text) {
    let lines = text.split(/\n/); let html = "";
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === "") continue; 
        let formattedLine = line.replace(/(ΕΡΩΤΗΣΗ:)/gi, "<b>$1</b>").replace(/(ΑΠΟΚΡΙΣΗ:)/gi, "<b>$1</b>");
        html += `<p style="${pStyle}">${formattedLine}</p>`;
    }
    return html;
}

function addSelectedCrime() {
    let dd = document.getElementById("ai_crime_dropdown"); 
    let sc = dd.value; 
    if (!sc) return;
    
    let lawInput = document.getElementById("ai_law");
    lawInput.value = lawInput.value.trim() === "" ? sc : lawInput.value + " και " + sc;
    dd.value = ""; 
}

function clearCrimes() { document.getElementById("ai_law").value = ""; }

function generateAutoCharge() {
    let lawInput = document.getElementById("ai_law").value.trim();
    if (!lawInput) { alert("Επιλέξτε αδίκημα."); return; }
    let isMultiple = lawInput.includes("και") || lawInput.includes(",");
    let actStr = isMultiple ? "πράξεις οι οποίες έλαβαν χώρα" : "πράξη η οποία έλαβε χώρα";
    let arthraStr = isMultiple ? "των άρθρων" : "του άρθρου";
    document.getElementById("apologia_charge_short").value = `παράβαση ${arthraStr} ${lawInput}, ${actStr} την ${document.getElementById("ai_date").value.trim()} και ώρα ${document.getElementById("ai_time").value.trim()} στο/στην ${document.getElementById("ai_loc").value.trim()}`;
    if(document.getElementById("apologia_charge_details").value.trim() === "") document.getElementById("apologia_charge_details").value = "Ειδικότερα, την ανωτέρω ημέρα, ώρα και τόπο... ";
    saveMem("apologia_charge_short"); saveMem("apologia_charge_details");
}

function makeDoc(title, headerTitle, bodyContent, filename) {
    let finalHtml = `${headerTitle}${bodyContent}`;
    let fullHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${title}</title><style>body { background: white; color: black; font-family: 'Times New Roman'; }</style></head><body style="background-color: white; color: black;">${finalHtml}</body></html>`;
    let blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
    let url = URL.createObjectURL(blob); let link = document.createElement('a'); link.href = url; link.download = filename; 
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function sigBlock(role1, role2, role3) {
    return `<p style="${pStyle}">&nbsp;</p><p style="${pStyle}">&nbsp;</p><table style="width: 100%; font-family: 'Times New Roman'; font-size: 12pt; text-align: center; margin-top: 0cm; margin-bottom: 0cm; padding: 0cm; background: white; color: black; border: none;" border="0"><tr><td style="width: 33%; vertical-align: top;">${role1}</td><td style="width: 33%; vertical-align: top;">${role2}</td><td style="width: 33%; vertical-align: top;">${role3}</td></tr></table>`;
}

function getD() {
    let v = id => document.getElementById(id) ? document.getElementById(id).value.trim() : "";
    let g = v("gender");
    
    let c_city = document.getElementById("cfg_city").value.trim();
    let c_dept = document.getElementById("cfg_dept").value.trim();
    let c_deptFull = document.getElementById("cfg_deptFull").value.trim();
    let c_prosecutor = document.getElementById("cfg_prosecutor").value.trim();
    
    return {
        v: v, anakr: v("doc_anakr"), banakr: v("doc_banakr"),
        city: c_city !== "" ? c_city : "Ασπροβάλτα",
        dept: c_dept !== "" ? c_dept : "Α.Τ. Βόλβης",
        deptFull: c_deptFull !== "" ? c_deptFull : "Αστυνομικό Τμήμα Βόλβης Θεσσαλονίκης",
        prosecutor: c_prosecutor !== "" ? c_prosecutor : "Εισαγγελέα Πλημμελειοδικών Θεσσαλονίκης",
        a_o: g === 'M' ? "ο" : "η", a_os: g === 'M' ? "σημειούμενος κατηγορούμενος" : "σημειούμενη κατηγορούμενη",
        a_tou: g === 'M' ? "του" : "της", a_ton: g === 'M' ? "τον" : "την",
        a_auton: g === 'M' ? "αυτόν" : "αυτήν", a_exet: g === 'M' ? "εξεταζόμενος" : "εξεταζόμενη",
        a_sign: g === 'M' ? "Ο Εξετασθείς" : "Η Εξετασθείσα",
        dateStr: `${v("doc_date")} του μήνα ${v("doc_month")} του έτους ${v("doc_year")} ημέρα της εβδομάδας ${v("doc_day")}`,
        prof: getProfileText()
    };
}

// 1. ΑΠΛΗ ΕΝΟΡΚΗ
function exportToWord() {
    if (!validateRequiredFields(['surname', 'name', 'doc_testimony_simple'])) return;
    let d = getD(); let rel = d.v("doc_relation_simple"); let copy = d.v("doc_copy_simple"); let parav = d.v("doc_paravolo_simple");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΝΟΡΚΗΣ ΕΞΕΤΑΣΗΣ ΜΑΡΤΥΡΑ (Κ.Π.Δ.)</p>`;
    
    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω μάρτυρας, ${d.v('gender')==='M'?'ο οποίος':'η οποία'}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof} και ότι ${rel}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, αφού έδωσε τον προβλεπόμενο όρκο από τα άρθρα 219 και 220 παρ. 1 του Κ.Π.Δ. εξετάζεται ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας;</p>
    ${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + d.v("doc_testimony_simple"))}`;
    
    if (parav === "ΝΑΙ") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Γνωρίζετε ότι σύμφωνα με τον Νόμο 5090/24 για την υποβολή έγκλησης απαιτείται η προσκόμιση παράβολου ύψους εκατό -#100# ευρώ.;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Ναι το γνωρίζω και θα σας το καταθέσω εντός τριών -3- ημερών.</p>`;
    if (copy === "YES") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε αντίγραφο της παρούσας έγκλησης κατ’ εφαρμογή του άρθρου 58 παρ. 1 Ν.4478/2017;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Ναι, επιθυμώ.</p>`;
    else if (copy === "NO") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε αντίγραφο της παρούσας έγκλησης κατ’ εφαρμογή του άρθρου 58 παρ. 1 Ν.4478/2017;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Όχι, δεν επιθυμώ.</p>`;
    
    body += `<p style="${pStyle}">Κάτι άλλο δεν έχω να προσθέσω και υπογράφω.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("doc_start")} ώρα και περατώθηκε την ${d.v("doc_end")} ώρα.</p>
    <p style="${pStyle}">Ενημερώθηκε ότι μπορεί να λαμβάνει εγκαίρως γνώση των εγγράφων της δίκης, τα οποία επιδίδονται και με ηλεκτρονικά μέσα σύμφωνα με τις παρ. 1 και 4 του άρθρου 155 Κ.Π.Δ.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού πρώτα αναγνώστηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Ένορκη", header, body, `ΕΚΘΕΣΗ_ΕΝΟΡΚΗ_ΜΑΡΤΥΡΑ_${d.v("surname")}.doc`);
}

// 2. ΕΝΔΟΟΙΚΟΓΕΝΕΙΑΚΗ
function exportToWordNoOath() {
    if (!validateRequiredFields(['surname', 'name', 'dv_q_main'])) return;
    let d = getD(); let rel = d.v("doc_relation_dv"); let copy = d.v("doc_copy_dv"); let parav = d.v("doc_paravolo_dv");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΜΑΡΤΥΡΑ ΧΩΡΙΣ ΟΡΚΟ</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εμού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω μάρτυρας, ${d.v('gender')==='M'?'ο οποίος':'η οποία'}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof} και ότι ${rel}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, ως μέλος οικογένειας σε υπόθεση ενδοοικογενειακής βίας, εξετάζεται χωρίς όρκο δυνάμει του άρθρου 19 παρ. 1 Ν.3500/2006 ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας;</p>${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + d.v("dv_q_main"))}`;
    
    dvQuestions.forEach((q, i) => {
        let ans = d.v("dv_q_" + i);
        if (ans) body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> ${q}</p>${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + ans)}`;
    });
    if (d.v("dv_q_last")) body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Έχετε να προσθέσετε κάτι άλλο;</p>${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + d.v("dv_q_last"))}`;
    
    if (parav === "YES_3DAYS") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Γνωρίζεις ότι για την άσκηση της ποινικής δίωξης αναφορικά με τα κατ' έγκληση διωκόμενα αδικήματα που περιγράφεις απαιτείται η προσκόμιση παραβόλου;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Ναι το γνωρίζω και θα το προσκομίσω εντός 3 ημερών.</p>`;
    else if (parav === "ONLY_EX_OFFICIO") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Γνωρίζεις ότι για την άσκηση της ποινικής δίωξης αναφορικά με τα κατ' έγκληση διωκόμενα αδικήματα που περιγράφεις απαιτείται η προσκόμιση παραβόλου;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Επιθυμώ την ποινική δίωξη του δράστη μόνο για τα αυτεπάγγελτα αδικήματα εις βάρος μου.</p>`;
    
    if (copy === "YES") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε αντίγραφο της παρούσας έγκλησης κατ’ εφαρμογή του άρθρου 58 παρ. 1 Ν.4478/2017;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Ναι, επιθυμώ.</p>`;
    else if (copy === "NO") body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε αντίγραφο της παρούσας έγκλησης κατ’ εφαρμογή του άρθρου 58 παρ. 1 Ν.4478/2017;</p><p style="${pStyle}"><b>ΑΠΟΚΡΙΣΗ:</b> Όχι, δεν επιθυμώ.</p>`;
    
    body += `<p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("doc_start")} ώρα και περατώθηκε την ${d.v("doc_end")} ώρα.</p>
    <p style="${pStyle}">Ενημερώθηκε ότι μπορεί να λαμβάνει εγκαίρως γνώση των εγγράφων της δίκης, τα οποία επιδίδονται και με ηλεκτρονικά μέσα σύμφωνα με τις παρ. 1 και 4 του άρθρου 155 Κ.Π.Δ.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού πρώτα αναγνώστηκε και βεβαιώθηκε από όλους του παριστάμενους, υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Χωρίς Όρκο", header, body, `ΕΚΘΕΣΗ_ΧΩΡΙΣ_ΟΡΚΟ_${d.v("surname")}.doc`);
}

// 3. ΠΡΟΚΑΤΑΡΚΤΙΚΗ - ΔΙΚΑΙΩΜΑΤΑ
function exportProkRights() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm'])) return;
    let d = getD(); let abm = d.v("prok_abm");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΓΝΩΣΤΟΠΟΙΗΣΗΣ ΔΙΚΑΙΩΜΑΤΩΝ ΣΕ ΥΠΟΠΤΟ ΤΕΛΕΣΗΣ ΑΞΙΟΠΟΙΝΗΣ ΠΡΑΞΗΣ</p>`;
    
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")}΄, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας προσληφθείς ως Β’ Ανακριτικού Υπαλλήλου, προσκλήθηκε ${d.a_o} κατωτέρω σημειούμενος ύποπτος, που ονομάζεται ${d.prof}, στ${d.a_ton} οποί${d.a_o} γνωστοποιήσαμε ότι εξετάζεται ανωμοτί σε πταισματική/πλημμεληματική/κακουργηματική πράξη, κατόπιν της ${abm}, και εξηγήσαμε σαφώς σ’ ${d.a_auton}, βάσει του άρθρου 244 του Κ.Π.Δ. όλα τα εκ του άρθρου 104 του Κ.Π.Δ. δικαιώματά ${d.a_tou} και αναλυτικότερα:</p>
    <p style="${pStyle}"><b>1.</b> Έχει το δικαίωμα να παρίσταται με συνήγορο. Σε καμία περίπτωση δεν μπορεί να απαγορευθεί η επικοινωνία του υπόπτου με τον συνήγορό του.</p>
    <p style="${pStyle}"><b>2.</b> Έχει το δικαίωμα να αρνηθεί να απαντήσει (δικαίωμα σιωπής) και να μην αυτοενοχοποιηθεί.</p>
    <p style="${pStyle}"><b>3.</b> Έχει το δικαίωμα να ζητήσει προθεσμία τουλάχιστον σαράντα οκτώ (48) ωρών για να δώσει τις εξηγήσεις του, καθώς και να ζητήσει αντίγραφα της δικογραφίας με δική του δαπάνη.</p>
    <p style="${pStyle}"><b>4.</b> Έχει το δικαίωμα, αντί προφορικών εξηγήσεων, να υποβάλει έγγραφο υπόμνημα.</p>
    <p style="${pStyle}">Για πίστωση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε, υπογράφεται ως ακολούθως :</p>
    ${sigBlock(d.v("gender")==='M'?"Ο λαβών γνώση Ύποπτος":"Η λαβούσα γνώση Ύποπτη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Δικαιώματα Ύποπτου", header, body, `1_ΔΙΚΑΙΩΜΑΤΑ_ΥΠΟΠΤΟΥ_${d.v("surname")}.doc`);
}

// 4. ΠΡΟΚΑΤΑΡΚΤΙΚΗ - ΧΩΡΙΣ ΠΡΟΘΕΣΜΙΑ
function exportProkNoDeadline() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_plea'])) return;
    let d = getD(); let abm = d.v("prok_abm");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΥΠΟΠΤΟΥ ΧΩΡΙΣ ΟΡΚΟ</p>`;
    
    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω ύποπτος, ${d.v('gender')==='M'?'ο οποίος':'η οποία'}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, αφού παραιτήθηκε ρητά από το δικαίωμα λήψης προθεσμίας, εξετάζεται χωρίς όρκο κατ' άρθρο 244 ΚΠΔ ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Τι έχεις να αναφέρεις σχετικά με τα καταγγελλόμενα σε βάρος σου, κατόπιν της ${abm};</p>
    ${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + d.v("prok_plea"))}
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("doc_start")} ώρα και περατώθηκε την ${d.v("doc_end")} ώρα.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού πρώτα αναγνώστηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.v("gender")==='M'?"Ο Εξετασθείς Ύποπτος":"Η Εξετασθείσα Ύποπτη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Ανωμοτί", header, body, `2_ΑΝΩΜΟΤΙ_ΕΞΕΤΑΣΗ_${d.v("surname")}.doc`);
}

// 5. ΠΡΟΚΑΤΑΡΚΤΙΚΗ - ΧΟΡΗΓΗΣΗ ΠΡΟΘΕΣΜΙΑΣ
function exportProkDeadline() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_dead_date', 'prok_dead_time'])) return;
    let d = getD(); let abm = d.v("prok_abm");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΜΦΑΝΙΣΗΣ ΥΠΟΠΤΟΥ ΚΑΙ ΧΟΡΗΓΗΣΗΣ ΠΡΟΘΕΣΜΙΑΣ</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω ύποπτος, ${d.v('gender')==='M'?'ο οποίος':'η οποία'}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, δήλωσε ότι προκειμένου να προετοιμάσει τις εξηγήσεις ${d.a_tou} και να συμβουλευτεί δικηγόρο, αναφορικά με την ${abm}, αιτείται τη χορήγηση προθεσμίας.</p>
    <p style="${pStyle}">Κατόπιν τούτου, χορηγήθηκε στ${d.a_ton} ανωτέρω προθεσμία προκειμένου να προσέλθει στο ${d.dept} την ${d.v("prok_dead_date")} και ώρα ${d.v("prok_dead_time")}.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("doc_start")} ώρα και περατώθηκε την ${d.v("doc_end")} ώρα.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού πρώτα αναγνώστηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.v("gender")==='M'?"Ο Εξετασθείς Ύποπτος":"Η Εξετασθείσα Ύποπτη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Προθεσμία", header, body, `3_ΧΟΡΗΓΗΣΗ_ΠΡΟΘΕΣΜΙΑΣ_${d.v("surname")}.doc`);
}

// 6. ΠΡΟΚΑΤΑΡΚΤΙΚΗ - ΜΕΤΑ ΑΠΟ ΠΡΟΘΕΣΜΙΑ
function exportProkAfterDeadline() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_dead_date', 'prok_plea'])) return;
    let d = getD(); let abm = d.v("prok_abm");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΥΠΟΠΤΟΥ ΧΩΡΙΣ ΟΡΚΟ (ΜΕΤΑ ΑΠΟ ΠΡΟΘΕΣΜΙΑ)</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω ύποπτος, ${d.v('gender')==='M'?'ο οποίος':'η οποία'}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, μετά την προθεσμία που του χορηγήθηκε την ${d.v("prok_dead_date")}, εξετάζεται χωρίς όρκο κατ' άρθρο 244 ΚΠΔ ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Τι έχεις να αναφέρεις σχετικά με τα καταγγελλόμενα σε βάρος σου, κατόπιν της ${abm};</p>
    ${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + d.v("prok_plea"))}
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("doc_start")} ώρα και περατώθηκε την ${d.v("doc_end")} ώρα.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού πρώτα αναγνώστηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.v("gender")==='M'?"Ο Εξετασθείς Ύποπτος":"Η Εξετασθείσα Ύποπτη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Ανωμοτί", header, body, `4_ΑΝΩΜΟΤΙ_ΜΕΤΑ_ΠΡΟΘΕΣΜΙΑ_${d.v("surname")}.doc`);
}

// 7. ΠΡΟΚΑΤΑΡΚΤΙΚΗ - ΥΠΟΜΝΗΜΑ
function exportProkMemo() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_pages'])) return;
    let d = getD(); let abm = d.v("prok_abm");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΓΧΕΙΡΙΣΕΩΣ ΥΠΟΜΝΗΜΑΤΟΣ ΕΞΗΓΗΣΕΩΝ</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω ύποπτος, ${d.v('gender')==='M'?'ο οποίος':'η οποία'}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ανωτέρω, ενεχείρισε σε εμάς, αντί προφορικών εξηγήσεων, έγγραφο υπόμνημα αποτελούμενο από ${d.v("prok_pages")} σελίδες, προς απάντηση της ${abm}, το οποίο και επισυνάπτεται στην παρούσα δικογραφία.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("doc_start")} ώρα και περατώθηκε την ${d.v("doc_end")} ώρα.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού πρώτα αναγνώστηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.v("gender")==='M'?"Ο Εγχειρίσας Ύποπτος":"Η Εγχειρίσασα Ύποπτη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Υπόμνημα", header, body, `5_ΥΠΟΜΝΗΜΑ_${d.v("surname")}.doc`);
}

// 8. ΣΥΛΛΗΨΗ
function exportArrest() {
    if (!validateRequiredFields(['surname', 'name', 'arr_loc', 'apologia_charge_short'])) return;
    let d = getD(); let shortC = d.v("apologia_charge_short"); let reason = d.v("arr_reason").replace(/[\n\r]+/g, " ");
    let sentence = reason !== "" ? `διότι ${reason} για ${shortC}` : (shortC !== "" ? `για ${shortC}` : `για ... (Συμπληρώστε αιτιολογία)`);
    let arrDT = (d.v("arr_street_date") ? ` την ${d.v("arr_street_date")}` : ``) + (d.v("arr_street_time") ? ` και περί ώρα ${d.v("arr_street_time")}` : ``);
    let locText = d.v("arr_loc") ? ` ${d.v("arr_loc")}` : ``;
    
    let sig4 = `<p style="${pStyle}">&nbsp;</p><p style="${pStyle}">&nbsp;</p><table style="width: 100%; font-family: 'Times New Roman'; font-size: 12pt; text-align: center; margin-top: 0cm; margin-bottom: 0cm; padding: 0cm; background: white; color: black; border: none;" border="0"><tr><td style="width: 25%; vertical-align: top;">${d.v("gender")==='M'?"Ο Συλληφθείς":"Η Συλληφθείσα"}</td><td style="width: 25%; vertical-align: top;">Ο Συλλαβών</td><td style="width: 25%; vertical-align: top;">Ο Β΄ Ανακριτ. Υπάλλ.</td><td style="width: 25%; vertical-align: top;">Ο Ανακριτ. Υπάλληλος</td></tr></table>`;
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">Ε Κ Θ Ε Σ Η &nbsp;&nbsp;&nbsp; Σ Υ Λ Λ Η Ψ Η Σ</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("arr_start")} ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας, που προσλήφθηκε ως Β΄ Ανακριτικός Υπάλληλος, κατοίκων ομοίως, οδηγήθηκε στο Κατάστημα της Υπηρεσίας μας, ${d.deptFull}, ${d.a_o} ${d.prof}, ${d.v("arr_officer") ? `από τον ${d.v("arr_officer")} που τ${d.a_ton} συνέλαβε` : `που συνελήφθη`}${arrDT}${locText}, ${sentence}.</p>
    <p style="${pStyle}">Αφού ενημέρωσα ${d.a_auton} για τα προβλεπόμενα στο άρθρο 95 του Κ.Π.Δ. δικαιώματά ${d.a_tou}, παρείχα το προβλεπόμενο στο άρθρο 96 του ΚΠΔ έγγραφο σε κατάλληλη γλώσσα, εξέτασα ${d.a_auton} και πείσθηκα ότι ουδεμία υπάρχει ως προς την ταυτότητά ${d.a_tou} αμφιβολία, διέταξα την προσαγωγή και παραπομπή ${d.a_tou}, στον κ. ${d.prosecutor} και την παράδοσή ${d.a_tou} με την παρούσα έκθεση.</p>
    <p style="${pStyle}">Η παρούσα άρχισε να συντάσσεται την ${d.v("arr_start")} ώρα και περατώθηκε την ${d.v("arr_end")} ώρα.</p>
    <p style="${pStyle}">Για πίστωση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε, υπογράφεται ως ακολούθως :</p>
    ${sig4}`;
    makeDoc("Σύλληψη", header, body, `1_ΕΚΘΕΣΗ_ΣΥΛΛΗΨΗΣ_${d.v("surname")}.doc`);
}

// 9. ΔΙΚΑΙΩΜΑΤΑ ΣΥΛΛΗΨΗΣ
function exportRights() {
    if (!validateRequiredFields(['surname', 'name', 'apologia_charge_short'])) return;
    let d = getD(); let rp = "text-align: justify; font-family: 'Times New Roman'; font-size: 11pt; line-height: 115%; margin: 0cm 0cm 4pt 0cm; padding: 0cm; background: white; color: black;";
    
    let body = `<p style="${rp}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("rig_start")}΄, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας προσληφθείς ως Β’ Ανακριτικού Υπαλλήλου, προσκλήθηκε ${d.a_o} κατωτέρω σημειούμεν${d.v('gender')==='M'?'ος':'η'} κατηγορούμεν${d.v('gender')==='M'?'ος':'η'}, που ονομάζεται ${d.prof}, τ${d.a_ton} οποί${d.a_o} ενημερώσαμε ότι κατηγορείται για ${d.v("apologia_charge_short")} και εξηγήσαμε σαφώς σ’ ${d.a_auton}, βάσει του άρθρου 105 του Κ.Π. Δικονομίας όλα τα εκ των άρθρων 91, 95, 96, 97, 98, 100, 101, 103 και 104, 273 & 274 του Κ.Π.Δ. δικαιώματά ${d.a_tou} και αναλυτικότερα:</p>
    <p style="${rp}"><b>Α. Εκ του άρθρου 99 του Κ.Π.Δ., ήτοι παράσταση του κατηγορουμένου με συνήγορο:</b><br>
    <b>1.</b> Ο Κατηγορούμενος έχει το δικαίωμα στην απολογία του και σε κάθε εξέτασή του, ακόμη και σ’ αυτήν που γίνεται σε αντιπαράσταση με μάρτυρες ή άλλους κατηγορούμενους, να παρίσταται με συνήγορο. Γι’ αυτό το σκοπό προσκαλείται 24 ώρες πριν από κάθε ανακριτική ενέργεια.<br>
    <b>2.</b> Επιτρέπεται σύντμηση της προθεσμίας αυτής, αν από την αναβολή δημιουργείται κίνδυνος που η ύπαρξη του βεβαιώνεται ειδικά με έκθεση του ανακριτή ή του ανακριτικού υπαλλήλου.<br>
    <b>3.</b> Ο ανακριτής έχει την υποχρέωση να διορίζει αυτεπαγγέλτως συνήγορο, αν το ζητήσει ρητά ο κατηγορούμενος.<br>
    <b>4.</b> Σε καμία περίπτωση δεν μπορεί να απαγορευθεί η επικοινωνία του κατηγορουμένου με τον συνήγορό του.</p>
    <p style="${rp}"><b>Β. Εκ του άρθρου 100 του Κ.Π.Δ., ήτοι ανακοίνωση των εγγράφων της ανάκρισης:</b><br>
    <b>1.</b> Ο ανακριτής, μόλις μετά την κλήτευσή του εμφανισθεί η οδηγηθεί σ’ αυτόν ο κατηγορούμενος για να απολογηθεί, του ανακοινώνει το περιεχόμενο του κατηγορητηρίου και των άλλων εγγράφων της ανάκρισης. Επιτρέπεται επίσης στον κατηγορούμενο να μελετήσει ο ίδιος ή ο συνήγορός του το κατηγορητήριο και τα έγγραφα της ανάκρισης. Με γραπτή αίτηση του κατηγορουμένου και με δαπάνη του χορηγούνται σ’ αυτόν αντίγραφα του κατηγορητηρίου & των εγγράφων της ανάκρισης.<br>
    <b>2.</b> Την ίδια υποχρέωση έχει και ο ανακριτής, και τα ίδια δικαιώματα ο κατηγορούμενος, όταν κληθεί ξανά σε συμπληρωματική απολογία, πάντως μετά το τέλος της ανάκρισης και προτού διαβιβασθεί η δικογραφία στον Εισαγγελέα, καλείται πάντοτε ο κατηγορούμενος να μελετήσει όλη τη δικογραφία.</p>
    <p style="${rp}"><b>Γ. Εκ του άρθρου 103 του Κ.Π.Δ., ήτοι προθεσμία για την απολογία:</b><br>
    Ο κατηγορούμενος έχει το δικαίωμα να ζητήσει προθεσμία τουλάχιστον 48 ώρες και δεν έχει υποχρέωση να απολογηθεί πριν περάσει η προθεσμία. Ο ανακριτής μπορεί να παρατείνει την προθεσμία ύστερα από αίτηση του κατηγορουμένου.</p>
    <p style="${rp}"><b>Δ. Εκ του άρθρου 105 του Κ.Π.Δ., ήτοι δικαιώματα του κατηγορουμένου στη προανάκριση:</b><br>
    Τα δικαιώματα που προβλέπονται από τα άρθρα 91, 95, 96, 97, 98, 100, 101, 103 και 104 τα έχει ο κατηγορούμενος και στην προανάκριση.</p>
    <p style="${rp}"><b>Ε. Εκ του άρθρου 105 του Κ.Π.Δ., ήτοι εξαίρεση στο αυτόφωρο έγκλημα:</b><br>
    Όταν ενεργείται προανάκριση σύμφωνα με το άρθρο 243 παρ.2 του Κ.Π.Δ., η εξέταση γίνεται όπως ορίζεται στις διατάξεις των άρθρων 273 και 274.</p>
    <p style="${rp}"><b>ΣΤ. Εκ του άρθρου 273 του Κ.Π.Δ., ήτοι εξέταση κατηγορουμένου:</b><br>
    Την υποχρέωση αυτού που διενεργεί την προανάκριση, για την εξακρίβωση των στοιχείων ταυτότητας, τόπου κατοικίας - διαμονής του κατηγορουμένου, καθώς και την υποχρέωση του κατηγορούμενου ως προς την δήλωσή των και ακολούθως η καταχώριση αυτών στην σχετική έκθεση της απολογίας.</p>
    <p style="${rp}">Για πίστωση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε, υπογράφεται ως ακολούθως :</p>
    ${sigBlock(d.v("gender")==='M'?"Ο λαβών γνώση":"Η λαβούσα γνώση", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;"><u>ΕΚΘΕΣΗ ΕΝΗΜΕΡΩΣΗΣ ΔΙΚΑΙΩΜΑΤΩΝ ΣΕ ΥΠΟΠΤΟ Ή ΚΑΤΗΓΟΡΟΥΜΕΝΟ</u></p>`;
    let fullHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Δικαιώματα</title><style>body { background: white; color: black; font-family: 'Times New Roman'; }</style></head><body style="background-color: white; color: black;">${header}${body}</body></html>`;
    let blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
    let url = URL.createObjectURL(blob); let link = document.createElement('a'); link.href = url; link.download = `2_ΕΚΘΕΣΗ_ΔΙΚΑΙΩΜΑΤΩΝ_${d.v("surname")}.doc`; 
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// 10. ΑΠΟΛΟΓΙΑ
function exportApologia() {
    if (!validateRequiredFields(['surname', 'name', 'apologia_charge_short', 'apologia_plea'])) return;
    let d = getD(); let fullCharge = d.v("apologia_charge_short"); if(d.v("apologia_charge_details")) fullCharge += ". " + d.v("apologia_charge_details");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΚΑΤΗΓΟΡΟΥΜΕΝΟΥ (Κ.Π.Δ.)</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("apo_start")} ενώπιον εμού του ${d.anakr} του ${d.dept}, παριστάμενου και του ${d.banakr} της ιδίας Υπηρεσίας, εξετάζεται ${d.a_o} κατωτέρω ${d.a_os}.</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Πώς ονομάζεσαι κ.λ.π.; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.prof}.</p>
    <p style="${pStyle}">Ενταύθα γνωρίσαμε στ${d.a_ton} εξεταζόμεν${d.v('gender')==='M'?'ο':'η'} ότι κατηγορείται για ${fullCharge}</p>
    <p style="${pStyle}">Στη συνέχεια αφού ανακοινώσαμε στ${d.a_ton} εξεταζόμεν${d.v('gender')==='M'?'ο':'η'} το περιεχόμενο των εγγράφων της ανάκρισης, εξηγήσαμε εκ νέου με σαφήνεια σ’ ${d.a_auton}, σύμφωνα με τα άρθρα 95 και 105 ή 106 του Κώδικα Ποινικής Δικονομίας, όλα τα δικαιώματά ${d.a_tou} που προβλέπονται από τα άρθρα 91, 95, 96, 97, 98, 100, 101, 104 και 273 του Κώδικα Ποινικής Δικονομίας και ειδικότερα ότι δικαιούται: να παρίσταται μετά συνηγόρου, μετά του οποίου δεν μπορεί να απαγορευτεί η απολύτως απόρρητη επικοινωνία ${d.a_tou} σε καμιά περίπτωση, να μελετήσει ${d.v('gender')==='M'?'ο ίδιος':'η ίδια'} ή ο συνήγορός ${d.a_tou} τα έγγραφα της ανάκρισης και του κατηγορητηρίου, να τ${d.a_tou} χορηγηθούν αντίγραφα αυτών με δική ${d.a_tou} δαπάνη και μετά από γραπτή αίτησή ${d.a_tou} να ζητήσει προθεσμία μέχρι 48 ωρών, προ της παρέλευσης της οποίας δεν υποχρεούται σε απολογία και ότι δύναται να δοθεί παράταση της προθεσμίας αυτής με αίτησή ${d.a_tou}, να αρνηθεί να απαντήσει (δικαίωμα σιωπής και μη αυτοενεχοποίησης) και να παραδώσει την απολογία ${d.a_tou} γραπτή.</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε να κάνετε χρήση των δικαιωμάτων που σας γνωστοποιήθηκαν; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("apologia_rights").replace(/[\n\r]+/g, " ")}</p>
    <p style="${pStyle}">Ύστερα από τα ανωτέρω προβήκαμε στην λήψη της απολογίας ${d.a_tou}. Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}
    <p style="${pStyle}">Στη συνέχεια, προβήκαμε στην εξέταση τ${d.a_tou} κατηγορουμέν${d.v('gender')==='M'?'ου':'ης'} ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Κατηγορήθηκες άλλη φορά και για ποια αιτία; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("apologia_past").replace(/[\n\r]+/g, " ")}</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Κατηγορείσαι ήδη για τις πράξεις που σου γνωστοποιήθηκαν ανωτέρω. Τι απολογείσαι;</p>
    ${formatTextToParagraphs("<b>ΑΠΟΚΡΙΣΗ:</b> " + d.v("apologia_plea"))}
    <p style="${pStyle}">Στ${d.a_ton} κατηγορούμεν${d.v('gender')==='M'?'ο':'η'} γνωστοποιήσαμε ότι, σύμφωνα με το άρθρο 273 § 1 του Κ.Π.Δ., υποχρεούται να δηλώσει κάθε μεταβολή της κατοικίας ή της διαμονής ${d.a_tou}, μαζί με ακριβή νέα διεύθυνση, εγγράφως, στον Εισαγγελέα του δικαστηρίου στο οποίο εκκρεμεί κατά τον χρόνο δήλωσης η δικογραφία, σύμφωνα με το άρθρο 156 του Κ.Π.Δ.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("apo_start")} ώρα και περατώθηκε την ${d.v("apo_end")} ώρα.</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Απολογία", header, body, `3_ΑΠΟΛΟΓΙΑ_ΚΑΤΗΓΟΡΟΥΜΕΝΟΥ_${d.v("surname")}.doc`);
}

// 11. ΝΑΡΚΩΤΙΚΑ - ΚΑΤΑΣΧΕΣΗ
function exportSeizure() {
    if (!validateRequiredFields(['surname', 'name', 'drug_type', 'drug_weight', 'drug_packaging'])) return;
    let d = getD(); let tType = d.v("drug_search_type");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ${tType}</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")}, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας, που προσλήφθηκε ως Β΄ Ανακριτικός Υπάλληλος...</p>
    <p style="${pStyle}"><em>(Βασικός Κορμός Κατάσχεσης: ${d.v("drug_packaging")} με ${d.v("drug_type")} βάρους ${d.v("drug_weight")} γραμμαρίων...)</em></p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock("Ο Καθ' ου η κατάσχεση", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Κατάσχεση", header, body, `ΚΑΤΑΣΧΕΣΗ_${d.v("surname")}.doc`);
}

// 12. ΝΑΡΚΩΤΙΚΑ - ΖΥΓΙΣΗ
function exportWeighing() {
    if (!validateRequiredFields(['surname', 'name', 'drug_type', 'drug_weight', 'drug_packaging'])) return;
    let d = getD();
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΠΡΑΚΤΙΚΟ ΖΥΓΙΣΗΣ ΚΑΙ ΣΦΡΑΓΙΣΗΣ ΝΑΡΚΩΤΙΚΩΝ ΟΥΣΙΩΝ</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")}, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας...</p>
    <p style="${pStyle}"><em>(Βασικός Κορμός Ζύγισης: Εζυγίσθη ${d.v("drug_packaging")} περιέχουσα ${d.v("drug_type")} και βρέθηκε μικτού βάρους ${d.v("drug_weight")} γραμμαρίων...)</em></p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock("Ο Κατηγορούμενος", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Ζύγιση", header, body, `ΖΥΓΙΣΗ_${d.v("surname")}.doc`);
}

// 13. ΝΑΡΚΩΤΙΚΑ - ΓΝΩΣΤΟΠΟΙΗΣΗ
function exportNotification() {
    if (!validateRequiredFields(['surname', 'name'])) return;
    let d = getD();
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; line-height: 115%; margin: 0cm 0cm 6pt 0cm; background: white; color: black;">ΕΚΘΕΣΗ ΓΝΩΣΤΟΠΟΙΗΣΗΣ (Αρθ. 2214/1993)</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")}, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας...</p>
    <p style="${pStyle}">Γνωστοποιήθηκε στ${d.a_ton} ${d.prof} ότι οι κατασχεθείσες ποσότητες ναρκωτικών ουσιών θα αποσταλούν για χημική εξέταση...</p>
    <p style="${pStyle}">Για πιστοποίηση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.v("gender")==='M'?"Ο Κατηγορούμενος":"Η Κατηγορούμενη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Γνωστοποίηση", header, body, `ΓΝΩΣΤΟΠΟΙΗΣΗ_${d.v("surname")}.doc`);
}
