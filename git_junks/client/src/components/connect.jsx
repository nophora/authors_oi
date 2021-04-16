import React, { Component } from 'react'
import './body.css'
import { ReactComponent as Play } from './play-button.svg'



class Connect extends Component {
    state = {
        sel1: false,
        sel2: false,
        sel3: false,
        sel4: false,
        submit: false,
        wrong: false,
        video: false,
        duration: '00:00',

        size: window.innerWidth
    }

    play = () => {
        this.setState({
            video: true
        })
    }

    submit = () => {


        if (this.state.sel1 === true && this.state.sel2 === true && this.state.sel3 === true && this.state.sel4 === true) {
            this.setState({
                submit: 'hj'
            })


            setTimeout(() => {
                this.setState({
                    submit: true
                })
            }, 8000)
        }
        else {
            this.setState({
                wrong: true,
            })

            setTimeout(() => {
                this.setState({
                    wrong: false
                })
            }, 4000)
        }
    }

    sel1 = () => {
        this.setState({
            sel1: !this.state.sel1
        })
    }

    sel2 = () => {
        this.setState({
            sel2: !this.state.sel2
        })
    }

    sel3 = () => {
        this.setState({
            sel3: !this.state.sel3
        })
    }

    sel4 = () => {
        this.setState({
            sel4: !this.state.sel4
        })
    }

    textArea = () => {
        const ell = this.refs.textarea
        ell.select()
        document.execCommand("copy")

    }

    data = {
        scme: `{

            name: String,
            video: String,
            icon: String,
            thumbnail: String,
            genre:String,
            duration: {
                hour: Number,
                min: Number
            },
            rate: [Object],
        
            info: String,
            photo: [String],
        
        
        
            comments: [{
                id: Number,
                date: String,
                user: [Object],
        
                comment: String,
                rate: [Object],
        
                replys: [{
                    id: Number,
                    date: String,
                    user: [Object],
                    reply: String,
        
                }],
            }]
        
        }`
    }

    ptextArea = () => {
        const ell = this.refs.ptextarea
        ell.select()
        document.execCommand("copy")

    }





