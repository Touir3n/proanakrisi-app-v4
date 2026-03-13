// ==========================================
// ΛΟΓΙΚΗ ΕΞΑΓΩΓΗΣ ΣΕ WORD (ΟΛΑ ΤΑ ΕΓΓΡΑΦΑ)
// ==========================================
const pStyle = "text-align: justify; text-justify: inter-word; text-align-last: left; font-family: 'Times New Roman'; font-size: 12pt; line-height: 115%; margin: 0pt; margin-bottom: 0pt; padding: 0pt; background: white; color: black; display: block;";

function formatTextToParagraphs(text) {
    if (!text) return "";
    // Σπάμε το κείμενο σε γραμμές, καθαρίζουμε τα κενά και φτιάχνουμε ξεχωριστά <p> για ΚΑΘΕ γραμμή
    return text.split(/\r?\n/)
        .filter(line => line.trim() !== "")
        .map(line => {
            let formattedLine = line.replace(/(ΕΡΩΤΗΣΗ:)/gi, "<b>$1</b>")
                                   .replace(/(ΑΠΟΚΡΙΣΗ:)/gi, "<b>$1</b>");
            return `<p style="${pStyle}">${formattedLine}</p>`;
        })
        .join("");
}

function addSelectedCrime() {
    let dd = document.getElementById("ai_crime_dropdown"); let sc = dd.value; 
    if (!sc) return;
    let lawInput = document.getElementById("ai_law");
    lawInput.value = lawInput.value.trim() === "" ? sc : lawInput.value + " και " + sc;
    dd.value = ""; 
}

function clearCrimes() { document.getElementById("ai_law").value = ""; }

function generateAutoCharge() {
    let lawInput = document.getElementById("ai_law").value.trim();
    if (!lawInput) { alert("Επιλέξτε αδίκημα."); return; }
    let isMultiple = lawInput.includes(" και ") || lawInput.includes(",");
    let actStr = isMultiple ? "πράξεις που έλαβαν χώρα" : "πράξη που έλαβε χώρα";
    let arthraStr = isMultiple ? "των διατάξεων" : "της διάταξης";
    document.getElementById("apologia_charge_short").value = `παράβαση ${arthraStr} ${lawInput}, ${actStr} την ${document.getElementById("ai_date").value.trim()} και ώρα ${document.getElementById("ai_time").value.trim()} στο/στην ${document.getElementById("ai_loc").value.trim()}`;
    if(document.getElementById("apologia_charge_details").value.trim() === "") {
        document.getElementById("apologia_charge_details").value = "Ειδικότερα, ανωτέρω τόπο και χρόνο, ο δράστης ...";
    }
    saveMem("apologia_charge_short"); saveMem("apologia_charge_details");
}

function getTimeRange(startId, endId, fallbackStart = "doc_start", fallbackEnd = "doc_end") {
    let v = id => document.getElementById(id) ? document.getElementById(id).value.trim() : "";
    return { start: v(startId) || v(fallbackStart), end: v(endId) || v(fallbackEnd) };
}

