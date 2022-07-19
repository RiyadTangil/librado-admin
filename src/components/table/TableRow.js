import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    others: {
        width: "10%", textAlign: "center",
        fontSize: "12px"
    },
    stm: {
        width: "60%", textAlign: "center",
        fontSize: "12px"
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
            <Text style={styles.others}>{index + 1}</Text>
            <Text style={styles.stm}>{item?.qsn}</Text>
            <Text style={styles.others}>{item?.mLikely}</Text>
            <Text style={styles.others}>{item?.lLikely}</Text>
            <Text style={styles.others}>{item?.selectionTimes || 1}</Text>

        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

export default TableRow;