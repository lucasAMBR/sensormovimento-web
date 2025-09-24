'use client'

import { useState } from "react"
import SensorHistoryModal from "./SensorHistoryModal"

type SensorCardProps = {
    id: number,
    name: string,
    description: string,
    createdAt: Date
}

const SensorCard = ({id, name, description, createdAt}: SensorCardProps) => {

    const [ historyModalIsOpen, setHistoryModalIsOpen ] = useState<boolean>(false);

    const optionsFull = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    } as const;

    const dateObject = new Date(createdAt);
    const formattedDate = new Intl.DateTimeFormat('pt-BR', optionsFull).format(dateObject);

    return(
        <div className="bg-gray-300 dark:bg-neutral-800 p-4 w-[300px] rounded-xl flex flex-col gap-2">
            <p className="text-2xl font-semibold">{id}. {name}</p>
            <p>{description}</p>
            <p className="text-xs">Criado em: {formattedDate}</p>
            <button onClick={() => setHistoryModalIsOpen(true)} className="bg-blue-700 text-white rounded-sm p-2 mt-4 cursor-pointer hover:bg-blue-900">Ver Historico de Ativação</button>
            {historyModalIsOpen && 
                <SensorHistoryModal sensorId={id} closeModal={() => setHistoryModalIsOpen(false)}/>
            }
        </div>
    )
}

export default SensorCard;