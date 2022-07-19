import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        border: "1px solid gray",


    },
});

const ItemsTable = ({ data, title }) => (
    <View style={styles.tableContainer}>
        <TableHeader title={["Sl", "Statements", "Most_likely", "Least_likely", "Selected"]} />
        <TableRow items={data} />
        {/*<TableFooter items={data.items} />*/}
    </View>
);

export default ItemsTable;