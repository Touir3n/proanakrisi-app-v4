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

const defaultOfficers = "Υπαστυνόμου Α΄ ΜΟΥΤΣΑΚΗ Νικολάου\nΑνθυπαστυνόμου ΠΑΝΑΓΙΩΤΙΔΗ Παύλου\nΑνθυπαστυνόμου ΠΑΠΑΔΗΜΗΤΡΙΟΥ\nΑνθυπαστυνόμου ΖΕΥΓΟΛΑΤΑΚΟΥ Παναγιώτη\nΑνθυπαστυνόμου ΤΣΟΛΑΚΗ Θεοδώρου\nΑρχιφύλακα ΑΓΟΡΑΣΤΟΥ Σαλονικιού\nΑρχιφύλακα ΖΙΩΓΑ Κωνσταντίνου\nΑρχιφύλακα ΚΑΡΠΟΥΧΤΣΗ Παναγιώτη\nΑρχιφύλακα ΚΟΥΚΟΥΦΙΚΗ Θεοχάρη\nΑρχιφύλακα ΚΟΥΤΡΑ Δημητρίου\nΑρχιφύλακα ΚΥΡΙΑΖΙΔΗ Ιωάννη\nΑρχιφύλακα ΜΑΛΑΝΔΡΗ Γεωργίου\nΑρχιφύλακα ΤΣΑΡΤΣΑΛΗ Δήμου";

function toggleConfig() {
    let panel = document.getElementById("cfg_settings_panel");
    let arrow = document.getElementById("cfg_arrow");
    if (panel.style.display === "none") { panel.style.display = "block"; arrow.innerHTML = "⬆️ Κλείσιμο"; } 
    else { panel.style.display = "none"; arrow.innerHTML = "⬇️ Άνοιγμα"; }
}

function saveGlobalSettings() {
    localStorage.setItem("cfg_city", document.getElementById("cfg_city").value.trim());
    localStorage.setItem("cfg_dept", document.getElementById("cfg_dept").value.trim());
    localStorage.setItem("cfg_deptFull", document.getElementById("cfg_deptFull").value.trim());
    localStorage.setItem("cfg_prosecutor", document.getElementById("cfg_prosecutor").value.trim());
    localStorage.setItem("cfg_officers", document.getElementById("cfg_officers").value.trim());
    if(document.getElementById("cfg_officers").value.trim() !== "") { populateOfficers(document.getElementById("cfg_officers").value.trim()); }
    alert("Οι Γενικές Ρυθμίσεις αποθηκεύτηκαν επιτυχώς!");
}

function resetGlobalSettings() {
    localStorage.removeItem("cfg_city"); localStorage.removeItem("cfg_dept"); localStorage.removeItem("cfg_deptFull");
    localStorage.removeItem("cfg_prosecutor"); localStorage.removeItem("cfg_officers"); localStorage.removeItem("mem_doc_anakr"); localStorage.removeItem("mem_doc_banakr");
    loadGlobalSettings();
    alert("Έγινε πλήρης επαναφορά στις αρχικές ρυθμίσεις της Υπηρεσίας!");
}

function loadGlobalSettings() {
    let savedOfficers = localStorage.getItem("cfg_officers");
    document.getElementById("cfg_city").value = localStorage.getItem("cfg_city") || "Ασπροβάλτα";
    document.getElementById("cfg_dept").value = localStorage.getItem("cfg_dept") || "Α.Τ. Βόλβης";
    document.getElementById("cfg_deptFull").value = localStorage.getItem("cfg_deptFull") || "Αστυνομικό Τμήμα Βόλβης Θεσσαλονίκης";
    document.getElementById("cfg_prosecutor").value = localStorage.getItem("cfg_prosecutor") || "Εισαγγελέα Πλημμελειοδικών Θεσσαλονίκης";
    if (savedOfficers && savedOfficers.trim() !== "") { document.getElementById("cfg_officers").value = savedOfficers; populateOfficers(savedOfficers); } 
    else { document.getElementById("cfg_officers").value = defaultOfficers; populateOfficers(defaultOfficers); }
}

