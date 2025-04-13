import {createContext} from 'react';
import {useImmerReducer} from 'use-immer'

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

export function TaskProvider ({children}) {
    const [tasks, dispatch] = useImmerReducer (
        taskReducer, initialTasks
    );

    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );

    function taskReducer(draft, action) {
        console.log(action);
        switch(action.type) {
            case 'closeVideo': {
                draft.showVideo = false;
                break;
            }
            case 'openVideo': {
                console.log('showvideo')
                draft.showVideo = true;
                break;
            }
            case 'input' : {
                draft.input = action.value;
                break;
            }
            case 'playAudio': {
                draft.audio.onended = () => {dispatch({type: 'audioEnd'})};
                let id = action.id;
                if (id === draft.playingId) {
                    if (draft.playingId !== -1) {
                        draft.audio.pause();
                        draft.playingId = -1;
                    } else {
                        draft.audio.play();
                        draft.playingId = id;
                    }
                } else {
                    draft.audio.pause();
                    draft.audio.currentTime = 0;

                    draft.audio.src = action.src;
                    draft.audio.play();
                    draft.playingId = id;
                }
                break;
            }
            case 'showRole' : {
                draft.showRole = true;
                break;
            }
            case 'roleId' :  {
                draft.roleId = action.id;
                draft.roleCode = action.roleCode;
                draft.showRole = false;
                break;
            }
            case 'showVoice' : {
                draft.showVoice = true;
                break;
            }
            case 'voiceId' : {
                draft.voiceId = action.id;
                draft.voiceCode = action.voiceCode;
                draft.showVoice = false;
                break;
            }
            case 'audioEnd': {
                draft.playingId = -1;
                break;
            }
            case 'submit' : {
                const fetchData = async () => {
                    try {
                        const response = await fetch('http://192.168.31.209:8080/task_sse', {
                            method: 'POST', // or 'POST' etc.
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                text: draft.input,
                                role: draft.roleCode,
                                voice: draft.voiceCode,
                            })
                        });

                        if (!response.ok) throw new Error('Network response was not ok');

                        let buffer = "";

                        const reader = response.body.getReader();
                        const decoder = new TextDecoder();

                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            
                            buffer += decoder.decode(value, { stream: true });
                            
                            // 按换行符分割处理完整JSON对象
                            const lines = buffer.split('\n');
                            buffer = lines.pop(); // 保留未完成的行
                            
                            for (const line of lines) {
                                if (line.trim() === '')  {
                                    continue;
                                }
                                try {
                                    //const obj = JSON.parse(line);
                                    //console.log('Parsed object:', obj);
                                    // 处理你的业务逻辑
                                    dispatch({type:'sse', value:line});
                                } catch (e) {
                                    console.error('Error parsing JSON:', e, 'Raw:', line);
                                }
                            }
                        }
                        // 处理剩余内容
                        if (buffer.trim() !== '') {
                            try {
                                //const obj = JSON.parse(buffer);
                                //console.log('Final object:', obj);
                                dispatch({type:'sse', value:buffer});
                            } catch (e) {
                                console.error('Error parsing final JSON:', e);
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching stream:', error);
                        dispatch({type:'init'});
                    }
                };

                fetchData();
                draft.isLoading = true;
                draft.showVideo = true;
                draft.progress = 0;
                break;
            }
            case 'init': {
                draft.isLoading = false;
                draft.showVideo = false;
                draft.progress = 0;
                break;
            }
            case 'sse': {
                const obj = JSON.parse(action.value);
                console.log('Parsed object:', obj);
                if ('progress' in obj) {
                    draft.progress = obj['progress'];
                }
                if ('video' in obj) {
                    draft.avatarUrl= obj['video']
                    draft.isLoading = false;
                }

                break;
            }
            default : {
                break;
            }

        }
    }
}



const initialTasks = {
    input: '',
    showRole:false,
    roleId:0,
    showVoice:false,
    voiceId:0,
    showVideo:false,
    playingId: -1,
    audio:new Audio(),
    isLoading: true,
    progress : 0,
    avatarUrl: "",
    roleCode: "Andrew",
    voiceCode: "mail-qn-badao",
}