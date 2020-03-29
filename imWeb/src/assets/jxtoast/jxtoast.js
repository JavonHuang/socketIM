import Vue from 'vue'
const obj= {
    error(msg,d=800){
        let model=document.createElement("div");
        model.setAttribute('id','errorlayout')
        model.setAttribute('class','error-layout')
        document.body.appendChild(model);
        let img=document.createElement("div");
        img.setAttribute('class','error-img');
        model.appendChild(img)
        let span=document.createElement("span");
        span.setAttribute('class','error-span')
		span.innerText=msg;
        model.appendChild(span)
        setTimeout(this.delDom,d);
    },
    tips(msg,d=800){
        let model=document.createElement("div");
        model.setAttribute('id','errorlayout')
        model.setAttribute('class','error-layout')
        document.body.appendChild(model);
        let span=document.createElement("span");
        span.setAttribute('class','error-span')
		span.innerText=msg;
        model.appendChild(span)
        setTimeout(this.delDom,d);
    },
    delDom(){
        let child=document.getElementById("errorlayout");
        document.body.removeChild(child);
    }
}
export default obj;
Vue.prototype.$jxtoast = obj;