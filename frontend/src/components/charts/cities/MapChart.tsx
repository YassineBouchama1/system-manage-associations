"use client";
import { Key, useMemo, useRef, useState, FC } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  GeoJSON,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "@/lib/moroccoGeo";
import L, { divIcon } from "leaflet";
import MapInfo from "./MapInfo";
import { useTranslations } from "next-intl";


interface MapDataType {
  
        "number_patients": number,
        "region": string
}
interface MapChartProps {
  mapData: MapDataType[];
  errorMap: any;
}

const MapChart: FC<MapChartProps> = ({ mapData ,errorMap}) => {




  // Center coordinates (Number[])
  const center: number[] = [28.996643486255092, -9.707703872193896]; // Selected region state (useState)

  const [onselect, setOnselect] = useState<{ patients: number ,region:string} | null>(null); 
  // if (errorMap) {
  //   return <div>Error fetching map</div>;
  // }
  
  const t = useTranslations("ui");





  const highlightFeature = (e: any) => {
    const layer = e.target as L.GeoJSON;
    // layer.setStyle(styleHover());
    const result = mapData.filter(
      (item) => item.region === e.target.feature.properties.name
    );
    setOnselect({
      patients: result.length > 0 ? result[0].number_patients : 0,
      region: e.target.feature.properties.name,
    });
  }; // Data for patients per region



  const resetHighlight = (e: any) => {
    (e.target as L.GeoJSON).setStyle(style(e.target.feature));
    setOnselect(null);
  }; // Function for handling feature clicks


  const whenClick = (e: any) => {
    e.target.setStyle(styleHover());
    const result = mapData.filter(
      (item) => item.region == e.target.feature.properties.name
    );
    
// makeHoverOnLayer(result.length > 0 ? result[0].number_patients : 0,e.target.feature.properties.name);

  }; // Function for handling mouse events on features

  const makeHoverOnLayer = (patients : number, region:string) => {
    setOnselect({
      patients,
      region
    });

  };
  const onEachFeature = (feature: any, layer: L.GeoJSON) => {
    layer.on({
      mouseover: highlightFeature,  
      mouseout: resetHighlight,
      click: whenClick,
    });
  }; // Function to determine color based on patient count

  const getColorForRegion = (properties: any) => {
    const result = mapData.filter((item) => item.region === properties.name);
    const number_patients = result.length > 0 ? result[0].number_patients : 0;

    return number_patients > 150
      ? "#800026"
      : number_patients > 120
      ? "#BD0026"
      : number_patients > 100
      ? "#E31A1C"
      : number_patients > 50
      ? "#FC4E2A"
      : number_patients > 20
      ? "#FD8D3C"
      : number_patients > 10
      ? "#FEB24C"
      : number_patients >= 1
      ? "#FED976"
      : "#FFEDA0";
  }; // Style function for each map feature

  const style = (feature: any) => {
    return {
      fillColor: getColorForRegion(feature.properties),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "",
      fillOpacity: 1,
    };
  };

  const styleHover = () => {
    return {
      fillColor: "black",
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "",
      fillOpacity: 1,
    };
  }; // style map

  const mapStyle = {
    height: "60VH",
    width: "100%",
    margin: "0 auto",
  };

  const customMarkerIcon = (name: string) =>
    divIcon({
      html: name,
      className: "icon",
    }); // display name city

  const setIcon = ({ properties }: any, latlng: any) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.region) });
  };

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

 



  return (
    <div className="relative z-10 flex justify-center flex-col lg:w-1/2   h-auto bg-white rounded-md my-4 p-4">
      <div
        style={{ zIndex: 800 }}
        className="absolute top-7 left-7  bg-white rounded-md shadow-sm opacity-60  w-2/6 px-2 pt-4  h-auto "
      >
        <p className="text-xs font-semibold">{t("patient_map_chart")}</p> 
        <div className="text-center flex justify-center mt-[-13px]">
          {onselect ? (
            <div className="flex flex-col justify-between">
              <p>{onselect && onselect?.region}</p>
              <p>{onselect && onselect?.patients}</p>
            </div>
          ) : (
            <p className="text-xs pb-2">{t("click_map_chart")}</p>
          )}
        </div>
      </div>
      <div
        style={{ zIndex: 800 }}
        className="absolute bottom-10 right-10  bg-white rounded-md shadow-sm opacity-60  w-2/6 px-2 pt-4  h-auto "
      >
        <MapInfo />
      </div>
      <MapContainer
        attributionControl={false}
        center={center as any}
        zoom={4.5}
        scrollWheelZoom={false}
        style={mapStyle}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        {statesData && (
          <GeoJSON
            data={statesData.features as any}
            style={style}
            onEachFeature={onEachFeature}
            pointToLayer={setIcon}
          />
        )}


                       {" "}
        {/* {statesData.features.map(
          (
            city: { geometry: { coordinates: any[][] } },
            index: Key | null | undefined
          ) => {
            // const coordinates = city.geometry.coordinates[0].map(
            //   (item: any[]) => [item[0], item[1]]
            // );

            return (
              <GeoJSON
                key={index}
                data={statesData.features as any}
                style={style}
                onEachFeature={onEachFeature}
                pointToLayer={setIcon}
                // pathOptions={style as any}
              />
            );
          }
        )} */}
        <TileLayer
          attribution="yassine" // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
export default MapChart;
