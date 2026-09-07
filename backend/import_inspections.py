
import csv
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

with open("inspections.csv", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    count = 0

    for row in reader:
        inspection_id = row["id"]

        data = {
            "id": inspection_id,
            "project": row["project"],
            "institution": row["institution"],
            "location": row["location"],
            "inspector": row["inspector"],
            "assignedDate": row["assignedDate"],
            "inspectionDate": row["inspectionDate"],
            "status": row["status"],
            "priority": row["priority"],
            "evidence": int(row["evidence"]),
        }

        db.collection("inspections").document(inspection_id).set(data)

        count += 1

print(f"Uploaded {count} inspections to Firestore.")