// ==========================================
// ΕΝΔΟΟΙΚΟΓΕΝΕΙΑΚΕΣ ΕΡΩΤΗΣΕΙΣ
// ==========================================
const dvQuestions = [
    "Πότε άρχισε η κακοποίηση;", "Είναι χρόνια η κατάσταση αυτή;", "Υπάρχει κλιμάκωση της συχνότητας και σοβαρότητας επιθέσεων σε βάρος σας;",
    "Ποιο είναι το πιο επικίνδυνο τραύμα που έχετε υποστεί και πότε το υποστήκατε;", "Υπάρχουν ανήλικα τέκνα στην οικογένεια; Έχει τελεστεί κάποιο αδίκημα ενδοοικογενειακής βίας σε βάρος τους ή ενώπιον τους;",
    "Υπάρχουν όπλα στο σπίτι (μαχαίρια, ρόπαλα ή πυροβόλα όπλα κ.α.);", "Έχει χρησιμοποιήσει ή απειλήσει να χρησιμοποιήσει ο δράστης κάποιου είδους όπλο;",
    "Έχει αποπειραθεί ο δράστης να σας στραγγαλίσει;", "Πίνει ο δράστης αλκοόλ ή παίρνει ναρκωτικά;", "Κακοποιεί ο δράστης όταν βρίσκεται υπό την επήρεια τους;",
    "Έχει απειλήσει ο δράστης ότι θα σας σκοτώσει ή κάποιον άλλον;", "Φοβάστε ότι δράστης μπορεί να αποπειραθεί να σας δολοφονήσει;", "Φοβάστε ότι δράστης θα αυτοκτονήσει;",
    "Είναι ο δράστης υπερβολικά ζηλιάρης;", "Πάσχει από κατάθλιψη;", "Διακατέχεστε από τάσεις αυτοκτονίας;", "Παρακολουθεί τις κινήσεις σας, σας κατασκοπεύει, σας ελέγχει ή σας παρενοχλεί;",
    "Έχει ποινικό μητρώο ο δράστης; Έχει τραυματίσει άλλους ανθρώπους;", "Έχετε πληροφορίες που θα βοηθούσαν στη σύλληψη του δράστη (οικία, τόπος εργασίας, μέρη που συχνάζει κ.α.);",
    "Επιθυμείτε την εξέταση σας από Ιατροδικαστή;",
    "Γνωρίζετε για την εφαρμογή “Κομβίο Πανικού-Panic Button”; Επιθυμείτε να σας χορηγηθεί;", "Επιθυμείτε τη δυνατότητα προσωρινής μεταφοράς και φύλαξης σας σε ασφαλή χώρο;",
    "Σας έχει παρασχεθεί ιατροφαρμακευτική περίθαλψη; Μεταβήκατε με σταθμό του ΕΚΑΒ ή με ιδία μέσα;",
    "Διαθέτετε κάποιο στοιχείο όπως φωτογραφίες, απειλητικά μηνύματα κ.α.; Προτείνετε κάποιον μάρτυρα;"
];

// ==========================================
// ΓΕΝΙΚΕΣ ΡΥΘΜΙΣΕΙΣ (GLOBAL CONFIG)
// ==========================================
const defaultOfficers = "Υπαστυνόμου Α΄ ΜΟΥΤΣΑΚΗ Νικολάου\nΑνθυπαστυνόμου ΠΑΝΑΓΙΩΤΙΔΗ Παύλου\nΑνθυπαστυνόμου ΠΑΠΑΔΗΜΗΤΡΙΟΥ\nΑνθυπαστυνόμου ΖΕΥΓΟΛΑΤΑΚΟΥ Παναγιώτη\nΑνθυπαστυνόμου ΤΣΟΛΑΚΗ Θεοδώρου\nΑρχιφύλακα ΑΓΟΡΑΣΤΟΥ Σαλονικιού\nΑρχιφύλακα ΖΙΩΓΑ Κωνσταντίνου\nΑρχιφύλακα ΚΑΡΠΟΥΧΤΣΗ Παναγιώτη\nΑρχιφύλακα ΚΟΥΚΟΥΦΙΚΗ Θεοχάρη\nΑρχιφύλακα ΚΟΥΤΡΑ Δημητρίου\nΑρχιφύλακα ΚΥΡΙΑΖΙΔΗ Ιωάννη\nΑρχιφύλακα ΜΑΛΑΝΔΡΗ Γεωργίου\nΑρχιφύλακα ΤΣΑΡΤΣΑΛΗ Δήμου";

