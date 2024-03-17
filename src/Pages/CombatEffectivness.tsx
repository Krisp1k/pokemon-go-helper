import axios from "axios"
import { useEffect, useState } from "react"

import {BestCounters_I} from "../Config/Interfaces"

export default function CombatEffectivness() {

    const [data, setData] = useState([]);
    const [bestCounters, setBestCounters] = useState<Array<BestCounters_I>>([]);

    useEffect(() => {
        axios.get("https://pogoapi.net/api/v1/type_effectiveness.json")
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const valueTranslations: {[key: number]: string} = {
        0.390625: "Super ineffective",
        0.625: "Not very effective",
        1: "No effect",
        1.6: "Super effective",
    }

    const getBestCounters = (defenderType: string) => {
        if (!defenderType || defenderType === "") {
            setBestCounters([])
            return
        };
        const defenderData = (data as {[key: string]: any})[defenderType];
        const bestCounters: Array<BestCounters_I> = [];

        for (const [key, val] of Object.entries(defenderData)) {
            if (key !== defenderType) {
                const label = valueTranslations[val as number];
                bestCounters.push({
                    counter: key as string, 
                    value: val as number,
                    label: label as string
                })
            }
        }

        bestCounters.sort((a, b) => {
            return b.value - a.value
        })

        setBestCounters(bestCounters)
    }

    return (
        <div> 
            <h1>Combat Effectivness</h1>
            <h2 className="mt-5 mb-3">Select your defender main type:</h2>
            <select className="form-select" onInput={
                (e: React.ChangeEvent<HTMLSelectElement>) => getBestCounters(e.target.value)
            }>
                <option value="">None</option>
                {Object.entries(data).map((item, index) => {
                    return (
                        <option key={index} value={item[0]}>
                            {item[0]}
                        </option>
                    )
                })}
            </select>

            {bestCounters.length > 0 && (
                <>
                    <h2 className="mt-5 mb-3">Best Counters</h2> 
                    <table className="table border border-1">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={2}>Icon</th>
                                <th scope="col">Counter</th>
                                <th scope="col">Value</th>
                                <th scope="col">Label</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bestCounters.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td scope="col" colSpan={2}><img src={`../public/PokemonTypes/Icon_${item.counter}.webp`}></img></td>
                                        <td scope="col">{item.counter}</td>
                                        <td scope="col">{item.value}</td>
                                        <td scope="col">{item.label}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}