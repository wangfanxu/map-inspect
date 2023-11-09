declare namespace MapInspection {
  type InspectionType = "FIR" | "FQI" | "RI";

  interface InspectionRecord {
    //mongo DB id
    _id: string;
    inspectionType: InspectionType;
    estate: string;
    block: string;
    inspector: string;
    date: Date;
    coordinates: [
      {
        latitude: number;
        longitude: number;
      }
    ];
  }
}