function toggleConfig() {
    let panel = document.getElementById("cfg_settings_panel");
    let arrow = document.getElementById("cfg_arrow");
    if (panel.style.display === "none") {
        panel.style.display = "block"; arrow.innerHTML = "⬆️ Κλείσιμο";
    } else {
        panel.style.display = "none"; arrow.innerHTML = "⬇️ Άνοιγμα";
    }
}

function saveGlobalSettings() {
    localStorage.setItem("cfg_city", document.getElementById("cfg_city").value.trim());
    localStorage.setItem("cfg_dept", document.getElementById("cfg_dept").value.trim());
    localStorage.setItem("cfg_deptFull", document.getElementById("cfg_deptFull").value.trim());
    localStorage.setItem("cfg_prosecutor", document.getElementById("cfg_prosecutor").value.trim());
    localStorage.setItem("cfg_officers", document.getElementById("cfg_officers").value.trim());
    
    if(document.getElementById("cfg_officers").value.trim() !== "") {
        populateOfficers(document.getElementById("cfg_officers").value.trim());
    }
    alert("Οι Γενικές Ρυθμίσεις αποθηκεύτηκαν επιτυχώς! Το σύστημα προσαρμόστηκε.");
}

function resetGlobalSettings() {
    localStorage.removeItem("cfg_city");
    localStorage.removeItem("cfg_dept");
    localStorage.removeItem("cfg_deptFull");
    localStorage.removeItem("cfg_prosecutor");
    localStorage.removeItem("cfg_officers");
    localStorage.removeItem("mem_doc_anakr"); 
    localStorage.removeItem("mem_doc_banakr");
    loadGlobalSettings();
    alert("Έγινε πλήρης επαναφορά στις αρχικές ρυθμίσεις της Υπηρεσίας!");
}

function loadGlobalSettings() {
    let savedOfficers = localStorage.getItem("cfg_officers");
    
    document.getElementById("cfg_city").value = localStorage.getItem("cfg_city") || "Ασπροβάλτα";
    document.getElementById("cfg_dept").value = localStorage.getItem("cfg_dept") || "Α.Τ. Βόλβης";
    document.getElementById("cfg_deptFull").value = localStorage.getItem("cfg_deptFull") || "Αστυνομικό Τμήμα Βόλβης Θεσσαλονίκης";
    document.getElementById("cfg_prosecutor").value = localStorage.getItem("cfg_prosecutor") || "Εισαγγελέα Πλημμελειοδικών Θεσσαλονίκης";
    
    if (savedOfficers && savedOfficers.trim() !== "") {
        document.getElementById("cfg_officers").value = savedOfficers;
        populateOfficers(savedOfficers);
    } else {
        document.getElementById("cfg_officers").value = defaultOfficers;
        populateOfficers(defaultOfficers);
    }
}

function populateOfficers(text) {
    let officers = text.split("\n").map(o => o.trim()).filter(o => o !== "");
    if(officers.length === 0) return;
    
    let sel1 = document.getElementById("doc_anakr"); let sel2 = document.getElementById("doc_banakr");
    let val1 = localStorage.getItem('mem_doc_anakr');
    let val2 = localStorage.getItem('mem_doc_banakr');
    
    sel1.innerHTML = ""; sel2.innerHTML = "";
    officers.forEach(o => {
        sel1.add(new Option(o, o)); sel2.add(new Option(o, o));
    });
    
    if (val1 && officers.includes(val1)) sel1.value = val1;
    if (val2 && officers.includes(val2)) sel2.value = val2;
}

