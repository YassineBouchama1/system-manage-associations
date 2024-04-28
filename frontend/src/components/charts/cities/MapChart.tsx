'use client'
import { Key, useMemo, useRef, useState, type FC } from "react";
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
import cities from "../../../lib/cities.json";
import L, { divIcon } from "leaflet";

interface MapChartProps {}

const MapChart: FC<MapChartProps> = ({}) => {

  const center: Number[] = [28.996643486255092, -9.707703872193896];

  const [onselect, setOnselect] = useState({});



  
  /* function determining what should happen onmouseover, this function updates our state*/
  const highlightFeature = (e: any) => {
    var layer = e.target;
    layer.setStyle(styleHover());
      const result = dataPatient.filter(
        (item) => item.region === e.target.feature.properties.name
      );


    setOnselect({
      patients: result.length > 0 ? result[0].number_patients : 0,
    });
    // layer.setStyle({
    //   weight: 2,
    //   color: "white",
    //   fillOpacity: 1,
      
    // });
  };


  const dataPatient = [
    {
      number_patients: 50,
      region: "Casablanca-Settat",
    },
    {
      number_patients: 2,
      region: "Marrakech-Safi",
    },
  ];

  /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
  const resetHighlight = (e: any) => {
    setOnselect({});
    e.target.setStyle(style(e.target.feature));
 
  };



  const whenClick = (e: any) => {
    e.target.setStyle(styleHover());
    const result = dataPatient.filter(
      (item) => item.region == e.target.feature.properties.name
    );

      setOnselect({
        patients: result.length > 0 ? result[0].number_patients : 0,
      });

 
  };


  // this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
   
    });
  };

  //  click: whenClick,


  //  add spicefec color depand of  number of patients in region
const getColorForRegion = (properties: any) => {
  const result = dataPatient.filter((item) => item.region === properties.name);

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
};






  // style for each part from map
  const style = (feature: any) => {
    return {
      fillColor: getColorForRegion(feature.properties),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };




  const styleHover = () => {
    return {
      fillColor: 'black',
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };


  // style map 
  const mapStyle = {
    height: "60VH",
    width: "100%",
    margin: "0 auto",
    
  };



  const customMarkerIcon = (name: string) =>
    divIcon({
      html: name,
      className: "icon",
    });


  // display name city
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
    <div className="z-10 flex justify-center flex-col lg:w-1/2   h-auto bg-white rounded-md my-4 p-4">
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
        <div
          style={{ position: "absolute", zIndex: 800 }}
          className=" bg-white rounded-md shadow-sm opacity-60  w-2/6 px-2 pt-4  min-h-20 flex flex-col gap-3 items-start"
        >
          <p className="text-xs font-semibold">Nombre de patients par entité</p>
          {onselect ? (
            <p>{onselect && onselect?.patients}</p>
          ) : (
            <p>click over a region</p>
          )}
        </div>

        {statesData.features.map(
          (
            city: { geometry: { coordinates: any[][] } },
            index: Key | null | undefined
          ) => {
            const coordinates = city.geometry.coordinates[0].map(
              (item: any[]) => [item[0], item[1]]
            );

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
        )}

        <TileLayer
          attribution="yassine"
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
export default MapChart;


