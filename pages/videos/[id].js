/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { BsPlayBtn } from "react-icons/bs"
import ReactPlayer from "react-player";
import { useRouter } from "next/router";

const Videos = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;
  const router = useRouter();
  const [dataVideo, setDataVideo] = useState([]);
  useEffect(() => {
    const arr = ((orders.map(item => item.cart)).map(item => item.filter(item2 => item2.book)).map(item => item.length !== 0 ? item.map(item2 => item2) : ""))
    let x = []
    const videoArr = orders.map(item => item.cart[0]).filter(ar => ar !== undefined)
    const videoArr2 = orders.map(item => item.cart[1]).filter(ar => ar !== undefined)
    const videoArr3 = orders.map(item => item.cart[2]).filter(ar => ar !== undefined)
    const videoArr4 = orders.map(item => item.cart[3]).filter(ar => ar !== undefined)
    const videoArr5 = orders.map(item => item.cart[4]).filter(ar => ar !== undefined)
    const arrr = (videoArr.map(item => x.push(item))) +
      (videoArr2.map(item => x.push(item))) +
      (videoArr3.map(item => x.push(item))) +
      (videoArr4.map(item => x.push(item))) +
      (videoArr5.map(item => x.push(item)))
    setDataVideo(x)
  }, [orders]);
  useEffect(() => {
    const newArr = dataVideo?.filter((order) => order._id === router.query.id);
    const newArr2 = newArr.length > 1 ? newArr[0] : newArr
    const newArr3 = newArr2.video !== undefined && newArr2.video;
    setVideo(newArr3[0])
    setVideoTitle(newArr2.title)
  }, [dataVideo]);
  const [tab, setTab] = useState(0);
  const [videoTitle, setVideoTitle] = useState();
  // console.log("videoTitle", videoTitle);
  const [video, setVideo] = useState();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    let arr = []
    for (let key in video) {
      arr.push(video[key])
    }
    return setVideos(arr)
  }, [video])
  // console.log("videos sadsad >>>", videos)
  const isActive = (index) => {
    if (tab === index) return " videoActive";
    return "";
  };
  // console.log("sdasda", screen);
  const [width, setWidth] = useState("550px");
  const [height, setHeight] = useState("400px");
  const [selectWidth, setSelectWidth] = useState("250px");
  const [selectHeight, setSelectHeight] = useState("142px");
  useEffect(() => {
    window.screen.width <= 760 && setWidth("350px") + setHeight("200px") + setSelectWidth("200px") + setSelectHeight("100px")
  }, [window.screen.width]);
  // console.log("width >>>", width);
  // console.log("height >>>", height);
  // console.log("window.screen.width", window.screen.width);
  return (
    <>
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className="Videos_container">
        <div className="videos_left">
          <ReactPlayer
            url={videos[tab]}
            width={width}
            height={height}
            playing={false}
            playIcon={<button>Play</button>}
            controls={true}
            config={{
              file: {
                attributes: {
                  onContextMenu: e => e.preventDefault(),
                  preload: "auto",
                  controlsList: 'nodownload'
                }
              }
            }}
          />
          <div className="videos_mainVideoText">
            <h3>{videoTitle}</h3>
            <p>Lesson {tab + 1}</p>
          </div>

        </div>
        <div className="videos_right">
          {videos.map((item, index) => (
            <div className={`videos_cardContainer ${isActive(index)}`} key={index}>
              <div className='videos_card'
              >
                {tab === index && <BsPlayBtn />}

                <ReactPlayer
                  onClick={() => setTab(index)}
                  url={item}
                  width={selectWidth}
                  height={selectHeight}
                  playing={false}
                  controls={false}
                  config={{
                    file: {
                      attributes: {
                        onContextMenu: e => e.preventDefault(),
                        preload: "auto",
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              </div>
              <div className="videos_text">
                <h4>Lesson {index + 1}</h4>
                {/* <p></p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ >
  );
};



export default Videos;
