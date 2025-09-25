'use client'

import api from "@/lib/axios"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"

type SensorHistoryProps = {
    sensorId: number,
    closeModal: () => void
}

type SensorHistoryItem = {
    historyId: number,
    timestamp: Date,
    sensorName: string
}

const SensorHistoryModal = ({ sensorId, closeModal }: SensorHistoryProps) => {

    const optionsFull = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    } as const;


    const formatDate = (date: Date) => {
        const dateObject = new Date(date);
        return new Intl.DateTimeFormat('pt-BR', optionsFull).format(dateObject);
    }

    const [ historyList, setHistoryList ] = useState<SensorHistoryItem[]>([]);

    const fetchSensorHistory = async() =>  {
        const response = await api.get(`/sensor/activation/history/${sensorId}`);

        setHistoryList(response.data.data);
    }

    useEffect(()=>{
        fetchSensorHistory();
    }, [])

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center">
            <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-md">
                <h3 className="text-xl font-semibold flex gap-4 items-center"><div onClick={closeModal} className="bg-blue-700 p-1 rounded-full cursor-pointer"><ChevronLeft /></div> Historico de ativações</h3>
                <p className="text-xs mt-4 mb-2">Listando da ativação mais recente para a mais antiga</p>
                <div className="max-h-[600px] overflow-auto flex flex-col">
                    {historyList.length < 1 && <p className="my-4">Parece que ele ainda não registrou nada</p>}
                    {historyList.map((item) => (
                        <div className="w-[400px] mb-2 bg-neutral-900 p-3 rounded-xl">
                            Horario da Ativação: {formatDate(item.timestamp)}
                        </div>
                    ))}
                </div>
                <button className="bg-gray-600 w-full p-2 rounded-xl" onClick={closeModal} >Fechar</button>
            </div>
        </div>
    )
}

export default SensorHistoryModal;