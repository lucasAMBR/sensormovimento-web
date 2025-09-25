'use client'

import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { Camera, Home, LogOut, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SensorCard from "./_components/SensorCard";
import AssociatedModal from "./_components/AssociateSensorModal";

type Sensor = {
    id: string,
    name: string,
    description: string,
    createdAt: Date
}

const DashboardPage = () => {
    const router = useRouter();

    const { user, token } = useAuth()

    const [ sensorList, setSensorList ] = useState<Sensor[]>();

    const fetchUserSensors = async() => {
        try{
            const response = await api.get("/sensor/list");
            setSensorList(response.data.data);
        }catch(error){
            console.log(error)
        }
    }

    const [ associateModalIsOpen, setAssociateModalIsOpen ] = useState(false);

    useEffect(() => {
        if(user == null || token == null){
            router.push("/");
        }else{
           fetchUserSensors(); 
        }
    }, [])

    return(
        <div className="w-screen h-screen bg-gray-100 dark:bg-neutral-900 text-black dark:text-white flex">
            <div className="bg-gray-200  dark:bg-neutral-950 w-[350px]">
                <h2 className="text-blue-700 px-6 py-8 text-3xl font-bold">MoveTracker</h2>
                <p className="py-3 px-6 flex gap-2 hover:bg-gray-300 dark:hover:bg-neutral-800 cursor-pointer"><Home /> Inicio</p>
                <p className="py-3 px-6 flex gap-2 hover:bg-gray-300 dark:hover:bg-neutral-800 cursor-pointer" onClick={() => setAssociateModalIsOpen(true)}><Camera /> Cadastrar Sensor</p>
                <p className="py-3 px-6 flex gap-2 hover:bg-gray-300 dark:hover:bg-neutral-800 cursor-pointer text-red-700"><LogOut /> Logout</p>
            </div>
            <div className="p-8 flex-1">
                <h2 className="text-3xl font-bold flex gap-2 items-center">Seus Sensores</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    {sensorList != undefined && sensorList?.length < 1 &&
                        <div className="flex-1 flex flex-col items-center justify-center w-full my-24">
                            <p>Parece que você ainda não associou nenhum sensor a sua conta</p>
                            <button className="bg-blue-600 w-[300px] my-4 p-2 rounded-xl" onClick={() => setAssociateModalIsOpen(true)}>Associar</button>
                        </div>
                    }
                    {sensorList?.map((item) => (
                        <SensorCard id={parseInt(item.id)} name={item.name} description={item.description} createdAt={item.createdAt} />
                    ))}
                </div>
            </div>
            {associateModalIsOpen && 
                <AssociatedModal closeModal={() => setAssociateModalIsOpen(false)} fetchData={fetchUserSensors}/>
            }
        </div>
    );
}

export default DashboardPage;