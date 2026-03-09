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
