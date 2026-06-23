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
    if (panel.style.display === "none") { panel.style.display = "block"; arrow.textContent = "⬆️ Κλείσιμο"; }
    else { panel.style.display = "none"; arrow.textContent = "⬇️ Άνοιγμα"; }
}

function toggleStep(contentId, arrowId) {
    let content = document.getElementById(contentId);
    let arrow = document.getElementById(arrowId);
    if (!content || !arrow) return;
    if (content.style.display === "none") {
        content.style.display = "block";
        arrow.textContent = "⬆️ Κλείσιμο";
    } else {
        content.style.display = "none";
        arrow.textContent = "⬇️ Άνοιγμα";
    }
}

function toggleGlobalAI() {
    let aiEnabled = localStorage.getItem("ai_enabled") !== "false";
    aiEnabled = !aiEnabled;
    localStorage.setItem("ai_enabled", aiEnabled.toString());
    applyGlobalAIState();
}

function applyGlobalAIState() {
    let aiEnabled = localStorage.getItem("ai_enabled") !== "false";
    let btn = document.getElementById("toggleAIBtn");
    if(btn) {
        btn.innerText = aiEnabled ? "🤖 AI: ON" : "🤖 AI: OFF";
        btn.style.backgroundColor = aiEnabled ? "#ff9800" : "#6c757d";
    }
    
    let privacyBanner = document.getElementById("privacy_banner");
    if(privacyBanner) {
        privacyBanner.style.display = aiEnabled ? "" : "none";
    }
    
    let aiButtons = document.querySelectorAll(".btn-ai");
    aiButtons.forEach(b => {
        if(b.id !== 'btn_tonismos') {
            b.style.display = aiEnabled ? "" : "none";
        }
    });

    let undoButtons = document.querySelectorAll(".btn-undo");
    undoButtons.forEach(b => {
        b.style.display = aiEnabled ? "" : "none";
    });

    let aiBoxes = document.querySelectorAll(".ai-box");
    aiBoxes.forEach(b => {
        b.style.display = aiEnabled ? "" : "none";
    });

    let infoTonismos = document.getElementById("info_tonismos");
    if(infoTonismos) {
        if (aiEnabled) {
            infoTonismos.innerHTML = '<strong>💡 ΝΕΟ:</strong> Πατήστε το "AI Τονισμός" για να διορθωθούν αυτόματα τα κεφαλαία-πεζά και οι τόνοι!';
            infoTonismos.style.display = '';
        } else {
            infoTonismos.innerHTML = '<strong>💡 INFO:</strong> Πατήστε "Τοπικός Τονισμός" για αυτόματη διόρθωση βάσει του προσωπικού σας λεξικού.';
        }
    }

    let btnTonismos = document.getElementById("btn_tonismos");
    if (btnTonismos) {
        btnTonismos.innerHTML = aiEnabled 
            ? '<span id="spin_tonismos" class="spinner" style="display:none;"></span>✨ AI Τονισμός' 
            : '<span id="spin_tonismos" class="spinner" style="display:none;"></span>📘 Αυτόματος Τονισμός (Χωρίς AI)';
        btnTonismos.style.backgroundColor = aiEnabled ? "" : "#17a2b8";
        btnTonismos.style.color = aiEnabled ? "" : "white";
    }
}

function saveSettingsField(el) {
    if (!el || !el.id) return;
    localStorage.setItem(el.id, el.value);
    if (el.id === 'cfg_officers' && el.value.trim() !== "") {
        populateOfficers(el.value.trim());
    }
}

