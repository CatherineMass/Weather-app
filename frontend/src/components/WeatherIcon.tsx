import React from "react";
import {
    WiDaySunny,
    WiDaySunnyOvercast,
    WiDayCloudy,
    WiDayFog,
    WiDayRainMix,
    WiDayShowers,
    WiDayRain,
    WiDayThunderstorm,
    WiDaySleet,
    WiDaySleetStorm,
    WiDaySnow,
    WiRain,
    WiLightning,
    WiSleet,
    WiSnow,
} from "weather-icons-react";

interface Props {
  symbol: number;
  size: number;
}

const WeatherIcon: React.FC<Props> = ({ symbol, size }) => {
    return (
        <div>
            {symbol === 1 || symbol === 2 ? (
                <WiDaySunny size={size} />
            ) : symbol === 3 || symbol === 5 ? (
                <WiDayCloudy size={size} />
            ) : symbol === 4 || symbol === 6 ? (
                <WiDaySunnyOvercast size={size} />
            ) : symbol === 7 ? (
                <WiDayFog size={size} />
            ) : symbol === 8 ? (
                <WiDayRainMix size={size} />
            ) : symbol === 9 ? (
                <WiDayShowers size={size} />
            ) : symbol === 10 ? (
                <WiDayRain size={size} />
            ) : symbol === 11 ? (
                <WiDayThunderstorm size={size} />
            ) : symbol === 12 || symbol === 13 ? (
                <WiDaySleet size={size} />
            ) : symbol === 14 ? (
                <WiDaySleetStorm size={size} />
            ) : symbol === 15 || symbol === 16 || symbol === 17 ? (
                <WiDaySnow size={size}/>
            ) : symbol === 18 || symbol === 19 || symbol === 20 ? (
                <WiRain size={size} />
            ) : symbol === 21 ? (
                <WiLightning size={size} />
            ) : symbol === 22 || symbol === 23 || symbol === 24 ? (
                <WiSleet size={size} />
            ) : (
                <WiSnow size={size} />
            )}
        </div>
    );
};

export default WeatherIcon;
