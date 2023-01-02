import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Field(props) {
  return (
    <span className="field">{props.name}: props.value</span>
  )
}

function Input(props) {
  return (
    <div className="input-group">
      <input className={props.className}>{props.text}</input>
      <button className="input-button" onClick={props.onClick}></button>
    </div>
  )
}