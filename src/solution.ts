import {Problem, Solution, Street} from "./types";
import * as _ from "lodash";

export function buildOutput(problem: Problem): Solution {
    const intersections: Record<number, Street[]> = {};

    const streetsByName: Record<string, Street> = {};
    problem.streets.forEach(street => {
        streetsByName[street.name] = street;
    });

    const allStreetNames = new Set<string>();
    problem.paths.forEach(path => {
        path.streetNames.forEach(streetName => {
            allStreetNames.add(streetName);
        });
    });

    allStreetNames.forEach(streetName => {
        const street = streetsByName[streetName];
        if (! intersections[street.endIntersection]) {
            intersections[street.endIntersection] = [];
        }
        intersections[street.endIntersection].push(street);
    });

    return {
        nbIntersections: Object.keys(intersections).length,
        schedules: Object.entries(intersections).map(([intersectionId, streets]) => {
            return {
                intersection: parseInt(intersectionId, 10),
                nbStreets: streets.length,
                pattern: streets.map(street => {
                    return {
                        streetName: street.name,
                        duration: 1
                    }
                })
            };
        })
    }
}