function loadGlobalSettings() {
    applyGlobalAIState();
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
    sel1.innerHTML = ''; sel2.innerHTML = '';
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
function saveMem(id) { 
    let el = document.getElementById(id);
    if(el) {
        localStorage.setItem('mem_' + id, el.value); 
        el.style.border = '1px solid #ccc';
    }
}
function loadMem(id) { let saved = localStorage.getItem('mem_' + id); if (saved !== null) { document.getElementById(id).value = saved; } }
function clearMem() {
    Object.keys(localStorage).forEach(k => { if (k.startsWith('mem_') && k !== 'mem_doc_anakr' && k !== 'mem_doc_banakr') localStorage.removeItem(k); });
    window.originalTexts = {};
    window.undoStacks = {};
}

function undoText(elementId) {
    let tArea = document.getElementById(elementId);
    if (!tArea) return;
    
    // First try template undo stack
    if (window.undoStacks && window.undoStacks[elementId] && window.undoStacks[elementId].length > 0) {
        let lastText = window.undoStacks[elementId].pop();
        tArea.value = lastText;
        if(typeof saveMem === 'function') saveMem(elementId);
        return;
    }
    
    // Fallback to AI original text
    if (window.originalTexts && window.originalTexts[elementId]) { 
        tArea.value = window.originalTexts[elementId]; 
        saveMem(elementId); 
        return;
    } 
    
    alert("Δεν υπάρχει προηγούμενο κείμενο για αναίρεση.");
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
    container.innerHTML = '';

    // First item
    const mainItem = document.createElement("div");
    mainItem.className = "dv-item large";

    const headerDiv = document.createElement("div");
    headerDiv.style.display = "flex";
    headerDiv.style.gap = "5px";
    headerDiv.style.marginBottom = "5px";

    const mainLabel = document.createElement("label");
    mainLabel.style.fontSize = "14px";
    mainLabel.style.color = "#0056b3";
    mainLabel.style.display = "block";
    mainLabel.style.fontWeight = "bold";
    mainLabel.style.flex = "1";
    mainLabel.textContent = "ΕΡΩΤΗΣΗ: Τι προσήλθατε να καταθέσετε στην Υπηρεσία μας; *";
    headerDiv.appendChild(mainLabel);

    const refBtn = document.createElement("button");
    refBtn.className = "btn-ai";
    refBtn.style.width = "auto";
    refBtn.style.padding = "4px 8px";
    refBtn.style.fontSize = "11px";
    refBtn.id = "btn_ref_dv";
    refBtn.onclick = function() { refineTextAI('dv_q_main', 'spin_ref_dv', 'btn_ref_dv'); };

    const spinSpan = document.createElement("span");
    spinSpan.id = "spin_ref_dv";
    spinSpan.className = "spinner";
    spinSpan.style.display = "none";
    refBtn.appendChild(spinSpan);
    refBtn.appendChild(document.createTextNode("✨ Διόρθωση AI"));
    headerDiv.appendChild(refBtn);

    const undoBtn = document.createElement("button");
    undoBtn.className = "btn-undo";
    undoBtn.onclick = function() { undoText('dv_q_main'); };
    undoBtn.textContent = "↩️ Αναίρεση";
    headerDiv.appendChild(undoBtn);

    mainItem.appendChild(headerDiv);

    const mainTextarea = document.createElement("textarea");
    mainTextarea.id = "dv_q_main";
    mainTextarea.placeholder = "Περιγράψτε το αρχικό ιστορικό...";
    mainTextarea.style.height = "100px";
    mainTextarea.oninput = function() { saveMem(this.id); };
    mainItem.appendChild(mainTextarea);

    const ruleDivContainer = document.createElement("div");
    ruleDivContainer.style.marginTop = "10px";
    ruleDivContainer.style.marginBottom = "20px";

    const ruleBtn = document.createElement("button");
    ruleBtn.className = "btn-ai";
    ruleBtn.id = "btn_check_rule_dv";
    ruleBtn.onclick = function() { checkGoldenRule('dv_q_main', 'ai_golden_rule_result_dv', 'spinner_rule_dv', 'btn_check_rule_dv'); };

    const ruleSpin = document.createElement("span");
    ruleSpin.id = "spinner_rule_dv";
    ruleSpin.className = "spinner";
    ruleSpin.style.display = "none";
    ruleBtn.appendChild(ruleSpin);
    ruleBtn.appendChild(document.createTextNode("✨ AI Έλεγχος \"Χρυσού Κανόνα\" "));

    const ruleInfo = document.createElement("span");
    ruleInfo.style.fontWeight = "normal";
    ruleInfo.style.fontSize = "11px";
    ruleInfo.textContent = "(Ποιος, Πού, Πότε, Τι, Γιατί)";
    ruleBtn.appendChild(ruleInfo);

    ruleDivContainer.appendChild(ruleBtn);

    const ruleResDiv = document.createElement("div");
    ruleResDiv.id = "ai_golden_rule_result_dv";
    ruleResDiv.className = "ai-result";
    ruleResDiv.style.display = "none";
    ruleDivContainer.appendChild(ruleResDiv);

    mainItem.appendChild(ruleDivContainer);
    container.appendChild(mainItem);

    // Question items
    dvQuestions.forEach((q, index) => {
        const item = document.createElement("div");
        item.className = "dv-item";
        const label = document.createElement("label");
        label.textContent = `ΕΡΩΤΗΣΗ: ${q}`;
        item.appendChild(label);
        const textarea = document.createElement("textarea");
        textarea.id = `dv_q_${index}`;
        textarea.oninput = function() { saveMem(this.id); };
        item.appendChild(textarea);
        container.appendChild(item);
    });

    // Last item
    const lastItem = document.createElement("div");
    lastItem.className = "dv-item";
    const lastLabel = document.createElement("label");
    lastLabel.textContent = "ΕΡΩΤΗΣΗ: Έχετε να προσθέσετε κάτι άλλο;";
    lastItem.appendChild(lastLabel);
    const lastTextarea = document.createElement("textarea");
    lastTextarea.id = "dv_q_last";
    lastTextarea.oninput = function() { saveMem(this.id); };
    lastTextarea.value = "Επιθυμώ την ποινική δίωξη του δράστη...";
    lastItem.appendChild(lastTextarea);
    container.appendChild(lastItem);

    loadMem("dv_q_main");
    dvQuestions.forEach((q, i) => loadMem("dv_q_" + i));
    loadMem("dv_q_last");
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

    // Ώρες για τις ενέργειες στο δρόμο πριν τη σύνταξη της έκθεσης κατασχεσης
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

// Αλγόριθμος κλίσης Ελληνικών Ονομάτων (χωρίς χρήση ΑΙ)
function declineGreek(word, gender, targetCase, isSurname = false) {
    if (!word) return "";
    let w = word.trim();
    
    if (gender === 'M') {
        if (targetCase === 'gen') {
            if (w.endsWith('ΟΣ')) return w.replace(/ΟΣ$/, 'ΟΥ');
            if (w.endsWith('ος')) return w.replace(/ος$/, 'ου');
            if (w.endsWith('ΗΣ')) return w.replace(/Σ$/, '');
            if (w.endsWith('ης')) return w.replace(/ς$/, '');
            if (w.endsWith('ΑΣ')) return w.replace(/Σ$/, '');
            if (w.endsWith('ας')) return w.replace(/ς$/, '');
            if (w.endsWith('ΕΣ')) return w.replace(/Σ$/, '');
            if (w.endsWith('ες')) return w.replace(/ς$/, '');
            if (w.endsWith('Σ') || w.endsWith('ς')) return w.slice(0, -1);
        } else if (targetCase === 'acc') {
            if (w.endsWith('ΟΣ')) return w.replace(/ΟΣ$/, 'Ο');
            if (w.endsWith('ος')) return w.replace(/ος$/, 'ο');
            if (w.endsWith('ΗΣ')) return w.replace(/Σ$/, '');
            if (w.endsWith('ης')) return w.replace(/ς$/, '');
            if (w.endsWith('ΑΣ')) return w.replace(/Σ$/, '');
            if (w.endsWith('ας')) return w.replace(/ς$/, '');
            if (w.endsWith('ΕΣ')) return w.replace(/Σ$/, '');
            if (w.endsWith('ες')) return w.replace(/ς$/, '');
            if (w.endsWith('Σ') || w.endsWith('ς')) return w.slice(0, -1);
        }
    } else if (gender === 'F') {
        if (!isSurname) { // Τα γυναικεία επίθετα συνήθως δεν κλίνονται
            if (targetCase === 'gen') {
                if (w.endsWith('Α')) return w + 'Σ';
                if (w.endsWith('α')) return w + 'ς';
                if (w.endsWith('Η')) return w + 'Σ';
                if (w.endsWith('η')) return w + 'ς';
                if (w.endsWith('Ω')) return w + 'Σ';
                if (w.endsWith('ω')) return w + 'ς';
            }
        }
    }
    return w;
}


function getProfileText(caseType = 'nom') {
    let v = id => { let el = document.getElementById(id); return el ? el.value.trim() : ""; };
    
    let genderDropdown = document.getElementById("gender");
    let g = genderDropdown ? genderDropdown.value : 'M'; 

    let surname = declineGreek(v("surname"), g, caseType, true);
    let name = declineGreek(v("name"), g, caseType, false);
    let father = v("father");
    let mother = v("mother");

    let isPol = document.getElementById('is_police') && document.getElementById('is_police').checked;
    
    let katoikosStr = caseType === 'nom' ? 'κάτοικος' : (caseType === 'gen' ? 'κατοίκου' : 'κάτοικο');
    let katoxosStr = caseType === 'nom' ? 'κάτοχος' : (caseType === 'gen' ? 'κατόχου' : 'κάτοχο');
    let uphretonStr = caseType === 'nom' ? (g==='M'?'υπηρετών':'υπηρετούσα') : (caseType === 'gen' ? (g==='M'?'υπηρετούντος':'υπηρετούσας') : (g==='M'?'υπηρετούντα':'υπηρετούσα'));

    let isFor = document.getElementById('is_foreigner') && document.getElementById('is_foreigner').checked;
    
    let natStr = "";
    if (isFor && v("nationality")) {
        natStr = `, υπήκοος ${v("nationality")}`;
    }

    let pobStr = isFor && v("born_country") ? v("born_country") : v("pob");

    let text = `${surname} ${name} του ${father} και της ${mother}, γεν. ${v("dob")} στην ${pobStr}${natStr}`;
    
    if (isPol) {
        text += `, ${uphretonStr} στο ${v("area")}`;
    } else {
        text += `, ${katoikosStr} ${v("area")}, Δήμου ${v("dimos")}`;
        if (v("odos")) text += `, οδός ${v("odos")}`;
        if (v("arithmos")) text += `, αρ. ${v("arithmos")}`;
    }
    
    if (v("epaggelma")) text += `, επάγγελμα ${v("epaggelma")}`;
    
    if (isFor && v("passport")) {
        text += `, ${katoxosStr} του υπ' αριθ. ${v("passport")} διαβατηρίου / ταξιδιωτικού εγγράφου`;
    } else if (isPol) {
        text += `, ${katoxosStr} της υπ' αριθ. ${v("adt")} υπηρεσιακής ταυτότητας`;
    } else {
        text += `, ${katoxosStr} του υπ' αριθ. ${v("adt")} δελτίου ταυτότητας, εκδ. ${v("authDate")} από ${v("auth")}`;
    }

    if (!isPol && (v("afm") || v("doy"))) text += `, με Α.Φ.Μ. ${v("afm")} από Δ.Ο.Υ. ${v("doy")}`;
    if (v("phone")) text += `, ${katoxosStr} της με αριθμό ${v("phone")} σύνδεσης κινητής τηλεφωνίας`;
    if (v("email")) text += `, καθώς και της διεύθυνσης ηλεκτρονικού ταχυδρομείου (email) ${v("email")}`;
    
    return text.replace(/\s+/g, ' ').replace(/ ,/g, ',');
}

function copyProfileText() {
    let text = getProfileText('nom'); 
    if(!text || text.trim().length < 10) { alert("Δεν υπάρχουν επαρκή στοιχεία για αντιγραφή."); return; }
    navigator.clipboard.writeText(text).then(() => { alert("Τα στοιχεία αντιγράφηκαν επιτυχώς στο πρόχειρο!"); })
    .catch(err => { alert("Σφάλμα κατά την αντιγραφή: " + err); });
}
// ==========================================
// ΣΥΣΤΗΜΑ ΑΠΟΘΗΚΕΥΣΗΣ & ΦΟΡΤΩΣΗΣ ΥΠΟΘΕΣΕΩΝ (ΟΛΙΚΗ ΣΑΡΩΣΗ DOM)
// ==========================================
function exportCaseData() {
    let data = {};
    
    // 1. Σάρωση όλων των πεδίων της οθόνης
    let elements = document.querySelectorAll('input, textarea, select');
    elements.forEach(el => {
        if (el.id && el.id !== "gemini_api_key" && el.id !== "import_case_file" && el.id !== "import_settings_file") {
            data["dom_" + el.id] = el.type === 'checkbox' ? el.checked : el.value;
        }
    });
    
    // 2. Σάρωση της μνήμης για την τρέχουσα υπόθεση (mem_)
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("mem_")) {
            data["ls_" + key] = localStorage.getItem(key);
        }
    }

    let blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    
    let d = new Date();
    let dateStr = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,'0') + "-" + String(d.getDate()).padStart(2,'0');
    let surname = document.getElementById("surname") ? document.getElementById("surname").value.trim() : "ΚΕΝΟ";
    if (!surname) surname = "ΚΕΝΟ";
    
    a.href = url;
    a.download = `Υπόθεση_${surname}_${dateStr}.json`;
    a.click();
}

