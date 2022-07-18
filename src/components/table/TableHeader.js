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
            width: index === 1 ? "70%" : "15%",
            textAlign: 'center',
            backgroundColor: '#FF914D',
        }}>{item}</Text>

    ));
    return <Fragment>{head}</Fragment>;
};

export default TableHeader;