function populateOfficers(text) {
    let officers = text.split("\n").map(o => o.trim()).filter(o => o !== "");
    if(officers.length === 0) return;
    let sel1 = document.getElementById("doc_anakr"); let sel2 = document.getElementById("doc_banakr");
    let val1 = localStorage.getItem('mem_doc_anakr'); let val2 = localStorage.getItem('mem_doc_banakr');
    sel1.innerHTML = ""; sel2.innerHTML = "";
    officers.forEach(o => { sel1.add(new Option(o, o)); sel2.add(new Option(o, o)); });
    if (val1 && officers.includes(val1)) sel1.value = val1;
    if (val2 && officers.includes(val2)) sel2.value = val2;
}

function validateRequiredFields(fieldIds) {
    let isValid = true;
    fieldIds.forEach(id => {
        let el = document.getElementById(id);
        if (el && el.value.trim() === "") {
            el.classList.add("input-error"); isValid = false;
            el.addEventListener('input', function() { this.classList.remove("input-error"); }, {once: true});
        }
    });
    if (!isValid) { alert("⚠️ Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία που έχουν κοκκινίσει!"); }
    return isValid;
}

window.originalTexts = {};
function saveMem(id) { localStorage.setItem('mem_' + id, document.getElementById(id).value); }
function loadMem(id) { let saved = localStorage.getItem('mem_' + id); if (saved !== null) { document.getElementById(id).value = saved; } }
function clearMem() {
    Object.keys(localStorage).forEach(k => { if (k.startsWith('mem_') && k !== 'mem_doc_anakr' && k !== 'mem_doc_banakr') localStorage.removeItem(k); });
    window.originalTexts = {};
}

function undoText(elementId) {
    if (window.originalTexts[elementId]) { document.getElementById(elementId).value = window.originalTexts[elementId]; saveMem(elementId); } 
    else { alert("Δεν υπάρχει προηγούμενο κείμενο για αναίρεση."); }
}

function toggleDrugPanels() {
    let type = document.getElementById("drug_search_type").value;
    document.getElementById("panel_body_search").style.display = "none";
    document.getElementById("panel_car_search").style.display = "none";
    document.getElementById("panel_surrender").style.display = "none";

    if(type === "ΣΩΜΑΤΙΚΗΣ ΕΡΕΥΝΑΣ ΚΑΙ ΚΑΤΑΣΧΕΣΗΣ") {
        document.getElementById("panel_body_search").style.display = "block";
    } else if(type === "ΕΡΕΥΝΑΣ ΑΥΤΟΚΙΝΗΤΟΥ ΚΑΙ ΚΑΤΑΣΧΕΣΗΣ") {
        document.getElementById("panel_car_search").style.display = "block";
    } else if(type === "ΠΑΡΑΔΟΣΗΣ ΚΑΙ ΚΑΤΑΣΧΕΣΗΣ") {
        document.getElementById("panel_surrender").style.display = "block";
    }
}

