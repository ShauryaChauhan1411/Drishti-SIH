
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Connect to Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

notifications = [
    {
        "title": "High-risk project detected",
        "message": "Project risk score requires departmental review.",
        "type": "Risk Alert",
        "priority": "High",
        "read": False,
    },
    {
        "title": "Inspection requires verification",
        "message": "A submitted inspection is waiting for government verification.",
        "type": "Inspection",
        "priority": "High",
        "read": False,
    },
    {
        "title": "Attendance anomaly detected",
        "message": "Beneficiary attendance irregularity detected in monitored projects.",
        "type": "Beneficiary",
        "priority": "Medium",
        "read": False,
    },
    {
        "title": "PMU dispatch generated",
        "message": "The latest PMU dispatch schedule has been generated successfully.",
        "type": "PMU",
        "priority": "Medium",
        "read": True,
    },
    {
        "title": "Inspection verified",
        "message": "A project inspection has been successfully verified.",
        "type": "Inspection",
        "priority": "Low",
        "read": True,
    },
]

for index, notification in enumerate(notifications):
    doc_id = f"NOT-{index + 1:03d}"

    db.collection("notifications").document(doc_id).set(notification)

print(f"Uploaded {len(notifications)} notifications successfully.")