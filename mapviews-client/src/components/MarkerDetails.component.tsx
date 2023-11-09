// MarkerDetailsDialog.tsx

import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { InspectionRecord } from "./Map.component";
import { MarkerClickCallbackData } from "@capacitor/google-maps/dist/typings/definitions";

interface MarkerDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  details: MarkerClickCallbackData;
}

const MarkerDetails: React.FC<MarkerDetailsProps> = ({
  isOpen,
  onClose,
  details,
}) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Marker Details</IonTitle>
          <IonButton onClick={onClose}>
            <IonIcon icon={closeCircleOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Inspection Type: {details.title}</p>
        <p>latitude: {details.latitude}</p>
        <p>longitude: {details.longitude}</p>
      </IonContent>
    </IonModal>
  );
};

export default MarkerDetails;
