import React, { useState } from 'react';

const View = (deletePara, props) => {
  const getDatafromLS = () => {
    const data = localStorage.getItem('Btn');
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [Btn, setButton] = useState(getDatafromLS());

  return Btn.map((Paragraph) => (
    <div key={Paragraph.para}>
      <div key={Paragraph.para}>
        <h2> {Paragraph.heading} </h2>
        <div>{Paragraph.para}</div>
      </div>
    </div>
  ));
};

export default View;