function makeDoc(title, headerTitle, bodyContent, filename) {
    let finalHtml = `${headerTitle}${bodyContent}`;
    let fullHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${title}</title><style>body { background: white; color: black; font-family: 'Times New Roman'; } p { margin: 0pt; padding: 0pt; } table { border-collapse: collapse; }</style></head><body style="background-color: white; color: black;">${finalHtml}</body></html>`;
    let blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
    let url = URL.createObjectURL(blob); let link = document.createElement('a'); link.href = url; link.download = filename; 
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function sigBlock(role1, role2, role3) {
    return `<table style="width: 100%; font-family: 'Times New Roman'; font-size: 12pt; text-align: center; margin-top: 12pt; border: none;" border="0">
    <tr>
        <td style="width: 33%; vertical-align: top;">${role1}</td>
        <td style="width: 33%; vertical-align: top;">${role2}</td>
        <td style="width: 33%; vertical-align: top;">${role3}</td>
    </tr>
    </table><br><br>`;
}

function sigBlock4(role1, role2, role3, role4) {
    return `<table style="width: 100%; font-family: 'Times New Roman'; font-size: 12pt; text-align: center; margin-top: 12pt; border: none;" border="0">
    <tr>
        <td style="width: 25%; vertical-align: top;">${role1}</td>
        <td style="width: 25%; vertical-align: top;">${role2}</td>
        <td style="width: 25%; vertical-align: top;">${role3}</td>
        <td style="width: 25%; vertical-align: top;">${role4}</td>
    </tr>
    </table><br><br>`;
}

function getD() {
    let v = id => document.getElementById(id) ? document.getElementById(id).value.trim() : "";
    let g = v("gender");
    let c_city = document.getElementById("cfg_city").value.trim();
    let c_dept = document.getElementById("cfg_dept").value.trim();
    let c_deptFull = document.getElementById("cfg_deptFull").value.trim();
    let c_prosecutor = document.getElementById("cfg_prosecutor").value.trim();
    let banakr_clean = v("doc_banakr");
    let banakr_gen = banakr_clean;
    if(banakr_clean.startsWith("της ")) { banakr_gen = banakr_clean.substring(4); } else if(banakr_clean.startsWith("του ")) { banakr_gen = banakr_clean.substring(4); }
    
    return {
        v: v, anakr: v("doc_anakr"), banakr: v("doc_banakr"), banakr_genitive: banakr_gen,
        city: c_city !== "" ? c_city : "Ασπροβάλτα", dept: c_dept !== "" ? c_dept : "Α.Τ. Βόλβης", deptFull: c_deptFull !== "" ? c_deptFull : "Αστυνομικό Τμήμα Βόλβης Θεσσαλονίκης",
        prosecutor: c_prosecutor !== "" ? c_prosecutor : "Εισαγγελέα Πλημμελειοδικών Θεσσαλονίκης",
        
        a_o: g === 'M' ? "ο" : "η",
        a_os: g === 'M' ? "ο οποίος" : "η οποία",
        a_tou: g === 'M' ? "του" : "της",
        a_ton: g === 'M' ? "τον" : "την",
        a_ston: g === 'M' ? "στον" : "στην",
        a_auton: g === 'M' ? "αυτόν" : "αυτήν",
        a_autou: g === 'M' ? "αυτού" : "αυτής",
        a_dil: g === 'M' ? "δηλώσαντος" : "δηλώσασας",
        a_exet: g === 'M' ? "εξεταζόμενος" : "εξεταζόμενη",
        a_exet_acc: g === 'M' ? "εξεταζόμενο" : "εξεταζόμενη",
        a_katig: g === 'M' ? "κατηγορούμενος" : "κατηγορούμενη",
        a_katig_gen: g === 'M' ? "κατηγορουμένου" : "κατηγορουμένης",
        a_katig_acc: g === 'M' ? "κατηγορούμενο" : "κατηγορούμενη",
        a_upop: g === 'M' ? "ύποπτος" : "ύποπτη",
        a_upop_acc: g === 'M' ? "ύποπτο" : "ύποπτη",
        a_kato: g === 'M' ? "κατωτέρω σημειούμενος" : "κατωτέρω σημειούμενη",
        a_sign: g === 'M' ? "Ο Εξετασθείς" : "Η Εξετασθείσα",
        
        dateStr: `${v("doc_date")}η του μήνα ${v("doc_month")} του έτους ${v("doc_year")} ημέρα της εβδομάδας ${v("doc_day")}`,
        fullDateStr: `${v("doc_date")}-${String(monthsToNum(v("doc_month"))).padStart(2, '0')}-${v("doc_year")}`,
        prof: getProfileText()
    };
}

function monthsToNum(m) {
    const months = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'];
    return months.indexOf(m) + 1;
}

function exportToWord() {
    if (!validateRequiredFields(['surname', 'name', 'doc_testimony_simple'])) return;
    let d = getD(); let rel = d.v("doc_relation_simple"); let copy = d.v("doc_copy_simple"); let parav = d.v("doc_paravolo_simple");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΝΟΡΚΗΣ ΕΞΕΤΑΣΗΣ ΜΑΡΤΥΡΑ (Κ.Π.Δ.)</p>`;
    
    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω μάρτυρας, ${d.a_os}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof} και ότι ${rel}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, αφού έδωσε τον προβλεπόμενο όρκο από τα άρθρα 219 και 220 παρ. 1 του Κ.Π.Δ. εξετάζεται ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας;</p>
    ${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + d.v("doc_testimony_simple"))}`;
    
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

function exportToWordNoOath() {
    if (!validateRequiredFields(['surname', 'name', 'dv_q_main'])) return;
    let d = getD(); let rel = d.v("doc_relation_dv"); let copy = d.v("doc_copy_dv"); let parav = d.v("doc_paravolo_dv");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΜΑΡΤΥΡΑ ΧΩΡΙΣ ΟΡΚΟ</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("doc_start")} ενώπιον εμού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω μάρτυρας, ${d.a_os}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof} και ότι ${rel}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ${d.a_exet}, ως μέλος οικογένειας σε υπόθεση ενδοοικογενειακής βίας, εξετάζεται χωρίς όρκο δυνάμει του άρθρου 19 παρ. 1 Ν.3500/2006 ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας;</p>${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + d.v("dv_q_main"))}`;
    
    dvQuestions.forEach((q, i) => {
        let ans = d.v("dv_q_" + i);
        if (ans) body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> ${q}</p>${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + ans)}`;
    });
    if (d.v("dv_q_last")) body += `<p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Έχετε να προσθέσετε κάτι άλλο;</p>${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + d.v("dv_q_last"))}`;
    
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

function exportProkRights() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_charge'])) return;
    let d = getD(); let tm = getTimeRange("prok_rights_start", "prok_rights_end", "doc_start", "doc_end"); let charge = d.v("prok_charge");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΓΝΩΣΤΟΠΟΙΗΣΗΣ ΔΙΚΑΙΩΜΑΤΩΝ ΥΠΟΠΤΟΥ ΚΑΤΑ ΤΗΝ ΔΙΑΡΚΕΙΑ ΠΡΟΚΑΤΑΡΚΤΙΚΗΣ ΕΞΕΤΑΣΗΣ (ΑΡ. 244 ΠΑΡ. 1 Κ.Π.Δ.)</p>`;
    
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${tm.start}΄, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας προσληφθείς ως Β’ Ανακριτικού Υπαλλήλου, προσκλήθηκε ${d.a_o} ${d.a_kato} που ονομάζεται ${d.prof}, ${d.a_ton} οποί${d.a_o} ενημερώσαμε ότι κατηγορείται κατά παράβαση των διατάξεων: ${charge} και εξηγήσαμε σαφώς σ’ ${d.a_auton}, βάσει του άρθρου 95 του Κ.Π. Δικονομίας όλα τα εκ των άρθρων 244, 89, 90, 91, 92 παρ. 1, 95, 96, 99 παρ. 1 εδ. α, 2 και 4, 100, 101, 102, 103 και 104 του Κ.Π.Δ. δικαιώματά ${d.a_tou} και αναλυτικότερα:</p>
    <p style="${pStyle}"><b>Άρθρο 89 του Κ.Π.Δ. – Διορισμός και αριθμός συνηγόρων των διαδίκων:</b><br>1. Κάθε διάδικος δεν μπορεί να αντιπροσωπεύεται ή να συμπαρίσταται στην ποινική διαδικασία με περισσότερους από δύο συνηγόρους στην προδικασία και τρεις στο ακροατήριο.<br>2. Ο διορισμός συνηγόρου του υπόπτου, του κατηγορουμένου ή του παριστάμενου για την υποστήριξη της κατηγορίας γίνεται: α) με προφορική δήλωση που καταχωρίζεται στα πρακτικά ή στην έκθεση εξέτασής του ως υπόπτου ή κατά την απολογία του κατηγορουμένου ή στην κατάθεσή του ως μάρτυρα ή β) με έγγραφη δήλωση κατά τις διατυπώσεις του άρθρου 42 παρ. 2 εδ. β΄ και γ΄ ή γ) με την έκθεση ή τη δήλωση άσκησης ενδίκου μέσου.</p>
    <p style="${pStyle}"><b>Άρθρο 104 του Κ.Π.Δ. – Δικαίωμα σιωπής και μη αυτοενοχοποίησης:</b><br>1. Ο ύποπτος ή ο κατηγορούμενος έχουν δικαίωμα σιωπής και μη αυτοενοχοποίησης.<br>2. Η άσκηση του δικαιώματος μη αυτοενοχοποίησης δεν εμποδίζει τη νόμιμη συγκέντρωση αποδεικτικών στοιχείων, που υπάρχουν ανεξάρτητα από τη βούληση των υπόπτων και των κατηγορουμένων.</p>
    <p style="${pStyle}">Κατόπιν της ανωτέρω γνωστοποίησης, ο ύποπτος αφού άκουσε όλα όσα του θέσαμε υπόψη του και ενημερώθηκε αναφορικά με τις συνέπειες παραίτησης από την άσκηση των δικαιωμάτων του, δήλωσε ότι επιθυμεί να κάνει χρήση των δικαιωμάτων του.</p>
    <p style="${pStyle}">Για πίστωση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε, υπογράφεται ως ακολούθως:</p>
    ${sigBlock(d.v("gender")==='M'?"Ο λαβών γνώση Ύποπτος":"Η λαβούσα γνώση Ύποπτη", "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Δικαιώματα Ύποπτου", header, body, `1_ΔΙΚΑΙΩΜΑΤΑ_ΥΠΟΠΤΟΥ_${d.v("surname")}.doc`);
}

