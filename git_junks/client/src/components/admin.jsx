import React, { Component } from 'react'
import './body.css'
import './admin.css'



class Admin extends Component {
    state = {
        title: '',
        info: '',
        action: false,
        drama: false,
        horrow: false,
        sci: false,
        genre: '',
        duration: {
            hour: 2,
            min: 30
        },


        icon: '',
        thumbnail: '',
        video: '',
        photo: [],

        int: 0,
        lode: false,

        wrongvid: false,
        size: window.innerWidth,
        
    }


    handleSeach = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value })
    };


    action = () => {
        this.setState({
            action: true,
            drama: false,
            horrow: false,
            sci: false,
            genre: 'action',
        })
    }


    drama = () => {
        this.setState({
            action: false,
            drama: true,
            horrow: false,
            sci: false,
            genre: 'drama',
        })
    }

    horrow = () => {
        this.setState({
            action: false,
            drama: false,
            horrow: true,
            sci: false,
            genre: 'horrow',
        })
    }

    sci = () => {
        this.setState({
            action: false,
            drama: false,
            horrow: false,
            sci: true,
            genre: 'sci-hifi',
        })
    }



    plush = () => {
        this.setState({
            duration: { ...this.state.duration, hour: this.state.duration.hour + 1 },
        })
    }
    minh = () => {
        this.setState({
            duration: { ...this.state.duration, hour: this.state.duration.hour - 1 },

        })
    }
    plusmin = () => {
        this.setState({
            duration: { ...this.state.duration, min: this.state.duration.min + 1 },

        })
    }

    minm = () => {
        this.setState({
            duration: { ...this.state.duration, min: this.state.duration.min - 1 },

        })
    }



    icon = (e) => {

        let files = e.target.files;
        let file = files[0];

        if (file.size < 1000000 && (file.type === "image/jpeg" || file.type === "image/png")) {


            this.setState({
                wrong: false,
            })

            let formdata = new FormData();
            formdata.append('file', file)


            let reader = new FileReader();
            reader.readAsDataURL(files[0])


            return reader.onload = (e) => {
                console.log('excicute')


                  fetch(`https://cloudfoundapi.herokuapp.com/cloudfound/photos`, { method: 'POST', body: formdata }).then((response) => response.json()).then(data => {
  
                      const { path } = data;
                      this.setState({ icon: path})
                  }).catch(error => {
                      console.log('kwenzek nton',error)
                  })


            }
        }
        else {

            this.setState({
                wrong: true,
            })
        }
    }




    thumbnail = (e) => {
        let files = e.target.files;
        let file = files[0];

        if (file.size < 1000000 && (file.type === "image/jpeg" || file.type === "image/png")) {

            this.setState({
                wrong: false,
            })
            let formdata = new FormData();
            formdata.append('file', file)

            let reader = new FileReader();
            reader.readAsDataURL(files[0])

            return reader.onload = (e) => {
               
               
                 fetch(`https://cloudfoundapi.herokuapp.com/cloudfound/photos`, { method: 'POST', body: formdata }).then((response) => response.json()).then(data => {
                     const { path } = data
                     this.setState({ thumbnail: path  })
                 })
            }
        } else {

            this.setState({
                wrong: true,
            })
        }

    }




    video = (e) => {

        let files = e.target.files;
        let file = files[0];

        if (file.size < 20000000 && (file.type === "video/mp4")) {

            this.setState({
                wrong: false,
            })
            let formdata = new FormData();
            formdata.append('file', file)


            let reader = new FileReader();
            reader.readAsDataURL(files[0])




            reader.onload = (e) => {




                fetch(`https://cloudfoundapi.herokuapp.com/cloudfound/videos`, { method: 'POST', body: formdata }).then((response) => response.json()).then(data => {
                    const { path } = data;
                    console.log('video', path)
                    this.setState({ video: path })
                })

            }
        } else {
            this.setState({
                wrongvid: true,
            })

            setTimeout(() => {
                this.setState({
                    wrongvid: false,
                })
            }, 5000)
        }

    }





    photo = (e) => {
        let files = e.target.files;
        let file = files[0];
        if (file.size < 1000000 && (file.type === "image/jpeg" || file.type === "image/png")) {

            this.setState({
                wrong: false,
            })
            let formdata = new FormData();
            formdata.append('file', file)

            let reader = new FileReader();
            reader.readAsDataURL(files[0])

            return reader.onload = (e) => {
                if (this.state.photo.length <= 5) {
                  
                    fetch(`https://cloudfoundapi.herokuapp.com/cloudfound/photos`, { method: 'POST', body: formdata }).then((response) => response.json()).then(data => {
                        const { path } = data;
                        const arry = [path];
                        this.setState({ photo: [...this.state.photo, ...arry]  })
                    })


                }
            }
        } else {

            this.setState({
                wrong: true,
            })
        }

    }



    sumitit = () => {

        const { title, info, genre, icon, thumbnail, video, photo } = this.state

        if (title.length > 1 && info.length > 1 && genre.length > 1 && icon.length > 1 && thumbnail.length > 1 && video.length > 1 && photo.length >= 5) {
           
            const data = {

                name: this.state.title,
                info: this.state.info,
                genre: this.state.genre,
                duration:this.state.duration,
                rate:[],
                icon: this.state.icon,
                thumbnail: this.state.thumbnail,
                video: this.state.video,
                photo: this.state.photo,
                comments:[],
               
            }
            

            fetch(`https://cloudfoundapi.herokuapp.com/cloudfound/moviepost`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json()).then(
                data => {
                
                    const dd = data
                        console.log('kk',dd)
           
                    this.setState({
                        lode: true
                    })
                    const loud = setInterval(() => {
                        this.setState({
                            int: this.state.int === 100 ? 100 : this.state.int + 2
                        })



                    }, 100)

                    setTimeout(() => {

                        return loud
                    }, 100)

                    setTimeout(() => {
                        clearInterval(loud)
                        this.setState({
                            title: '',
                            info: '',
                            action: false,
                            drama: false,
                            horrow: false,
                            sci: false,
                            genre: '',
                            duration: {
                                hour: 2,
                                min: 30
                            },


                            icon: '',
                            thumbnail: '',
                            video: '',
                            photo: [],
                            lode: false,
                            int: 0,
                        })


                    }, 10000)
                    
                }).catch()
        }
        else {
            this.setState({
                lode: 'errow'
            })

            setTimeout(() => {

                this.setState({
                    lode: false,
                    int: 0,
                })
            }, 5000)

        }
    }


    rmvicon = () => {
        this.setState({
            icon: '',
            int: 0,
        })
    }

    rmvthumbnail = () => {
        this.setState({
            thumbnail: '',
            int: 0,
        })
    }


    rmvvideo = () => {
        this.setState({
            video: '',
            int: 0,
        })
    }

    rmvphoto = (select) => {

        const deleti = this.state.photo.filter(e => e !== select)

        this.setState({
            photo: deleti,
            int: 0,
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
        return (
            <div className="body">
                {this.state.size > 620 && <div className="nv"></div>}
                <div className="nbb">
                    <div className="headr">
                        <img src={'./api/logo.png'} alt='lk' className='headx' />
                        <div className="heaw">Cloudfound</div>

                    </div>
                    <div className="gard"></div>
                    <div className="hedbody">
                        <div style={{ flexDirection: this.state.size < 820 && 'column' }} className="btd">
                            <div style={{ width: this.state.size < 820 && '100%' }} className="nbv">

                                <div style={{ width: this.state.size < 620 && '80%' }} className="bxinput">
                                    <div className="putnmame">Title</div>
                                    <input style={{ width: this.state.size < 620 && '100%' }} type='text' value={this.state.title} name='title' onChange={this.handleSeach} placeholder='title...' className='title' />

                                </div>

                                <div style={{ width: this.state.size < 620 && '80%' }} className="bxinputv">
                                    <div className="putnmame">Info</div>
                                    <input style={{ width: this.state.size < 620 && '100%' }} type='text' value={this.state.info} name='info' onChange={this.handleSeach} placeholder='info...' className='titlev' />

                                </div>

                                <div style={{ width: this.state.size < 620 && '90%', height: this.state.size < 620 && 'max-content', flexWrap: this.state.size < 620 && 'wrap' }} className="mark">
                                    <div className="markh">
                                        <img onClick={this.action} src={this.state.action === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                        <div className="divsel">Action</div>
                                    </div>
                                    <div className="markh">
                                        <img onClick={this.drama} src={this.state.drama === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                        <div className="divsel">Drama</div>
                                    </div>
                                    <div className="markh">
                                        <img onClick={this.horrow} src={this.state.horrow === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                        <div className="divsel">Horrow</div>
                                    </div>
                                    <div className="markh">
                                        <img onClick={this.sci} src={this.state.sci === true ? './api/sel.png' : './api/unsel.png'} alt='lk' className='sel' />
                                        <div className="divsel">Sci-hifi</div>
                                    </div>
                                </div>


                                <div className="duration">
                                    <div className="duration-name">Duration</div>
                                    <div className="duration-name2">

                                        <div className="ghtf">
                                            <div className="plus">
                                                <div onClick={this.plush} className="rpls">+</div>
                                                <div onClick={this.minh} className="rpls">-</div>
                                            </div>
                                            <div className="plus2">{`${this.state.duration.hour}hr`}</div>
                                        </div>

                                        <div className="ghtf">
                                            <div className="plus">
                                                <div onClick={this.plusmin} className="rpls">+</div>
                                                <div onClick={this.minm} className="rpls">-</div>
                                            </div>
                                            <div className="plus2">{`${this.state.duration.min}min`}</div>
                                        </div>


                                    </div>
                                </div>



                                <div className="credit">
                                    <div className="gucci2">
                                        <div className="jaden1">Icon</div>
                                        <img src={'./api/downl.png'} alt='tag' className='tag1' />




                                    </div>
                                    {this.state.icon.length <= 0 && <div className='space1'>+</div>}
                                    {this.state.icon.length <= 0 && <input type='file' className='mlt' onChange={(e) => { this.icon(e) }} name='img' />}

                                    {this.state.icon.length > 1 && <img onClick={this.rmvicon} src={this.state.icon} alt='tag' className='klg' />
                                    }

                                </div>








                            </div>
                            <div style={{ width: this.state.size < 820 && '100%' }} className="nbv2">

                                <div className="credit">
                                    <div className="gucci2">
                                        <div className="jaden1">thumbnail</div>
                                        <img src={'./api/downl.png'} alt='tag' className='tag1' />




                                    </div>
                                    {this.state.thumbnail.length <= 0 && <div className='space1'>+</div>}
                                    {this.state.thumbnail.length <= 0 && <input type='file' className='mlt' onChange={(e) => { this.thumbnail(e) }} name='img' />}

                                    {this.state.thumbnail.length > 1 && <img onClick={this.rmvthumbnail} src={this.state.thumbnail} alt='tag' className='klg' />
                                    }

                                </div>





                                <div className="credit">
                                    {this.state.wrongvid === false ? <div className="gucci2">
                                        <div className="jaden1">video</div>
                                        <img src={'./api/downl.png'} alt='tag' className='tag1' />
                                    </div> :
                                        <div className="gucci3">
                                            only video required
                                    </div>
                                    }
                                    {this.state.video.length <= 0 && <div className='space1'>+</div>}
                                    {this.state.video.length <= 0 && <input type='file' className='mlt' onChange={(e) => { this.video(e) }} name='img' />}

                                    {this.state.video.length > 1 && <img onClick={this.rmvvideo} src={'./api/vid.png'} alt='tag' className='klg' />
                                    }

                                </div>




                                <div className="photf">

                                    <div className={this.state.size < 820 ? "creditmini" : 'credit2'}>
                                        <div className="gucci2">
                                            <div style={{ fontSize: this.state.size < 820 && '9px' }} className="jaden1">photos</div>
                                            <img style={{ width: this.state.size < 820 && '15px', height: this.state.size < 820 && '15px' }} src={'./api/downl.png'} alt='tag' className='tag1' />




                                        </div>
                                        <div className={this.state.size < 820 ? 'spacemini' : 'space1'}>+</div>
                                        <input type='file' className='mlt' onChange={(e) => { this.photo(e) }} name='img' />



                                    </div>

                                    {this.state.size > 620 && this.state.photo.length > 0 && this.state.photo.map(e => { return (<div onClick={() => { this.rmvphoto(e) }} key={e} className={this.state.size < 820 ? "creditmini" : 'credit2'}> <img src={e} alt='tag' className='hjg' /></div>) })}

                                    {this.state.photo.length >= 1 && this.state.photo.length <= 5 && <div className={this.state.size < 820 ? "credit3mini" : 'credit3mini'}> <div className="credit4">{`+${6 - this.state.photo.length}`}</div></div>}

                                </div>


                            </div>
                        </div>
                        <div className="btd2">

                            {this.state.int === 100 ? <div className="stopz2">upload succesfull</div> : this.state.lode === false ? <div onClick={this.sumitit} className="buty">Submit</div> : this.state.lode === true ? <div className="lode"> <div style={{ width: `${this.state.int}%` }} className="lode2"></div></div> : <div className="stopz">please fill all fields</div>}
                        </div>


                    </div>

                </div>
            </div>

        );
    }
}

export default Admin;
