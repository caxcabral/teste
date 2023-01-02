import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Field(props) {
  return (
    <div><span className="field" key={props.name}>{props.name}: {props.value}</span><br></br></div>
  )
}

function Input(props) {
  return (
    <div className="input-group">
      <input 
        className="input-field" 
        onChange={props.onChange} 
        text={props.text}
      >{props.placeholder}</input>
      <button className="input-button" onClick={props.onClick}>Search</button>
    </div>
  )
}

function FieldGroup(props) {
  const renderField = (name, value) => {
    return <Field
      name={name}
      value={value}
      key={name}
    />
  }

  return (
    <div className="field-group">
      {
        Object.keys(props.fields).map(key => renderField(key, props.fields[key]))
      }
    </div>
  )
}


class Ui extends React.Component {
  constructor(props) {
    super(props);

    this.placeholders = {
        CEP: "00000-000",
        Logradouro: "XXXXXXXXXXXXX",
        Complemento: "XXXXXXXXXXXX",
        Bairro: "XXXXXXXXXXXXXX",
        Cidade: "XXXXXXXXXXXXXX",
        UF: "XX",
    }

    this.state = {
      fields: this.placeholders,
      inputCep: '',
    }

    this.cepInvalidoData = {
        CEP: "CEP Inválido",
        Logradouro: null,
        Complemento: null,
        Bairro: null,
        Cidade: null,
        UF: null,
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mapCepData = this.mapCepData.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  reset() {
    this.setState({...this.state, fields: this.placeholders })
  }

  cleanCep(cep) {
    console.log(cep)
    const cepString = cep.toString();
    return cepString.replace(/[^\d]/g, "");
  }

  mapCepData(data) {
    return {
        CEP: data.cep,
        Logradouro: data.logradouro,
        Complemento: data.complemento,
        Cidade: data.localidade,
        UF: data.uf,
    }
  }

  handleChange(evt) {
    this.setState({...this.state, inputCep: evt.target.value})
  }

  handleSearch() {
    const cep = this.cleanCep(this.state.inputCep)
    console.log(cep)
    const url = this.props.getUrl(cep)
    fetch(url)
      .then(res => res.json())
      .then(json => this.mapCepData(json))
      .then(data => this.setState({...this.state, fields: data}))
      .catch(error => this.reset())
  }

  render () {
    return (
      <div className="app">
        <Input onClick={this.handleSearch} onChange={this.handleChange} text={"Digite o CEP"} />
        <FieldGroup fields={this.state.fields}/>
      </div>
    )
  }

}

function App() {
  const getApiUrl = (cep) => `https://viacep.com.br/ws/${cep}/json`
  return (
    <Ui getUrl={getApiUrl} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)