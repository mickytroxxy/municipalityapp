const unitType = ['KG','LT','SIZE'];
const itemColor = ['NO COLOR','GREEN','BLACK','RED','ORANGE','WHITE','YELLOW','GRAY','DARK BLUE'];
const hasMultipleColors = true;
export const categories = [
    {category:'ALL'},
    {
        category:'FAST FOOD',
        item:{itemName:'',itemDescription:'',unitType,hasMultipleColors,itemColor}
    },
    {
        category:'GROCERY',
        item:{itemName:'',itemDescription:'',unitType,hasMultipleColors,itemColor}
    },{
        category:'FASHION',
        item:{itemName:'',itemDescription:'',unitType:['SIZE'],hasMultipleColors,itemColor}
    }
]