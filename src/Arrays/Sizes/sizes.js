import { babySizes } from "./babySizes";
import { generalSizes } from "./generalSizes";
import { kidsSizes } from "./kidsSizes";
import { numberSizes } from "./numberSizes";
import { preMature } from "./preMature";

export const sizes = preMature.map(size => ({ key: size, value: size }))
    .concat(babySizes.map(size => ({ key: size, value: size })))
    .concat(kidsSizes.map(size => ({ key: size, value: size })))
    .concat(generalSizes.map(size => ({ key: size, value: size })))
    .concat(numberSizes.map(size => ({ key: size, value: size })))