import React, { Component } from 'react'
import './form.css'
import Profile from '../profile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'



class Login extends Component {
    state = {

        email: '',
        password: '',
        image: 'login',
        check: false,
        direct: false,
        adding: false,


        home: false,

        size: window.innerWidth,
    }



    size = () => {
        const wide = () => {
            this.setState({
                size: window.innerWidth
            })
        }

        window.addEventListener('resize', wide, false)


    }

    componentDidMount() {
        this.size()


    }

    handleSeach = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value })
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.anyplay) {
            this.setState({
                accounts: nextProps.anyplay.accounts,
            })
        }
    }

    submit = event => {
        event.preventDefault();


        //  const data = this.state.accounts.filter(e => e.user_email === this.state.email && e.user_password === this.state.password);

        if (this.state.email.length > 5 && this.state.password.length > 6) {

            /* if (typeof data[0] === 'object') {
       
                 for (let key in data) {
 
                     const account = data[key];
 
                     if ('user_name' in account) {
            */
            this.setState({ home: true })


            const data = [{
                image: './api/heroku.jpg',
                user_name: 'xtrail',
                user_lastname: 'movies',
                user_email: 'xtrail movie',
                user_password: '12345',
                date: `${19}:${14}-${9}/${8}/${2020}`,


            }]


            const account = './api/heroku.jpg'
            this.setState({ indexs: !this.state.indexs });
            this.props.Profile(account)
            localStorage.setItem('accont', JSON.stringify(data))




            this.props.Account(data)
            setTimeout(() => {
                this.setState({

                    email: '',
                    password: '',
                })
            }, 30)

            setTimeout(() => {
                /* if (this.state.email === 'platform@gmail.com' && this.state.password === '12345667') {
                     this.setState({
                     adding:true,
                     })
                 } else {*/
                this.setState({
                    direct: true,
                })
                //   }

                setTimeout(() => {
                    this.setState({
                        direct: false,
                        adding: false,
                    })

                }, 100)


            }, 2000)

            //  }
            /*  }

          }
          else {

              this.setState({
                  check: 'not'
              })

          }*/
        } else {
            this.setState({
                check: true
            })

        }

    }

    check = () => {
        this.setState({
            check: false
        })
    }

    render() {


        if (this.state.direct === true) {

            return <Redirect to='/' />
        }
        if (this.state.adding === true) {

            return <Redirect to='/multer' />
        }



        return (
            <div style={{ height: this.state.size < 490 ? ' 700px' : window.innerHeight }} className={this.state.size < 620 ? 'mobile-form' : "form"}>
                <div style={{ width: this.state.size < 490 ? '100%' : '400px', borderRadius: this.state.size < 620 ? '0px' : '13px' }} className="form-box">
                    <div className="form-pic">
                        <div className="box1in">
                            <img src={'./api/logo.png'} alt='mors' className='logo-icon' />
                        </div>
                        <div className="box2in">

                        </div>

                    </div>
                    <div className="form-body">
                        <div className="form-text"><h1>Login</h1></div>

                        <div className="form-body-t">
                            <input onClick={this.check} value={this.state.email} name='email' onChange={this.handleSeach} placeholder='Email' className='form-input' />
                            <div className="validate">

                                <p style={{ color: this.state.check === true || this.state.check === 'not' ? 'rgb(255, 0, 0)' : this.state.email.length >= 1 && this.state.email.length <= 4 && 'rgb(255, 0, 0)' }} className="validate-me">
                                    {this.state.check === true ? 'please fill the form' : this.state.check === 'not' ? 'account not found' : this.state.email.length >= 1 && this.state.email.length <= 4 ? 'minimum of 6 words required' : this.state.email.length > 4 && this.state.email.length <= 5 ? 'good' : ''}
                                </p>
                            </div>
                        </div>


                        <div className="form-body-t">
                            <input onClick={this.check} type='password' value={this.state.password} name='password' onChange={this.handleSeach} placeholder='Password' className='form-input' />
                            <div className="validate">

                                <p style={{ color: this.state.check === true || this.state.check === 'not' ? 'rgb(255, 0, 0)' : this.state.password.length >= 1 && this.state.password.length <= 4 && 'rgb(255, 0, 0)' }} className="validate-me">
                                    {this.state.check === true ? 'please fill the form' : this.state.check === 'not' ? 'account not found' : this.state.password.length >= 1 && this.state.password.length <= 4 ? 'minimum of 6 words required' : this.state.password.length > 4 && this.state.password.length <= 5 ? 'good' : ''}
                                </p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', color: 'rgb(25,152,255)' }}>
                            <small style={{ color: ' rgb(0, 174, 255)' }} onClick={() => this.props.history.push('./form')}>Already have account</small>
                        </div>



                    </div>
                    <div className="form-signup">
                        <div onClick={this.submit} className="sign-botton">login</div>

                    </div>
                </div>

            </div>);
    }
}

const mapStateToProps = state => {
    return {
        anyplay: state.anyplayReducer,
    }
};

export default connect(mapStateToProps, { Profile })(Login)
