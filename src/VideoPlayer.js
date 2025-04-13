import react, {useRef, useState, useContext} from "react";
import {TaskContext, TaskDispatchContext} from './TaskContext.js'

const VideoPlayer = ({src,  width=640, height=480}) => {
    const tasks = useContext(TaskContext);
    const dispatch=useContext(TaskDispatchContext);

    if (!tasks.showVideo) {
        return null;
    }

    return (
        <div style={styles.container} onClick={()=>{
            if (tasks.isLoading == false) {
                if (window.confirm('退出预览吗?')) {
                    dispatch({type: 'closeVideo'})
                } else {
                    // 用户点击了“取消”
                }
            }
            }}>
            <div onClick={(e)=>{e.stopPropagation()}} style={{position: 'relative', width:width, height:height, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {tasks.isLoading ? 
                    <div> 
                        <p>loading...</p>
                        <progress value={tasks.progress} max={100} style={{width:'50vw'}}/>
                    </div>
                :<video
                    width={width}
                    height={height}
                    controls
                >
                    <source src={src} type="video/mp4"/>
                    HTML5 video not supported
                </video>
                }
            </div>
        </div>
    )
}

const styles = {
    container:{
        position: "absolute",
        top:0,
        left:0,
        right: 0,
        bottom: 0,
        width:'100%',
        height:'100%',
        zIndex:1000,

        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,1.0)',
    },
    progress : {
        postion:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)',
        color:'#fff',
        zIndex:1,
        fontSize:'16px',
        flexDirection:'column',
    }
}


export default VideoPlayer;