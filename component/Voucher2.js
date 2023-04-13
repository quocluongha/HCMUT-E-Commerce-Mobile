import React, { useState } from "react";
// import RadioButton from 'react-native-radio-buttons-group';
import { Pressable, StyleSheet, Text, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import DropDownPicker from 'react-native-dropdown-picker';

function Voucher2() {
  const radioButtonsData = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "$3.00   Standard Delivery(4 to 7 days)",
      value: "st",
      labelStyle: styles.radio_option
    },
    {
      id: "2", // acts as primary key, should be unique and non-empty string
      label: "$4.00   Priority Delivery(1 to 3 days)  ",
      value: "pr",
      labelStyle: styles.radio_option
    }
  ];

  const [radioButtons, setRadioButtons] = useState("option2"); //pass in our data to this state. This will store the current user's choice
  // const setValue = (value) => {
  //   // var newArray = value.filter((item) => item.selected === true); //get the items that are selected
  //   // setRadioButtons(newArray[0].value); //set the selected value in this Hook
  //   // value.forEach((element) => {
  //   // if (value[0].selected) value[0].selected = false;
  //   // else value[0].selected = true;
  //   // });
  // };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" }
  ]);

  return (
    <View>
      <View>
        <Text>Voucher Discount</Text>
        <Text>Click on voucher name to view details</Text>
        <Text>Shipping Method</Text>
      </View>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <RadioGroup
        radioButtons={radioButtonsData}
        onPress={setValue}
        layout="col"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  },
  radio_option: {
    padding: 20,
    borderWidth: 1,
    borderColor: "thistle"
  }
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 2
  },
  text: {
    color: "#000",
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
    textTransform: "uppercase"
  }
});

export default Voucher2;
