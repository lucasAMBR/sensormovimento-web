import useNotyf from "@/hooks/useNotyf";
import api from "@/lib/axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

type ModalProps = {
    fetchData: () => void,
    closeModal: () => void
}
const AssociatedModal = ({closeModal, fetchData}: ModalProps) => {

    const notyf = useNotyf();

    const [ sensorIdInputValue, setSensorIdInputValue ] = useState("");

    const handleSuccess = (message: string) => {
        notyf.success("Sensor vinculado com sucesso!");
        closeModal();
        fetchData();
    }

    const associateSensor = async() => {
        if(sensorIdInputValue == ''){
            notyf.error("insira um valor valido!")
        }

        try{
            const response = await api.post(`/sensor/associate/${sensorIdInputValue}`)
            handleSuccess(response.data.message);
        }catch(error){
            notyf.error("insira um valor valido!")
        }
    }

    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center">
            <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-md">
                <h3 className="text-xl font-semibold flex gap-4 items-center"><div onClick={closeModal} className="bg-blue-700 p-1 rounded-full cursor-pointer"><ChevronLeft /></div> Associar Sensor</h3>
                <div className="max-h-[600px] overflow-auto flex flex-col py-4">
                    <label className="text-blue-900 dark:text-white">Id do sensor</label>
                    <input className="border-1 pl-2 border-blue-900 dark:border-0 w-[400px] h-12 bg-white rounded-md text-black" type="number" value={sensorIdInputValue} onChange={(e) => setSensorIdInputValue(e.target.value)} />
                </div>
                <button className="bg-blue-600 w-full p-2 rounded-xl" onClick={associateSensor}>Associar</button>
            </div>
        </div>
    );
}

export default AssociatedModal;