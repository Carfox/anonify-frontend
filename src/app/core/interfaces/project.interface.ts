import {SimpleUserInfo} from "./user.interface";

export interface Project {
id: string;
title: string;
description: string;
datasets: any[]; // Cambiado a 'any[]' para mayor flexibilidad
authors: SimpleUserInfo[]
}

export interface ShareProject{

    projectID: string;
    authors: string[];

}


