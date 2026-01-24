import pdfplumber
import docx
import spacy
import re

nlp = spacy.load("en_core_web_sm")

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text

    if file_path.endswith(".docx"):
        doc = docx.Document(file_path)
        return "\n".join(p.text for p in doc.paragraphs)

def extract_project_fields(text):
    doc = nlp(text)

    data = {
        "project_name": None,
        "sector": None,
        "progress": None,
        "status": None,
        "budget": None,
        "actual_cost": None,
        "problems": [],
        "latitude": None,
        "longitude": None
    }

    # Progress %
    match = re.search(r'(\d+)\s?%', text)
    if match:
        data["progress"] = int(match.group(1))
        data["status"] = "Delayed" if data["progress"] < 80 else "On Track"

    # Budget / cost
    budget = re.search(r'Budget.*?(\d+)', text, re.I)
    actual = re.search(r'Expenditure.*?(\d+)', text, re.I)
    if budget:
        data["budget"] = int(budget.group(1))
    if actual:
        data["actual_cost"] = int(actual.group(1))

    # Problems faced (VERY IMPORTANT FEATURE)
    for line in text.split("\n"):
        if any(word in line.lower() for word in ["delay", "land", "fund", "clearance"]):
            data["problems"].append(line.strip())

    # Location (basic demo)
    for ent in doc.ents:
        if ent.label_ == "GPE":
            data["sector"] = "Infrastructure"
            break

    return data
