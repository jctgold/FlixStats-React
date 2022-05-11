import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const Context = createContext();

export const StateContext = ({children}) => {

    const [ token, setToken ] = useState();
    const [ topType, setTopType ] = useState("tracks");
    const [ items, setItems ] = useState([]);
    const [ initialHeadingInfo, setInitialHeadingInfo ] = useState([]);
    const [ headingInfo, setHeadingInfo ] = useState([]);
    const [ blur, setBlur ] = useState(false);

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = "token";
    const SCOPE = "user-top-read"

    const signIn = () => {
        window.location.href = 
            `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
    }

    const logOut = () => {
        setToken("");
        window.localStorage.removeItem("token");
    }

    const getToken = () => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if(!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.localStorage.setItem("token", token);
        } 

        if(token) setToken(token);
        window.location.hash = "";
    }

    const getItems = async (type) => {

        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                time_range: "short_term",
                limit: 10,
                offset: 0,
            }
        });

        if (data.items.length > 0) {
            
            setItems(data.items);

            let headingArray = [];

            if(type === "tracks") {
                headingArray = {
                    title: data.items[0].name,
                    subtitle: data.items[0].artists[0].name,
                    rank: 0,
                }
            } else if (type === "artists") {
                headingArray = {
                    title: data.items[0].name,
                    rank: 0,
                }
            }
            
            setHeadingInfo(headingArray);
            setInitialHeadingInfo(headingArray);
        } 
    
    }

    const onImageHover = (item, index) => {
        if(index !== initialHeadingInfo.rank) {
            if(topType === "tracks")
                setHeadingInfo({
                    title: item.name,
                    subtitle: item.artists[0].name,
                    rank: index,
                });
            else if (topType === "artists")
                setHeadingInfo({
                    title: item.name,
                    rank: index,
                });
        }

        setBlur(true);
    }

    const onImageHoverLeave = (index) => {
        if(index !== initialHeadingInfo.rank) {
            setHeadingInfo(initialHeadingInfo);
        }

        setBlur(false);
    }

    return (
        <Context.Provider
         value={{
             token,
             setToken,
             signIn,
             getToken,
             logOut,
             items,
             getItems,
             headingInfo,
             setHeadingInfo,
             topType,
             setTopType,
             onImageHoverLeave,
             onImageHover,
             blur, 
             setBlur
         }}
        >
            { children }
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context);