// ==========================================
// ΛΟΓΙΚΗ ΕΠΙΚΥΡΩΣΗΣ ΠΕΔΙΩΝ (VALIDATION)
// ==========================================
function validateRequiredFields(fieldIds) {
    let isValid = true;
    fieldIds.forEach(id => {
        let el = document.getElementById(id);
        if (el && el.value.trim() === "") {
            el.classList.add("input-error");
            isValid = false;
            el.addEventListener('input', function() { this.classList.remove("input-error"); }, {once: true});
        }
    });
    if (!isValid) { alert("⚠️ Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία που έχουν κοκκινίσει!"); }
    return isValid;
}

// ==========================================
// ΛΟΓΙΚΗ ΑΟΡΑΤΗΣ ΜΝΗΜΗΣ (AUTO-SAVE) & UNDO
// ==========================================
window.originalTexts = {};

function saveMem(id) {
    let val = document.getElementById(id).value;
    localStorage.setItem('mem_' + id, val);
}

function loadMem(id) {
    let saved = localStorage.getItem('mem_' + id);
    if (saved !== null) { document.getElementById(id).value = saved; }
}

function clearMem() {
    const keys = Object.keys(localStorage);
    keys.forEach(k => {
        if (k.startsWith('mem_') && k !== 'mem_doc_anakr' && k !== 'mem_doc_banakr') {
            localStorage.removeItem(k);
        }
    });
    window.originalTexts = {};
}

function undoText(elementId) {
    if (window.originalTexts[elementId]) {
        document.getElementById(elementId).value = window.originalTexts[elementId];
        saveMem(elementId);
    } else {
        alert("Δεν υπάρχει προηγούμενο κείμενο για αναίρεση.");
    }
}

// ==========================================
// ΒΑΣΙΚΕΣ ΛΕΙΤΟΥΡΓΙΕΣ ΦΟΡΜΑΣ
// ==========================================
window.onload = function() {
    refreshTimes();
    buildDVForm();
    loadGlobalSettings();

    // Load Mem
    loadMem("doc_testimony_simple");
    loadMem("prok_abm"); loadMem("prok_plea"); loadMem("prok_dead_date"); loadMem("prok_dead_time"); loadMem("prok_pages");
    loadMem("ai_rough_notes"); loadMem("apologia_charge_short"); loadMem("apologia_charge_details"); loadMem("apologia_plea");
    loadMem("arr_loc"); loadMem("arr_officer"); loadMem("arr_reason");
    loadMem("drug_type"); loadMem("drug_weight"); loadMem("drug_packaging");
    
    if (localStorage.getItem("gemini_api_key")) {
        document.getElementById("gemini_api_key").value = localStorage.getItem("gemini_api_key");
        if(localStorage.getItem("gemini_model")) {
            document.getElementById("model_selection_div").style.display = "flex";
            let opt = document.createElement("option");
            opt.value = localStorage.getItem("gemini_model"); opt.text = localStorage.getItem("gemini_model") + " (Αποθηκευμένο)";
            document.getElementById("gemini_model").appendChild(opt);
            document.getElementById("key_status").style.display = "inline";
        }
    }
};

