import React, { Component } from 'react'
import './body.css'


class Follow extends Component {
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
        const date = new Date();
        const year = date.getFullYear()
      
        return (<div className="body">
           {this.state.size > 620 && <div className="nv"></div>}
            <div className="nbb">
                <div style={{height:this.state.size < 620 && '140px'}} className="colum1v">
                    <div className="secur">
                        <div className="sec1">
                            <div className="hib">
                                <div className="urlph">Secure-Api</div>
                                <img src={'./api/sect.png'} alt='lk' className='srcl' />
                            </div>
                        </div>
                        <div className="sec2v">
                            <div style={{ fontSize: this.state.size < 999 && this.state.size > 888 ? '45px' : this.state.size < 888 && this.state.size > 688 ? '35px' : this.state.size < 688 && this.state.size > 288?'23px':this.state.size <288&&'16px' }} className="prar"> All stages of the development cycle for dynamic web project.
                                            </div>

                        </div>

                    </div>
                </div>


                <div className="border-line"></div>
                <div style={{ marginTop:'3%'}} className="anotherbx">
                    <div style={{
                        flexDirection:this.state.size < 620 && 'column-reverse',
                        justifyContent: this.state.size < 620 &&'center',
                        alignItems:this.state.size < 620 && 'center',
                    }} className="mn1">
                        <div style={{width:this.state.size < 620 &&'70%'}} className="kk">

                        Senior  web developer specializing in front-end and back-end development. Experieced
                        <br /> <br />             

                        >to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification
                            <br />
                                <br />to connect you project with the rest-Api,You should follow the modification
                            to connect you project with the rest-Api,You should follow the modification 
                        



                        </div>
                        <div className="kk2">

                            <img src={'./api/vid.png'} alt='lk' className='vij' />

                        </div>
                    </div>
                    <div className="mn2">
                    <img src={'./api/adds.png'} alt='lk' className='adds' />
 Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  · Cloundfound ©{year}


                    </div>
                </div>

            </div>






        </div>)
    }
}
export default Follow;