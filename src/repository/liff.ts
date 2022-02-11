import liff from "@line/liff/dist/lib";
import { useEffect } from "react";

export default () => {
  const getLanguage = () => {
    if(!liff)return;
    return liff.getLanguage()
    return () => console.log("hello")
  }
  useEffect(() => {
    if(typeof window !== "undefined"){
    const initLiff =async () => {
        try{
          liff.init({
          liffId: process.env.NEXT_PUBLIC_LIFF_ID ?? "",
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
    return liff.isLoggedIn();
  }
  const logout = () => {
    if(!isLoggedIn()) return;
    return liff.logout()
    window.location.reload()
  }
  return {
    getLanguage
  }
}