window.onload = function() {
    refreshTimes(); buildDVForm(); loadGlobalSettings();
    loadMem("doc_testimony_simple");
    loadMem("prok_abm"); loadMem("prok_charge"); loadMem("prok_rights_ans"); loadMem("prok_past"); loadMem("prok_plea"); loadMem("prok_dead_date"); loadMem("prok_dead_time"); loadMem("prok_pages");
    loadMem("ai_rough_notes"); loadMem("apologia_charge_short"); loadMem("apologia_charge_details"); loadMem("apologia_plea");
    loadMem("arr_loc"); loadMem("arr_officer"); loadMem("arr_reason");
    
    loadMem("surname_gen"); loadMem("name_gen"); loadMem("surname_acc"); loadMem("name_acc");
    
    // Ναρκωτικά - Νέα Πεδία
    loadMem("drug_type"); loadMem("drug_weight"); loadMem("drug_packaging"); 
    loadMem("drug_search_type");
    // Σωματική
    loadMem("drug_body_loc"); loadMem("drug_body_officer"); loadMem("drug_body_date"); loadMem("drug_body_start"); loadMem("drug_body_end");
    // Όχημα
    loadMem("drug_car_plate"); loadMem("drug_car_brand"); loadMem("drug_car_color"); loadMem("drug_car_loc"); loadMem("drug_car_date"); loadMem("drug_car_start"); loadMem("drug_car_end");
    // Παράδοση
    loadMem("drug_surrender_officer"); loadMem("drug_surrender_date"); loadMem("drug_surrender_time"); loadMem("drug_surrender_city"); loadMem("drug_surrender_street");
    
    loadMem("ai_law"); loadMem("ai_date"); loadMem("ai_time"); loadMem("ai_loc");
    
    loadMem("seiz_start"); loadMem("seiz_end"); loadMem("weigh_start"); loadMem("weigh_end"); loadMem("notif_start"); loadMem("notif_end");
    loadMem("arr_start"); loadMem("arr_end"); loadMem("rig_start"); loadMem("rig_end"); loadMem("apo_start"); loadMem("apo_end");
    loadMem("prok_rights_start"); loadMem("prok_rights_end"); loadMem("prok_main_start"); loadMem("prok_main_end"); loadMem("prok_after_start"); loadMem("prok_after_end"); loadMem("prok_service_start"); loadMem("prok_service_end");
    
    toggleDrugPanels();

    if(!document.getElementById("prok_abm").value) {
        document.getElementById("prok_abm").value = "υπ' αριθμ. ....... παραγγελίας της Εισαγγελίας Πλημμελειοδικών Θεσσαλονίκης";
    }
    
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
    let html = `<div class="dv-item large"><div style="display: flex; gap: 5px; margin-bottom: 5px;"><label style="font-size: 14px; color: #0056b3; display: block; font-weight: bold; flex: 1;">ΕΡΩΤΗΣΗ: Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας; *</label><button class="btn-ai" style="width: auto; padding: 4px 8px; font-size: 11px;" id="btn_ref_dv" onclick="refineTextAI('dv_q_main', 'spin_ref_dv', 'btn_ref_dv')"><span id="spin_ref_dv" class="spinner" style="display:none;"></span>✨ Διόρθωση AI</button><button class="btn-undo" onclick="undoText('dv_q_main')">↩️ Αναίρεση</button></div><textarea id="dv_q_main" placeholder="Περιγράψτε το αρχικό ιστορικό..." style="height: 100px;" oninput="saveMem(this.id)"></textarea><div style="margin-top: 10px; margin-bottom: 20px;"><button class="btn-ai" id="btn_check_rule_dv" onclick="checkGoldenRule('dv_q_main', 'ai_golden_rule_result_dv', 'spinner_rule_dv', 'btn_check_rule_dv')"><span id="spinner_rule_dv" class="spinner" style="display: none;"></span>✨ AI Έλεγχος "Χρυσού Κανόνα"</button><div id="ai_golden_rule_result_dv" class="ai-result"></div></div></div>`;
    dvQuestions.forEach((q, index) => { html += `<div class="dv-item"><label>ΕΡΩΤΗΣΗ: ${q}</label><textarea id="dv_q_${index}" oninput="saveMem(this.id)"></textarea></div>`; });
    html += `<div class="dv-item"><label>ΕΡΩΤΗΣΗ: Έχετε να προσθέσετε κάτι άλλο;</label><textarea id="dv_q_last" oninput="saveMem(this.id)">Επιθυμώ την ποινική δίωξη του δράστη...</textarea></div>`;
    container.innerHTML = html;
    loadMem("dv_q_main"); dvQuestions.forEach((q, i) => loadMem("dv_q_" + i)); loadMem("dv_q_last");
}

function setInputIfExists(id, value) {
    let el = document.getElementById(id);
    if (el) el.value = value;
}

