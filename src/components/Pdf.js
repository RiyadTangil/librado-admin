import React from 'react';
import {
    Document,
    Font,
    Page,
    Text,
    Image,
    StyleSheet,
    View,
}
    from '@react-pdf/renderer';
// import hader_img from '../../assets/login_bg.png'
import header_img from './../assets/PeopleACCEL 11.png'
import emoji from './../assets/kiss-face-emoji-icon-vector-26733026.jpg'
import Table from './table/Table';

const Pdf = ({ item, img, name, email }) => {
    // console.log(item?.target_submission,"item?.target_submission")
    const data = {
        id: "5df3180a09ea16dc4b95f910",
        items: [
            {
                sr: 1,
                desc: "desc1",
                xyz: 5,
            },
            {
                sr: 2,
                desc: "desc2",
                xyz: 6,
            },
        ],
    };
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 18,
            margin: 5,
            fontFamily: 'Oswald',
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
            fontFamily: 'Oswald',
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman',
        },
        img_box: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center"

        },
        score_box: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: "center"

        },

        image: {
            marginVertical: 15,
            marginHorizontal: 5,
            // width: "100%"

        },
        topImg: {
            marginVertical: 15,
            marginHorizontal: 5,
            borderRadius: '50%',
            width: "100px",
            height: "100px",

        },
        header: {
            fontSize: 20,
            marginBottom: 20,
            margin: 12,
            textAlign: 'center',
            color: 'grey',
        },
        headerBox: {
            padding: 5,
            backgroundColor: '#FF914D',
            textAlign: 'center',
            marginVertical: 5,
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
        score: {
            fontSize: 16,
            padding: 8,
            borderRadius: "8px",
            backgroundColor: '#FF914D',
            textAlign: 'center',

        },
        halfWidth: {
            padding: 5,
            backgroundColor: '#FF914D',
            textAlign: 'center',
            width: "50%",

        },
    });

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
    });
    const Subtitle = ({ children, ...props }) => (
        <Text style={styles.subtitle} {...props}>
            {children}
        </Text>
    );

    return (
        <Document>
            <Page style={styles.body} wrap>

                <Image
                    style={styles.image}
                    src={header_img}
                />
                {/* <Text style={styles.header} fixed>
                    {email ? email : "email address"}
                </Text> */}
                <View style={styles.img_box}>
                    <View>

                        <Text style={styles.title}>Company Name:  <span style={styles.header}>  {name ? name : " Name"}</span></Text>
                        <Text style={styles.title}>Email:   <span style={styles.header}>  {email ? email : "Email"}</span></Text>


                    </View>
                    <Image
                        style={styles.topImg}
                        src={img && img}
                    />

                </View>
                <View style={styles.headerBox}>

                    <Text >INSIGHT REPORT</Text>

                </View>
                <Text style={styles.text}>INSIGHT REPORTAccelerating Performance with culture and organizational performance 5,</Text>
                <View style={styles.halfWidth}>

                    <Text style={{ fontSize: 17 }}>OVERALL HAPPINESS FACTOR</Text>

                </View>
                <Text style={styles.text}>The overall hapiness score is based on average calculation across the entire set of questions. The scale ranges from 0-10 and each number is associated with an emoticon</Text>

                <View style={styles.score_box}>

                    <Text style={styles.score}> Score:  {item.happiness_score / item.selectionTime} </Text>
                    <Image
                        style={{ width: 50, height: 50 }}
                        src={emoji}
                    />
                </View>
                <View style={styles.halfWidth}>

                    <Text style={{ fontSize: 17 }}>CULTURAL STATEMENTS</Text>

                </View>
                <Text style={styles.text}>Showcasing the gap in current and target operational cultural value statements for most likely and least likely among them </Text>

                <Table data={item?.target_submission} />
                <Image
                    style={styles.image}
                    src="https://panampost.com/wp-content/uploads/don-quijote-lessons.jpg"
                />





                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    )
};

export default Pdf;