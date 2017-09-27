import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AutoCompleteInput = ({ defaultValue, callBack, show, getValue }) => {
  let input = null;
  if (show) {
    input = (
      <GooglePlacesAutocomplete
        placeholder={defaultValue}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          if (getValue != null) {
            getValue(data.description);
          }
          if (callBack != null) {
            callBack(data.description);
          }
        }}
        getDefaultValue={() => {
          return ""; // text input default value
        }}
        textInputProps={{
          onChangeText: getValue
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ",
          language: "es", // language of the results
          types: "address", // <===== muestra resultados de calles
          components: "country:cl" // <===== solo muestra resultados dentro de chile
        }}
        styles={{
          textInputContainer: {
            width: 300,
            minHeight: 50,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: "rgba(0,0,0,0)"
          },
          textInput: {
            maxWidth: 300,
            height: 50,
            borderRadius: 1,
            backgroundColor: "#FFFFFF",
            color: "#444444",
            overflow: "hidden",
            fontSize: 16,
            marginTop: 5,
            elevation: 3
          },
          listView: {
            maxWidth: 300,
            margin: 0,
            position: "absolute",
            marginTop: 51,
            marginLeft: 8,
            marginRight: 8,
            maxHeight: 500,
            height: "auto",
            borderColor: "#000000",
            backgroundColor: "#FFFFFF",
            zIndex: 10
          },
          row: {
            maxWidth: 290,
            borderTopColor: "red"
          },
          poweredContainer: {
            width: 0,
            height: 0
          }
        }}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }

  return input;
};

export default AutoCompleteInput;