function importCaseData(event) {
    let file = event.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            
            // Καθαρισμός προηγούμενης μνήμης συμβάντος
            Object.keys(localStorage).forEach(k => {
                if (k.startsWith('mem_')) localStorage.removeItem(k);
            });

            // Γέμισμα όλων των πεδίων
            for (let key in data) {
                if (key.startsWith("ls_mem_")) {
                    localStorage.setItem(key.substring(3), data[key]);
                } else if (key.startsWith("dom_")) {
                    let id = key.substring(4);
                    let el = document.getElementById(id);
                    if (el) {
                        if (el.type === 'checkbox') {
                            el.checked = data[key];
                        } else {
                            el.value = data[key];
                        }
                    }
                }
            }
            
            // Ενημέρωση UI αν πρόκειται για ναρκωτικά
            toggleDrugPanels();
            
            alert("Η υπόθεση φορτώθηκε επιτυχώς! (Τα πρότυπα και το λεξικό σας δεν επηρεάστηκαν)");
        } catch(err) {
            alert("Σφάλμα κατά την ανάγνωση του αρχείου Υπόθεσης JSON.");
        }
        event.target.value = ""; // Επαναφορά
    };
    reader.readAsText(file);
}

function exportSettingsData() {
    let data = {};
    const globalKeys = ["proanakrisi_dict", "police_officers", "person_profiles", "report_text_templates"];
    
    globalKeys.forEach(k => {
        let val = localStorage.getItem(k);
        if (val !== null) data["ls_" + k] = val;
    });

    let blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    
    let d = new Date();
    let dateStr = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,'0') + "-" + String(d.getDate()).padStart(2,'0');
    
    a.href = url;
    a.download = `Ρυθμίσεις_Προανάκρισης_${dateStr}.json`;
    a.click();
}

function importSettingsData(event) {
    let file = event.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            
            for (let key in data) {
                if (key.startsWith("ls_")) {
                    localStorage.setItem(key.substring(3), data[key]);
                }
            }
            
            // Refresh UI components that use global settings
            if (typeof renderSavedPolice === 'function') renderSavedPolice();
            if (typeof renderSavedPersons === 'function') renderSavedPersons();
            // Since template tabs might need refreshing, ideally we just reload them if needed.
            // A simple page reload could be recommended:
            if(confirm("Οι ρυθμίσεις, τα πρότυπα, το λεξικό και οι αστυνομικοί φορτώθηκαν επιτυχώς! Θέλετε να ανανεωθεί η σελίδα για να εφαρμοστούν σωστά όλα τα πρότυπα; (Συνιστάται)")) {
                window.location.reload();
            }
        } catch(err) {
            alert("Σφάλμα κατά την ανάγνωση του αρχείου Ρυθμίσεων JSON.");
        }
        event.target.value = "";
    };
    reader.readAsText(file);
}

// ==========================================
// ΣΥΣΤΗΜΑ DARK MODE
// ==========================================
function toggleDarkMode() {
    const body = document.body;
    // Ενεργοποιεί ή απενεργοποιεί την κλάση dark-mode
    body.classList.toggle('dark-mode');
    
    // Ελέγχει αν είναι ενεργό το σκοτεινό θέμα
    const isDark = body.classList.contains('dark-mode');
    
    // Αποθήκευση της προτίμησης στη μνήμη
    localStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
    
    // Αλλαγή του κειμένου και του εικονιδίου στο κουμπί
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        btn.textContent = isDark ? '☀️ Φωτεινό' : '🌙 Σκοτεινό';
    }
}

