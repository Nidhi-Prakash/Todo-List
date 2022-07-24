import React from 'react';
import "./footer.scss";
import { AiOutlineClear } from "react-icons/ai";

const Footer = ({ remainingtask, clearall }) => {
  return (
    <div className='footer'>
      <p>You have {remainingtask} pending tasks</p>
      <div>
        <button className='clearall-btn' onClick={clearall}>Clear All <AiOutlineClear className='broom-icon' /></button>
      </div>
    </div>
  );
};

export default Footer;