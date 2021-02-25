import {Problem, Solution, Street} from "./types";
import * as _ from "lodash";

export function buildOutput(problem: Problem): Solution {
    const intersections: Record<number, Street[]> = {};

    const streetsByName: Record<string, Street> = {};

    const times: number[] = [];

    problem.streets.forEach(street => {
        times.push(street.travelTime);
        streetsByName[street.name] = street;
    });

    // console.log(times.sort((a, b) => a - b));
    // console.log(times.sort((a, b) => a - b).reverse());


    const streetFrequencies: Record<string, number> = {};
    let maxPossible = 0

    const scores: number[] = [];
    problem.paths.forEach(path => {
        const duration = _.sum(path.streetNames.slice(1).map(streetName => streetsByName[streetName].travelTime));
        const maxScore = problem.BonusPoints + problem.Duration - duration;
        scores.push(maxScore);
    });

    const sortedScores = scores.sort((a, b) => a - b);

    problem.paths.forEach((path) => {
        path.streetNames.forEach(streetName => {
            if (! streetFrequencies[streetName]) {
                streetFrequencies[streetName] = 0;
            }
            streetFrequencies[streetName] += 1;
        });
    });

    Object.keys(streetFrequencies).forEach(streetName => {
        const street = streetsByName[streetName];
        if (! intersections[street.endIntersection]) {
            intersections[street.endIntersection] = [];
        }
        intersections[street.endIntersection].push(street);
    });

    return {
        nbIntersections: Object.keys(intersections).length,
        schedules: Object.entries(intersections).map(([intersectionId, streets]) => {
            const orderedStreets = streets.sort((s1, s2) => streetFrequencies[s1.name] - streetFrequencies[s2.name]);
            return {
                intersection: parseInt(intersectionId, 10),
                nbStreets: streets.length,
                pattern: orderedStreets.map((street, streetIndex) => {
                    return {
                        streetName: street.name,
                        duration: 25
                        // duration: Math.min(streetIndex + 1, streetFrequencies[street.name])
                    }
                })
            };
        })
    }
}
