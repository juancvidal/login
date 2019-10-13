import React, { Component } from 'react';
import './Modal.css';
import M from 'materialize-css';
import FormRegistro from '../formulario/FormRegistro';
import "materialize-css/dist/css/materialize.min.css";
import $ from 'jquery';
class Modal extends Component {

    constructor(props) {
        super(props);
        this.modal = 1;

    }



    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        var elems = document.getElementById('modal1');
        var instances = M.Modal.init(elems, options);

    }
    render() {

        return (
            <div>
                <a className="waves-effect waves-light btn modal-trigger"  data-target="modal1">Modal </a>
                <div id='modal1' className="modal">
                    <div className="modal-content">
                        <FormRegistro changeComponente={this.props.changeComponente} changeLogin={this.props.changeLogin} />
                    </div>
                </div>
            </div>



        );

    }
}

export default Modal; // Don’t forget to use export default!