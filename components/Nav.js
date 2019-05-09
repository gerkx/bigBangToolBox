class NavButton {
    constructor(name) {
        this.name = name;
        this.id = `btn_${name}`
        this.createElement = () => {
            let child = document.createElement("div");
            child.id = this.id.toLowerCase();
            child.innerHTML = this.name;
            child.classList.add("nav__btn");
            return child
        }
        this.element = this.createElement();
        this.setState = (state) => {
            inst = document.getElementById(this.id);
            if(state.name && !inst.classList.contains("nav__btn--active")){
                inst.classList.add("nav__btn--active");
            }else{
                inst.classList.remove("nav__btn--active")
            }
        }
    }
}

module.exports = NavButton;



