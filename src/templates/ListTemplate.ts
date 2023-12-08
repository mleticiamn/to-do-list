import FullList from "../model/FullList"

interface DOMList{
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList{

    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()
    
    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void{
        this.ul.innerHTML = ""

        const itemCountElement = document.getElementById("itemCount");

        if (itemCountElement) {
          itemCountElement.textContent = "0";  // Define a contagem como 0 quando a lista está vazia
        }
    }

    render(fullList: FullList): void{
        this.clear()

        const itemCountElement = document.getElementById("itemCount")

        if (itemCountElement) {
          itemCountElement.textContent = fullList.list.length.toString()
        }

        fullList.list.forEach(item => {
            //Cria elemento da lista <li>
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            //Cria elemento da caixa de seleção <input>
            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)
            
            //Adiciona um ouvinte de evento para a mudança de estado da caixa de seleção
            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })
            
            //Cria um elemento de rótulo <label> associado à caixa de seleção
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)
            
            //Cria um botão de exclusão <button>
            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button"
            button.textContent = "X"
            li.append(button)

            //Adiciona um ouvinte de evento para a remoção do item da lista
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })
            
            //Adiciona o elemento <li> à lista existente (this.ul)
            this.ul.append(li)

        })
    }
}