// Όταν φορτώνει η σελίδα, έλεγξε τι είχε επιλέξει ο χρήστης την τελευταία φορά
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme_preference');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('darkModeBtn');
        // Βάζουμε ένα μικρό delay για να προλάβει να φορτώσει το κουμπί στο DOM
        setTimeout(() => {
            if (document.getElementById('darkModeBtn')) {
                document.getElementById('darkModeBtn').textContent = '☀️ Φωτεινό';
            }
        }, 100);
    }
});

// ==========================================
// ΤΟΠΙΚΟ ΣΥΣΤΗΜΑ ΤΟΝΙΣΜΟΥ (OFFLINE DICTIONARY)
// ==========================================
const defaultAccentDict = {
    "ΓΕΩΡΓΙΟΣ": "Γεώργιος", "ΚΩΝΣΤΑΝΤΙΝΟΣ": "Κωνσταντίνος", "ΙΩΑΝΝΗΣ": "Ιωάννης", "ΔΗΜΗΤΡΙΟΣ": "Δημήτριος",
    "ΝΙΚΟΛΑΟΣ": "Νικόλαος", "ΠΑΝΑΓΙΩΤΗΣ": "Παναγιώτης", "ΒΑΣΙΛΕΙΟΣ": "Βασίλειος", "ΧΡΗΣΤΟΣ": "Χρήστος",
    "ΑΘΑΝΑΣΙΟΣ": "Αθανάσιος", "ΜΙΧΑΗΛ": "Μιχαήλ", "ΕΥΑΓΓΕΛΟΣ": "Ευάγγελος", "ΣΠΥΡΙΔΩΝ": "Σπυρίδων",
    "ΑΝΤΩΝΙΟΣ": "Αντώνιος", "ΜΑΡΙΑ": "Μαρία", "ΕΛΕΝΗ": "Ελένη", "ΑΙΚΑΤΕΡΙΝΗ": "Αικατερίνη",
    "ΒΑΣΙΛΙΚΗ": "Βασιλική", "ΣΟΦΙΑ": "Σοφία", "ΑΝΑΣΤΑΣΙΑ": "Αναστασία", "ΓΕΩΡΓΙΑ": "Γεωργία",
    "ΕΥΑΓΓΕΛΙΑ": "Ευαγγελία", "ΕΙΡΗΝΗ": "Ειρήνη", "ΑΝΝΑ": "Άννα", "ΠΑΝΑΓΙΩΤΑ": "Παναγιώτα",
    "ΑΘΗΝΑ": "Αθήνα", "ΘΕΣΣΑΛΟΝΙΚΗ": "Θεσσαλονίκη", "ΠΑΤΡΑ": "Πάτρα", "ΗΡΑΚΛΕΙΟ": "Ηράκλειο",
    "ΛΑΡΙΣΑ": "Λάρισα", "ΒΟΛΟΣ": "Βόλος", "ΙΩΑΝΝΙΝΑ": "Ιωάννινα", "ΚΑΒΑΛΑ": "Καβάλα",
    "ΓΕΩΡΓΙΟΥ": "Γεωργίου", "ΚΩΝΣΤΑΝΤΙΝΟΥ": "Κωνσταντίνου", "ΙΩΑΝΝΟΥ": "Ιωάννου", "ΔΗΜΗΤΡΙΟΥ": "Δημητρίου",
    "ΝΙΚΟΛΑΟΥ": "Νικολάου", "ΠΑΝΑΓΙΩΤΟΥ": "Παναγιώτου", "ΒΑΣΙΛΕΙΟΥ": "Βασιλείου", "ΧΡΗΣΤΟΥ": "Χρήστου",
    "ΑΘΑΝΑΣΙΟΥ": "Αθανασίου", "ΜΙΧΑΗΛ": "Μιχαήλ", "ΕΥΑΓΓΕΛΟΥ": "Ευάγγελου", "ΣΠΥΡΙΔΩΝΟΣ": "Σπυρίδωνος",
    "ΑΤΤΙΚΗΣ": "Αττικής", "ΕΛΛΑΔΑ": "Ελλάδα",
    "ΙΩΑΝΝΗ": "Ιωάννη", "ΚΩΝΣΤΑΝΤΙΝΟΥ": "Κωνσταντίνου", "ΔΗΜΗΤΡΙΟΥ": "Δημητρίου", "ΓΕΩΡΓΙΟΥ": "Γεωργίου", 
    "ΝΙΚΟΛΑΟΥ": "Νικολάου", "ΧΡΗΣΤΟΥ": "Χρήστου", "ΒΑΣΙΛΕΙΟΥ": "Βασιλείου", "ΠΑΝΑΓΙΩΤΗ": "Παναγιώτη",
    "ΜΑΡΙΑΣ": "Μαρίας", "ΕΛΕΝΗΣ": "Ελένης", "ΑΙΚΑΤΕΡΙΝΗΣ": "Αικατερίνης", "ΓΕΩΡΓΙΑΣ": "Γεωργίας",
    "ΑΘΗΝΑΣ": "Αθήνας", "ΘΕΣΣΑΛΟΝΙΚΗΣ": "Θεσσαλονίκης", "ΣΕΡΡΩΝ": "Σερρών", "ΛΑΡΙΣΑΣ": "Λάρισας",
    "ΗΡΑΚΛΕΙΟΥ": "Ηρακλείου", "ΒΟΛΟΥ": "Βόλου", "ΠΑΤΡΑΣ": "Πάτρας", "ΒΟΛΟ": "Βόλο", "ΣΤΑΥΡΟ": "Σταυρό",
    "ΜΕΓΑΛΟΥ": "Μεγάλου", "ΑΛΕΞΑΝΔΡΟΥ": "Αλεξάνδρου", "ΑΡΙΣΤΟΤΕΛΟΥΣ": "Αριστοτέλους", "ΡΗΓΑ": "Ρήγα", "ΦΕΡΑΙΟΥ": "Φεραίου",
    "ΜΑΡΙΑΣ": "Μαρίας", "ΕΛΕΝΗΣ": "Ελένης", "ΑΙΚΑΤΕΡΙΝΗΣ": "Αικατερίνης", "ΒΑΣΙΛΙΚΗΣ": "Βασιλικής",
    "ΑΓΙΑ": "Αγία", "ΠΑΡΑΣΚΕΥΗ": "Παρασκευή", "ΑΓΙΟΣ": "Άγιος", "ΝΕΑ": "Νέα", "ΝΕΟ": "Νέο", "ΑΝΩ": "Άνω", "ΚΑΤΩ": "Κάτω"
};

function getLocalDict() {
    let stored = localStorage.getItem('local_accent_dict');
    let dict = stored ? JSON.parse(stored) : {};
    
    // Merge defaultAccentDict to ensure they always have the basics
    let mergedDict = Object.assign({}, defaultAccentDict, dict);
    let newStored = JSON.stringify(mergedDict);
    if (stored !== newStored) {
        localStorage.setItem('local_accent_dict', newStored);
    }
    
    return mergedDict;
}