function buildDVForm() {
    const container = document.getElementById("dv_mode_container");
    let html = `
    <div class="dv-item large">
        <div style="display: flex; gap: 5px; margin-bottom: 5px;">
            <label style="font-size: 14px; color: #0056b3; display: block; font-weight: bold; flex: 1;">ΕΡΩΤΗΣΗ: Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας; *</label>
            <button class="btn-ai" style="width: auto; padding: 4px 8px; font-size: 11px;" id="btn_ref_dv" onclick="refineTextAI('dv_q_main', 'spin_ref_dv', 'btn_ref_dv')"><span id="spin_ref_dv" class="spinner" style="display:none;"></span>✨ Διόρθωση AI</button>
            <button class="btn-undo" onclick="undoText('dv_q_main')">↩️ Αναίρεση</button>
        </div>
        <textarea id="dv_q_main" placeholder="Περιγράψτε το αρχικό ιστορικό..." style="height: 100px;" oninput="saveMem(this.id)"></textarea>
        
        <div style="margin-top: 10px; margin-bottom: 20px;">
            <button class="btn-ai" id="btn_check_rule_dv" onclick="checkGoldenRule('dv_q_main', 'ai_golden_rule_result_dv', 'spinner_rule_dv', 'btn_check_rule_dv')">
                <span id="spinner_rule_dv" class="spinner" style="display: none;"></span>✨ AI Έλεγχος "Χρυσού Κανόνα"
            </button>
            <div id="ai_golden_rule_result_dv" class="ai-result"></div>
        </div>
    </div>`;
    
    dvQuestions.forEach((q, index) => {
        html += `<div class="dv-item"><label>ΕΡΩΤΗΣΗ: ${q}</label><textarea id="dv_q_${index}" oninput="saveMem(this.id)"></textarea></div>`;
    });
    html += `<div class="dv-item"><label>ΕΡΩΤΗΣΗ: Έχετε να προσθέσετε κάτι άλλο;</label><textarea id="dv_q_last" oninput="saveMem(this.id)">Επιθυμώ την ποινική δίωξη του δράστη...</textarea></div>`;
    container.innerHTML = html;

    loadMem("dv_q_main");
    dvQuestions.forEach((q, i) => loadMem("dv_q_" + i));
    loadMem("dv_q_last");
}

function refreshTimes() {
    const days = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'];
    const months = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'];
    
    const now = new Date();
    const dateStr = String(now.getDate()).padStart(2, '0') + "-" + String(now.getMonth()+1).padStart(2, '0') + "-" + now.getFullYear();
    
    document.getElementById('doc_day').value = days[now.getDay()];
    document.getElementById('doc_date').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('doc_month').value = months[now.getMonth()];
    document.getElementById('doc_year').value = now.getFullYear();

    const addMins = (date, mins) => new Date(date.getTime() + mins * 60000);
    const timeStr = (date) => String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    
    document.getElementById('doc_start').value = timeStr(now);
    document.getElementById('doc_end').value = timeStr(addMins(now, 15));

    let t1 = now; let t2 = addMins(t1, 10); let t3 = addMins(t2, 10); let t4 = addMins(t3, 15); 
    document.getElementById('arr_start').value = timeStr(t1); document.getElementById('arr_end').value = timeStr(t2);
    document.getElementById('rig_start').value = timeStr(t2); document.getElementById('rig_end').value = timeStr(t3);
    document.getElementById('apo_start').value = timeStr(t3); document.getElementById('apo_end').value = timeStr(t4);
    
    document.getElementById('ai_date').value = dateStr;
    document.getElementById('ai_time').value = timeStr(now);
    document.getElementById('arr_street_date').value = dateStr;
    document.getElementById('arr_street_time').value = timeStr(now);
}

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    btnElement.classList.add('active');
    document.getElementById('tab_' + tabId).classList.add('active');
}

function clearFields() {
    if (confirm("Είστε σίγουροι; Θα διαγραφούν ΟΛΑ τα στοιχεία προσώπου και ό,τι κείμενο έχετε πληκτρολογήσει (Το API Key και οι ρυθμίσεις ΔΕΝ διαγράφονται).")) {
        document.getElementById("pol_data").value = "";
        let inputs = document.querySelectorAll('.grid-form input:not([id^="cfg_"]):not([id^="doc_"]):not([id="gemini_api_key"]), .tab-content textarea, .ai-grid input, .arrest-grid input, #ai_law, #apologia_rights, #apologia_past');
        inputs.forEach(input => {
            input.value = "";
            input.classList.remove("input-error");
        });
        document.getElementById("apologia_rights").value = "Όχι.";
        document.getElementById("apologia_past").value = "Όχι, δεν έχω κατηγορηθεί ξανά.";
        clearMem();
    }
}