function exportProkNoDeadline() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_charge', 'prok_plea'])) return;
    let d = getD(); let tm = getTimeRange("prok_main_start", "prok_main_end", "doc_start", "doc_end"); let abm = d.v("prok_abm"); let charge = d.v("prok_charge"); let plea = d.v("prok_plea");
    let midTime = tm.start; let timeParts = midTime.split(":");
    if(timeParts.length === 2) { let dDate = new Date(); dDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]) + 5); midTime = String(dDate.getHours()).padStart(2, '0') + ':' + String(dDate.getMinutes()).padStart(2, '0'); }

    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΧΩΡΙΣ ΟΡΚΟ<br>(Άρθρο 244 παρ. 1 Κ.Π.Δ.)</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${tm.start} ενώπιον εμού του ${d.anakr} του ${d.deptFull}, παρουσία και του κάτωθι προσυπογεγραμμένου ${d.banakr} της ίδιας Υπηρεσίας προσληφθέντα ως Β΄ Ανακριτικού Υπαλλήλου, κατοίκων ${d.city}, εμφανίστηκε ${d.a_o} κατωτέρω σημειούμεν${d.a_os.slice(1)}, ${d.a_os}, αφού ρωτήθηκε για την ταυτότητά ${d.a_tou} κ.λ.π., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Εξετάζεται χωρίς όρκο, σύμφωνα με τo άρθρο 244 παρ. 1 Κ.Π.Δ., γιατί ενεργείται προκαταρκτική εξέταση κατόπιν ${abm}.</p>
    <p style="${pStyle}">Ενταύθα γνωρίσαμε σε ${d.a_auton} την πράξη που αφορά η εξέταση, ήτοι: ${charge}.</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε να κάνετε χρήση των δικαιωμάτων που σας γνωστοποιήθηκαν; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("prok_rights_ans")}</p>
    <p style="${pStyle}">Ύστερα από τα ανωτέρω μας δήλωσε ότι επιθυμεί να εξεταστεί αμέσως.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${tm.start} ώρα και περατώθηκε την ${midTime} ώρα.</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}
    <p style="${pStyle}">Στη συνέχεια, προβήκαμε στην εξέταση ${d.a_autou}, ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Έχετε κατηγορηθεί στο παρελθόν και για ποια αιτία; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("prok_past")}</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Σας αποδίδονται ήδη οι πράξεις που σας γνωστοποιήθηκαν ανωτέρω. Ποιες είναι οι εξηγήσεις σας;</p>
    ${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + plea)}
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Έχετε κάτι άλλο να προσθέσετε; <b>ΑΠΟΚΡΙΣΗ:</b> Όχι και υπογράφω.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${midTime} ώρα και περατώθηκε την ${tm.end} ώρα.</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Ανωμοτί Χωρίς Προθεσμία", header, body, `2_ΑΝΩΜΟΤΙ_ΧΩΡΙΣ_ΠΡΟΘΕΣΜΙΑ_${d.v("surname")}.doc`);
}