function refreshTimes() {
    const days = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'];
    const months = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'];
    const now = new Date();
    const dateStr = String(now.getDate()).padStart(2, '0') + "-" + String(now.getMonth()+1).padStart(2, '0') + "-" + now.getFullYear();

    setInputIfExists('doc_day', days[now.getDay()]);
    setInputIfExists('doc_date', String(now.getDate()).padStart(2, '0'));
    setInputIfExists('doc_month', months[now.getMonth()]);
    setInputIfExists('doc_year', now.getFullYear());

    const addMins = (date, mins) => new Date(date.getTime() + mins * 60000);
    const timeStr = (date) => String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');

    const docStart = now;
    const docEnd = addMins(docStart, 15);

    let isDrugCase = document.getElementById("is_drug_case") ? document.getElementById("is_drug_case").checked : false;
    let arrStart, arrEnd, rigStart, rigEnd, apoStart, apoEnd;
    let seizStart, seizEnd, weighStart, weighEnd, notifStart, notifEnd;

    if (isDrugCase) {
        seizStart = now;
        seizEnd = addMins(seizStart, 8);
        arrStart = addMins(seizEnd, 1);
        arrEnd = addMins(arrStart, 10);
        weighStart = addMins(arrEnd, 1);
        weighEnd = addMins(weighStart, 6);
        notifStart = addMins(weighEnd, 1);
        notifEnd = addMins(notifStart, 6);
        rigStart = addMins(notifEnd, 1);
        rigEnd = addMins(rigStart, 10);
        apoStart = addMins(rigEnd, 1);
        apoEnd = addMins(apoStart, 15);
    } else {
        arrStart = now;
        arrEnd = addMins(arrStart, 10);
        rigStart = addMins(arrEnd, 1);
        rigEnd = addMins(rigStart, 10);
        apoStart = addMins(rigEnd, 1);
        apoEnd = addMins(apoStart, 15);

        seizStart = now; 
        seizEnd = addMins(seizStart, 8);
        weighStart = addMins(seizEnd, 1); 
        weighEnd = addMins(weighStart, 6);
        notifStart = addMins(weighEnd, 1); 
        notifEnd = addMins(notifStart, 6);
    }

    const priorActionStart = addMins(seizStart, -45);
    const priorActionEnd = addMins(seizStart, -15);
    
    setInputIfExists('drug_body_date', dateStr);
    setInputIfExists('drug_body_start', timeStr(priorActionStart));
    setInputIfExists('drug_body_end', timeStr(priorActionEnd));
    
    setInputIfExists('drug_car_date', dateStr);
    setInputIfExists('drug_car_start', timeStr(priorActionStart));
    setInputIfExists('drug_car_end', timeStr(priorActionEnd));
    
    setInputIfExists('drug_surrender_date', dateStr);
    setInputIfExists('drug_surrender_time', timeStr(priorActionStart));

    const prokRightsStart = now;
    const prokRightsEnd = addMins(prokRightsStart, 10);
    const prokMainStart = addMins(prokRightsEnd, 1);
    const prokMainEnd = addMins(prokMainStart, 15);
    
    const prokAfterStart = now;
    const prokAfterEnd = addMins(prokAfterStart, 10);
    const prokServiceStart = addMins(prokAfterEnd, 1);
    const prokServiceEnd = addMins(prokServiceStart, 8);

    setInputIfExists('doc_start', timeStr(docStart));
    setInputIfExists('doc_end', timeStr(docEnd));

    setInputIfExists('seiz_start', timeStr(seizStart));
    setInputIfExists('seiz_end', timeStr(seizEnd));
    setInputIfExists('arr_start', timeStr(arrStart));
    setInputIfExists('arr_end', timeStr(arrEnd));
    setInputIfExists('weigh_start', timeStr(weighStart));
    setInputIfExists('weigh_end', timeStr(weighEnd));
    setInputIfExists('notif_start', timeStr(notifStart));
    setInputIfExists('notif_end', timeStr(notifEnd));
    setInputIfExists('rig_start', timeStr(rigStart));
    setInputIfExists('rig_end', timeStr(rigEnd));
    setInputIfExists('apo_start', timeStr(apoStart));
    setInputIfExists('apo_end', timeStr(apoEnd));

    setInputIfExists('prok_rights_start', timeStr(prokRightsStart));
    setInputIfExists('prok_rights_end', timeStr(prokRightsEnd));
    setInputIfExists('prok_main_start', timeStr(prokMainStart));
    setInputIfExists('prok_main_end', timeStr(prokMainEnd));
    setInputIfExists('prok_after_start', timeStr(prokAfterStart));
    setInputIfExists('prok_after_end', timeStr(prokAfterEnd));
    setInputIfExists('prok_service_start', timeStr(prokServiceStart));
    setInputIfExists('prok_service_end', timeStr(prokServiceEnd));

    setInputIfExists('ai_date', dateStr);
    setInputIfExists('ai_time', timeStr(now));
    setInputIfExists('arr_street_date', dateStr);
    setInputIfExists('arr_street_time', timeStr(arrStart));
}

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    btnElement.classList.add('active'); document.getElementById('tab_' + tabId).classList.add('active');
}

