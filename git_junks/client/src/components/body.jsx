import React, { Component } from 'react'
import './body.css'


class Body extends Component {
    state = {
        size: window.innerWidth
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


    }

    render() {
        return (<div className="body">
            <div className="nv"></div>
            <div className="nb">

                <div style={{ height: this.state.size < 888 && '250px' }} className="colum1">
                    <div className="secur">
                        <div className="sec1">
                            <div className="hib">
                                <div className="urlp">Secure-Api</div>
                                <img src={'./api/secw.png'} alt='lk' className='srcl' />
                            </div>
                        </div>
                        <div className="sec2">
                            <div style={{ fontSize: this.state.size < 999 && this.state.size > 888 ? '29px' : this.state.size < 888 && this.state.size > 668 ? '19px' : this.state.size < 688 && '13px' }} className="prar"> Get information about films cast, crew, ratings and much more. Experiece
                                                                          with all stages of the development cycle for dynamic web project.
                                            </div>

                        </div>
                        <div className="sec3">

                            <div className="andr">Android</div>
                            <div className="andr">IOS</div>
                            <div className="andr">Web</div>
                        </div>
                    </div>
                </div>
                <div className="colum2">

                    <div className={this.state.size < 888 ? "infobx1v" : "infobx1"}>
                        <div className="svk">
                            <img src={'./api/pic.png'} alt='lk' className='srclo' />
                            <div className="gp">to connect you project with the rest-Api,You should follow the modification  </div>
                        </div>

                        <div onClick={() => this.props.history.push('./follow')} className="buttn">follow</div>

                    </div>
                    <div className={this.state.size < 888 ? "infobx2v" : "infobx2"}>
                        <div className="svkn">
                            <img src={'./api/done.png'} alt='lk' className='srcln' />
                            <div className="gp">to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification
                            <br />
                                <br />to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification  </div>
                        </div>

                        <div onClick={() => this.props.history.push('./connect')} className="buttn">connect</div>

                    </div>

                </div>

            </div>

        </div>);
    }
}

export default Body;