function exportProkDeadline() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_charge', 'prok_dead_date', 'prok_dead_time'])) return;
    let d = getD(); let tm = getTimeRange("prok_main_start", "prok_main_end", "doc_start", "doc_end"); let abm = d.v("prok_abm"); let charge = d.v("prok_charge");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΧΩΡΙΣ ΟΡΚΟ ΜΕ ΧΟΡΗΓΗΣΗ ΠΡΟΘΕΣΜΙΑΣ<br>(Άρθρο 244 παρ. 1 Κ.Π.Δ.)</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${tm.start} ενώπιον εμού του ${d.anakr} του ${d.deptFull} παρουσία και του κάτωθι προσυπογεγραμμένου ${d.banakr} της ίδιας Υπηρεσίας προσληφθέντα ως Β΄ Ανακριτικού Υπαλλήλου, κατοίκων ${d.city} εμφανίστηκε ${d.a_o} ${d.a_kato}, ${d.a_os}, αφού ρωτήθηκε για την ταυτότητά ${d.a_tou} κ.λ.π., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Εξετάζεται χωρίς όρκο, σύμφωνα με τo άρθρο 244 παρ. 1 Κ.Π.Δ., γιατί ενεργείται προκαταρκτική εξέταση κατόπιν ${abm}.</p>
    <p style="${pStyle}">Ενταύθα γνωρίσαμε σε ${d.a_auton} την πράξη που αφορά η εξέταση, ήτοι: ${charge}.</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε να κάνετε χρήση των δικαιωμάτων που σας γνωστοποιήθηκαν; <b>ΑΠΟΚΡΙΣΗ:</b> Ναι επιθυμώ να λάβω προθεσμία τουλάχιστον σαράντα οκτώ -48- ωρών και να λάβω αντίγραφα μέρους της δικογραφίας.</p>
    <p style="${pStyle}">Ύστερα από τα ανωτέρω χορηγήσαμε σε ${d.a_auton} προθεσμία έως την ${d.v("prok_dead_date")} και ώρα ${d.v("prok_dead_time")}.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${tm.start} ώρα και περατώθηκε την ${tm.end} ώρα.</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Προθεσμία", header, body, `1a_ΧΟΡΗΓΗΣΗ_ΠΡΟΘΕΣΜΙΑΣ_${d.v("surname")}.doc`);
}

