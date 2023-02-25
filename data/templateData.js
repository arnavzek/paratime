//template colors are not saved in db so if we had to update color
//for every user using a specific template, we can do it from here

import template1 from "./templates/template1";
import template2 from "./templates/template2";
import template3 from "./templates/template3";
import communityTemplate from "./templates/communityTemplate";

let templates = [template1, template2, template3];

export { templates, communityTemplate };
