import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

df = pd.read_csv("delhi_final_pmu_dispatch_schedule.csv")

for _, row in df.iterrows():

    project_id = str(row["project_id"])

    dispatch_data = {
        "project_id": project_id,
        "project_district": row["project_district"],
        "project_risk_category": row["project_risk_category"],
        "project_risk_score": float(row["project_risk_score"]),
        "assigned_team_id": row["assigned_team_id"],
        "assigned_team_name": row["assigned_team_name"],
        "team_lead": row["team_lead"],
        "team_member": row["team_member"],
        "team_home_district": row["team_home_district"],
        "match_quality_score": float(row["match_quality_score"])
    }

    db.collection("pmu_dispatch").document(project_id).set(dispatch_data)

print(f"Uploaded {len(df)} dispatch assignments successfully.")