function exportProkAfterDeadline() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_charge', 'prok_plea'])) return;
    let d = getD(); let tm = getTimeRange("prok_after_start", "prok_after_end", "doc_start", "doc_end"); let charge = d.v("prok_charge");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΧΩΡΙΣ ΟΡΚΟ ΜΕΤΑ ΑΠΟ ΠΡΟΘΕΣΜΙΑ<br>(Άρθρο 244 παρ. 1 Κ.Π.Δ.)</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${tm.start} ενώπιον εµού του ${d.anakr} του ${d.deptFull} παρουσία και του κάτωθι προσυπογεγραμμένου ${d.banakr} της ίδιας Υπηρεσίας προσληφθέντα ως Β΄ Ανακριτικού Υπαλλήλου, κατοίκων ${d.city} εμφανίστηκε ${d.a_o} κατωτέρω σημειούμεν${d.a_os.slice(1)}, ${d.a_os}, αφού ρωτήθηκε για την ταυτότητά ${d.a_tou} κ.λ.π., απάντησε ότι ονομάζεται: ${d.prof}.</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Έχετε κατηγορηθεί στο παρελθόν και για ποια αιτία; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("prok_past")}</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Σας αποδίδονται ήδη οι πράξεις που σας γνωστοποιήθηκαν, ήτοι: ${charge}. Τι έχετε να πείτε σχετικά;</p>
    ${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + d.v("prok_plea"))}
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Έχετε κάτι άλλο να προσθέσετε; <b>ΑΠΟΚΡΙΣΗ:</b> Όχι και υπογράφω.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${tm.start} ώρα και περατώθηκε την ${tm.end} ώρα.</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Ανωμοτί Μετά από Προθεσμία", header, body, `2_ΑΝΩΜΟΤΙ_ΜΕΤΑ_ΠΡΟΘΕΣΜΙΑ_${d.v("surname")}.doc`);
}

