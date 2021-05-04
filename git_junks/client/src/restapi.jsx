import React, { Component } from 'react'
import './restapi.css'
import { ReactComponent as User } from './user.svg'


import Body from './components/body'
import Follow from './components/follow'
import Connect from './components/connect'

import Form from './components/form'
import Login from './components/login'
import Admin from './components/admin'
import Mobile from './components/mobile'
import { connect } from 'react-redux'

import Profile from './profile'
import Bar from './bar'
import Home from './home'



import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'



class Api extends Component {
    state = {
        profile: this.props.anyplay.profile,
        slide: this.props.anyplay.bar,
        size: window.innerWidth,
        home: this.props.anyplay.home,


    }



    clickl = () => {

        const hom = this.state.home === false ? true : false
        this.props.Home(hom)

        if (this.state.slide === true) {
            const kv = this.state.home === true ? false : this.state.slide === true ? false : true
            this.props.Bar(kv)
        }

    }

    clickf = () => {
        const homf = this.state.home === true ? false : true
        this.props.Home(homf)


    }

    slide = () => {

        const div = document.querySelector('.waitsilde ')
        const div2 = document.querySelector('.watvb2 ')

        const chosse = div || div2
        const stable = swipe_middle
        var xDown = null
        var yDown = null

        const getTouches = (evt) => {
            return evt.touches || evt.originalEvent.touches
        }

        const handleTouchStart = (evt) => {

            const firstTouch = getTouches(evt)[0]

            xDown = firstTouch.clientX
            yDown = firstTouch.clientY

        }

        const handleTouchMove = (evt) => {

            if (!xDown || !yDown) {
                return;
            }

            var xup = evt.touches[0].clientX
            var yup = evt.touches[0].clientY


            var xDiff = xDown - xup
            var yDiff = yDown - yup






            if (Math.abs(xDiff) > Math.abs(yDiff)) {

                if (xDiff > 0) {
                    //left swipe
                    //  console.log('left swipe', 'true')

                    if (this.state.slide === true) {
                        const kv = this.state.home === true ? false : this.state.slide === true ? false : true
                        this.props.Bar(kv)
                    }


                } else {
                    //right swipe
                    //  console.log('right swipe', 'false')
                    if (this.state.slide === false) {
                        const kv = this.state.home === true ? true : this.state.slide === false ? true : false
                        this.props.Bar(kv)
                    }

                }



            } else {


                if (yDiff > 0) {
                    //up swipe
                    //  console.log('up swipe')

                } else {
                    //down swipe
                    //  console.log('down swipe')

                }


            }

            //reset

            xDown = null
            yDown = null


        }



        chosse.addEventListener('touchstart', handleTouchStart, false)
        chosse.addEventListener('touchmove', handleTouchMove, false)







    }

    logout = () => {
        const out = ''
        this.props.Profile(out)

    }

    back = () => {
        const kv = this.state.home === true ? true : this.state.slide === false ? true : false
        this.props.Bar(kv)
    
}

    componentWillReceiveProps(nextProps) {
        if (nextProps.anyplay) {
            this.setState({
                profile: nextProps.anyplay.profile,
                slide: nextProps.anyplay.bar,
                home: nextProps.anyplay.home,

            })
        }
    }


    size = () => {
        const wide = () => {
            this.setState({
                size: window.innerWidth
            })
            console.log('size', window.innerWidth)
        }

        window.addEventListener('resize', wide, false)


    }

    componentDidMount() {
        this.size()
        if (window.innerWidth < 620) {
            this.slide()
        }

    }


    render() {
        return (
            <Router >
                <div className="api">
                    {this.state.size > 620 && <div className="nav">

                        <Link style={{ color: '#575757;', textDecoration: 'none' }} to={this.state.profile.length > 1 ? './' : './form'}>
                            <div onClick={this.logout} className="boxnv">
                                {this.state.profile.length > 1 ?
                                    <img src={this.state.profile} alt='api' className='ign' />

                                    : <User className='ign' />}
                                <div className="names">{this.state.profile.length > 1 ? 'logout' : 'login'}</div>
                            </div>
                        </Link>

                        <Link style={{ color: '#575757;', textDecoration: 'none' }} to='./' >

                            <div className="boxnv">
                                <img src={'./api/home.png'} alt='api' className='ig' />
                                <div className="names">Home</div>
                            </div>
                        </Link>

                        <Link style={{ color: '#575757;', textDecoration: 'none' }} to='./admin' >

                            <div className="boxnv">
                                <img src={'./api/rest.png'} alt='api' className='igb' />
                                <div className="names">Rest-Api</div>
                            </div>
                        </Link>

                        <div className="boxnvb">
                            <img src={'./api/set.png'} alt='api' className='ikg' />
                            <div className="names">settings</div>
                        </div>



                    </div>}


                    {this.state.size < 620 && this.state.slide === false ? <div className="waitsilde"></div> :
                        this.state.size < 620 && this.state.home === false && <div style={{
                            height: `${window.innerHeight}px`
                        }} className="waitsildeh">
                            <div className="watvb">
                                <div className='bluec' ></div>

                                <div className="watvblv">
                                    {this.state.profile.length > 1 ?
                                        <img src={this.state.profile} alt='api' className='uservg' />

                                        : <User className='uservg' />}
                                    <Link style={{ color: '#575757;', textDecoration: 'none' }} to='./form' >
                                        <div onClick={this.clickl} style={{ color: 'rgb(0,0,0)' }} className="fdv">login</div>
                                    </Link>
                                </div>

                                <Link style={{ width: '100%', color: '#575757;', textDecoration: 'none' }} to='./' >
                                    <div onClick={this.back} className="restyu">HOME</div>
                                </Link>
                                <Link style={{ width: '100%', color: '#575757;', textDecoration: 'none' }} to='./admin' >
                                    <div onClick={this.clickl} className="restyu2">REST-API</div>
                                </Link>
                                <div className="restyu3">SETTINGS</div>
                            </div>
                            <div className="watvb2"></div>
                        </div>}

                    {this.state.size < 620 && this.state.home === true && < div onClick={this.clickf} className="homeput">
                        <Link style={{ width: '100%', color: '#575757;', textDecoration: 'none' }} to='./' >
                            <img src={'./api/home.png'} alt='api' className='ig' />
                        </Link>
                    </div>}



                    <Switch>

                        <Route path="/" exact component={this.state.size < 620 ? Mobile : Body} />
                        <Route path="/connect" exact component={Connect} />
                        <Route path="/follow" exact component={Follow} />
                        <Route path="/form" exact component={Form} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/admin" exact component={Admin} />


                    </Switch>


                </div>



            </Router >);
    }
}

const mapStateToProps = state => {
    return {
        anyplay: state.anyplayReducer,
    }
};




export default connect(mapStateToProps, { Profile, Bar, Home })(Api);
