import React, {useState, useContext, useActionState} from "react";
import VideoPlayer from "./VideoPlayer";
import { SearchableList, MediaCard } from "./Card";

import VoiceSlider from "./slider";
import { TaskProvider, TaskContext, TaskDispatchContext } from "./TaskContext";
import "./App.css"


const App = () => {
  return (
    <TaskProvider>
      <Top/>
    </TaskProvider>
  )
}

const Top =() => {

  const dispatch=useContext(TaskDispatchContext);
  const tasks = useContext(TaskContext);

  const roles = [
    {
      id:0,
      description:"Andrew",
      title:"人物形象",
      thumbnail: "/res/andrew.jpg",
      code: 'Andrew',
    },
    {
      id:1,
      description:"财神爷",
      title:"人物形象",
      thumbnail: "/res/MoneyGod.jpg",
      code: 'MoneyGod',
    },
    {
      id:2,
      description:"苏轼",
      title:"人物形象",
      thumbnail: "/res/SuShi.jpg",
      code: 'SuShi',
    },
    {
      id:3,
      description:"Eric",
      title:"人物形象",
      thumbnail: "/res/艾瑞克.jpg",
      code: 'Eric',
    },
    {
      id:4,
      description:"子轩",
      title:"人物形象",
      thumbnail: "/res/子轩.png",
      code: 'ZiXuan',
    },
    {
      id:5,
      description:"明轩",
      title:"人物形象",
      thumbnail: "/res/男.jpg",
      code: 'MingXuan',
    },
    {
      id:6,
      description:"Arya",
      title:"人物形象",
      thumbnail: "/res/Arya.png",
      code: 'Arya',
    },
    {
      id:7,
      description:"Shirley",
      title:"人物形象",
      thumbnail: "/res/Shirley.jpg",
      code: 'Shirley',
    },
    {
      id:8,
      description:"苏菲",
      title:"人物形象",
      thumbnail: "/res/苏菲.jpg",
      code: 'Sophie',
    },
    {
      id:9,
      description:"慕容晓",
      title:"人物形象",
      thumbnail: "/res/慕容晓.png",
      code: 'MuRongXiao',
    },
  ]

  const voices = [
    {
      id:0,
      title:"音色",
      description:"霸道青年",
      thumbnail: "https://img0.baidu.com/it/u=2666225898,3336665167&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=500",
      audio: "/male-qn-badao.wav",
      code: "male-qn-badao",
    },
    {
      id:1,
      title:"音色",
      description:"甜美女性",
      thumbnail: "https://img0.baidu.com/it/u=2666225898,3336665167&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=500",
      audio: "/female-tianmei.wav",
      code: "female-tianmei",
    },
    {
      id:2,
      title:"音色",
      description:"成熟女性",
      thumbnail: "https://img0.baidu.com/it/u=2666225898,3336665167&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=500",
      audio: "/female-chengshu.wav",
      code: "female-chengshu",
    },
    {
      id:3,
      title:"音色",
      description:"甜心小玲",
      thumbnail: "https://img0.baidu.com/it/u=2666225898,3336665167&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=500",
      audio: "/tianxin_xiaoling.wav",
      code: "tianxin_xiaoling",
    }
  ]

  return (
    <div className="cc">
      <div className="header">短视频合成</div>
      <div className="panel">
        <div className="left">
          <textarea value={tasks.input} onChange={(e)=>{dispatch({type:'input', value:e.target.value})}} placeholder="请输入播报内容..."></textarea>
          <button disabled={tasks.input.length==0 || tasks.showVideo == true} onClick={()=>{dispatch({type:'submit'})}}>preview</button>
        </div>
        <div className="right">
          <MediaCard data={roles[tasks.roleId]} onClick={()=>{dispatch({type:'showRole'})}} selected={tasks.roleId} type={"disp"}/>
          <MediaCard data={voices[tasks.voiceId]} onClick={()=>{dispatch({type:'showVoice'})}} selected={tasks.voiceId} type={"disp"}/>
          <VoiceSlider name="语速"/>
          <VoiceSlider name="声调"/>
          <VoiceSlider name="音量"/>
        </div>
      </div>

      <VideoPlayer src={tasks.avatarUrl} />
      <SearchableList datas={roles} onSelect={(id)=>{dispatch({type:'roleId', id:id, roleCode: roles[id].code})}} selected={tasks.roleId} visible={tasks.showRole}/>
      <SearchableList datas={voices} onSelect={(id)=>{dispatch({type:'voiceId', id:id, voiceCode: voices[id].code})}} selected={tasks.voiceId} visible={tasks.showVoice}/>
    </div>
  )
}


export default App;