function exportProkMemo() {
    if (!validateRequiredFields(['surname', 'name', 'prok_abm', 'prok_pages'])) return;
    let d = getD(); let tm = getTimeRange("prok_service_start", "prok_service_end", "doc_start", "doc_end"); let abm = d.v("prok_abm");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΓΧΕΙΡΙΣΕΩΣ ΥΠΟΜΝΗΜΑΤΟΣ ΕΞΗΓΗΣΕΩΝ</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${tm.start} ενώπιον εµού του ${d.anakr} του ${d.dept}, παρισταμένου και του ${d.banakr} της ίδιας υπηρεσίας, που προσλήφθηκε ως Β' Ανακριτικός Υπάλληλος, εμφανίσθηκε ${d.a_o} κατωτέρω ύποπτος, ${d.a_os}, αφού ερωτήθηκε για την ταυτότητά ${d.a_tou} κλπ., απάντησε ότι ονομάζεται ${d.prof}.</p>
    <p style="${pStyle}">Έπειτα ${d.a_o} ανωτέρω, ενεχείρισε σε εμάς, αντί προφορικών εξηγήσεων, έγγραφο υπόμνημα αποτελούμενο από ${d.v("prok_pages")} σελίδες, προς απάντηση της ${abm}, το οποίο και επισυνάπτεται στην παρούσα δικογραφία.</p>
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${tm.start} ώρα and περατώθηκε την ${tm.end} ώρα.</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Υπόμνημα", header, body, `5_ΥΠΟΜΝΗΜΑ_${d.v("surname")}.doc`);
}

