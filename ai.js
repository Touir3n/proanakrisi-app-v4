// ==========================================
// AI LOGIC (GEMINI API)
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
    if (panel.style.display === "none") { panel.style.display = "block"; arrow.innerHTML = "⬆️ Κλείσιμο"; } 
    else { panel.style.display = "none"; arrow.innerHTML = "⬇️ Άνοιγμα"; }
}

function logoutAI() {
    localStorage.removeItem('gemini_api_key'); localStorage.removeItem('gemini_model');
    document.getElementById('gemini_api_key').value = ''; document.getElementById('model_selection_div').style.display = 'none';
    alert("Το API Key διαγράφηκε επιτυχώς.");
}

async function saveApiKeyAndFetchModels() {
    let key = document.getElementById("gemini_api_key").value.trim();
    if (!key) { alert("Παρακαλώ εισάγετε ένα έγκυρο API Key."); return; }
    localStorage.setItem("gemini_api_key", key);
    
    try {
        let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        let data = await res.json();
        if(data.error) { alert("Σφάλμα ελέγχου κλειδιού: " + data.error.message); return; }
        
        let select = document.getElementById("gemini_model"); select.innerHTML = ""; 
        let validModels = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"));
        
        validModels.forEach(m => {
            let opt = document.createElement("option");
            opt.value = m.name.replace("models/", ""); opt.text = m.displayName + " (" + opt.value + ")";
            select.appendChild(opt);
        });
        
        let pref = validModels.find(m => m.name.includes("gemini-1.5-flash-8b")) || validModels.find(m => m.name.includes("gemini-1.5-flash")) || validModels.find(m => m.name.includes("gemini-1.0-pro"));
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
    if (!apiKey) { alert("Απαιτείται Gemini API Key! Ανοίξτε τις ρυθμίσεις AI."); return null; }

    let btn = document.getElementById(buttonId); let spinner = document.getElementById(spinnerId);
    btn.disabled = true; spinner.style.display = "inline-block";

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        let data = await response.json();
        btn.disabled = false; spinner.style.display = "none";
        if (data.error) { throw new Error(data.error.message); }
        return data.candidates[0].content.parts[0].text;
    } catch (e) {
        btn.disabled = false; spinner.style.display = "none";
        alert("Σφάλμα: " + e.message); return null;
    }
}

async function refineTextAI(elementId, spinnerId, btnId) {
    let el = document.getElementById(elementId);
    let text = el.value.trim();
    if (!text) { alert("Το πεδίο είναι κενό."); return; }
    window.originalTexts[elementId] = text;
    let prompt = `Διόρθωσε συντακτικά, ορθογραφικά και την αστυνομική ορολογία στο παρακάτω προανακριτικό κείμενο. ΜΗΝ προσθέσεις γεγονότα. Επίστρεψε ΜΟΝΟ το διορθωμένο κείμενο:\n\n"${sanitizeForAI(text)}"`;
    let result = await callGeminiAPI(prompt, btnId, spinnerId);
    if (result) { el.value = result.trim(); saveMem(elementId); }
}

async function checkGoldenRule(sourceId, resultId, spinnerId, btnId) {
    let text = document.getElementById(sourceId).value.trim();
    let resDiv = document.getElementById(resultId);
    if (!text) { resDiv.innerHTML = "Γράψτε πρώτα την κατάθεση."; resDiv.className = "ai-result error"; resDiv.style.display = "block"; return; }
    let prompt = `Διάβασε την κατάθεση. Έλεγξε αν καλύπτονται: 1) ΠΟΥ (τόπος), 2) ΠΟΤΕ (χρόνος), 3) ΠΟΙΟΣ (δράστης), 4) ΤΙ (πράξη), 5) ΓΙΑΤΙ (κίνητρο). Αν αναφέρει "αναίτια", το "ΓΙΑΤΙ" είναι ✅. Επίστρεψε ΜΟΝΟ bullets (✅ ή ❌). Κατάθεση: "${sanitizeForAI(text)}"`;
    resDiv.style.display = "none"; resDiv.className = "ai-result";
    let result = await callGeminiAPI(prompt, btnId, spinnerId);
    if (result) { resDiv.innerHTML = "<strong>Αξιολόγηση Χρυσού Κανόνα:</strong><br><br>" + result.replace(/\n/g, "<br>"); resDiv.style.display = "block"; }
}

