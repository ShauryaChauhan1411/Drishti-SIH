import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Read CCTV dataset
df = pd.read_csv("cctv_cameras.csv")

# Upload each camera
for _, row in df.iterrows():
    camera_data = {
        "camera_id": row["camera_id"],
        "project": row["project"],
        "location": row["location"],
        "status": row["status"],
        "uptime": float(row["uptime"]),
        "ai_status": row["ai_status"],
        "anomaly": bool(row["anomaly"]),
        "video_source": row["video_source"],
    }

    db.collection("cctv_cameras").document(row["camera_id"]).set(camera_data)

print(f"Uploaded {len(df)} CCTV cameras to Firestore.")