function exportArrest() {
    if (!validateRequiredFields(['surname', 'name', 'arr_loc', 'apologia_charge_short'])) return;
    let d = getD(); let shortC = d.v("apologia_charge_short"); let reason = d.v("arr_reason").replace(/[\n\r]+/g, " ");
    let sentence = reason !== "" ? `διότι ${reason} για ${shortC}` : (shortC !== "" ? `για ${shortC}` : `για ... (Συμπληρώστε αιτιολογία)`);
    let arrDT = (d.v("arr_street_date") ? ` την ${d.v("arr_street_date")}` : ``) + (d.v("arr_street_time") ? ` και περί ώρα ${d.v("arr_street_time")}` : ``);
    
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">Ε Κ Θ Ε Σ Η &nbsp;&nbsp;&nbsp; Σ Υ Λ Λ Η Ψ Η Σ</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("arr_start")} ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας, που προσλήφθηκε ως Β΄ Ανακριτικός Υπάλληλος, κατοίκων ομοίως, οδηγήθηκε στο Κατάστημα της Υπηρεσίας μας, ${d.deptFull}, ${d.a_o} ${d.prof}, ${d.v("arr_officer") ? `από ${d.a_ton} ${d.v("arr_officer")} που ${d.a_ton} συνέλαβε` : `που συνελήφθη`}${arrDT}${d.v("arr_loc") ? ` ${d.v("arr_loc")}` : ``}, ${sentence}.</p>
    <p style="${pStyle}">Η παρούσα άρχισε να συντάσσεται την ${d.v("arr_start")} ώρα και περατώθηκε την ${d.v("arr_end")} ώρα.</p>
    ${sigBlock4(d.a_sign, "Ο Συλλαβών", "Ο Β΄ Ανακριτ. Υπάλλ.", "Ο Ανακριτ. Υπάλληλος")}`;
    makeDoc("Σύλληψη", header, body, `1_ΕΚΘΕΣΗ_ΣΥΛΛΗΨΗΣ_${d.v("surname")}.doc`);
}

function exportRights() {
    if (!validateRequiredFields(['surname', 'name', 'apologia_charge_short'])) return;
    let d = getD(); let rp = "text-align: justify; text-align-last: left; font-family: 'Times New Roman'; font-size: 11pt; line-height: 115%; margin: 0pt; margin-bottom: 4pt; padding: 0pt; background: white; color: black; display: block;";
    
    let body = `<p style="${rp}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${d.v("rig_start")}΄, ενώπιον εμού του ${d.anakr} υπηρετούντος στο ${d.deptFull}, παρισταμένου και του ${d.banakr} της ιδίας Υπηρεσίας προσληφθείς ως Β’ Ανακριτικού Υπαλλήλου, προσκλήθηκε ${d.a_o} κατωτέρω σημειούμεν${d.a_os.slice(1)} ${d.a_katig}, που ονομάζεται ${d.prof}, ${d.a_ton} οποί${d.a_o} ενημερώσαμε ότι κατηγορείται για ${d.v("apologia_charge_short")} και εξηγήσαμε σαφώς σ’ ${d.a_auton}, βάσει του άρθρου 105 του Κ.Π. Δικονομίας όλα τα εκ των άρθρων 91, 95, 96, 97, 98, 100, 101, 103 και 104, 273 & 274 του Κ.Π.Δ. δικαιώματά ${d.a_tou}.</p>
    <p style="${rp}">Για πίστωση συντάχθηκε η παρούσα έκθεση, η οποία αφού αναγνώσθηκε και βεβαιώθηκε, υπογράφεται ως ακολούθως :</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΝΗΜΕΡΩΣΗΣ ΔΙΚΑΙΩΜΑΤΩΝ ΣΕ ΥΠΟΠΤΟ Ή ΚΑΤΗΓΟΡΟΥΜΕΝΟ</p>`;
    makeDoc("Δικαιώματα", header, body, `2_ΕΚΘΕΣΗ_ΔΙΚΑΙΩΜΑΤΩΝ_${d.v("surname")}.doc`);
}

function exportApologia() {
    if (!validateRequiredFields(['surname', 'name', 'apologia_charge_short', 'apologia_plea'])) return;
    let d = getD(); let fullCharge = d.v("apologia_charge_short"); if(d.v("apologia_charge_details")) fullCharge += ". " + d.v("apologia_charge_details");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΕΞΕΤΑΣΗΣ ΚΑΤΗΓΟΡΟΥΜΕΝΟΥ (Κ.Π.Δ.)</p>`;

    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${d.v("apo_start")} ενώπιον εμού του ${d.anakr} του ${d.dept}, παριστάμενου και του ${d.banakr} της ιδίας Υπηρεσίας, εξετάζεται ${d.a_o} κατωτέρω ${d.a_katig}.</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Πώς ονομάζεσαι κ.λ.π.; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.prof}.</p>
    <p style="${pStyle}">Ενταύθα γνωρίσαμε ${d.a_ston} εξεταζόμεν${d.a_exet_acc.slice(12)} ότι κατηγορείται για ${fullCharge}</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Επιθυμείτε να κάνετε χρήση των δικαιωμάτων που σας γνωστοποιήθηκαν; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("apologia_rights").replace(/[\n\r]+/g, " ")}</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}
    <p style="${pStyle}">Στη συνέχεια, προβήκαμε στην εξέταση ${d.a_tou} ${d.a_katig_gen} ως ακολούθως:</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Κατηγορήθηκες άλλη φορά και για ποια αιτία; <b>ΑΠΟΚΡΙΣΗ:</b> ${d.v("apologia_past").replace(/[\n\r]+/g, " ")}</p>
    <p style="${pStyle}"><b>ΕΡΩΤΗΣΗ:</b> Κατηγορείσαι ήδη για τις πράξεις που σου γνωστοποιήθηκαν ανωτέρω. Τι απολογείσαι;</p>
    ${formatTextToParagraphs("ΑΠΟΚΡΙΣΗ: " + d.v("apologia_plea"))}
    <p style="${pStyle}">Η παρούσα έκθεση άρχισε να συντάσσεται την ${d.v("apo_start")} ώρα και περατώθηκε την ${d.v("apo_end")} ώρα.</p>
    ${sigBlock(d.a_sign, "Ο Β’ Ανακριτικός Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Απολογία", header, body, `3_ΑΠΟΛΟΓΙΑ_ΚΑΤΗΓΟΡΟΥΜΕΝΟΥ_${d.v("surname")}.doc`);
}

