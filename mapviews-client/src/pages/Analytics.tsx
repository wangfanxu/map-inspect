import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonLoading,
  IonText,
} from "@ionic/react";
import Map from "../components/Map.component";
import "./Analytics.css";

const Analytics: React.FC = () => {
  const [inspectionType, setInspectionType] = useState<string>("");
  const [estate, setEstate] = useState<string>("");
  const [block, setBlock] = useState<string>("");
  const [inspector, setInspector] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inspectionData, setInspectionData] = useState<any | null>(null); // Use the appropriate data type here
  const [offset, setOffset] = useState("0");

  const fetchInspectionData = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        inspectionType,
        estate,
        block,
        inspector,
        limit: "50",
        offset: offset,
      });
      const response = await fetch(
        `http://localhost:5000/inspections?${queryParams.toString()}`
      );
      if (!response.ok) {
        setError("API request failed");
      }
      const data = await response.json();
      setInspectionData(data); // Store the inspection data in the state
      setOffset((prevOffset) => String(Number(prevOffset) + 50));

      console.log(data);
    } catch (e) {
      setError("API request failed");
    } finally {
      setLoading(false);
    }
  };

  const validateFilters = () => {
    if (!inspectionType && !estate && !block && !inspector) {
      console.log("triggering error");
      setError("Please enter at least one filter.");
      return false;
    }
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      specialCharacterRegex.test(estate) ||
      specialCharacterRegex.test(block) ||
      specialCharacterRegex.test(inspector)
    ) {
      setError("Special characters are not allowed in the filters.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    console.log("triggering submit");
    validateFilters() && (await fetchInspectionData());
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analytics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Analytics</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Filters TODO:change the filter to component*/}
        <div className="filter-row">
          <IonSelect
            value={inspectionType}
            placeholder="Select Inspection Type"
            onIonChange={(e) => setInspectionType(e.detail.value)}
          >
            <IonSelectOption value="FIR">FIR</IonSelectOption>
            <IonSelectOption value="FQI">FQI</IonSelectOption>
            <IonSelectOption value="RI">RI</IonSelectOption>
          </IonSelect>
          <IonInput
            value={estate}
            placeholder="Estate"
            onIonChange={(e) => setEstate(e.detail.value!)}
          ></IonInput>
          <IonInput
            value={block}
            placeholder="Block"
            onIonChange={(e) => setBlock(e.detail.value!)}
          ></IonInput>
          <IonInput
            value={inspector}
            placeholder="Inspector"
            onIonChange={(e) => setInspector(e.detail.value!)}
          ></IonInput>
          <IonButton onClick={handleSubmit}>Submit</IonButton>
        </div>
        <Map name="Analytics page" inspectionData={inspectionData} />
        <IonText color="warning">{error}</IonText>
        <IonLoading
          isOpen={loading} // Set this based on your loading state
          message={"Loading..."}
        />{" "}
      </IonContent>
    </IonPage>
  );
};

export default Analytics;
