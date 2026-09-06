
import pandas as pd
import numpy as np
from scipy.optimize import linear_sum_assignment


PROJECTS_FILE = "delhi_projects_risk_categories.csv"
TEAMS_FILE = "delhi_pmu_teams_roster.csv"
OUTPUT_FILE = "delhi_final_pmu_dispatch_schedule.csv"


def generate_dispatch():
    # Load project risk data and PMU team roster
    df_delhi = pd.read_csv(PROJECTS_FILE)
    df_pmu = pd.read_csv(TEAMS_FILE)

    # -------------------------------------------------
    # STEP 1: Generate availability/eligibility matrix
    # -------------------------------------------------
    availability_records = []

    for _, proj in df_delhi.iterrows():
        p_id = proj["project_id"]
        p_dist = proj["district"]
        p_lat = proj["latitude"]
        p_lon = proj["longitude"]

        for _, team in df_pmu.iterrows():
            t_id = team["team_id"]
            t_name = team["team_name"]

            if team["available_slots"] <= 0:
                prob = 0.0
                status = "UNAVAILABLE: Max Capacity Reached"

            elif team["conflict_of_interest_districts"] == p_dist:
                prob = 0.0
                status = "UNAVAILABLE: Conflict of Interest"

            else:
                dist_km = (
                    np.sqrt(
                        (p_lat - team["latitude"]) ** 2
                        + (p_lon - team["longitude"]) ** 2
                    )
                    * 111.0
                )

                if dist_km > team["max_travel_radius_km"]:
                    prob = 0.0
                    status = (
                        f"UNAVAILABLE: Exceeds Max Radius "
                        f"({round(dist_km, 1)}km)"
                    )
                else:
                    slot_factor = (
                        team["available_slots"]
                        / team["team_capacity_monthly"]
                    )

                    distance_factor = max(
                        0.1,
                        1.0 - (
                            dist_km / team["max_travel_radius_km"]
                        ),
                    )

                    prob = round(
                        0.5 * slot_factor + 0.5 * distance_factor,
                        3,
                    )

                    status = "AVAILABLE"

            availability_records.append(
                {
                    "project_id": p_id,
                    "project_district": p_dist,
                    "risk_score": proj["risk_score"],
                    "risk_category": proj["risk_category"],
                    "team_id": t_id,
                    "team_name": t_name,
                    "team_district": team["assigned_district"],
                    "availability_probability": prob,
                    "availability_status": status,
                }
            )

    df_avail = pd.DataFrame(availability_records)

    # -------------------------------------------------
    # STEP 2: Select Critical + Medium projects
    # -------------------------------------------------
    df_projects_to_audit = (
        df_avail[
            df_avail["risk_category"].isin(["Critical", "Medium"])
        ][
            [
                "project_id",
                "project_district",
                "risk_score",
                "risk_category",
            ]
        ]
        .drop_duplicates()
        .head(30)
        .reset_index(drop=True)
    )

    # -------------------------------------------------
    # STEP 3: Build cost matrix
    # -------------------------------------------------
    cost_matrix = []

    for _, proj in df_projects_to_audit.iterrows():
        row_costs = []

        for _, team in df_pmu.iterrows():
            t_id = team["team_id"]

            sub = df_avail[
                (df_avail["project_id"] == proj["project_id"])
                & (df_avail["team_id"] == t_id)
            ]

            if (
                len(sub) > 0
                and sub.iloc[0]["availability_status"] == "AVAILABLE"
            ):
                avail_prob = sub.iloc[0]["availability_probability"]

                match_score = (
                    0.5 * proj["risk_score"]
                    + 0.5 * avail_prob
                )

                cost = 1.0 - match_score

            else:
                cost = 999.0

            row_costs.append(cost)

        cost_matrix.append(row_costs)

    cost_matrix = np.array(cost_matrix)

    # -------------------------------------------------
    # STEP 4: Hungarian Algorithm
    # -------------------------------------------------
    row_ind, col_ind = linear_sum_assignment(cost_matrix)

    dispatch_schedule = []

    for p_idx, i_idx in zip(row_ind, col_ind):
        proj = df_projects_to_audit.iloc[p_idx]
        team = df_pmu.iloc[i_idx]

        cost = cost_matrix[p_idx, i_idx]

        if cost < 10.0:
            match_score = round(1.0 - cost, 3)

            dispatch_schedule.append(
                {
                    "project_id": proj["project_id"],
                    "project_district": proj["project_district"],
                    "project_risk_category": proj["risk_category"],
                    "project_risk_score": proj["risk_score"],
                    "assigned_team_id": team["team_id"],
                    "assigned_team_name": team["team_name"],
                    "team_lead": team["team_lead"],
                    "team_member": team["team_member"],
                    "team_home_district": team["assigned_district"],
                    "match_quality_score": match_score,
                }
            )

    df_dispatch = pd.DataFrame(dispatch_schedule)

    # Save final dispatch schedule
    df_dispatch.to_csv(OUTPUT_FILE, index=False)

    return df_dispatch


if __name__ == "__main__":
    result = generate_dispatch()

    import json
    print(json.dumps(result.to_dict(orient="records")))