import { useEffect, useRef, useState } from "react";
import "./ExploreContainer.css";
import { GoogleMap } from "@capacitor/google-maps";
import MarkerDetails from "./MarkerDetails.component";
import { MarkerClickCallbackData } from "@capacitor/google-maps/dist/typings/definitions";
//TODO: retrieve the API key from the environment variable
const apiKey = "AIzaSyAl5SSekPOEGnXjy9861NbTCn8XL2KRcLU";

export interface InspectionRecord {
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

interface ContainerProps {
  name: string;
  inspectionData: InspectionRecord[];
}

type InspectionType = "FIR" | "FQI" | "RI";

const Map: React.FC<ContainerProps> = ({ name, inspectionData }) => {
  const addMarkers = (map: GoogleMap, inspectionData: InspectionRecord[]) => {
    if (inspectionData) {
      //check the inspection type
      inspectionData.forEach((inspection) => {
        if (inspection.inspectionType === "FIR") {
          //for the FIR inspection type, there are multiple coordinates
          inspection.coordinates.forEach((coordinate) => {
            // console.log("coordinate", coordinate);
            // console.log("inspection", inspection.block);
            map.addMarker({
              coordinate: {
                lat: coordinate.latitude,
                lng: coordinate.longitude,
              },
              title: inspection.inspectionType,
              snippet: inspection.block,
              tintColor: {
                r: 255,
                g: 0,
                b: 0,
                a: 1,
              },
            });
          });
        } else if (inspection.inspectionType === "FQI") {
          console.log("ADDing FQI marker");
          map.addMarker({
            coordinate: {
              lat: inspection.coordinates[0].latitude,
              lng: inspection.coordinates[0].longitude,
            },
            title: inspection.inspectionType,
            snippet: inspection.block,
          });
        } else if (inspection.inspectionType === "RI") {
          map.addMarker({
            coordinate: {
              lat: inspection.coordinates[0].latitude,
              lng: inspection.coordinates[0].longitude,
            },
            title: inspection.inspectionType,
            snippet: inspection.estate,
          });
        }
      });
    }
  };
  const addPolylines = (map: GoogleMap, inspectionData: InspectionRecord[]) => {
    const polylineCoordinates: { [recordId: string]: google.maps.LatLng[] } =
      {};
    const lineSymbols: Array<{
      path: google.maps.SymbolPath;
    }> = [];
    const lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    if (inspectionData) {
      inspectionData.forEach((inspection) => {
        const recordId = inspection._id;
        if (!polylineCoordinates[recordId]) {
          polylineCoordinates[recordId] = [];
        }
        inspection.coordinates.forEach((coordinate) => {
          polylineCoordinates[recordId].push(
            new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
          );
          lineSymbols.push(lineSymbol);
        });
      });
      for (const recordId in polylineCoordinates) {
        map.addPolylines([
          {
            path: polylineCoordinates[recordId],
            icons: [
              {
                icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                offset: "100%",
                repeat: "40px",
              },
            ],
          },
        ]);
      }
    }
  };

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedMarkerDetails, setSelectedMarkerDetails] =
    useState<MarkerClickCallbackData | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (mapRef.current) {
        const newMap = await GoogleMap.create({
          id: "my-map",
          element: mapRef.current,
          apiKey: apiKey,
          config: {
            center: {
              lat: 1.3521,
              lng: 103.8198,
            },
            zoom: 8,
          },
        });
        setMap(newMap);
        addMarkers(newMap, inspectionData); // Add markers based on inspection data
        addPolylines(newMap, inspectionData); // Add polylines based on inspection data

        newMap.setOnMarkerClickListener(handlerMarkerClick);
      }
    };

    initializeMap();
  }, [inspectionData]); //trigger the effect when the inspection data changes

  const handlerMarkerClick = (marker: MarkerClickCallbackData) => {
    setSelectedMarkerDetails(marker);
    setDialogOpen(true);
  };

  return (
    <div className="container">
      <div id="map" ref={mapRef} style={{ width: "100%", height: "500px" }}>
        {map && <p>Map is ready!</p>}
      </div>
      {/* Render the dialog with marker details */}
      {selectedMarkerDetails !== null && (
        <MarkerDetails
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          details={selectedMarkerDetails} // Pass the selected marker details
        />
      )}
    </div>
  );
};

export default Map;
