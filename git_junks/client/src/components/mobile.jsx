import React, { Component } from 'react'
import './mobile.css'
import Bar from '../bar'
import Home from '../home'

import { connect } from 'react-redux'


class Mobile extends Component {
    state = {
        size: window.innerWidth,
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

    okay = () => {
        this.home()

        return this.props.history.push('./connect')
    }

    okayf = () => {
        this.home()

        return this.props.history.push('./follow')
    }

    componentDidMount() {
        this.size()

    }



    bar = () => {
        const br = true;
        this.props.Bar(br)
    }

    home = () => {
        const br = true;
        this.props.Home(br)
    }

    render() {
        return (
            <div className="mobile-view">

                <div className="blue-mb">
                    <div className="mb-menu">
                        <div onClick={this.bar} className="barz">
                            <div className="barzm"></div>
                            <div className="barzm"></div>
                            <div className="barzm"></div>
                        </div>
                        <div className="barz2">
                            <div className="urlp">Secure-Api</div>
                            <img src={'./api/secw.png'} alt='lk' className='srcl' />

                        </div>
                    </div>

                    <div style={{ fontSize: this.state.size < 290 && '17px' }} className="diffent"> with all stages of the development cycle for dynamic web project.</div>

                    <div className="aplle">
                        <div className="apller">
                            <img src={'./api/droit.png'} alt='lk' className='srcl' />

                        </div>
                        <div className="apller">
                            <img src={'./api/apple.png'} alt='lk' className='srcl' />

                        </div>
                        <div className="apller">
                            {'< / >'}
                        </div>
                    </div>

                </div>
                <div className="mobl-wraps">
                    <div className="mobl-wrapsdv">
                        <div className="mobl-wrapsdx">
                            <img src={'./api/done.png'} alt='lk' className='srcln' />
                            <div className="gp">to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification</div>
                        </div>

                        <div onClick={this.okay} className="buttn">connect</div>


                    </div>
                    <div className="mobl-wrapsdv2">

                        <div className="mobl-wrapsdx">
                            <img src={'./api/pic.png'} alt='lk' className='srcln' />
                            <div className="gp">follow  Reastfull-Api,You should follow the modification
                            to connect you project with the rest-Api,</div>
                        </div>

                        <div onClick={this.okayf} className="buttn">follow</div>


                    </div>
                </div>





            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        anyplay: state.anyplayReducer,
    }
};

export default connect(mapStateToProps, { Bar, Home })(Mobile);