import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Connect to Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Read CSV
df = pd.read_csv("delhi_projects_risk_categories.csv")

# Upload every project
for _, row in df.iterrows():
    project_id = str(row["project_id"])

    project_data = {
        "project_id": project_id,
        "scheme": row["scheme"],
        "state": row["state"],
        "district": row["district"],
        "latitude": float(row["latitude"]),
        "longitude": float(row["longitude"]),
        "beneficiary_count": int(row["beneficiary_count"]),
        "fund_allocated_lakhs": float(row["fund_allocated_lakhs"]),
        "fund_utilized_lakhs": float(row["fund_utilized_lakhs"]),
        "inspection_count": int(row["inspection_count"]),
        "previous_issues": int(row["previous_issues"]),
        "report_delay_days": int(row["report_delay_days"]),
        "attendance_rate_pct": float(row["attendance_rate_pct"]),
        "previous_risk_score": float(row["previous_risk_score"]),
        "attendance_records_valid": int(row["attendance_records_valid"]),
        "geotagged_media_count": int(row["geotagged_media_count"]),
        "metadata_match_flag": int(row["metadata_match_flag"]),
        "gps_location_variance_km": float(row["gps_location_variance_km"]),
        "flagged_for_audit": int(row["flagged_for_audit"]),
        "risk_score": float(row["risk_score"]),
        "risk_category": row["risk_category"]
    }

    db.collection("projects").document(project_id).set(project_data)

print(f"Uploaded {len(df)} projects successfully.")