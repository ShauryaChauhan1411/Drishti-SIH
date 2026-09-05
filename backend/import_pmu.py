import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

df = pd.read_csv("delhi_pmu_teams_roster.csv")

for _, row in df.iterrows():

    team_id = str(row["team_id"])

    team_data = {
        "team_id": team_id,
        "team_name": row["team_name"],
        "team_lead": row["team_lead"],
        "team_member": row["team_member"],
        "assigned_district": row["assigned_district"],
        "latitude": float(row["latitude"]),
        "longitude": float(row["longitude"]),
        "primary_specialty": row["primary_specialty"],
        "team_capacity_monthly": int(row["team_capacity_monthly"]),
        "active_audits": int(row["active_audits"]),
        "conflict_of_interest_districts": row["conflict_of_interest_districts"],
        "max_travel_radius_km": float(row["max_travel_radius_km"]),
        "available_slots": int(row["available_slots"])
    }

    db.collection("pmu_teams").document(team_id).set(team_data)

print(f"Uploaded {len(df)} PMU teams successfully.")