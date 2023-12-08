import ListItem from './ListItem'

interface List{
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List{

    static instance: FullList = new FullList() //Since we only have one list, we can do this

    private constructor(private _list: ListItem[] = []){
        this._list = _list; //Opcional
    }

    get list(): ListItem[]{
        return this._list
    }

    //Métodos
    load(): void{

        //Obtém a lista armazenada no localstorage com a chave myList
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return
        
        //Analisar a lista armazenada (que é uma string JSON) para um array de objetos
        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            //Criar uma nova instância de ListItem com os dados do objeto atual
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            //Adicionar o novo ListItem à instância de FullList
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void{
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void{
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void{
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}