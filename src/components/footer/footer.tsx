import React from 'react';

const footerStyle: React.CSSProperties = {
  background: "rgb(100, 109, 115, 0.1)",
  borderTop: "black 1px solid",
  padding: "20px 0px 20px 0px",
  position: "relative",
  width: "100%",
  bottom: "0",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center"
}

interface FooterProps {
}

interface FooterState {
}

export class Footer extends React.Component<FooterProps, FooterState> {
  public render() {
    return (
      <div style={footerStyle}>Lucival Nascimento 2016227</div>
    );
  };
}