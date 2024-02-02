// DarkModeContext.js
import React, { createContext, useState, useEffect } from "react";

// 다크 모드 상태를 위한 Context 생성
export const DarkModeContext = createContext();

// 다크 모드 상태를 제공하는 Provider 컴포넌트
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode); // 로컬 스토리지에 상태 저장
    document.body.classList.toggle("dark-mode", darkMode); // body에 클래스 적용
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // 다크 모드 상태 전환
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
