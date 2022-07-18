import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    description: {
        width: "60%",
    },
    xyz: {
        width: "40%",
    },
});

const TableRow = ({ items }) => {
    const rows = items.map((item, index) => (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "4px",
            backgroundColor: index % 2 === 0 ? "#D3D3D3" : "white"
        }} key={item.qsn}>
            <Text style={{ width: "10%", textAlign: "center" }}>{index + 1}</Text>
            <Text style={{ width: "80%", textAlign: "center" }}>{item?.qsn}</Text>
            <Text style={{ width: "10%", textAlign: "center" }}>{item?.selectionTimes || 1}</Text>

        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

export default TableRow;