async function generateChargeAI() {
    let text = document.getElementById("ai_rough_notes").value.trim();
    if (!text) { alert("Γράψτε περιγραφή."); return; }
    let prompt = `Διάβασε την περιγραφή: "${sanitizeForAI(text)}" Σύνταξε ΑΥΣΤΗΡΑ με την εξής μορφή (αντικαθιστώντας τα κενά με τα σωστά στοιχεία): [ΒΑΣΙΚΟ] παράβαση του [Άρθρο/Νόμος], πράξη που έλαβε χώρα την [Ημερομηνία] και ώρα [Ώρα] στο/στην [Τόπος]. [ΠΕΡΙΣΤΑΤΙΚΑ] Ειδικότερα, ανωτέρω τόπο και χρόνο, ο δράστης (ΠΕΡΙΓΡΑΨΕ ΜΕ ΕΝΑ-ΔΥΟ ΛΟΓΙΑ ΑΠΛΑ ΤΗΝ ΠΡΑΞΗ, ΧΩΡΙΣ ΝΑ ΠΡΟΣΘΕΣΕΙΣ ΔΙΚΑ ΣΟΥ ΓΕΓΟΝΟΤΑ ΚΑΙ ΧΩΡΙΣ ΠΡΑΓΜΑΤΙΚΑ ΟΝΟΜΑΤΑ).`;
    let result = await callGeminiAPI(prompt, "btn_generate_charge", "spinner_charge");
    if (result) {
        try {
            let parts = result.split("[ΠΕΡΙΣΤΑΤΙΚΑ]");
            document.getElementById("apologia_charge_short").value = parts[0].replace("[ΒΑΣΙΚΟ]", "").trim();
            document.getElementById("apologia_charge_details").value = parts[1].trim();
            saveMem("apologia_charge_short"); saveMem("apologia_charge_details");
        } catch (e) { alert("Σφάλμα ανάγνωσης."); }
    }
}

async function explainLawAI() {
    let el = document.getElementById("prok_charge");
    let lawText = el.value.trim();
    
    if (!lawText) { 
        alert("Γράψτε πρώτα τη διάταξη/νόμο (π.χ. αρ. 23 Α.Ν. 1539/38) και μετά πατήστε το κουμπί."); 
        return; 
    }
    
    window.originalTexts["prok_charge"] = lawText;
    
    let prompt = `Είσαι βοηθός Αξιωματικού Υπηρεσίας της Ελληνικής Αστυνομίας. Ο χρήστης σου δίνει μια νομική διάταξη. 
Βρες ποιο είναι το αδίκημα και επίστρεψε ΑΥΣΤΗΡΑ ΚΑΙ ΜΟΝΟ ένα ωραία διατυπωμένο κείμενο για το πεδίο "Αποδιδόμενη Πράξη", της μορφής: "παράβαση του [Άρθρο/Νόμος] «[Τίτλος Αδικήματος]»". 
Αν ο νόμος αναφέρεται σε "κατάληψη δημόσιου κτήματος", γράψτο έτσι.
Μην βάλεις καμία άλλη λέξη, σχόλιο ή εισαγωγή στην απάντησή σου.
Διάταξη που έδωσε ο χρήστης: "${sanitizeForAI(lawText)}"`;

    let result = await callGeminiAPI(prompt, "btn_ref_charge", "spin_ref_charge");
    
    if (result) { 
        el.value = result.trim(); 
        saveMem("prok_charge"); 
    }
}

async function tonismosAI() {
    let fields = ['surname', 'name', 'father', 'mother', 'pob', 'area', 'dimos', 'odos', 'auth'];
    let vals = fields.map(id => document.getElementById(id).value.trim());
    if(vals.join('') === '') { alert("Η φόρμα είναι άδεια. Κάντε πρώτα άντληση POL."); return; }

    let prompt = `Διόρθωσε τα παρακάτω 9 πεδία (χωρισμένα με |). 
ΚΑΝΟΝΕΣ: 
Πεδίο 1 (Επώνυμο): ΜΟΝΟ ΚΕΦΑΛΑΙΑ, ΧΩΡΙΣ ΤΟΝΟΥΣ. 
Πεδία 2 έως 9: Πρώτο γράμμα κεφαλαίο, τα υπόλοιπα πεζά. ΒΑΛΕ ΤΟΝ ΣΩΣΤΟ ΤΟΝΟ. 
Πεδία 3 και 4 (Πατρώνυμο/Μητρώνυμο): Βάλε τα σε Γενική Πτώση (π.χ. 'Δημητρίου').
Επίστρεψε ΜΟΝΟ τα 9 πεδία ενωμένα με | χωρίς καμία άλλη λέξη.
Δεδομένα: ${vals.join('|')}`;

    let result = await callGeminiAPI(prompt, 'btn_tonismos', 'spin_tonismos');
    if(result) {
        let raw = result.replace(/```/g, '').replace(/html/g, '').trim();
        let newVals = raw.split('|').map(s => s.trim());
        
        if(newVals.length === fields.length) {
            fields.forEach((id, idx) => {
                let el = document.getElementById(id);
                if(el && newVals[idx]) { 
                    el.value = newVals[idx]; 
                    el.classList.remove('accent-warning'); 
                    saveMem(id); 
                }
            });
        } else { 
            alert("Η Τεχνητή Νοημοσύνη δεν επέστρεψε σωστή δομή. Παρακαλώ ξαναδοκιμάστε."); 
        }
    }
}
