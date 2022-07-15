import React from 'react';

import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';

const Pdf = ({item}) => {
    return (
        <Document>
            <Page >
                <Text>{item?.happiness_score}</Text>
            </Page>
        </Document>
    )
};

export default Pdf;