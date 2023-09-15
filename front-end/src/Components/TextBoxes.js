import React, { Component } from 'react';

class TextBoxes extends Component {
    render() {
      return (
        <div className="text-boxes">
          <div className="text-box">
            <label htmlFor="textbox1">Textbox 1</label>
            <input type="text" id="textbox1" name="textbox1" />
          </div>
          <div className="text-box">
            <label htmlFor="textbox2">Textbox 2</label>
            <input type="text" id="textbox2" name="textbox2" />
          </div>
          {/* Add more text boxes as needed */}
        </div>
      );
    }
  }

  export default TextBoxes;