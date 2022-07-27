import React from "react";

interface Parameter {
    name: string;
    unit: string;
    values: number[];
}

interface Data {
    date: string;
    parameters:Parameter[];
}

export interface AppProps {
    data: Data;
    arrayData: Data[];
}