'use client'
import { useState, type FC } from "react";
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
  const [activeCity, setActiveCity] = useState(false);


  /* function determining what should happen onmouseover, this function updates our state*/
  const highlightFeature = (e: any) => {
    var layer = e.target;
    const { cartodb_id, region } = e.target.feature.properties;
    setOnselect({
      region: region,
      cartodb_id: cartodb_id,
    });
    layer.setStyle({
      weight: 2,
      color: "white",
      fillOpacity: 1,
      
    });
  };



  /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
  const resetHighlight = (e: any) => {
    setOnselect({});
    e.target.setStyle(style(e.target.feature));
 
  };


  const whenClick = (e: any) => {

    e.target.setStyle(styleHover(e.target.feature));
  

  };

  console.log(onselect);
  // this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      // mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: whenClick,
    });
  };

  const mapPolygonColorToDensity = (cartodb_id: number) => {
    return cartodb_id == 1
      ? "#a50f15"
      : cartodb_id > 3
      ? "#de2d26"
      : cartodb_id > 5
      ? "#fb6a4a"
      : cartodb_id > 6
      ? "#fc9272"
      : cartodb_id > 7
      ? "#fcbba1"
      : "#fc9272";
  };


  // style for each part from map
  const style = (feature: any) => {
    return {
      fillColor: mapPolygonColorToDensity(feature.properties.cartodb_id),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "",
      fillOpacity: 0.5,
    };
  };


  const styleHover = (feature: any) => {
    return {
      fillColor: 'black',
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "",
      fillOpacity: 0.5,
    };
  };

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

  const feature = statesData.features.map((feature) => {
;
    return feature;
  });

  const coordinate = statesData.features.map((feature) => {
    const coordinates = feature.geometry.coordinates[0].map((item) => [
      item[0],
      item[1],
    ]);
    return coordinates;
  });

  return (
    <div className="z-10 flex justify-center flex-col lg:w-1/2  w-full   h-auto bg-white rounded-md my-4 p-4">
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
        <TileLayer
          attribution="yassine"
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        />

        {cities.map((city, index) => {
          return (
            <Marker
              key={index}
              position={[Number(city.lng), Number(city.lat)]}
              // onClick={() => {
              //   return setActiveCity(city);
              // }}
            />
          
          
          );
        })}

        {/* // Popup  */}

        {/* {activeCity && (
          <Popup position={center as any} minWidth={90}>
            <span>Marker is 
              {onselect && onselect?.region }
              </span>
          </Popup>
        )} */}

        {statesData.features.map((city, index) => {
          const coordinates = city.geometry.coordinates[0].map((item) => [
            item[0],
            item[1],
          ]);

          return (
            <GeoJSON
              key={index}
              data={statesData.features as any}
              // style={style}
              onEachFeature={onEachFeature}
              pointToLayer={setIcon}
              pathOptions={style as any}
            />
          );
        })}
        <div className="z-50">Hola</div>
      </MapContainer>
    </div>
  );
};
export default MapChart;
