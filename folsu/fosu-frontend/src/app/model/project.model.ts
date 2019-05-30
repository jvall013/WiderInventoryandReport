import Company from "./company.model";

class Project {

    _id:           string;
    name:          string;
    client:        string;
    address:       string;
    state:         string;
    installer:     Company;
    pcode:         string;
    materials:     string;
    floors:        Number;
    expectedBegin: Date;

}

export default Project;