function clearFields() {
    if (confirm("Είστε σίγουροι; Θα διαγραφούν ΟΛΑ τα στοιχεία προσώπου και ό,τι κείμενο έχετε πληκτρολογήσει.")) {
        document.getElementById("pol_data").value = "";
        let inputs = document.querySelectorAll('.grid-form input:not([id^="cfg_"]):not([id^="doc_"]):not([id="gemini_api_key"]), .tab-content textarea, .ai-grid input, .arrest-grid input, #ai_law, #apologia_rights, #apologia_past');
        inputs.forEach(input => { input.value = ""; input.classList.remove("input-error"); });
        document.getElementById("apologia_rights").value = "Όχι."; document.getElementById("apologia_past").value = "Όχι, δεν έχω κατηγορηθεί ξανά.";
        clearMem();
    }
}

function toTitleCaseWords(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .split(/([ '\-])/)
        .map(part => {
            if (!part || /^[ '\-]$/.test(part)) return part;
            if (part.toUpperCase() === "Α.Τ.") return "Α.Τ.";
            if (part.toUpperCase() === "Τ.Α.") return "Τ.Α.";
            return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join("");
}

function parsePOL() {
    var rawTxt = document.getElementById("pol_data").value;
    if (!rawTxt) { alert("Παρακαλώ επικολλήστε τα στοιχεία."); return; }
    var txt = rawTxt.replace(/[\n\r\t\u00A0]+/g, " ").replace(/\s+/g, " ");
    function extract(regex) { var m = txt.match(regex); return m && m[1] ? m[1].trim() : ""; }

    document.getElementById("gender").value = (/Γυναίκα/i.test(txt) || /ΓΥΝΑΙΚΑ/i.test(txt)) ? "F" : "M";

    let surname = extract(/Επώνυμο(.*?)\s*Επώνυμο \(Λατιν\.\)/) || extract(/Επώνυμο(.*?)\s*Όνομα/);
    let name = extract(/Όνομα(.*?)\s*Όνομα \(Λατιν\.\)/) || extract(/Όνομα(.*?)\s*Όνομα Πατρός/);
    let father = extract(/Όνομα Πατρός(.*?)\s*Όνομα Πατέρα \(Λατιν\.\)/) || extract(/Όνομα Πατρός(.*?)\s*Επώνυμο Πατρός/);
    let mother = extract(/Όνομα Μητρός(.*?)\s*Επώνυμο Μητρός/).replace(/[a-zA-Z]/g, '').trim();
    let dobMatch = txt.match(/Ημ\/νία Γέννησης\s*(\d{2}\/\d{2}\/\d{4})/);
    let pobFull = extract(/Τόπος Γέννησης(.*?)(?:Χώρα Γέννησης|Υπηρεσία χρέωσης)/).replace(/[a-zA-Z]/g, '').trim();
    let authDateMatch = txt.match(/Ημ\/νια Έκδοσης\s*(\d{2}\/\d{2}\/\d{4})/);
    let authFull = extract(/Αρχή Έκδοσης(.*?)\s*Ημ\/νια Έκδοσης/).replace(/^\d+\s*-\s*/, "");
    let dimosFull = extract(/Δημότης(.*?)\s*Αριθμός Δημοτολογίου/);
    let dimos = dimosFull ? dimosFull.split(" ")[0] + (dimosFull.split(" ")[1] ? " " + dimosFull.split(" ")[1] : "") : "";
    let arithmosMatch = txt.match(/Οδός.*?Αριθμός(.*?)\s*(?:Ταχ\.Κώδικας|Τηλέφωνο|Άλλα)/);
    let phoneMatch = txt.match(/Τηλέφωνο\s*(\d{10})/);
    let cleanTxtForAdt = txt.replace(/Αντικατάστασης\s*[Α-ΩA-Z0-9]+/g, "");
    let adts = cleanTxtForAdt.match(/[Α-ΩA-Z]{1,3}\d{5,8}/g);

    let pobClean = pobFull.split(',')[0].trim() || pobFull.trim();
    let areaClean = extract(/Περιοχή(.*?)\s*Οδός/);
    let odosClean = extract(/Οδός(.*?)\s*Αριθμός/);

    document.getElementById("surname").value = (surname || "").toUpperCase();
    document.getElementById("name").value = toTitleCaseWords(name);
    document.getElementById("father").value = toTitleCaseWords(father);
    document.getElementById("mother").value = toTitleCaseWords(mother);
    document.getElementById("dob").value = dobMatch ? dobMatch[1].replace(/\//g, "-") : "";
    document.getElementById("pob").value = toTitleCaseWords(pobClean);
    document.getElementById("area").value = toTitleCaseWords(areaClean);
    document.getElementById("dimos").value = toTitleCaseWords(dimos);
    document.getElementById("odos").value = toTitleCaseWords(odosClean);
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

function getProfileTextGen() {
    let v = id => document.getElementById(id) ? document.getElementById(id).value.trim() : "";
    let s_gen = v("surname_gen") || v("surname");
    let n_gen = v("name_gen") || v("name");
    let text = `${s_gen} ${n_gen} του ${v("father")} και της ${v("mother")}, γεν. ${v("dob")} στην ${v("pob")}, κατοίκου ${v("area")}, Δήμου ${v("dimos")}`;
    if (v("odos")) text += `, οδός ${v("odos")}`;
    if (v("arithmos")) text += `, αρ. ${v("arithmos")}`;
    if (v("epaggelma")) text += `, επαγγέλματος ${v("epaggelma")}`;
    text += `, κατόχου του υπ' αριθ. ${v("adt")} δελτίου ταυτότητας, εκδ. ${v("authDate")} από ${v("auth")}`;
    if (v("afm") || v("doy")) text += `, με Α.Φ.Μ. ${v("afm")} από Δ.Ο.Υ. ${v("doy")}`;
    if (v("phone")) text += `, κατόχου της με αριθμό ${v("phone")} σύνδεσης κινητής τηλεφωνίας`;
    if (v("email")) text += `, καθώς και της διεύθυνσης ηλεκτρονικού ταχυδρομείου (email) ${v("email")}`;
    return text.replace(/\s+/g, ' ').replace(/ ,/g, ',');
}

function getProfileTextAcc() {
    let v = id => document.getElementById(id) ? document.getElementById(id).value.trim() : "";
    let s_acc = v("surname_acc") || v("surname");
    let n_acc = v("name_acc") || v("name");
    let text = `${s_acc} ${n_acc} του ${v("father")} και της ${v("mother")}, γεν. ${v("dob")} στην ${v("pob")}, κάτοικο ${v("area")}, Δήμου ${v("dimos")}`;
    if (v("odos")) text += `, οδό ${v("odos")}`;
    if (v("arithmos")) text += `, αρ. ${v("arithmos")}`;
    if (v("epaggelma")) text += `, επάγγελμα ${v("epaggelma")}`;
    text += `, κάτοχο του υπ' αριθ. ${v("adt")} δελτίου ταυτότητας, εκδ. ${v("authDate")} από ${v("auth")}`;
    if (v("afm") || v("doy")) text += `, με Α.Φ.Μ. ${v("afm")} από Δ.Ο.Υ. ${v("doy")}`;
    if (v("phone")) text += `, κάτοχο της με αριθμό ${v("phone")} σύνδεσης κινητής τηλεφωνίας`;
    if (v("email")) text += `, καθώς και της διεύθυνσης ηλεκτρονικού ταχυδρομείου (email) ${v("email")}`;
    return text.replace(/\s+/g, ' ').replace(/ ,/g, ',');
}

function copyProfileText() {
    let text = getProfileText();
    if(!text || text.trim().length < 10) { alert("Δεν υπάρχουν επαρκή στοιχεία για αντιγραφή."); return; }
    navigator.clipboard.writeText(text).then(() => { alert("Τα στοιχεία αντιγράφηκαν επιτυχώς στο πρόχειρο!"); })
    .catch(err => { alert("Σφάλμα κατά την αντιγραφή: " + err); });
}
