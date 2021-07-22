import axios from 'axios';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    (response)=>response,
    async (error)=> {
        const errorAPI = error.response.config;
        if(error.response.status === 401) {
            errorAPI.retry = true;
            await requestRefreshToken();
            return await axios(errorAPI);
        }
        return error;
    }
)

export const requestLogin = async (payload) =>{
    const res = await axios.post("http://localhost:3000/user/login", {
        email: payload.email,
        pw: payload.password,
    });
    if(res.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${
            res.data.access
        }`;
        return res.data.access;
    }
    else {
        return null;
    }
}

export const requestSignup = async (payload) => {
    const res = await axios.post("http://localhost:3000/user/createUser", {  
        email: payload.email,  
        pw: payload.password,  
        name: payload.name
    });
    if (res.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${
            res.data.access
        }`;
        return res.data.access;
    }
    else {
        return null;
    }
}
export const requestRefreshToken = async () => {
    const res = await axios.post("http://localhost:3000/user/refreshToken");
      //reducer accessToken 갱신
    if(res.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${
            res.data.access
        }`;
        return res.data.access;
    }
    else {
        return null;
    }
    //   setTimeout(() => {
    //     refreshToken();
    //   }, res.data.date * 1000 - 1000 * 30);
}

export const requestLogout = async () => {
    const res = await axios.get("http://localhost:3000/user/logout");
    if(res.status === 200) {
        axios.defaults.headers.common["Authorization"] = '';
        return null;
    }
    else {//로그아웃을 실패하면 뭘해야할까
        return null;
    }
}

export const requestUserInfo = async (payload) => {
    const res = await axios.get("http://localhost:3000/user/getUserInfo",{
        params:{
            email:payload.email
        }
    });
    if(res.status === 200) {
        return res.data
    }
    else {
        throw new Error('request failed');
    }
}
export const requestFriendsInfo = async (payload) => {
    const res = await axios.get("http://localhost:3000/user/getFriendsInfo",{
        params:{
            email:payload.email
        }
    });
    if(res.status === 200) {
        return res.data;
    }
    else {
        throw new Error('request failed');
    }
    
}


