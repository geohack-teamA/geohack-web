import liff from "@line/liff/dist/lib";
import { useEffect } from "react";

export default () => {
  const getLanguage = () => {
    if(!liff)return;
    return liff.getLanguage()
    return () => console.log("hello")
  }
  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if(!liffId)return;
    if(typeof window !== "undefined"){
    const initLiff =async () => {
        try{
          liff.init({
          liffId,
          // withLoginOnExternalBrowser: true
        })
      }catch(err){
        console.log(err);
      }
    }
    initLiff();
  }
  }, [])
  const isLoggedIn = () => {
    if(!liff.ready)return;
    return liff.isLoggedIn(); //TODO: this causes error
  }
  const login = () => {
  if(isLoggedIn())return;
  return liff.login();
  }
  const logout = () => {
    if(!isLoggedIn()) return;
    return liff.logout()
    window.location.reload()
  }
  return {
    getLanguage,
    isLoggedIn,
    login,
    logout
  }
}