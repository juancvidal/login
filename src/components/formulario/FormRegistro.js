import React, { Component } from 'react';
import M from 'materialize-css';
import './materialize-social.css';
import './FormRegistro.css';
/*import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';*/
import Axios from 'axios';
import $ from "jquery";
class FormRegistro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSocialButtons: 0,
            showConfirmation: 0,
            celularError: 0,
            codigo: 0,
            correo: '',
            celular: '',
            primer_nombre: '',
            password: '',
            tipo_identificacion: '',
            identificacion: '',
            avatar: '',
            id_social: '',
            canal_registro: '',
            registro: -1,
            showOptions: 1,
            LoginSuccesfull: 0,
            showButtons: 0,
            showPreloader: 0,
            codigo_recovery: '',
            tipo_identificacion_recovery: '',
            identificacion_recovery: ''
        }
        //this.showSocialButtons = this.showSocialButtons.bind(this);
        /*this.responseFacebook = this.responseFacebook.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);*/
        this.validarCampos = this.validarCampos.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.showFields = this.showFields.bind(this);
        this.isRegistro = this.isRegistro.bind(this);
        this.isLogin = this.isLogin.bind(this);
        this.login = this.login.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.setJwt = this.setJwt.bind(this);
    }


    btnOnclick = () => {
        let nombre = document.getElementById('name');
        let nombreError = document.getElementById('nombre-error');
        let email = document.getElementById('email');
        console.log(email.value);
        let emailError = document.getElementById('correo-error');
        if (nombre.value == "") {
            nombreError.style.display = "block";
            nombreError.classList.remove("celular-animation");
            void nombreError.offsetWidth;
            nombreError.classList.add("celular-animation");
        } else if (this.validarEmail(email.value)) {
            this.nombre = nombre.value;
            this.email = email.value;
            this.closeModal();
        } else {
            emailError.style.display = "block";
            emailError.classList.remove("celular-animation");
            void emailError.offsetWidth;
            emailError.classList.add("celular-animation");
        }

    }
    closeModal = () => {
        M.Modal.getInstance(document.getElementById('modal1')).close();
        this.props.changeLogin();        
        this.reiniciarForm();
    }
    /*responseFacebook = (response) => {
        console.log(response);
        this.nombre = response.name;
        this.email = response.email;
        this.closeModal();
        window.FB.logout();
    }

    responseGoogle = (response) => {
        this.setState({
            primer_nombre: response.profileObj.name,
            correo: response.profileObj.email,
            celular: this.state.celular,
            avatar: response.profileObj.imageUrl,
            canal_registro: 'Google',
            id_social: response.profileObj.googleId
        });

        console.log(response.profileObj);
        Axios.post('http://localhost/api1/rest-api-authentication-example/api/create_user.php', {
            "primer_nombre": this.state.primer_nombre,
            "correo": this.state.correo,
            "password": this.state.password,
            "celular": this.state.celular,
            "avatar": this.state.avatar,
            "canal_registro": this.state.canal_registro,
            "id_social": this.state.id_social
        }
        )
            .then(res => {
                console.log(res.data.message);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        this.closeModal();
    }*/


    validarCodigo = () => {
        let codigo = document.getElementById('codigo');
        let codigoError = document.getElementById('codigo-error');

        let btn_confirm = document.getElementById('btn_confirm');
        let cont_celular = document.getElementById('cont_celular');
        let cont_confirm = document.getElementById('cont_confirm');
        let isValid = document.querySelector('#form_perfil').reportValidity();

        let codigo_validar = '';
        let normal_validate = '';
        if (this.state.codigo) {
            codigo_validar = this.state.codigo
            normal_validate = true;
        }
        else {
            codigo_validar = this.state.codigo_recovery
            normal_validate = false;

        }


        if (normal_validate) {
            if ( this.state.codigo) {
                if (isValid) {
                   // cont_confirm.style.display = 'none';
                    //btn_confirm.style.display = 'none';
                    //codigo.setAttribute("disabled", "true");
                    Axios.post('https://emmafig.com/api1/rest-authentication/api/create_user.php', {
                        //Axios.post('http://localhost/api1/rest-api-authentication-example/api/create_user.php', {
                        "primer_nombre": 'User',
                        "segundo_nombre": '',
                        "primer_apellido": 'User',
                        "segundo_apellido": '',
                        "correo": this.state.correo,
                        "celular": this.state.celular,
                        "password": this.state.password,
                        "tipo_identificacion": this.state.tipo_identificacion,
                        "identificacion": this.state.identificacion
                    }
                    )
                        .then(res => {
                            console.log(res.data.message);
                            this.login();
                        })
                        .catch((error) => {
                            if (error.response) {
                                let user_exits = document.getElementById('user_exits');
                                user_exits.style.display = 'block';
                                let btn_celular = document.getElementById('btn_celular');
                                btn_celular.style.display = 'block';
                                this.setState({
                                    showConfirmation: 0
                                });
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            }
                        });
                }
            } else {
                codigoError.style.display = "block";
                codigoError.classList.remove("celular-animation");
                void codigoError.offsetWidth;
                codigoError.classList.add("celular-animation");
            }

        }
        else {

            if (codigo.value == this.state.codigo_recovery) {

                const dataForm = new FormData();
                dataForm.append("id_usuario", this.state.id_usuario_recovery);
                Axios.post('https://emmafig.com/api1/recoveryPassword', dataForm).then(res => {
                    if (res.data.status == 202) {
                        alert(res.data.msg)
                        this.setState({
                            registro: -1,
                            showOptions: 1,
                            showButtons: 0,
                            showConfirmation: 0
                        })
                        this.showFields();
                        this.showOptions();
                        this.showButtons();
                        this.showConfirmation();
                        /*this.setState({
                            showOptions: 1,
                            showConfirmation: 0,
                            showButtons: 0,
                            showFields: -1
                        })*/

                        //this.showFields();

                    }
                })
            }
            else {
                codigoError.style.display = "block";
                codigoError.classList.remove("celular-animation");
                void codigoError.offsetWidth;
                codigoError.classList.add("celular-animation");
            }

        }


    }

    recoveryPhone = () => {
        let tipo_identificacion = document.getElementById('tipo_identificacion');
        let identificacion = document.getElementById('identificacion');
        const dataForm = new FormData();
        dataForm.append("tipo_identificacion", tipo_identificacion.value);
        dataForm.append("identificacion", identificacion.value);
        Axios.post('https://emmafig.com/api1/getContact', dataForm).then(res => {


            if (res.data.existe) {
                this.setState({
                    id_usuario_recovery: res.data.user.id_usuario
                });


                Axios.get("https://emmafig.com/api1/sendKey.php?celular=" + res.data.user.telefono1)
                    .then(resp => {
                        console.log(resp.data)
                        if (resp.data.estado == 'sent') {
                            this.setState({
                                codigo_recovery: resp.data.codigo,
                                codigo: null
                            });
                            this.setState({
                                showConfirmation: 1,
                                tipo_identificacion_recovery: tipo_identificacion.value,
                                identificacion_recovery: identificacion.value
                            });
                            let btn_enviar_codigo = document.getElementById('btn_enviar_codigo');
                            btn_enviar_codigo.style.display = 'none';
                            this.showConfirmationRecovery();
                        }

                    })
            }
            else {
                alert('El usuario no existe, por favor Ingrese al módulo de registro para continuar!')
            }

        })


    }

    login = () => {
        let password = document.getElementById('password');
        let tipo_identificacion = document.getElementById('tipo_identificacion');
        let identificacion = document.getElementById('identificacion');
        //Axios.post('http://localhost/api1/rest-api-authentication-example/api/login.php', {
        Axios.post('https://emmafig.com/api1/rest-authentication/api/login.php', {
            "password": password.value,
            "tipo_identificacion": tipo_identificacion.value,
            "identificacion": identificacion.value
        }
        )
            .then(res => {
                this.setJwt(res.data);
                this.setState({
                    LoginSuccesfull: 1
                })
                this.setState({
                    showPreloader: 0
                });
                this.showPreloader();
                this.closeModal();
            })
            .catch(function (error) {
                if (error.response) {
                    let login_failed = document.getElementById('login_failed');
                    login_failed.style.display = 'block';
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                }
            });
    }

    setJwt = (data) => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('id', data.id);
        localStorage.setItem('primer_nombre', data.primer_nombre);
    }

    validarCampos = () => {

        let isValid = document.querySelector('#form_perfil').reportValidity();
        let errortext = "Por favor digite un número de celular para continuar";
        let celular = document.getElementById('celular');
        let celularError = document.getElementById('celular-error');
        let passwordError = document.getElementById('password-error');
        let btn_celular = document.getElementById('btn_celular');
        let password = document.getElementById('password');
        let confirm_password = document.getElementById('confirm_password');
        let tipo_identificacion = document.getElementById('tipo_identificacion');
        let identificacion = document.getElementById('identificacion');
        let correo = document.getElementById('correo');
        let terminosError = document.getElementById('terminos-error');
        if (this.state.registro == 1) {//es registro
            if (isValid) {
                if (password.value !== confirm_password.value) {
                    errortext = "Los valores no coinciden";
                    passwordError.innerHTML = errortext;
                    passwordError.style.display = "block";
                    passwordError.classList.remove("celular-animation");
                    void passwordError.offsetWidth;
                    passwordError.classList.add("celular-animation");
                } else if (celular.value.length < 10) {
                    passwordError.style.display = "none";
                    if (celular.value.length < 10 && celular.value !== "") {
                        errortext = "El Número de celular debe ser de 10 digitos";
                    }
                    celularError.innerHTML = errortext;
                    celularError.style.display = "block";
                    celularError.classList.remove("celular-animation");
                    void celularError.offsetWidth;
                    celularError.classList.add("celular-animation");
                } else {
                    if (celular.value.length == 10) {
                        let prefijo = celular.value.substr(0, 3);
                        switch (prefijo) {
                            case '300':
                            case '301':
                            case '302':
                            case '304':
                            case '305':
                            case '310':
                            case '311':
                            case '312':
                            case '313':
                            case '314':
                            case '320':
                            case '321':
                            case '322':
                            case '323':
                            case '315':
                            case '316':
                            case '317':
                            case '318':
                            case '319':
                            case '350':
                            case '351':
                                this.celular = celular.value;

                                celularError.style.display = "none";
                                this.setState({
                                    celular: celular.value,
                                    password: password.value,
                                    tipo_identificacion: tipo_identificacion.value,
                                    identificacion: identificacion.value,
                                    correo: correo.value
                                });
                                Axios.post("https://emmafig.com/api1/rest-authentication/api/user_exist.php", {
                                    "tipo_identificacion": tipo_identificacion.value,
                                    "identificacion": identificacion.value
                                })
                                    .then(res => {
                                        if (res.data.existe == 'true') {
                                            let user_exits = document.getElementById('user_exits');
                                            user_exits.style.display = 'block';
                                        } else {
                                            btn_celular.style.display = "none";
                                            this.setState({
                                                showPreloader: 1
                                            })
                                            this.showPreloader();
                                            /*fetch("https://emmafig.com/api1/sendKey.php?celular=" + celular.value)
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        console.log(result);
                                                        if (result.estado == 'sent') {
                                                            this.setState({
                                                                showPreloader: 0
                                                            });
                                                            this.showPreloader()
                                                            console.log(result.codigo)
                                                            this.setState({
                                                                codigo: result.codigo,
                                                                codigo_recovery: null
                                                            });
                                                            this.setState({
                                                                showConfirmation: 0
                                                            });
                                                            //this.showConfirmation();
                                                            this.validarCodigo()
                                                        }
                                                    },
                                                    (error) => {
                                                        alert('Error');
                                                    }
                                                )*/
                                                //simular el envio de sms
                                                this.setState({
                                                    showPreloader: 0
                                                });
                                                this.showPreloader()
                                                
                                                this.setState({
                                                    codigo: 1234,
                                                    codigo_recovery: null
                                                });
                                                this.setState({
                                                    showConfirmation: 0
                                                });
                                                //this.showConfirmation();
                                                this.validarCodigo()
                                        }
                                    })


                                break;
                            default: errortext = "Número de celular no valido";
                                celularError.innerHTML = errortext;
                                celularError.style.display = "block";
                                celularError.classList.remove("celular-animation");
                                void celularError.offsetWidth;
                                celularError.classList.add("celular-animation");
                                break;
                        }

                    }
                }
                //this.props.changeComponente
            } else {
                terminosError.style.display = "block";
                terminosError.classList.remove("celular-animation");
                void terminosError.offsetWidth;
                terminosError.classList.add("celular-animation");
            }
        } else if (isValid) {//es login
            this.setState({
                password: password.value,
                tipo_identificacion: tipo_identificacion.value,
                identificacion: identificacion.value
            });
            this.login();
        }


    }

    componentDidMount() {
        $('form').on('focus', 'input[type=number]', function (e) {
            $(this).on('mousewheel.disableScroll', function (e) {
                e.preventDefault()
            })
        })
        $('form').on('blur', 'input[type=number]', function (e) {
            $(this).off('mousewheel.disableScroll')
        })
        
    }

    

    validarEmail = (valor) => {
        console.log(valor);
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test(valor)) {

            return true;
        } else {

            return false;
        }
    }
    isRegistro = () => {
        this.setState({
            registro: 1,
            showOptions: 0,
            showButtons: 1
        });
        this.showOptions()
        this.showButtons()
    }
    isLogin = () => {
        this.setState({
            registro: 0,
            showOptions: 0,
            showButtons: 1
        });
        this.showOptions()
        this.showButtons()
    }
    showOptions = () => {
        if (this.state.showOptions == 1) {
            return (
                <div id="cont_opciones">
                    <p id="titulo_opciones" className="center info-codigo">Registrate</p>
                    <p className="center info-codigo">Podrás participar de promociones en nuestros servicios, además recibirás noticias de eventos <br />totalmente gratis</p>
                    <div id="btn_ingresar" className="row">
                        <a className="waves-light btn col s10 offset-s1" id="btn_ingresar_a" onClick={this.isLogin}>Ingresar</a>
                    </div>
                    <div id="btn_registro" className="row">
                        <a className="waves-light btn col s10 offset-s1" onClick={this.isRegistro}>Registrarse</a>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }

    /*regresar = () => {
        this.setState({
            registro: -1,
            showOptions: 1
        })
        this.showFields();
        this.showOptions();
        document.getElementById("form_perfil").reset();
        let login_failed = document.getElementById('login_failed');
        login_failed.style.display = 'none';
    }*/

    reiniciarForm = () => {
        this.setState({
            registro: -1,
            showOptions: 1,
            showButtons: 0,
            showConfirmation: 0
        })
        this.showFields();
        this.showOptions();
        this.showButtons();
        this.showConfirmation();
        document.getElementById("form_perfil").reset();
        /*let login_failed = document.getElementById('login_failed');
        login_failed.style.display = 'none';
        let user_exits = document.getElementById('user_exits');
        user_exits.style.display = 'none';*/
    }

    showPreloader = () => {
        if (this.state.showPreloader == 1) {
            return (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>)
        }
        else {
            return null;
        }

    }

    showFields = () => {

        if (this.state.registro == 1) {
            let alertUser = document.getElementById('user_exits');
            if (alertUser) {
                alertUser.style.display = 'none';
            }
            return (
                <div id="cont_registro">
                    <CamposPorDefecto text='Registro' />
                    <div id="cont_correo" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">https</i>
                            <input id="correo" type="email" className="validate" />
                            <label htmlFor="password">Correo electrónico</label>
                        </div>
                    </div>
                    <div id="cont_password" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">https</i>
                            <input id="password" type="password" className="validate" required />
                            <label htmlFor="password">Contraseña *</label>
                        </div>
                    </div>
                    <div id="cont_confirm_password" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">https</i>
                            <input id="confirm_password" type="password" className="validate" required />
                            <label htmlFor="confirm_password">Confirmar contraseña *</label>
                            <p id="password-error" className="center cel-error">Por favor digite su confirmación de password</p>
                        </div>
                    </div>
                    <div id="cont_celular" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">phone</i>
                            <input  id="celular" type="number" className="validate noscroll" minLength="10" required />
                            <label htmlFor="celular">Celular *</label>
                            <p id="celular-error" className="center cel-error">Por favor digite un número de celular para continuar</p>
                            <div>
                                <small id="phone_msg" className="  celular-animation validate_phone_msg">
                                    Recuerda que tu número de celular debe ser válido, ya que por este medio te enviaremos información personal y confidencial
                                </small>
                            </div>   
                        </div>
                    </div>
                    <div id="cont_terminos" className="row">
                        <div className="input-field col s12 l12">
                            <p>
                                <label>
                                    <input id="indeterminate-checkbox" type="checkbox" onClick={
                                        () => {
                                            let terminosError = document.getElementById('terminos-error');
                                            terminosError.style.display = 'none';
                                        }
                                    } required />
                                    <span>He leído y acepto los
                                    <a href="#/terminos_condiciones" target="_blank"> Términos y condiciones</a></span>
                                </label>
                            </p>
                            <br></br>
                            <p id="terminos-error" className="center cel-error">Debe aceptar los términos y condiciones para continuar</p>
                        </div>
                    </div>
                    <div id="user_exits" className='alert alert-danger'>Registro fallido. la identificación ya existe.</div>
                    {
                        this.showPreloader()
                    }
                </div>
            )
        } else if (this.state.registro == 0) {
            let alertLogin = document.getElementById('login_failed');
            if (alertLogin) {
                alertLogin.style.display = 'none';
            }
            return (
                <div id="cont_login">
                    <CamposPorDefecto text='Ingreso' />
                    <div id="cont_password" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">https</i>
                            <input id="password" type="password" className="validate" required />
                            <label htmlFor="password">Contraseña *</label>
                            <p id="password-error" className="center cel-error">Por favor digite su contraseña</p>
                        </div>
                    </div>
                    <div id="login_failed" className='alert alert-danger'>Login fallido. Identificación o Contraseña incorrectos.</div>
                    <a onClick={(e) => { e.preventDefault(); this.showRecoveryPass() }} href='!#'>Olvidaste tu contraseña?</a>
                    <br></br>
                    <br></br>

                </div>
            )
        }
        else if (this.state.registro === 2) {

            return (
                <div id="cont_login">
                    <CamposPorDefecto text='proceso de recuperación' />
                    <div id="btn_enviar_codigo" className="row">
                        <a className=" waves-light btn col s10 offset-s1" id="btn_recovery" onClick={this.recoveryPhone}>Enviar código</a>
                    </div>




                </div>
            )

        }
        else if (this.state.registro === -1) {
            return null;
        }
    }
    showConfirmationRecovery = () => {
        if (this.state.showConfirmation == 1) {
            return (
                <div id='cont_confirm2'>
                    <p id="info-confirm2" className="center info-codigo">Por favor ingresa el código de confirmación que se envió a tu celular</p>
                    <div id="cod-confirm2" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">confirmation_number</i>
                            <input id="codigo2" type="number" className="validate" required />
                            <label htmlFor="codigo">Código</label>
                            <p id="codigo-error2" className="center cel-error">Por favor digite el código de confirmación correctamente</p>
                        </div>
                    </div>

                    <div id="btn_confirm" className="row">
                        <a className="waves-effect waves-light btn col s10 offset-s1" onClick={this.validarCodigoRecovery}>Confirmar Código</a>
                    </div>
                </div>

            );
        } else {
            return null;
        }

    }
    showConfirmation = () => {
        if (this.state.showConfirmation == 1) {
            return (
                <div id='cont_confirm'>
                    <p id="info-confirm" className="center info-codigo">Por favor ingresa el código de confirmación que se envió a tu celular</p>
                    <div id="cod-confirm" className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="material-icons prefix">confirmation_number</i>
                            <input id="codigo" type="number" className="validate" required />
                            <label htmlFor="codigo">Código</label>
                            <p id="codigo-error" className="center cel-error">Por favor digite el código de confirmación correctamente</p>
                        </div>
                    </div>
                    <div id="btn_confirm" className="row">
                        <a className="waves-effect waves-light btn col s10 offset-s1" onClick={this.validarCodigo}>Confirmar Código</a>
                    </div>
                </div>

            );
        } else {
            return null;
        }

    }
    showButtons() {
        if (this.state.showButtons == 1) {
            return (
                <div>
                    <div id="btn_celular" className="row">
                        <a className=" waves-light btn col s10 offset-s1" id="btn_aceptar_form_login" onClick={this.validarCampos}>Aceptar</a>
                    </div>
                    <div id="btn_cancelar" className="row">
                        <a className=" waves-light btn col s10 offset-s1" onClick={this.reiniciarForm}>Regresar</a>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    showRecoveryPass = () => {


        this.setState({
            registro: 2,
            showOptions: 0,
            showButtons: 0
        });
        //this.showFields();
        this.showOptions()
        this.showButtons()

    }


    /*showSocialButtons = () => {
        if (this.state.showSocialButtons == 1) {
            return (
                <div>
                    <p className="center info-codigo">¡Felicitaciones! tu código ha sido confirmado</p>
                    <p className="center info-codigo">Para continuar con el registro puedes escoger una de las siguientes opciones</p>
                    <FacebookLogin
                        autoLoad={true}
                        reauthenticate={true}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <button className="waves-effect waves-light btn social facebook" onClick={renderProps.onClick}><i className="fa fa-facebook"></i> Registro con facebook</button>
                        )}
                    />
                    <GoogleLogin
                        clientId="561278280469-2log5p766o9f84ednmr84mstiotqsdir.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        buttonText="Registro con Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        render={renderProps => (
                            <button className="waves-effect waves-light btn social google" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"></i> Registro con google</button>
                        )}
                    />
                    <p className="center">O<br />Con tu correo personal</p>
                    <div className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="small material-icons prefix">person</i>
                            <input id="name" type="text" className="validate" required="" aria-required="true" />
                            <label htmlFor="name">Nombre *</label>
                            <p id="nombre-error" className="center cel-error">Por favor digite su nombre</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 l10 offset-l1">
                            <i className="small material-icons prefix">email</i>
                            <input id="email" type="email" className="validate" required="" aria-required="true" />
                            <label htmlFor="email">Correo Personal *</label>
                            <p id="correo-error" className="center cel-error">Correo no válido</p>
                        </div>
                    </div>
                    <div className="row">
                        <a className="waves-effect waves-light btn col s10 offset-s1" onClick={this.btnOnclick}>Registrarse</a>
                    </div>
                    <div className="row">
                        <a className="waves-effect waves-light btn col s10 offset-s1" onClick={this.props.changeComponente}>Cancelar</a>
                    </div>
                </div>
                );
    
            }
        }*/

    stopScroll = (event) => {
        console.log('focus');
        //event.preventDefault(event);
    }

    render() {
         
        return (

            <form id="form_perfil" noValidate>
                {
                    this.showOptions()
                }
                {
                    this.showFields()
                }
                {
                    this.showConfirmation()
                }

                {
                    this.showButtons()
                }
            </form>
        );

    }
}
function CamposPorDefecto(props) {
    return <div><p id="titulo_defecto" className="center info-codigo">!Bienvenido¡</p>
        <p className="center info-codigo">Para continuar con el {props.text} por favor ingresa los siguientes datos</p>

        <div className="row">
            <div className="input-field col s12 l10 offset-l1">

                <select id="tipo_identificacion" className="browser-default" defaultValue='1' required>
                    <option value="" disabled>Tipo de Identifcación *</option>
                    <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                    <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                    <option value="Cédula de extranjería">Cédula de extranjería</option>
                </select>

                <p id="tipo_iden_error" className="center cel-error">Por favor Escoja un tipo de Identifcación</p>
            </div>
        </div>
        <div id="cont_identificacion" className="row">
            <div className="input-field col s12 l10 offset-l1">
                <i className="material-icons prefix">assignment_ind</i>
                <input id="identificacion" type="number" className="validate"
                    onFocus={
                        () => {
                            let alertIdent = document.getElementById('user_exits');
                            let alertLogin = document.getElementById('login_failed');
                            if (alertIdent) {
                                alertIdent.style.display = 'none';
                            }
                            if (alertLogin) {
                                alertLogin.style.display = 'none';
                            }
                        }
                    } required />
                <label htmlFor="identificacion">Identificación *</label>
                <p id="identificacion-error" className="center cel-error">Por favor digite un numero de identificacion para continuar</p>
            </div>
        </div>
    </div>;
}


export default FormRegistro; // Don’t forget to use export default!