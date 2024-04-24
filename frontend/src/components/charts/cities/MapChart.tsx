"use client";
import { useState, type FC } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "@/lib/moroccoGeo";
import L, { divIcon } from "leaflet";

interface MapChartProps {}

const MapChart: FC<MapChartProps> = ({}) => {
  const center: number[] = [29.993345423895818, -9.692883945423924];

const [onselect, setOnselect] = useState({});
/* function determining what should happen onmouseover, this function updates our state*/
const highlightFeature = (e:any) => {
  var layer = e.target;
  const { cartodb_id, region } = e.target.feature.properties;
  setOnselect({
    region: region,
    cartodb_id: cartodb_id,
  
  });
  layer.setStyle({
    weight: 1,
    color: "black",
    fillOpacity: 1,
  });
};

/*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
const resetHighlight = (e:any) => {
  setOnselect({});
  e.target.setStyle(style(e.target.feature));
};


console.log(onselect);
// this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions  
const onEachFeature = (feature:any, layer:any) => {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
};

const mapPolygonColorToDensity = (cartodb_id:number) => {
 return cartodb_id > 1
   ? "#a50f15"
   : cartodb_id > 3
   ? "#de2d26"
   : cartodb_id > 5
   ? "#fb6a4a"
   : cartodb_id > 6
   ? "#fc9272"
   : cartodb_id > 7
   ? "#fcbba1"
   : "#fee5d9";
};

const style = (feature :any) => {
  return {
    fillColor: mapPolygonColorToDensity(feature.properties.cartodb_id),
    weight: 1,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.5,
  };
};

const mapStyle = {
  height: "60VH",
  width: "60vw",
  margin: "0 auto",

};

  const customMarkerIcon = (name:string) =>
    divIcon({
      html: name,
      className: "icon",
    });

// display name city
  const setIcon = ({ properties }:any, latlng:any) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.region) });
  };



const feature = statesData.features.map((feature) => {
  return feature;
});

  return (
    <div className="w-[100px] h-auto">
      <MapContainer
        center={center as any}
        zoom={4}
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>when user hover on city</div>

        {statesData && (
          <GeoJSON
            data={statesData.features as any}
            // style={style}
            onEachFeature={onEachFeature}
            pointToLayer={setIcon}
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.7,
              weight: 1,
              color: "#666",
              opacity: 1,
              dashArray: "",
            }}
          />
        )}

        {/* {statesData.features.map((city, index) => {
          const coordinates = city.geometry.coordinates[0].map((item) => [
            item[0],
            item[1],
          ]);

          return (
            <Polygon
              key={index}
              pathOptions={{
                fillColor: "#FD8D3C",
                fillOpacity: 0.7,
                weight: 5,
                color: "#666",
                opacity: 1,
                dashArray: "",
              
              }}
              positions={coordinates}
            />
          );
        })} */}
      </MapContainer>
    </div>
  );
};
export default MapChart;
