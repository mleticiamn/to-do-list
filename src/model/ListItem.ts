export interface Item{
    id: string,
    item: string,
    checked: boolean,
}

export default class ListItem implements Item{

    constructor(private _id: string = "", private _item: string = "", private _checked: boolean = false,){
        this._id = _id; //Opcional
        this._item = _item; //Opcional
        this._checked = _checked;//Opcional
    }

    set id(id: string){
        this._id = id
    }

    get id(): string{
        return this._id
    }

    set item(item: string){
        this._item = item
    }

    get item(): string{
        return this._item
    }

    set checked(checked: boolean){
        this._checked = checked
    }

    get checked(): boolean{
        return this._checked
    }

}