// ==========================================
// ΛΟΓΙΚΗ ΕΞΑΓΩΓΗΣ ΑΠΟ POL
// ==========================================
function toTitleCase(str) { if (!str) return ""; return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1); }
function toTitleCaseWords(str) { if (!str) return ""; return str.split(" ").map(w => { if (w.toUpperCase() === "Α.Τ.") return "Α.Τ."; if (w.toUpperCase() === "Τ.Α.") return "Τ.Α."; return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }).join(" "); }
function toGenitive(name) { if(!name) return ""; let n = toTitleCase(name); if (n.endsWith("ος")) return n.slice(0, -2) + "ου"; if (n.endsWith("ης")) return n.slice(0, -1); if (n.endsWith("ας")) return n.slice(0, -1); if (n.endsWith("α")) return n + "ς"; if (n.endsWith("η")) return n + "ς"; return n; }
function keepOnlyGreek(str) { if (!str) return ""; return str.replace(/[a-zA-Z]/g, '').trim(); }

function parsePOL() {
    var rawTxt = document.getElementById("pol_data").value;
    if (!rawTxt) { alert("Παρακαλώ επικολλήστε τα στοιχεία."); return; }
    var txt = rawTxt.replace(/[\n\r\t\u00A0]+/g, " ").replace(/\s+/g, " ");
    function extract(regex) { var m = txt.match(regex); return m && m[1] ? m[1].trim() : ""; }
    
    document.getElementById("gender").value = (/Γυναίκα/i.test(txt) || /ΓΥΝΑΙΚΑ/i.test(txt)) ? "F" : "M";

    let surname = extract(/Επώνυμο(.*?)\s*Επώνυμο \(Λατιν\.\)/) || extract(/Επώνυμο(.*?)\s*Όνομα/);
    let name = extract(/Όνομα(.*?)\s*Όνομα \(Λατιν\.\)/) || extract(/Όνομα(.*?)\s*Όνομα Πατρός/);
    let father = extract(/Όνομα Πατρός(.*?)\s*Όνομα Πατέρα \(Λατιν\.\)/) || extract(/Όνομα Πατρός(.*?)\s*Επώνυμο Πατρός/);
    let mother = keepOnlyGreek(extract(/Όνομα Μητρός(.*?)\s*Επώνυμο Μητρός/));
    let dobMatch = txt.match(/Ημ\/νία Γέννησης\s*(\d{2}\/\d{2}\/\d{4})/);
    let pobFull = keepOnlyGreek(extract(/Τόπος Γέννησης(.*?)(?:Χώρα Γέννησης|Υπηρεσία χρέωσης)/));
    let authDateMatch = txt.match(/Ημ\/νια Έκδοσης\s*(\d{2}\/\d{2}\/\d{4})/);
    let authFull = extract(/Αρχή Έκδοσης(.*?)\s*Ημ\/νια Έκδοσης/).replace(/^\d+\s*-\s*/, ""); 
    let dimosFull = extract(/Δημότης(.*?)\s*Αριθμός Δημοτολογίου/);
    let dimos = dimosFull ? toTitleCaseWords(dimosFull.split(" ")[0]) + (dimosFull.split(" ")[1] ? " - " + toTitleCaseWords(dimosFull.split(" ")[1]) : "") : "";
    let arithmosMatch = txt.match(/Οδός.*?Αριθμός(.*?)\s*(?:Ταχ\.Κώδικας|Τηλέφωνο|Άλλα)/);
    let phoneMatch = txt.match(/Τηλέφωνο\s*(\d{10})/);
    let cleanTxtForAdt = txt.replace(/Αντικατάστασης\s*[Α-ΩA-Z0-9]+/g, "");
    let adts = cleanTxtForAdt.match(/[Α-ΩA-Z]{1,3}\d{5,8}/g);

    document.getElementById("surname").value = surname.toUpperCase(); 
    document.getElementById("name").value = toTitleCase(name); 
    document.getElementById("father").value = toGenitive(father); 
    document.getElementById("mother").value = toGenitive(mother); 
    document.getElementById("dob").value = dobMatch ? dobMatch[1].replace(/\//g, "-") : "";
    document.getElementById("pob").value = toTitleCase(pobFull.split(/\s+/)[0]);
    document.getElementById("area").value = toGenitive(extract(/Περιοχή(.*?)\s*Οδός/)); 
    document.getElementById("dimos").value = dimos;
    document.getElementById("odos").value = toTitleCaseWords(extract(/Οδός(.*?)\s*Αριθμός/));
    document.getElementById("arithmos").value = arithmosMatch ? arithmosMatch[1].trim() : "";
    document.getElementById("adt").value = adts && adts.length > 0 ? adts[adts.length - 1] : "";
    document.getElementById("authDate").value = authDateMatch ? authDateMatch[1].replace(/\//g, "-") : "";
    document.getElementById("auth").value = toTitleCaseWords(authFull);
    if (phoneMatch) document.getElementById("phone").value = phoneMatch[1];
    
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

function getProfileText() {
    let v = id => document.getElementById(id).value.trim(); 
    let text = `${v("surname")} ${v("name")} του ${v("father")} και της ${v("mother")}, γεν. ${v("dob")} στην ${v("pob")}, κάτοικος ${v("area")}, Δήμου ${v("dimos")}`;
    if (v("odos")) text += `, οδός ${v("odos")}`;
    if (v("arithmos")) text += `, αρ. ${v("arithmos")}`;
    if (v("epaggelma")) text += `, επάγγελμα ${v("epaggelma")}`;
    text += `, κάτοχος του υπ' αριθ. ${v("adt")} δελτίου ταυτότητας, εκδ. ${v("authDate")} από ${v("auth")}`;
    if (v("afm") || v("doy")) text += `, με Α.Φ.Μ. ${v("afm")} από Δ.Ο.Υ. ${v("doy")}`;
    if (v("phone")) text += `, κάτοχος της με αριθμό ${v("phone")} σύνδεσης κινητής τηλεφωνίας`;
    if (v("email")) text += `, καθώς και της διεύθυνσης ηλεκτρονικού ταχυδρομείου (email) ${v("email")}`;
    return text.replace(/\s+/g, ' ').replace(/ ,/g, ',');
}

function copyProfileText() {
    let text = getProfileText();
    if(!text || text.trim().length < 10) { alert("Δεν υπάρχουν επαρκή στοιχεία για αντιγραφή."); return; }
    navigator.clipboard.writeText(text).then(() => { alert("Τα στοιχεία αντιγράφηκαν επιτυχώς στο πρόχειρο!"); })
    .catch(err => { alert("Σφάλμα κατά την αντιγραφή: " + err); });
}

// ==========================================
// AI LOGIC (GEMINI API) & ΑΣΦΑΛΕΙΑ
// ==========================================
function sanitizeForAI(text) {
    if(!text) return "";
    let sanitized = text;
    sanitized = sanitized.replace(/\b[26]\d{9}\b/g, "[ΤΗΛΕΦΩΝΟ]");
    sanitized = sanitized.replace(/\b\d{9}\b/g, "[ΑΦΜ]");
    sanitized = sanitized.replace(/\b[Α-Ω]{1,3}\s*\d{5,8}\b/g, "[ΑΔΤ]");
    sanitized = sanitized.replace(/\b[Α-ΩA-Z]{3}-\d{4}\b/g, "[ΠΙΝΑΚΙΔΑ]");
    sanitized = sanitized.replace(/\b\d{5,}\b/g, "[ΑΡΙΘΜΟΣ]");
    return sanitized;
}

function toggleAI() {
    let panel = document.getElementById("ai_settings_panel");
    let arrow = document.getElementById("ai_arrow");
    if (panel.style.display === "none") {
        panel.style.display = "block"; arrow.innerHTML = "⬆️ Κλείσιμο";
    } else {
        panel.style.display = "none"; arrow.innerHTML = "⬇️ Άνοιγμα";
    }
}

function logoutAI() {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_model');
    document.getElementById('gemini_api_key').value = '';
    document.getElementById('model_selection_div').style.display = 'none';
    alert("Το API Key διαγράφηκε επιτυχώς. Το σύστημα είναι ασφαλές για τον επόμενο χρήστη.");
}

async function saveApiKeyAndFetchModels() {
    let key = document.getElementById("gemini_api_key").value.trim();
    if (!key) { alert("Παρακαλώ εισάγετε ένα έγκυρο API Key."); return; }
    localStorage.setItem("gemini_api_key", key);
    
    try {
        let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        let data = await res.json();
        if(data.error) { alert("Σφάλμα ελέγχου κλειδιού: " + data.error.message); return; }
        
        let select = document.getElementById("gemini_model");
        select.innerHTML = ""; 
        let validModels = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"));
        
        validModels.forEach(m => {
            let opt = document.createElement("option");
            opt.value = m.name.replace("models/", "");
            opt.text = m.displayName + " (" + opt.value + ")";
            select.appendChild(opt);
        });
        
        let pref = validModels.find(m => m.name.includes("gemini-1.5-flash-8b")) || 
                   validModels.find(m => m.name.includes("gemini-1.5-flash")) || 
                   validModels.find(m => m.name.includes("gemini-1.0-pro"));
        if(pref) { select.value = pref.name.replace("models/", ""); }
        
        document.getElementById("model_selection_div").style.display = "flex";
        document.getElementById("key_status").style.display = "inline";
        localStorage.setItem("gemini_model", select.value);
        setTimeout(() => { document.getElementById("key_status").style.display = "none"; }, 3000);
    } catch(e) { alert("Αποτυχία σύνδεσης. Ελέγξτε τη σύνδεσή σας."); }
}

async function callGeminiAPI(prompt, buttonId, spinnerId) {
    let apiKey = localStorage.getItem("gemini_api_key");
    let modelName = document.getElementById("gemini_model").value || localStorage.getItem("gemini_model");
    if (!apiKey) { alert("Απαιτείται Gemini API Key! Ανοίξτε τις 'Ρυθμίσεις Τεχνητής Νοημοσύνης' στην κορυφή."); return null; }
    if (!modelName) { alert("Παρακαλώ πατήστε 'Σύνδεση & Εύρεση Μοντέλων' στις ρυθμίσεις AI."); return null; }

    let btn = document.getElementById(buttonId); let spinner = document.getElementById(spinnerId);
    btn.disabled = true; spinner.style.display = "inline-block";

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        let data = await response.json();
        btn.disabled = false; spinner.style.display = "none";

        if (data.error) {
            if(data.error.message.includes("quota") || data.error.code === 429) {
                 alert(`Όριο χρήσης! Παρακαλώ διαλέξτε άλλο μοντέλο από τις ρυθμίσεις (π.χ. gemini-1.5-flash).`); return null;
            }
            throw new Error(data.error.message);
        }
        return data.candidates[0].content.parts[0].text;
    } catch (e) {
        btn.disabled = false; spinner.style.display = "none";
        alert("Σφάλμα: " + e.message); return null;
    }
}

async function refineTextAI(elementId, spinnerId, btnId) {
    let el = document.getElementById(elementId);
    let text = el.value.trim();
    if (!text) { alert("Το πεδίο είναι κενό. Γράψτε πρώτα το κείμενό σας."); return; }
    
    window.originalTexts[elementId] = text;
    let safeText = sanitizeForAI(text);
    
    let prompt = `Είσαι βοηθός Προανακριτικού Υπαλλήλου. Διόρθωσε το παρακάτω προανακριτικό κείμενο (κατάθεση/απολογία) συντακτικά και ορθογραφικά. Βελτίωσε τη νομική/αστυνομική του ορολογία. ΜΗΝ αλλάξεις το νόημα, ΜΗΝ προσθέσεις δικά σου γεγονότα. Επίστρεψε ΜΟΝΟ το τελικό, διορθωμένο κείμενο:\n\n"${safeText}"`;
    
    let resultText = await callGeminiAPI(prompt, btnId, spinnerId);
    if (resultText) {
        el.value = resultText.trim();
        saveMem(elementId);
    }
}

async function checkGoldenRule(sourceId, resultId, spinnerId, btnId) {
    let text = document.getElementById(sourceId).value.trim();
    let resDiv = document.getElementById(resultId);
    if (!text) {
        resDiv.innerHTML = "Παρακαλώ γράψτε πρώτα την κατάθεση."; resDiv.className = "ai-result error"; resDiv.style.display = "block"; return;
    }
    let safeText = sanitizeForAI(text);
    let prompt = `Είσαι βοηθός Προανακριτικού Υπαλλήλου. Διάβασε την κατάθεση. Έλεγξε αν καλύπτονται: 1) ΠΟΥ (τόπος), 2) ΠΟΤΕ (χρόνος), 3) ΠΟΙΟΣ (δράστης), 4) ΤΙ (αξιόποινη πράξη), 5) ΓΙΑΤΙ (κίνητρο). ΠΡΟΣΟΧΗ: Αν ο μάρτυρας αναφέρει "δεν γνωρίζω γιατί" ή "αναίτια", το "ΓΙΑΤΙ" θεωρείται ότι ΑΠΑΝΤΗΘΗΚΕ ΕΠΙΤΥΧΩΣ (✅). Επίστρεψε ΜΟΝΟ μια σύντομη αναφορά με bullets (✅ ή ❌). Κατάθεση: "${safeText}"`;
    resDiv.style.display = "none"; resDiv.className = "ai-result";
    let resultText = await callGeminiAPI(prompt, btnId, spinnerId);
    if (resultText) { resDiv.innerHTML = "<strong>Αξιολόγηση Χρυσού Κανόνα:</strong><br><br>" + resultText.replace(/\n/g, "<br>"); resDiv.style.display = "block"; }
}

async function generateChargeAI() {
    let text = document.getElementById("ai_rough_notes").value.trim();
    if (!text) { alert("Παρακαλώ γράψτε μια σύντομη περιγραφή."); return; }
    let safeText = sanitizeForAI(text);
    let prompt = `Είσαι νομικός βοηθός Προανακριτικού Υπαλλήλου. Διάβασε την περιγραφή συμβάντος: "${safeText}".
    Σύνταξε: 1. Το 'Βασικό Κατηγορητήριο' βρίσκοντας τα άρθρα του ΠΚ. Αν είναι συρροή (ίδιος χρόνος/τόπος), ΕΝΩΣΕ ΤΑ ("παράβαση των άρθρων Χ, Υ Π.Κ., πράξεις οι οποίες έλαβαν χώρα...").
    2. Τα 'Πραγματικά Περιστατικά' (π.χ. "Ειδικότερα, την ανωτέρω ημέρα και ώρα..."). Μην βάζεις πραγματικά ονόματα.
    Δώσε απάντηση ΑΥΣΤΗΡΑ με δομή: [ΒΑΣΙΚΟ] κείμενο 1 [ΠΕΡΙΣΤΑΤΙΚΑ] κείμενο 2`;
    let resultText = await callGeminiAPI(prompt, "btn_generate_charge", "spinner_charge");
    if (resultText) {
        try {
            let parts = resultText.split("[ΠΕΡΙΣΤΑΤΙΚΑ]");
            document.getElementById("apologia_charge_short").value = parts[0].replace("[ΒΑΣΙΚΟ]", "").trim();
            document.getElementById("apologia_charge_details").value = parts[1].trim();
            saveMem("apologia_charge_short"); saveMem("apologia_charge_details");
        } catch (e) { alert("Αποτυχία ανάγνωσης απάντησης AI."); }
    }
}

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
    let dd = document.getElementById("ai_crime_dropdown"); let sc = dd.value; if (!sc) return;
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
    
    let sig4 = `<table style="width: 100%; font-family: 'Times New Roman'; font-size: 12pt; text-align: center; margin-top: 20pt; margin-bottom: 0cm; padding: 0cm; background: white; color: black; border: none;" border="0"><tr><td style="width: 25%; vertical-align: top;">${d.v("gender")==='M'?"Ο Συλληφθείς":"Η Συλληφθείσα"}</td><td style="width: 25%; vertical-align: top;">Ο Συλλαβών</td><td style="width: 25%; vertical-align: top;">Ο Β΄ Ανακριτ. Υπάλλ.</td><td style="width: 25%; vertical-align: top;">Ο Ανακριτ. Υπάλληλος</td></tr></table>`;
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
