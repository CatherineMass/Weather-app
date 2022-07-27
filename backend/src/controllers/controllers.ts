import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import { asyncWrapper } from "../middlewares/asyncWrapper";

// Cache: refresh ahead pattern?

interface Parameter {
  name: string;
  levelType: string;
  level: number;
  unit: string;
  values: number[];
}

interface TimeSerie {
  validTime: string;
  parameters: Parameter[];
}

interface Date {
    date: string;
    parameters: Parameter[];
}

export const getData = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        // Fetch today's data
        const response1 = await fetch(
            "https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/18.063240/lat/59.334591/data.json"
        );
        const data1 = await response1.json();

        const { timeSeries } = data1;
        const currentTime = timeSeries[0];

        const params = currentTime.parameters
            .map((p: Parameter) => {
                return {
                    name: p.name,
                    unit: p.unit,
                    values: p.values,
                };
            })
            .filter(
                (p: Parameter) =>
                    p.name === "t" ||
          p.name === "ws" ||
          p.name === "r" ||
          p.name === "prec1h" ||
          p.name === "msl" ||
          p.name === "c_sigfr" ||
          p.name === "Wsymb2"
            );

        const todayData: Date = {
            date: currentTime.validTime,
            parameters: params,
        };
        
        // Fetch forecast
        const response2 = await fetch(
            "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.063240/lat/59.334591/data.json"
        );
        const data2 = await response2.json();
    
        const timeSeries2 = data2.timeSeries;
    
        const today = new Date();
        const month =
          (today.getMonth() + 1).toString().length === 1
              ? `0${today.getMonth() + 1}`
              : today.getMonth() + 1;
    
        const filtered = timeSeries2
            .filter((t: TimeSerie) => t.validTime.includes("12:00:00"))
            .filter(
                (t: TimeSerie) =>
                    !t.validTime.includes(
                        `${today.getFullYear()}-${month}-${today.getDate()}`
                    )
            )
            .map((t: TimeSerie) => {
                const params = t.parameters
                    .map((p: Parameter) => {
                        return {
                            name: p.name,
                            unit: p.unit,
                            values: p.values,
                        };
                    })
                    .filter(
                        (p) =>
                            p.name === "t" ||
                  p.name === "ws" ||
                  p.name === "r" ||
                  p.name === "prec1h" ||
                  p.name === "msl" ||
                  p.name === "c_sigfr" ||
                  p.name === "Wsymb2"
                    );
    
                return {
                    date: t.validTime,
                    parameters: params,
                };
            });
        filtered.unshift(todayData);

        res.status(200).json({
            response: "Success",
            data: filtered,
        });
    }
);
