'use client';

import styles from './page.module.css'
import {useRef, useState} from "react";

export default function Home() {
    const [speed, setSpeed] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [desiredWeight, setDesiredWeight] = useState(0);

    const calculateVelocity = () => {
        const speedOfLightMetersPerSecond = 299800000;
        const metersPerSecondToMilesPerHour = 2.237;
        const poundsToKilograms = 2.205;

        return Math.floor(
            Math.sqrt((1.0 - Math.pow(((currentWeight / poundsToKilograms) / (desiredWeight / poundsToKilograms)), 2)) *
                Math.pow(speedOfLightMetersPerSecond, 2))
            * metersPerSecondToMilesPerHour);
    }

    const formatVelocity = () => {
        return (
            <h2>Easy! Just travel at <span style={{
                textShadow: '0 0 12px rgb(44,209,85)',
                color: '#2cd155'
            }}>
                {calculateVelocity().toLocaleString()}</span> mph <br/> to reach that weight!
            </h2>
        );
    }

    return (
        <div style={{display: 'flex', backgroundColor: '#e5e5e5', flexDirection: 'column', minHeight: '100vh'}}>
            <h1>
                Desired weight calculator
            </h1>
            <div className={styles.main}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h2>What is your current weight (lbs)?</h2>
                    <input onChange={(e) => {
                        const parse = parseFloat(e.target.value);
                        if (!isNaN(parse)) {
                            setCurrentWeight(parse);
                        }
                    }} className={styles.input} placeholder={'175lbs'}/>
                    <div style={{height: '32px'}}/>
                    <h2>What weight would you like to be (lbs)?</h2>
                    <input onChange={(e) => {
                        const parse = parseFloat(e.target.value);
                        if (!isNaN(parse)) {
                            setDesiredWeight(parse);
                        }
                    }} className={styles.input} placeholder={'210lbs'}/>
                    <div style={{height: '32px'}}/>
                    <div style={{
                        opacity: isNaN(calculateVelocity()) ? 0 : 1
                    }}>
                        {formatVelocity()}
                    </div>
                </div>
            </div>
            <a style={{
                color: 'black',
                textShadow: '0 0 8px rgba(0, 0, 0, 0.25)'
            }} href={'https://en.m.wikipedia.org/wiki/Lorentz_factor'} target={'_blank'}>
                <h3>
                    (https://en.m.wikipedia.org/wiki/Lorentz_factor)
                </h3>
            </a>
        </div>
    )
}
