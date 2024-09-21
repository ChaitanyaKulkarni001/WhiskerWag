import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledWrapper>
      <label htmlFor="switch" className="switch">
        <input
          id="switch"
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "dim"} // Invert the condition
        />
        <span className="slider" />
        <span className="decoration" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    cursor: pointer;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    --background: #20262c;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow: inset 8px -4px 0px 0px #ececd9, -4px 1px 4px 0px #dadada;
    background: var(--background);
    transition: 0.5s;
  }

  .decoration {
    position: absolute;
    content: "";
    height: 2px;
    width: 2px;
    border-radius: 50%;
    right: 20%;
    top: 15%;
    background: #e5f041e6;
    backdrop-filter: blur(10px);
    transition: all 0.5s;
    box-shadow: -7px 10px 0 #e5f041e6, 8px 15px 0 #e5f041e6, -17px 1px 0 #e5f041e6,
      -20px 10px 0 #e5f041e6, -7px 23px 0 #e5f041e6, -15px 25px 0 #e5f041e6;
  }

  input:checked ~ .decoration {
    transform: translateX(-20px);
    width: 10px;
    height: 10px;
    background: white;
    box-shadow: -12px 0 0 white, -6px 0 0 1.6px white, 5px 15px 0 1px white,
      1px 17px 0 white, 10px 17px 0 white;
  }

  input:checked + .slider {
    background-color: #5494de;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px #efdf2b, 0 0 10px 0px #efdf2b;
  }
`;

export default ThemeToggleButton;
