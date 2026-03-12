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

function escapeHtmlForAI(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function normalizeGoldenRuleLines(raw) {
    let lines = String(raw || "").replace(/```/g, "").split(/\n+/).map(x => x.trim()).filter(Boolean);
    let labels = [
        ["ΠΟΥ", "ΠΟΥ (Τόπος)"],
        ["ΠΟΤΕ", "ΠΟΤΕ (Χρόνος)"],
        ["ΠΟΙΟΣ", "ΠΟΙΟΣ (Δράστης)"],
        ["ΤΙ", "ΤΙ (Πράξη)"],
        ["ΓΙΑΤΙ", "ΓΙΑΤΙ (Κίνητρο)"]
    ];
    return labels.map(([needle, fallback]) => {
        let found = lines.find(line => line.toUpperCase().includes(needle));
        return found || `${fallback}: ❌`;
    });
}

async function checkGoldenRule(sourceId, resultId, spinnerId, btnId) {
    let text = document.getElementById(sourceId).value.trim();
    let resDiv = document.getElementById(resultId);
    if (!text) { resDiv.innerHTML = "Γράψτε πρώτα την κατάθεση."; resDiv.className = "ai-result error"; resDiv.style.display = "block"; return; }
    let prompt = `Αξιολόγησε το παρακάτω κείμενο με βάση τον Χρυσό Κανόνα της αστυνομίας.
Απάντησε ΑΥΣΤΗΡΑ μόνο σε 5 γραμμές, χωρίς εισαγωγή και χωρίς σχόλια:
ΠΟΥ (Τόπος): ✅ ή ❌
ΠΟΤΕ (Χρόνος): ✅ ή ❌
ΠΟΙΟΣ (Δράστης): ✅ ή ❌
ΤΙ (Πράξη): ✅ ή ❌
ΓΙΑΤΙ (Κίνητρο): ✅ ή ❌
Αν αναφέρεται ότι η πράξη έγινε αναίτια, τότε στο ΓΙΑΤΙ βάλε ✅.
Κείμενο: "${sanitizeForAI(text)}"`;
    resDiv.style.display = "none"; resDiv.className = "ai-result";
    let result = await callGeminiAPI(prompt, btnId, spinnerId);
    if (result) {
        let lines = normalizeGoldenRuleLines(result);
        resDiv.innerHTML = "<strong>Αξιολόγηση Χρυσού Κανόνα:</strong><br><br>" + lines.map(escapeHtmlForAI).join("<br>");
        resDiv.style.display = "block";
    }
}

async function generateChargeAI() {
    let text = document.getElementById("ai_rough_notes").value.trim();
    if (!text) { alert("Γράψτε περιγραφή."); return; }
    let prompt = `Είσαι αστυνομικός ανακριτής. Διάβασε το συμβάν: "${sanitizeForAI(text)}"
Σύνταξε κατηγορητήριο ΑΥΣΤΗΡΑ με την εξής δομή και χωρίς να μαντεύεις καθόλου γεγονότα:
[ΒΑΣΙΚΟ]
παράβαση του [Άρθρο/Νόμος], πράξη που έλαβε χώρα την [Ημερομηνία] και ώρα [Ώρα] στο/στην [Τόπος]
[ΠΕΡΙΣΤΑΤΙΚΑ]
Ειδικότερα, ανωτέρω τόπο και χρόνο, ο δράστης [σύντομη νομική διατύπωση μόνο των πραγματικών περιστατικών που αναφέρονται ήδη στο κείμενο]
Κανόνες:
- Μην προσθέσεις νέους τόπους, ώρες, αριθμούς, πρόσωπα ή λεπτομέρειες.
- Αν λείπει στοιχείο, άφησέ το γενικό ή σε αγκύλες, χωρίς εφεύρεση.
- Επέστρεψε μόνο τις δύο ενότητες.`;
    let result = await callGeminiAPI(prompt, "btn_generate_charge", "spinner_charge");
    if (result) {
        try {
            let clean = result.replace(/```/g, "").trim();
            let basicMatch = clean.match(/\[ΒΑΣΙΚΟ\]([\s\S]*?)\[ΠΕΡΙΣΤΑΤΙΚΑ\]/i);
            let detailsMatch = clean.match(/\[ΠΕΡΙΣΤΑΤΙΚΑ\]([\s\S]*)/i);
            let basic = basicMatch ? basicMatch[1].trim() : "";
            let details = detailsMatch ? detailsMatch[1].trim() : "";
            if (!basic) basic = `παράβαση του ${document.getElementById("ai_law").value.trim() || "[Άρθρο/Νόμος]"}, πράξη που έλαβε χώρα την ${document.getElementById("ai_date").value.trim() || "[Ημερομηνία]"} και ώρα ${document.getElementById("ai_time").value.trim() || "[Ώρα]"} στο/στην ${document.getElementById("ai_loc").value.trim() || "[Τόπος]"}`;
            if (!details) details = "Ειδικότερα, ανωτέρω τόπο και χρόνο, ο δράστης ...";
            document.getElementById("apologia_charge_short").value = basic;
            document.getElementById("apologia_charge_details").value = details;
            saveMem("apologia_charge_short"); saveMem("apologia_charge_details");
        } catch (e) { alert("Σφάλμα ανάγνωσης."); }
    }
}

