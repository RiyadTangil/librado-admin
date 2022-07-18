import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
});

const Table = ({ data }) => (
    <Document>
        <ItemsTable data={data} />
    </Document>
);

export default Table;