function exportSeizure() {
    if (!validateRequiredFields(['surname', 'name', 'drug_type', 'drug_weight', 'drug_packaging'])) return;
    let d = getD(); let tm = getTimeRange("seiz_start", "seiz_end", "doc_start", "doc_end"); let tType = d.v("drug_search_type");
    let header, body;
    let foundLoc = d.v("drug_found_loc") ? `, ${d.v("drug_found_loc")}, ` : ` `;
    
    if (tType.includes("ΣΩΜΑΤΙΚΗΣ")) {
        header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΣΩΜΑΤΙΚΗΣ ΕΡΕΥΝΑΣ ΚΑΙ ΚΑΤΑΣΧΕΣΕΩΣ</p>`;
        body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${tm.start} εμείς ο ${d.anakr} του ${d.deptFull}, παρισταμένου και του ${d.banakr} της ως άνω Υπηρεσίας, προβήκαμε στη σωματική έρευνα ${d.a_tou} ${d.prof}, στην οποία διαπιστώσαμε ότι${foundLoc}υπήρχαν: ${d.v("drug_packaging")} περιέχουσα «${d.v("drug_type")}» μικτού βάρους ${d.v("drug_weight")} γραμμαρίων.</p>
        ${sigBlock4("Ο Καθ' ου η έρευνα", "Ο εν. την έρευνα", "Ο Β' Αν. Υπάλληλος", "Ο Αν. Υπάλληλος")}`;
    } else {
        header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΠΑΡΑΔΟΣΗΣ ΚΑΙ ΚΑΤΑΣΧΕΣΗΣ</p>`;
        body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${tm.start} εμείς ο ${d.anakr} του ${d.deptFull}, παρουσία και τ${d.banakr_genitive} της ίδιας υπηρεσίας, προβήκαμε στην κατάσχεση ${d.v("drug_packaging")}, περιέχουσας «${d.v("drug_type")}», μικτού βάρους ${d.v("drug_weight")} γραμμαρίων, που μας παρέδωσε ${d.a_o} ${d.prof}.</p>
        ${sigBlock("Ο ΠΑΡΑΔΟΥΣ", "Ο Β’ ΑΝΑΚΡΙΤΙΚΟΣ ΥΠΑΛΛΗΛΟΣ", "Ο ΑΝΑΚΡΙΤΙΚΟΣ ΥΠΑΛΛΗΛΟΣ")}`;
    }
    makeDoc("Κατάσχεση", header, body, `ΚΑΤΑΣΧΕΣΗ_${d.v("surname")}.doc`);
}

function exportWeighing() {
    if (!validateRequiredFields(['surname', 'name', 'drug_type', 'drug_weight', 'drug_packaging'])) return;
    let d = getD(); let tm = getTimeRange("weigh_start", "weigh_end", "doc_start", "doc_end");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΖΥΓΙΣΗΣ ΚΑΙ ΣΦΡΑΓΙΣΗΣ ΝΑΡΚΩΤΙΚΩΝ ΟΥΣΙΩΝ</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city}, σήμερα την ${d.dateStr} και ώρα ${tm.start} ενώπιον εμού του ${d.anakr} του ${d.deptFull}, παρουσία και του ${d.banakr}, επί παρουσία και ${d.a_tou} ${d.prof} προβήκαμε στη ζύγιση της κατασχεθείσας ποσότητας ναρκωτικής ουσίας, ήτοι «${d.v("drug_type")}» μικτού βάρους ${d.v("drug_weight")} γραμμαρίων.</p>
    ${sigBlock(d.a_sign, "Ο Β’ ανακριτικός υπάλληλος", "Ο ανακριτικός υπάλληλος")}`;
    makeDoc("Ζύγιση", header, body, `ΖΥΓΙΣΗ_${d.v("surname")}.doc`);
}

function exportNotification() {
    if (!validateRequiredFields(['surname', 'name', 'drug_type'])) return;
    let d = getD(); let tm = getTimeRange("notif_start", "notif_end", "doc_start", "doc_end");
    let header = `<p style="text-align: center; font-weight: bold; text-decoration: underline; font-family: 'Times New Roman'; font-size: 14pt; margin-bottom: 6pt;">ΕΚΘΕΣΗ ΓΝΩΣΤΟΠΟΙΗΣΗΣ ΝΑΡΚΩΤΙΚΩΝ ΟΥΣΙΩΝ</p>`;
    let body = `<p style="${pStyle}">Στην ${d.city} σήμερα την ${d.dateStr} και ώρα ${tm.start} εμείς ο ${d.anakr} του ${d.deptFull}, παρουσία και του ${d.banakr}, γνωστοποιήσαμε στ${d.a_ton} ${d.prof} την ιδιότητα των κατασχεθέντων ως ναρκωτικών ουσιών «${d.v("drug_type")}».</p>
    ${sigBlock("Ο κατά του οποίου η γνωστοποίηση", "Ο Β΄ Ανακρ. Υπάλληλος", "Ο Ανακριτικός Υπάλληλος")}`;
    makeDoc("Γνωστοποίηση", header, body, `ΓΝΩΣΤΟΠΟΙΗΣΗ_${d.v("surname")}.doc`);
}