async function explainLawAI() {
    let el = document.getElementById("prok_charge");
    let lawText = el.value.trim();
    if (!lawText) { alert("Γράψτε πρώτα τη διάταξη (π.χ. Ν. 5092/2024 ή αρ. 23 Α.Ν. 1539/38)."); return; }
    window.originalTexts["prok_charge"] = lawText;
    let prompt = `Βρες ποιο είναι το αδίκημα ή ποιος είναι ο επίσημος τίτλος που αντιστοιχεί στη διάταξη ή στον νόμο: "${sanitizeForAI(lawText)}".
Επίστρεψε ΜΟΝΟ ένα κείμενο της μορφής:
παράβαση του [Άρθρο/Νόμος] «[Τίτλος αδικήματος ή επίσημος τίτλος νόμου]»
Κανόνες:
- Αν δοθεί μόνο νόμος, όπως Ν. 5092/2024, δώσε τον επίσημο τίτλο του νόμου.
- Μην προσθέσεις δεύτερη πρόταση.
- Μην γράψεις αιτιολογία ή ανάλυση.`;
    let result = await callGeminiAPI(prompt, "btn_ref_charge", "spin_ref_charge");
    if (result) { el.value = result.replace(/```/g, "").trim(); saveMem("prok_charge"); }
}

async function tonismosAI() {
    let fields = ['surname', 'name', 'father', 'mother', 'pob', 'area', 'dimos', 'odos', 'auth'];
    let vals = fields.map(id => document.getElementById(id).value.trim());
    if(vals.join('') === '') { alert("Η φόρμα είναι άδεια."); return; }

    let prompt = `Διόρθωσε τα εξής 9 στοιχεία προσώπου (χωρισμένα με |). 
Κανόνας 1: Το 1ο στοιχείο (Επώνυμο) άστο ΑΚΡΙΒΩΣ όπως είναι (κεφαλαία, χωρίς τόνους).
Κανόνας 2: Τα υπόλοιπα 8 στοιχεία κάντα Title Case (Πρώτο γράμμα κεφαλαίο, τα υπόλοιπα πεζά) και ΒΑΛΕ ΤΟΝ ΣΩΣΤΟ ΤΟΝΟ στα ελληνικά.
Κανόνας 3: Το 3ο και 4ο στοιχείο (Πατρώνυμο/Μητρώνυμο) μετάτρεψέ τα σε ΓΕΝΙΚΗ ΠΤΩΣΗ (π.χ. ΔΗΜΗΤΡΙΟΣ -> Δημητρίου).
Επίστρεψε ΜΟΝΟ τα 9 στοιχεία, ενωμένα ξανά με το |, χωρίς απολύτως καμία άλλη λέξη στην απάντησή σου.
Δεδομένα: ${vals.join('|')}`;

    let result = await callGeminiAPI(prompt, 'btn_tonismos', 'spin_tonismos');
    if(result) {
        let raw = result.replace(/```/g, '').replace(/html/g, '').trim();
        let newVals = raw.split('|').map(s => s.trim());
        
        if(newVals.length === fields.length) {
            fields.forEach((id, idx) => {
                let el = document.getElementById(id);
                if(el && newVals[idx]) { el.value = newVals[idx]; el.classList.remove('accent-warning'); saveMem(id); }
            });
        } else { alert("Η Τεχνητή Νοημοσύνη δεν επέστρεψε σωστή δομή. Παρακαλώ ξαναδοκιμάστε."); }
    }
}
