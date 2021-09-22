import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction"
import Icons from './Icons'
import { imageShow, videoShow } from "../utils/mediaShow";


const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([])
  const [stream, setStream] = useState(false)
  const [tracks, setTracks] = useState('')
  
  const videoRef = useRef()
  const refCanvas = useRef()

  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err = ""
    let newImages = []

    files.forEach(file => {
      if (!file) return err = "File does not exist."

      if (file.size > 1024 * 1024 * 10) {
        return err = "The image/video largest is 10mb."
      }

      // if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      //   return err = "Image format is incorrect."
      
      return newImages.push(file)
    })

    console.log(files)
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err}})
    setImages([...images, ...newImages])
  }

  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleStream = () => {
    setStream(true)
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()

          const track = mediaStream.getTracks()
          setTracks(track[0])
      }).catch(err => console.log(err))
    }
  }

  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, {camera: URL}])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT, payload: {error: "Please add you photo"}
      })
    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }))
    } else {
      dispatch(createPost({ content, images, auth, socket }))
    }
    
    setContent('')
    setImages([])
    if (tracks) tracks.stop()
    dispatch({ type: GLOBALTYPES.STATUS, payload: false})    
  }
  
  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content)
      setImages(status.images)
    }
  }, [status])



  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5>Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            <i className="fas fa-times" style={{ fontSize: "20px" }}></i>
          </span>
        </div>
        <div className="status_body">
          <textarea className="content" value={content}
            placeholder={`${auth.user.username}, What do you want to share?`}
            onChange={(e) => setContent(e.target.value)} />
          <div className="d-flex">
            <div className="flex-fill"></div>
            <Icons setContent={setContent} content={content} theme={theme} />
          </div>
          

          <div className="show_images">
            {
              images.map((img, index) => (
                <div key={index} id="file_img">
                  {
                    img.camera ? imageShow(img.camera, theme)
                      : img.url
                        ? <>
                          {
                            img.url.match(/video/i)
                            ? videoShow(img.url, theme)
                            : imageShow(img.url, theme)
                          }
                        </>
                        : <>
                          {
                            img.type.match(/video/i)
                            ? videoShow(URL.createObjectURL(img), theme)
                            : imageShow(URL.createObjectURL(img), theme)
                          }
                        </>
                  }
                  {/* src={img.camera ? img.camera : URL.createObjectURL(img)} */}
                  <i className="far fa-trash-alt" id="image_trash"
                    onClick={() => deleteImages(index)}
                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                  >
                  </i>
                </div>
              ))
            }
          </div>
          
          {
            stream &&
            <div className="stream position-relative">
              <video autoPlay muted ref={videoRef} width="100%" height="100%"
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />
              <i className="fas fa-power-off"
                onClick={handleStopStream}
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              ></i>
              <canvas ref={refCanvas} style={{display: "none"}}/>
            </div>
          }

          <div className="input_images" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
            {
              stream
                ? <i className="fas fa-camera" onClick={handleCapture}/>
                :
                <>
                  <i className="fas fa-camera" onClick={handleStream}/>
                  <div className="file_upload">
                    <i className="fas fa-image" />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*, video/*"
                      onChange={handleChangeImages}
                    />
                  </div>
                </>
            }
          </div>
        </div>
        <div className="status_footer mt-3">
          <button className="btn btn-more w-100"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
          Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
