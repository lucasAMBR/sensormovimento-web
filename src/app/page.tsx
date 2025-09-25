"use client"

import { useAuth } from '@/contexts/AuthContext';
import useNotyf from '@/hooks/useNotyf';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import 'notyf/notyf.min.css';
import React, { useState } from 'react';

export default function Home() {
  const notyf = useNotyf();
  const router = useRouter(); 

  const { login } = useAuth();
  
  const [ formSection, setFormSection ] = useState<"login" | "register">("login");

  const switchFormSection = () => {
    if(formSection == "login"){
      setFormSection("register");
    }else{
      setFormSection("login");
    }

    clearInputsOnSwitch();
  }

  // Lida com o valor do input de nome 
  const [ nameInputValue, setNameInputValue ] = useState<string>("");

  // Controla a mudança de valor do input de nome
  const handleNameInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.target.value);
  }

  // Lida com o valor do input de email
  const [ emailInputValue, setEmailInputValue ] = useState<string>("");

  // Controla a mudança de valor do input de email
  const handleEmailInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(e.target.value);
  }

  // Lida com o valor do input de password
  const [ passwordInputValue, setPasswordInputValue ] = useState<string>("");

  // Controla a mudança de valor do input de password
  const handlePasswordInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(e.target.value);
  }

  const handleLoginSubmit = async(e: any) => {
    e.preventDefault()
    try{
      const response = await api.post('/auth/login', {
        email: emailInputValue,
        password: passwordInputValue
      })

      login({token: response.data.data.token, user: response.data.data.userData})

      router.push("/dashboard");
    }catch (error: any){
      notyf.error(error.message);
    }
  }

  const handleRegisterSubmit = async(e: any) => {
    e.preventDefault()
    try{
      const register = await api.post('/auth/register', {
        name: nameInputValue,
        email: emailInputValue,
        password: passwordInputValue
      })

      notyf.success(register.data.message);

      const response = await api.post('/auth/login', {
        email: emailInputValue,
        password: passwordInputValue
      })

      login({token: response.data.data.token, user: response.data.data.userData})

      router.push("/dashboard");

      login({token: response.data.data.token, user: response.data.data.userData})

      router.push("/dashboard");
    }catch (error: any){
      notyf.error(error.message);
    }
  }

  //UTILITARIOS
  const clearInputsOnSwitch = () => {
    setNameInputValue("");
    setEmailInputValue("");
    setPasswordInputValue("");
  }

  return (
    <div className="w-screen h-screen bg-[url('/qqquad.svg')] bg-cover bg-center bg-no-repeat bg-blue-900 flex justify-center items-center">
      <div className="w-fit flex flex-col h-fit p-8 rounded-md bg-white dark:bg-stone-900 text-black dark:text-white items-center justify-center">
        <h2 className="text-3xl my-4 font-semibold">Move<span className="text-blue-600">Tracker</span></h2>
        {formSection == "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="flex flex-col my-4">
              <label className="text-blue-900 dark:text-white">Email</label>
              <input className="border-1 pl-2 border-blue-900 dark:border-0 w-[400px] h-12 bg-white rounded-md text-black" value={emailInputValue} onChange={handleEmailInputValueChange}/>
            </div>
            <div className="flex flex-col my-4">
              <label className="text-blue-900 dark:text-white">Senha</label>
              <input className="border-1 pl-2 border-blue-900 dark:border-0 w-[400px] h-12 bg-white rounded-md text-black" value={passwordInputValue} onChange={handlePasswordInputValueChange} type='password'/>
            </div>
            <button className="w-[400px] bg-blue-700 h-12 rounded-md text-white mt-6 cursor-pointer hover:bg-blue-900" type='submit'>Entrar</button>
            <p className="text-xs text-center my-2">Não tem uma conta? <span className="underline text-blue-700 cursor-pointer hover:text-blue-950" onClick={switchFormSection}>Registre-se</span></p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="flex flex-col my-4">
              <label className="text-blue-900 dark:text-white">Nome</label>
              <input className="border-1 pl-2 border-blue-900 dark:border-0 w-[400px] h-12 bg-white rounded-md text-black" value={nameInputValue} onChange={handleNameInputValueChange}/>
            </div>
            <div className="flex flex-col my-4">
              <label className="text-blue-900 dark:text-white">Email</label>
              <input className="border-1 pl-2 border-blue-900 dark:border-0 w-[400px] h-12 bg-white rounded-md text-black" value={emailInputValue} onChange={handleEmailInputValueChange}/>
            </div>
            <div className="flex flex-col my-4">
              <label className="text-blue-900 dark:text-white">Senha</label>
              <input className="border-1 pl-2 border-blue-900 dark:border-0 w-[400px] h-12 bg-white rounded-md text-black" value={passwordInputValue} onChange={handlePasswordInputValueChange} type='password'/>
            </div>
            <button className="w-[400px] bg-blue-700 h-12 rounded-md text-white mt-6 cursor-pointer hover:bg-blue-900" onClick={() => notyf.success("Deu certo")}>Registrar-se</button>
            <p className="text-xs text-center my-2">Já tem uma conta? <span className="underline text-blue-700 cursor-pointer hover:text-blue-950">Entre aqui</span></p>
          </form>
        )}
      </div>
    </div>
  );
}