function exportDictionary() {
    let dict = getLocalDict();
    let exportData = {
        dictionary: dict,
        settings: {
            cfg_city: localStorage.getItem("cfg_city") || "Ασπροβάλτα",
            cfg_dept: localStorage.getItem("cfg_dept") || "Α.Τ. Βόλβης",
            cfg_deptFull: localStorage.getItem("cfg_deptFull") || "Αστυνομικό Τμήμα Βόλβης Θεσσαλονίκης",
            cfg_prosecutor: localStorage.getItem("cfg_prosecutor") || "Εισαγγελέα Πλημμελειοδικών Θεσσαλονίκης",
            cfg_officers: localStorage.getItem("cfg_officers") || defaultOfficers,
            ai_enabled: localStorage.getItem("ai_enabled") !== "false"
        }
    };
    let dataStr = JSON.stringify(exportData, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "proanakrisi_settings.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importDictionary(event) {
    let file = event.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let importedData = JSON.parse(e.target.result);
            
            // Backwards compatibility with files that only had a dictionary
            let importedDict = importedData.dictionary || importedData; 
            
            let currentDict = getLocalDict();
            Object.assign(currentDict, importedDict);
            localStorage.setItem('local_accent_dict', JSON.stringify(currentDict));
            
            let msg = "Το λεξικό ενημερώθηκε επιτυχώς! Πλέον περιέχει " + Object.keys(currentDict).length + " λέξεις.";
            
            if (importedData.settings) {
                if (importedData.settings.cfg_city) localStorage.setItem("cfg_city", importedData.settings.cfg_city);
                if (importedData.settings.cfg_dept) localStorage.setItem("cfg_dept", importedData.settings.cfg_dept);
                if (importedData.settings.cfg_deptFull) localStorage.setItem("cfg_deptFull", importedData.settings.cfg_deptFull);
                if (importedData.settings.cfg_prosecutor) localStorage.setItem("cfg_prosecutor", importedData.settings.cfg_prosecutor);
                if (importedData.settings.cfg_officers) localStorage.setItem("cfg_officers", importedData.settings.cfg_officers);
                if (importedData.settings.ai_enabled !== undefined) localStorage.setItem("ai_enabled", importedData.settings.ai_enabled);
                
                loadGlobalSettings(); // Apply UI changes immediately
                msg += "\nΟι Γενικές Ρυθμίσεις (Υπηρεσία, Προσωπικό, AI) φορτώθηκαν επίσης!";
            }
            
            alert(msg);
        } catch(err) {
            alert("Σφάλμα: Το αρχείο δεν είναι έγκυρο λεξικό/ρυθμίσεις (.json).");
        }
        event.target.value = ""; // Reset input
    };
    reader.readAsText(file);
}

