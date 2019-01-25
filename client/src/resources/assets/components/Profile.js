import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import Web3 from 'web3';
import bip39 from 'bip39';
import thisrtparty from 'ethereumjs-wallet/thirdparty';


class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: 'OK',
            name: localStorage.getItem("name"),
            img_url: localStorage.getItem("img_url"),
            email: localStorage.getItem("email"),
            file: 'null',
            account: [],
            address: [],
            privatekey: [],
            seedphase: [],
            password: [],
            test: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.usnChange = this.usnChange.bind(this);
        this.dnChange = this.dnChange.bind(this);
        this.createAccounts = this.createAccounts.bind(this);
        this.confirmPassWord = this.confirmPassWord.bind(this);

    }

    handleChange(event) {

        this.setState({
            img_url: URL.createObjectURL(event.target.files[0])
        })
    }

    usnChange(event) {
        this.setState({
            user_name: event.target.value
        })
    }

    dnChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    setData() {
        this.setState({
            img_url: localStorage.getItem("img_url")
        })
    }

    confirmPassWord(event) {
        this.setState({
            password: event.target.value
        })
    }

    /**
     *  @param createAccounts create account
     */
    createAccounts() {
        var web3 = new Web3(
            new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545")
        )
        
        var test = bip39.generateMnemonic();

        this.setState({
            seedphase: test
        })

        console.log(test)
        console.log(web3.eth.accounts.create(test));
    }

    render() {
        return (
            <Grid className="form_login">
                <label> Change your information</label>
                <Col>
                </Col>
                <Col lg={6}>
                    <img src={this.state.img_url} id="avatar_login" width="100" height="100" alt="" />
                </Col>
                <Col lg={6}>
                    <input type="file" accept="img, mp4" onChange={this.handleChange} />
                </Col>
                <Col lg={6}>
                    <input placeholder="User Name" value={this.state.user_name} onChange={this.usnChange} />
                </Col>
                <Col lg={6}>
                    <input placeholder="Display Name" value={this.state.name} onChange={this.dnChange} />
                </Col>
                <Col>
                    <input placeholder="Email" value={this.state.email} readOnly />
                </Col>

                <p> Confirm</p>
                <Col>
                    <label>Enter your pass</label>
                    <input type="" placeholder="Password" value={this.state.password} onChange={this.confirmPassWord} />
                </Col>
                <Col>
                    <button type="submit" onClick={this.createAccounts}>Submit</button>
                </Col>

                <Col>
                    <label>Your seedphase is:</label>
                </Col>
                <input value={this.state.seedphase} style={{ width: 600 }} readOnly />

                <Col>
                    <button>import </button>
                </Col>
            </Grid>


        )
    }
}

export default FormLogin;