import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({

    description: {
        width: "60%",
    },
    xyz: {
        width: "40%",
    },
});

const TableHeader = ({ title }) => {
    const head = title.map((item, index) => (

        <Text style={{
            width: index === 1 ? "60%" : "10%",
            textAlign: 'center',
            backgroundColor: '#FF914D',
            fontSize: "10px",
            paddingVertical: "5px"
        }}>{item}</Text>

    ));
    return <Fragment>{head}</Fragment>;
};

export default TableHeader;