class Item {

    _id:          string;
    line:         string;
    material:     {
        _id:         string,
        description: string
    }
    quantity:     Number;
    project:      string;
}

export default Item;