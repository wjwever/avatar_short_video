import React, {useState, useContext} from 'react'
import { TaskContext, TaskDispatchContext } from './TaskContext'
import './Card.css'

function SearchInput ({value, onChange}) {
    return (
        <div className='search-bar'>
            <input
                type="text" 
                placeholder="Search"
                value={value}
                onChange={(e)=>onChange(e.target.value)}
            />
        </div>
    )
}

export function SearchableList({datas, onSelect, selected, visible}) {
    const [searchText, setSearchText] = useState("");

    const filter = (videos, query) => {
        return videos.filter((video)=>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (!visible) {
        return null;
    }

    const foundVideos = filter(datas, searchText);

    return (
        <div className='video-list-container'>
            <SearchInput
                value={searchText}
                onChange={newText => {setSearchText(newText)}}
            />
            <CardList
                datas={foundVideos} 
                onSelect = {onSelect}
                selected = {selected}
                emptyHeading={`No matchs for "${searchText}"`}
            />
        </div>
    )
}

function CardList({datas, emptyHeading, onSelect, selected}) {
    if(datas.length == 0) {
        return <h3 className='empty-heading'>{emptyHeading}</h3>
    }

    return (
        <>
            <div className='video-list'>
                {
                    datas.map(
                        (video)=> { return <MediaCard key={video.id} data={video} onClick={onSelect} selected={selected} type={"sel"}/> }
                    )
                } 
            </div> 
        </>
    )
}

export function MediaCard({data, onClick, selected, type}) {
    const tasks = useContext(TaskContext);
    const dispatch = useContext(TaskDispatchContext);

    const [isHoverd, setIsHovered] = useState(false);
    return (
        <div className='video-card'
            onMouseEnter = {()=>setIsHovered(true)}
            onMouseLeave = {()=>setIsHovered(false)}
        >
            <div style={{position:'relative'}} >
                <img src={data.thumbnail} alt={data.title} className='thumbnail-img'/>
                {isHoverd && 'audio' in data && (
                    <img
                        src={tasks.playingId === data.id ? "/pause.svg" : "/play.svg"}
                        style={{
                            position:"absolute",
                            top:"50%",
                            left:"50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "14px",
                            cursor:"pointer",
                            borderRadius:"50%",
                            backgroundColor:"rgba(255, 255, 255, 0.4)",
                            border:"none",
                            color:"#1E1E1E",
                            boxShadow:"0px 4px 6px rgba(0,0,0,0.1)",
                            transition: "transform 0.2s ease",
                            width:"50%"
                        }}
                        onClick={()=>{dispatch({type:'playAudio', id:data.id,  src: data.audio})}}
                    />
                )}
            </div>

            <div className='video-info'>
                <h4>{data.title}</h4>
                <h5>{data.description}</h5>
            </div>

            {
                type === "sel" ? 
                <button className='like-button' onClick={()=>{onClick(data.id)}}>
                    {data.id === selected? '已选': '选择' }
                </button>
                :
                <button className='like-button' onClick={onClick}>
                    ...
                </button>
            }
            
        </div>
    )
}