    duration = () => {
        const player = document.querySelector('.video');
        const time = player.currentTime / player.duration * 100;
        const d = player.currentTime;
        const m = Math.floor(d / 60);
        const min = (m >= 10) ? m : "0" + m;
        const s = Math.floor(d % 60);
        const sec = (s >= 10) ? s : "0" + s;
        if (time === 100) {
            this.setState({
                video: false,
            })
        }


        this.setState({
            duration: `${min}:${sec}`,
            player: time,

        })

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
            {this.state.size > 620 && <div className="nv"></div>}
            <div className="nb">

                <div style={{ height: this.state.size < 670 ? 'max-content' : '500px' }} className="findapi">

                    <div style={{ marginTop: this.state.size < 670 && '8%' }} className="youapi">

                        {this.state.video === false ? <div className="icon-wrp">
                            <img src={'./api/toy5.jpg'} alt='lk' className='toyv' />

                            <div className="icon-wrptb">
                                <div className="ht">

                                    <Play onClick={this.play} className="play" />

                                </div>
                                <div className="ht2">
                                    <div className="iconbx">
                                        <img src={'./api/toy1.jpg'} alt='lk' className='toy' />

                                    </div>
                                    <div className="info-icon">
                                        <div className="iconames">TOY STORY 4</div>
                                        <div className="iconames2">2hr 30min</div>
                                        <div className="iconames2">Action</div>
                                        <div className="iconames2">Disney</div>
                                    </div>
                                </div>

                            </div>


                        </div> :
                            <div className="icon-wrpz">
                                <video onTimeUpdate={this.duration} autoPlay src={'./api/story.mp4'} className='video' />
                                <div className="lodx">
                                    {this.state.duration === '00:00' && <div className="wait"></div>}
                                </div>
                            </div>
                        }
                        <div className="jinfo">toy story 4 the best family movie you can watch</div>
                        <div className="photo">
                            <img src={'./api/toy1.jpg'} alt='lk' className='toym' />
                            <img src={'./api/toy2.jpg'} alt='lk' className='toym' />
                            <img src={'./api/top3.jpg'} alt='lk' className='toym' />
                            <img src={'./api/toy4.jpg'} alt='lk' className='toym' />
                            <img src={'./api/toy5.jpg'} alt='lk' className='toym' />
                            <img src={'./api/toy6.jpg'} alt='lk' className='toym' />


                        </div>



                        <div className="coment">
                            <div className="comnt1">
                                <div className="nammp">siphosethu nongwe</div>
                                <img src={'./api/herokud.jpg'} alt='lk' className='map' />

                            </div>
                            <div className="comnt2">
                                <div className="icombx">this movie is so brilliant its was fantastic ,hope the will be toy story 5 were the toys woody sees each other again</div>
                                <div className="itime">15:06</div>
                            </div>
                            <div className="comnt3">
                                <img src={'./api/heroku.jpg'} alt='lk' className='map2' />

                                <div className="icombx2">I love woddy</div>
                                <div className="itime2">18:20</div>

                            </div>
                        </div>




                    </div>









                    <div style={{ marginTop: this.state.size < 670 && '8%' }} className="youapi2">
                        <div className="schema">SCHEMA</div>
                        <img src={'./api/code.jpg'} alt='lk' className='codes' />

                        <div className="copi">
                            <div className="cde">copy code</div>
                            <img onClick={this.ptextArea} src={'./api/copy.png'} alt='lk' className='cpy' />

                        </div>
                    </div>
                </div>

                <textarea style={{ height: '1px', width: '1px', opacity: 0 }} ref='ptextarea' value={this.data.scme} className="projebtZ" />



                <div className="findapi2">

                    {this.state.submit === false ? <div style={{ width: this.state.size < 670 && '400px' }} className="optin">
                        {this.state.wrong === false ? <div className="optinin">

                            <div className="optin1">
                                <img onClick={this.sel1} src={this.state.sel1 === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                <div style={{ fontSize: this.state.size < 670 && '7.5px' }} className="divsel">the api incloud secure server browser</div>
                            </div>
                            <div className="optin2">
                                <img onClick={this.sel2} src={this.state.sel2 === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                <div style={{ fontSize: this.state.size < 670 && '7.5px' }} className="divsel">the api incloud secure server browser</div>

                            </div>
                            <div className="optin3">
                                <img onClick={this.sel3} src={this.state.sel3 === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                <div style={{ fontSize: this.state.size < 670 && '7.5px' }} className="divsel">the api incloud secure server browser</div>

                            </div>
                            <div className="optin4">
                                <img onClick={this.sel4} src={this.state.sel4 === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                <div style={{ fontSize: this.state.size < 670 && '7.5px' }} className="divsel">the api incloud secure server browser</div>

                            </div>

                        </div> :
                            <div className="optininw">
                                please agree to all the private policy
                        </div>
                        }

                        <div onClick={this.submit} className="optinsb">submit</div>

                    </div> : this.state.submit === true ?
                            <div style={{ width: this.state.size < 670 && '300px' }} className="optin">
                                <div className="dfg">
                                    <img src={'./api/qr.png'} alt='lk' className='qr' />
                                    <textarea ref='textarea' value="http://cloudfoundapi.herokuapp.com/cloudfound/movieget" className="projebtZ" />
                                    <div className="selvj">
                                        <img onClick={this.textArea} src={'./api/copy.png'} alt='lk' className='selv' />
                                    </div>
                                </div>
                                <div className="dfg2">login for unlimited request</div>
                            </div>
                            : <div style={{ width: this.state.size < 670 && '400px' }} className="optin">

                                <div className="loads"></div>

                            </div>
                    }


                </div>
            </div>
        </div >
        )
    }
}

export default Connect