function greekTitleCase(w) {
    if(!w) return '';
    if(w.includes('.')) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

function localTonismos() {
    let fields = ['surname', 'name', 'father', 'mother', 'pob', 'area', 'dimos', 'odos', 'auth'];
    let dict = getLocalDict();
    
    fields.forEach(id => {
        let el = document.getElementById(id);
        if (!el) return;
        let val = el.value.trim();
        if (!val) return;
        
        if (id === 'surname') {
            el.value = val.toUpperCase();
            el.style.border = '';
            el.classList.remove('needs-accent');
            return;
        }

        let words = val.split(/\s+/).filter(w => w.length > 0);
        let allFound = true;
        let newWords = words.map(w => {
            let upper = removeGreekAccents(w);
            
            // Programmatic declension on the unaccented uppercase word FIRST
            upper = declineFieldWord(upper, id);
            
            if (dict[upper]) {
                return dict[upper];
            } else if (upper.includes('.')) {
                return w.toUpperCase(); // Keep acronyms uppercase and don't trigger red border
            } else {
                allFound = false;
                return greekTitleCase(upper); 
            }
        });
        
        el.value = newWords.join(' ');
        if (!allFound) {
            el.style.border = '2px solid red';
            el.classList.add('needs-accent');
        } else {
            el.style.border = '';
            el.classList.remove('needs-accent');
        }
        saveMem(id);
    });
}

function declineFieldWord(w, fieldType) {
    if (!w) return "";
    let lastTwo = w.slice(-2);
    let lastChar = w.slice(-1);
    
    if (fieldType === 'father') {
        if (lastTwo === 'ΟΣ') return w.slice(0, -1) + 'Υ';
        if (lastTwo === 'ΗΣ' || lastTwo === 'ΑΣ') return w.slice(0, -1);
        return w;
    }
    
    if (fieldType === 'mother') {
        if (lastChar === 'Α' || lastChar === 'Η') return w + 'Σ';
        return w;
    }
    
    if (fieldType === 'pob') {
        if (lastTwo === 'ΟΣ') return w.slice(0, -1); 
        return w;
    }
    
    if (fieldType === 'area' || fieldType === 'dimos' || fieldType === 'odos') {
        if (lastTwo === 'ΟΣ') return w.slice(0, -1) + 'Υ';
        if (lastTwo === 'ΕΣ') return w.slice(0, -2) + 'ΩΝ';
        if (lastChar === 'Α' || lastChar === 'Η') return w + 'Σ';
        if (lastChar === 'Ι') return w.slice(0, -1) + 'ΙΟΥ'; 
        return w;
    }
    
    return w;
}

function removeGreekAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function showToast(message) {
    let toast = document.getElementById('toast_notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast_notification';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = '#28a745';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        toast.style.zIndex = '1000';
        toast.style.transition = 'opacity 0.5s ease';
        toast.style.fontWeight = 'bold';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    
    if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(() => {
        toast.style.opacity = '0';
    }, 2500);
}

function setupAutoLearn() {
    let fields = ['surname', 'name', 'father', 'mother', 'pob', 'area', 'dimos', 'odos', 'auth'];
    fields.forEach(id => {
        let el = document.getElementById(id);
        if(!el) return;
        el.addEventListener('blur', function() {
            let val = this.value.trim();
            if(!val) return;
            
            // Check if there's at least one lowercase Greek letter or accent
            if (/[α-ωάέήίόύώϊϋΐΰ]/.test(val)) {
                let words = val.split(/\s+/).filter(w => w.length > 0);
                let dict = getLocalDict();
                let changed = false;
                words.forEach(w => {
                    if (/[α-ωάέήίόύώϊϋΐΰ]/.test(w)) {
                        let cleanUpper = removeGreekAccents(w);
                        // Only set and count as changed if it's a NEW word or different accent
                        if (dict[cleanUpper] !== w) {
                            dict[cleanUpper] = w;
                            changed = true;
                        }
                    }
                });
                if(changed) {
                    localStorage.setItem('local_accent_dict', JSON.stringify(dict));
                    showToast("✅ Αποθηκεύτηκε στο λεξικό!");
                    
                    let originalBg = this.style.backgroundColor;
                    this.style.backgroundColor = '#d4edda';
                    this.style.transition = 'background-color 0.5s';
                    setTimeout(() => {
                        this.style.backgroundColor = originalBg;
                    }, 1000);
                }
                this.style.border = '';
                this.classList.remove('needs-accent');
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", setupAutoLearn);

// --- NEW FEATURES: FOREIGNER & PERSON PROFILES ---

function toggleForeignerFields() {
    const isForeigner = document.getElementById('is_foreigner').checked;
    const fields = document.querySelectorAll('.foreigner-field');
    fields.forEach(f => {
        f.style.display = isForeigner ? 'block' : 'none';
    });
}

function togglePoliceFields() {
    const isPolice = document.getElementById('is_police').checked;
    
    const lblAdt = document.querySelector('label[for="adt"]') || document.getElementById('adt').previousElementSibling;
    const lblArea = document.querySelector('label[for="area"]') || document.getElementById('area').previousElementSibling;
    const lblPhone = document.querySelector('label[for="phone"]') || document.getElementById('phone').previousElementSibling;
    const lblEmail = document.querySelector('label[for="email"]') || document.getElementById('email').previousElementSibling;

    if (isPolice) {
        lblAdt.innerText = "Α.Γ.Μ. / Υπηρεσιακή Ταυτότητα";
        lblArea.innerText = "Υπηρεσία (Γενική)";
        lblPhone.innerText = "Υπηρεσιακό Τηλέφωνο";
        lblEmail.innerText = "Υπηρεσιακό Email";
        
        let epag = document.getElementById('epaggelma');
        if(!epag.value) epag.value = "Αστυνομικός";
    } else {
        lblAdt.innerText = "Α.Δ.Τ.";
        lblArea.innerText = "Περιοχή Κατοικίας (Γενική)";
        lblPhone.innerText = "Τηλέφωνο";
        lblEmail.innerText = "Email";
    }
}

const PERSON_FIELDS = ['gender', 'surname', 'name', 'father', 'mother', 'dob', 'pob', 'area', 'dimos', 'odos', 'arithmos', 'epaggelma', 'adt', 'authDate', 'auth', 'afm', 'doy', 'phone', 'email', 'is_foreigner', 'nationality', 'born_country', 'passport', 'is_police'];

function savePersonProfile(role) {
    let data = {};
    PERSON_FIELDS.forEach(f => {
        let el = document.getElementById(f);
        if (el) {
            if (el.type === 'checkbox') data[f] = el.checked;
            else data[f] = el.value;
        }
    });
    localStorage.setItem('profile_' + role, JSON.stringify(data));
    renderSavedProfiles();
}

function loadPersonProfile(role) {
    let dataStr = localStorage.getItem('profile_' + role);
    if (!dataStr) return;
    let data = JSON.parse(dataStr);
    PERSON_FIELDS.forEach(f => {
        let el = document.getElementById(f);
        if (el && data[f] !== undefined) {
            if (el.type === 'checkbox') el.checked = data[f];
            else el.value = data[f];
        }
    });
    toggleForeignerFields();
}

function deletePersonProfile(role) {
    if(confirm('Διαγραφή του προφίλ: ' + role + '?')) {
        localStorage.removeItem('profile_' + role);
        renderSavedProfiles();
    }
}

function renderSavedProfiles() {
    let container = document.getElementById('saved_profiles_list');
    if(!container) return;
    container.innerHTML = '';
    let roles = ['Μάρτυρας', 'Κατηγορούμενος', 'Διερμηνέας'];
    let count = 0;
    roles.forEach(role => {
        if (localStorage.getItem('profile_' + role)) {
            count++;
            let data = JSON.parse(localStorage.getItem('profile_' + role));
            let name = data.surname ? data.surname + ' ' + (data.name ? data.name.charAt(0)+'.' : '') : role;
            
            let chip = document.createElement('div');
            chip.style = 'display: inline-flex; align-items: center; background: #e9ecef; border: 1px solid #ced4da; border-radius: 16px; padding: 4px 10px; font-size: 13px; cursor: pointer;';
            
            let loadBtn = document.createElement('span');
            loadBtn.innerText = role + ' (' + name + ')';
            loadBtn.onclick = function() { loadPersonProfile(role); };
            loadBtn.title = 'Φόρτωση στη φόρμα';
            
            let delBtn = document.createElement('span');
            delBtn.innerHTML = ' &times;';
            delBtn.style = 'color: #dc3545; font-weight: bold; margin-left: 5px; cursor: pointer;';
            delBtn.title = 'Διαγραφή';
            delBtn.onclick = function(e) { e.stopPropagation(); deletePersonProfile(role); };
            
            chip.appendChild(loadBtn);
            chip.appendChild(delBtn);
            container.appendChild(chip);
        }
    });
    
    if(count === 0) {
        container.innerHTML = '<span style="font-size: 12px; color: #888; font-style: italic;">Δεν υπάρχουν αποθηκευμένα πρόσωπα.</span>';
    }
}

function getSavedPoliceOfficers() {
    let str = localStorage.getItem('police_officers');
    if(!str) return [];
    return JSON.parse(str);
}

function savePoliceOfficer() {
    let dept = document.getElementById('police_dept_select').value;
    let data = {};
    PERSON_FIELDS.forEach(f => {
        let el = document.getElementById(f);
        if (el) {
            if (el.type === 'checkbox') data[f] = el.checked;
            else data[f] = el.value;
        }
    });
    
    if(!data.surname || !data.name) {
        alert("Συμπληρώστε τουλάχιστον Επώνυμο και Όνομα!");
        return;
    }
    
    data.id = Date.now().toString();
    data.police_dept = dept;
    // ensure is_police is true for them
    data.is_police = true; 
    
    let officers = getSavedPoliceOfficers();
    officers.push(data);
    localStorage.setItem('police_officers', JSON.stringify(officers));
    
    renderSavedPolice();
}

function loadPoliceOfficer(id) {
    let officers = getSavedPoliceOfficers();
    let data = officers.find(o => o.id === id);
    if(!data) return;
    
    PERSON_FIELDS.forEach(f => {
        let el = document.getElementById(f);
        if (el && data[f] !== undefined) {
            if (el.type === 'checkbox') el.checked = data[f];
            else el.value = data[f];
        }
    });
    
    toggleForeignerFields();
    togglePoliceFields();
}

function deletePoliceOfficer(id) {
    if(confirm('Διαγραφή αυτού του Αστυνομικού;')) {
        let officers = getSavedPoliceOfficers();
        officers = officers.filter(o => o.id !== id);
        localStorage.setItem('police_officers', JSON.stringify(officers));
        renderSavedPolice();
    }
}

function renderSavedPolice() {
    let container = document.getElementById('saved_police_list');
    if(!container) return;
    
    let officers = getSavedPoliceOfficers();
    container.innerHTML = '';
    
    if(officers.length === 0) {
        container.innerHTML = '<span style="font-size: 12px; color: #888; font-style: italic;">Δεν υπάρχουν αποθηκευμένοι αστυνομικοί.</span>';
        return;
    }
    
    // Group by dept
    let grouped = {};
    officers.forEach(o => {
        if(!grouped[o.police_dept]) grouped[o.police_dept] = [];
        grouped[o.police_dept].push(o);
    });
    
    Object.keys(grouped).forEach(dept => {
        let groupDiv = document.createElement('div');
        groupDiv.style = "width: 100%; margin-bottom: 5px;";
        groupDiv.innerHTML = `<div style="font-size: 12px; font-weight: bold; color: #004085; margin-bottom: 3px;">📍 ${dept}</div>`;
        
        let chipsDiv = document.createElement('div');
        chipsDiv.style = "display: flex; gap: 6px; flex-wrap: wrap;";
        
        grouped[dept].forEach(o => {
            let name = o.surname + ' ' + (o.name ? o.name.charAt(0)+'.' : '');
            let chip = document.createElement('div');
            chip.style = 'display: inline-flex; align-items: center; background: #cce5ff; border: 1px solid #b8daff; border-radius: 16px; padding: 4px 10px; font-size: 13px; cursor: pointer; color: #004085;';
            
            let loadBtn = document.createElement('span');
            loadBtn.innerText = name;
            loadBtn.onclick = function() { loadPoliceOfficer(o.id); };
            loadBtn.title = 'Φόρτωση Αστυνομικού στη φόρμα';
            
            let delBtn = document.createElement('span');
            delBtn.innerHTML = ' &times;';
            delBtn.style = 'color: #dc3545; font-weight: bold; margin-left: 5px; cursor: pointer;';
            delBtn.title = 'Διαγραφή Αστυνομικού';
            delBtn.onclick = function(e) { e.stopPropagation(); deletePoliceOfficer(o.id); };
            
            chip.appendChild(loadBtn);
            chip.appendChild(delBtn);
            chipsDiv.appendChild(chip);
        });
        
        groupDiv.appendChild(chipsDiv);
        container.appendChild(groupDiv);
    });
}

// ==========================================
// ΣΥΣΤΗΜΑ ΠΡΟΤΥΠΩΝ (CUSTOM TEMPLATES)
// ==========================================
function initTemplates(textareaId, categoryName) {
    let containerId = "tpl_container_" + textareaId;
    let container = document.getElementById(containerId);
    if (!container) return;

    let templates = JSON.parse(localStorage.getItem('custom_templates_' + categoryName)) || {};
    
    // Add default templates if empty
    if (Object.keys(templates).length === 0 && categoryName === 'testimony') {
        templates = {
            "Σύλληψη σε περιπολία": "Σήμερα και περί ώρα [ΩΡΑ] στα πλαίσια της υπηρεσίας μας, ",
            "Μετάβαση μετά από σήμα R/T": "Σήμερα και περί ώρα [ΩΡΑ] κατόπιν σήματος του Κέντρου (R/T), μεταβήκαμε ",
            "Αναφορά / Συνεχιζόμενη Έρευνα": "Αναφέρω ότι στα πλαίσια συνεχιζόμενης έρευνας της Υπηρεσίας μας, "
        };
        localStorage.setItem('custom_templates_' + categoryName, JSON.stringify(templates));
    }

    let selectHtml = `<select id="tpl_select_${textareaId}" style="padding: 4px; border-radius: 4px; font-size: 12px; border: 1px solid #ccc; max-width: 180px;">
                        <option value="">-- Επιλογή Προτύπου --</option>`;
    for (let title in templates) {
        selectHtml += `<option value="${title}">${title}</option>`;
    }
    selectHtml += `</select>`;

    container.innerHTML = `
        <div style="display: flex; gap: 5px; align-items: center; flex-wrap: nowrap; overflow-x: auto;">
            <span style="font-size: 12px; font-weight: bold; color: #1a365d; white-space: nowrap;">🔖 Πρότυπα:</span>
            ${selectHtml}
            <button onclick="applyTemplate('${textareaId}', '${categoryName}')" class="btn-tpl" style="border: none; border-radius: 4px; cursor: pointer; margin-top: 0; padding: 4px 8px; font-size: 11px; background-color: #607d8b; color: white; white-space: nowrap;">Εισαγωγή</button>
            <button onclick="saveTemplate('${textareaId}', '${categoryName}')" class="btn-tpl" style="border: none; border-radius: 4px; cursor: pointer; background-color: #28a745; margin-top: 0; padding: 4px 8px; font-size: 11px; color: white; white-space: nowrap;">💾 Αποθήκ.</button>
            <button onclick="deleteTemplate('${textareaId}', '${categoryName}')" class="btn-tpl" style="border: none; border-radius: 4px; cursor: pointer; background-color: #dc3545; margin-top: 0; padding: 4px 8px; font-size: 11px; color: white;">🗑️</button>
        </div>
    `;
}

function applyTemplate(textareaId, categoryName) {
    let sel = document.getElementById(`tpl_select_${textareaId}`);
    if(!sel || !sel.value) return;
    let templates = JSON.parse(localStorage.getItem('custom_templates_' + categoryName)) || {};
    let text = templates[sel.value];
    if(!text) return;
    
    // Smart Variables Replacement
    let katStr = localStorage.getItem('profile_Κατηγορούμενος') || localStorage.getItem('profile_Ύποπτος');
    let katP = katStr ? JSON.parse(katStr) : null;
    let defName = katP ? getReportProfileString(katP, 'nom_name') : "";
    
    let witStr = localStorage.getItem('profile_Μάρτυρας') || localStorage.getItem('profile_Παθών');
    let witP = witStr ? JSON.parse(witStr) : null;
    let victim = witP ? getReportProfileString(witP, 'nom_name') : "";
    
    let crime = document.getElementById('apologia_charge_short') ? document.getElementById('apologia_charge_short').value : "";
    let arrLoc = document.getElementById('arr_loc') ? document.getElementById('arr_loc').value : "";
    let arrTime = document.getElementById('arr_street_time') ? document.getElementById('arr_street_time').value : "";
    let eventLoc = document.getElementById('ai_loc') ? document.getElementById('ai_loc').value : "";
    let eventTime = document.getElementById('ai_time') ? document.getElementById('ai_time').value : "";

    text = text.replace(/\[ΚΑΤΗΓΟΡΟΥΜΕΝΟΣ\]/g, defName);
    text = text.replace(/\[ΠΑΘΩΝ\]/g, victim);
    text = text.replace(/\[ΑΔΙΚΗΜΑ\]/g, crime);
    text = text.replace(/\[ΤΟΠΟΣ_ΣΥΛΛΗΨΗΣ\]/g, arrLoc);
    text = text.replace(/\[ΩΡΑ_ΣΥΛΛΗΨΗΣ\]/g, arrTime);
    text = text.replace(/\[ΤΟΠΟΣ_ΣΥΜΒΑΝΤΟΣ\]/g, eventLoc);
    text = text.replace(/\[ΩΡΑ_ΣΥΜΒΑΝΤΟΣ\]/g, eventTime);

    let tArea = document.getElementById(textareaId);
    
    window.undoStacks = window.undoStacks || {};
    if (!window.undoStacks[textareaId]) window.undoStacks[textareaId] = [];
    window.undoStacks[textareaId].push(tArea.value);
    if (window.undoStacks[textareaId].length > 15) window.undoStacks[textareaId].shift();
    
    tArea.value = tArea.value + (tArea.value ? "\n\n" : "") + text;
    sel.value = "";
    if(typeof saveMem === 'function') saveMem(textareaId);
}

function saveTemplate(textareaId, categoryName) {
    let tArea = document.getElementById(textareaId);
    let text = tArea.value.trim();
    if(!text) {
        alert("Το πεδίο κειμένου είναι άδειο. Γράψτε κάτι για να το αποθηκεύσετε ως πρότυπο.");
        return;
    }
    let title = prompt("Δώστε έναν σύντομο τίτλο για το νέο σας πρότυπο:");
    if(!title) return;
    
    let templates = JSON.parse(localStorage.getItem('custom_templates_' + categoryName)) || {};
    templates[title] = text;
    localStorage.setItem('custom_templates_' + categoryName, JSON.stringify(templates));
    
    // Refresh all template dropdowns of this category
    document.querySelectorAll('[id^="tpl_container_"]').forEach(container => {
        let tid = container.id.replace('tpl_container_', '');
        // Just re-init for the matching category. We don't have category mapped globally easily, so we just init the current one.
        // Or better: initTemplates(tid, categoryName) for the current one only.
    });
    initTemplates(textareaId, categoryName);
}

function deleteTemplate(textareaId, categoryName) {
    let sel = document.getElementById(`tpl_select_${textareaId}`);
    if(!sel || !sel.value) {
        alert("Επιλέξτε ένα πρότυπο από τη λίστα για να το διαγράψετε.");
        return;
    }
    if(confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε το πρότυπο "` + sel.value + `";`)) {
        let templates = JSON.parse(localStorage.getItem('custom_templates_' + categoryName)) || {};
        delete templates[sel.value];
        localStorage.setItem('custom_templates_' + categoryName, JSON.stringify(templates));
        initTemplates(textareaId, categoryName);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom templates
    initTemplates('doc_testimony_simple', 'testimony');
    initTemplates('apologia_charge_short', 'charge_short');
    initTemplates('apologia_charge_details', 'charge_details');
    initTemplates('report_text', 'report');

    setTimeout(function() {
        renderSavedProfiles();
        renderSavedPolice();
        let isFor = document.getElementById('is_foreigner');
        if(isFor) toggleForeignerFields();
        let isPol = document.getElementById('is_police');
        if(isPol) togglePoliceFields();
    }, 500);
});

window.copyReportText = function() {
    let tArea = document.getElementById("report_text");
    if (!tArea) return;
    tArea.select();
    tArea.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(tArea.value).then(() => {
        alert("Το κείμενο της αναφοράς αντιγράφηκε στο πρόχειρο!");
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

window.insertReportVariable = function(role) {
    let tArea = document.getElementById('report_text');
    let textToInsert = "";

    if (role === 'kat') {
        let pStr = localStorage.getItem('profile_Κατηγορούμενος') || localStorage.getItem('profile_Ύποπτος');
        let p = pStr ? JSON.parse(pStr) : null;
        if (!p) { alert("Δεν βρέθηκε αποθηκευμένος Κατηγορούμενος. Αποθηκεύστε πρώτα τα στοιχεία στο Βήμα 2."); return; }
        let type = document.getElementById('insert_kat_type').value;
        textToInsert = getReportProfileString(p, type);
    } else if (role === 'wit') {
        let pStr = localStorage.getItem('profile_Μάρτυρας') || localStorage.getItem('profile_Παθών');
        let p = pStr ? JSON.parse(pStr) : null;
        if (!p) { alert("Δεν βρέθηκε αποθηκευμένος Μάρτυρας/Παθών. Αποθηκεύστε πρώτα τα στοιχεία στο Βήμα 2."); return; }
        let type = document.getElementById('insert_wit_type').value;
        textToInsert = getReportProfileString(p, type);
    } else if (role === 'crime') {
        textToInsert = document.getElementById('apologia_charge_short') ? document.getElementById('apologia_charge_short').value : "";
        if (!textToInsert) { alert("Δεν έχει συμπληρωθεί το Αδίκημα (σύντομη περιγραφή) στο Βήμα 3 (Απολογία)."); return; }
    } else if (role === 'loc') {
        let loc = document.getElementById('ai_loc') ? document.getElementById('ai_loc').value : "";
        let time = document.getElementById('ai_time') ? document.getElementById('ai_time').value : "";
        textToInsert = (loc ? loc + " " : "") + (time ? time : "");
        if (!textToInsert.trim()) { alert("Δεν έχει συμπληρωθεί Τόπος/Ώρα Συμβάντος στο Βήμα 2."); return; }
    }
    
    let startPos = tArea.selectionStart;
    let endPos = tArea.selectionEnd;
    
    window.undoStacks = window.undoStacks || {};
    if (!window.undoStacks['report_text']) window.undoStacks['report_text'] = [];
    window.undoStacks['report_text'].push(tArea.value);
    
    tArea.value = tArea.value.substring(0, startPos) + textToInsert + tArea.value.substring(endPos, tArea.value.length);
    tArea.selectionStart = tArea.selectionEnd = startPos + textToInsert.length;
    tArea.focus();
    if(typeof saveMem === 'function') saveMem('report_text');
};

function getReportProfileString(p, type) {
    let s = p.surname || "";
    let n = p.name || "";
    let gender = p.gender || "Άνδρας";
    
    if (type === 'nom_name') {
        return (s + " " + n).trim();
    } else if (type === 'gen_name') {
        return (getGreekGenitive(s, true, gender) + " " + getGreekGenitive(n, false, gender)).trim();
    } else if (type === 'nom_full') {
        let res = (s + " " + n).trim();
        if (p.fname) res += " του " + p.fname;
        if (p.mname) res += " και της " + p.mname;
        if (p.birth_year) res += " γεν. " + p.birth_year;
        if (p.birth_loc) res += " στην " + p.birth_loc;
        if (p.katoik) res += " κάτ. " + p.katoik;
        if (p.odos) res += " οδός " + p.odos;
        if (p.id_num) res += " κάτοχος Δ.Α.Τ. " + p.id_num;
        return res;
    }
    return "";
}

function getGreekGenitive(word, isSurname, gender) {
    if (!word) return "";
    let w = word.trim();
    let up = w.toUpperCase();
    if (gender === 'male' || gender === 'Άνδρας') {
        if (up.endsWith('ΟΣ')) return w.slice(0, -2) + (w === up ? 'ΟΥ' : 'ου');
        if (up.endsWith('ΗΣ')) return w.slice(0, -1);
        if (up.endsWith('ΑΣ')) return w.slice(0, -1);
    } else if (gender === 'female' || gender === 'Γυναίκα') {
        if (!isSurname) {
            if (up.endsWith('Α')) return w.slice(0, -1) + (w === up ? 'ΑΣ' : 'ας');
            if (up.endsWith('Η')) return w.slice(0, -1) + (w === up ? 'ΗΣ' : 'ης');
        }
    }
    return w;
}
